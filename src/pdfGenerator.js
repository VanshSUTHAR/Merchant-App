import { PDFDocument } from "pdf-lib";

export async function generatePDF() {
  try {
    console.log("Starting...");

    const response = await fetch(
      "/MerchantApplication.pdf"
    );

    console.log("Response:", response);

    const pdfBytes =
      await response.arrayBuffer();

    console.log(
      "PDF Size:",
      pdfBytes.byteLength
    );

    const pdfDoc =
      await PDFDocument.load(
        pdfBytes,
        {
          ignoreEncryption: true,
        }
      );

    console.log(
      "PDF Loaded Successfully"
    );

    const pages =
      pdfDoc.getPages();

    console.log(
      "Total Pages:",
      pages.length
    );

  } catch (err) {
    console.error(
      "PDF ERROR:",
      err
    );
  }
}