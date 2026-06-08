import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fieldsMapping from '../fields_mapping.json';

/**
 * Generates a completed PDF from form data using coordinate-based drawing on the cleaned PDF template.
 * @param {Object} rawFormData - The form state from the React application.
 */
export async function generatePDF(rawFormData) {
  try {
    console.log("Starting PDF generation...");
    
    // 1. Resolve conditional copy-fields to ensure PDF gets fully populated
    const formData = { ...rawFormData };

    // Copy Legal Address to Physical if Same checked
    if (formData.PhysicalSame) {
      formData.PhysicalStreetAddress = formData.LegalStreetAddress;
      formData.PhysicalCity = formData.LegalCity;
      formData.PhysicalState = formData.LegalState;
      formData.PhysicalZIP = formData.LegalZIP;
    }

    // Copy Legal Address to Billing if Same checked
    if (formData.MailingSameAsLegal) {
      formData.BillingStreetAddress = formData.LegalStreetAddress;
      formData.BillingCity = formData.LegalCity;
      formData.BillingState = formData.LegalState;
      formData.BillingZIP = formData.LegalZIP;
    }

    // Copy Owner 1 to Officer if Same checked
    if (formData.SameAsOwner) {
      formData.OfficerFirstName = formData.Owner1FirstName;
      formData.OfficerLastName = formData.Owner1LastName;
      formData.DateofBirthOfficer = formData.DateofBirth;
      formData.SocialSecurityOfficer = formData.SocialSecurity;
      formData.OfficerHomeStreetAddress = formData.Owner1HomeStreetAddress;
      formData.OfficerHomeCity = formData.Owner1HomeCity;
      formData.OfficerHomeState = formData.Owner1HomeState;
      formData.OfficerHomeZIP = formData.Owner1HomeZIP;
    }

    // 2. Fetch the cleaned PDF template
    const response = await fetch("/MerchantApplication_cleaned.pdf");
    if (!response.ok) {
      throw new Error(`Failed to load PDF template: ${response.statusText}`);
    }
    const pdfBytes = await response.arrayBuffer();

    // 3. Load PDF Document via pdf-lib
    const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
    const pages = pdfDoc.getPages();
    console.log(`Loaded template with ${pages.length} pages.`);

    // 4. Embed fonts
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const courierObliqueFont = await pdfDoc.embedFont(StandardFonts.CourierOblique); // Signature feel

    // 5. Draw form fields onto template based on coordinate mapping
    for (const [fieldName, fieldCoords] of Object.entries(fieldsMapping)) {
      const pageIndex = fieldCoords.page - 1;
      if (pageIndex < 0 || pageIndex >= pages.length) {
        console.warn(`Field ${fieldName} specifies invalid page index ${fieldCoords.page}`);
        continue;
      }

      const page = pages[pageIndex];
      const val = formData[fieldName];

      // Skip undefined or empty values
      if (val === undefined || val === null || val === '') {
        continue;
      }

      const isCheckbox = fieldCoords.type === '/Btn';

      if (isCheckbox) {
        // Draw an 'X' if value is truthy (boolean true or checked)
        if (val === true || val === 'true') {
          // Center the 'X' inside the bounding box
          // Text size is scaled relative to the bounding box height
          const boxHeight = fieldCoords.height || 10;
          const fontSize = Math.max(boxHeight - 1, 6);
          
          // Calculate centered position
          const xOffset = fieldCoords.width / 2 - (fontSize * 0.3);
          const yOffset = fieldCoords.height / 2 - (fontSize * 0.35);

          page.drawText('X', {
            x: fieldCoords.x + xOffset,
            y: fieldCoords.y + yOffset,
            size: fontSize,
            font: helveticaBoldFont,
            color: rgb(0, 0, 0), // Solid black checkmark
          });
        }
      } else {
        // Draw text
        const textString = String(val);
        let fontSize = 8.5; // Standard fit size
        
        // Auto-scale font size if text is too wide for field box
        const maxBoxWidth = fieldCoords.width || 100;
        const textWidth = helveticaFont.widthOfTextAtSize(textString, fontSize);
        if (textWidth > maxBoxWidth && maxBoxWidth > 15) {
          fontSize = fontSize * (maxBoxWidth / textWidth);
          if (fontSize < 5.5) fontSize = 5.5; // Don't let it become completely illegible
        }

        // Apply visual distinction for signature fields (blue italic look)
        const isSignatureField = fieldName.toLowerCase().includes('signature');
        const fontToUse = isSignatureField ? courierObliqueFont : helveticaFont;
        const colorToUse = isSignatureField ? rgb(0.05, 0.15, 0.45) : rgb(0.05, 0.05, 0.05); // Blue for signature, charcoal for text

        // Align text vertically centered in the field height
        const textHeight = fontToUse.heightAtSize(fontSize);
        const yOffset = (fieldCoords.height - textHeight) / 2;

        page.drawText(textString, {
          x: fieldCoords.x + 2, // Slight padding from left border
          y: fieldCoords.y + Math.max(yOffset, 2),
          size: fontSize,
          font: fontToUse,
          color: colorToUse,
        });
      }
    }

    // 6. Serialize and return Blob
    console.log("Saving PDF...");
    const completedPdfBytes = await pdfDoc.save();
    
    const blob = new Blob([completedPdfBytes], { type: 'application/pdf' });
    return blob;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}
