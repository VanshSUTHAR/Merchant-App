import React, { useState } from 'react';
import MerchantInformation from './components/MerchantInformation';
import ContactInformation from './components/ContactInformation';
import OwnerInformation from './components/OwnerInformation';
import OfficerInformation from './components/OfficerInformation';
import ProcessingInformation from './components/ProcessingInformation';
import ProductInformation from './components/ProductInformation';
import BillingInformation from './components/BillingInformation';
import EquipmentServices from './components/EquipmentServices';
import { generatePDF } from './services/pdfGenerator';

const TABS = [
  { id: 'merchant-info', name: 'Merchant Info', step: 1 },
  { id: 'contact-info', name: 'Contact Info', step: 2 },
  { id: 'owner-info', name: 'Owner Info', step: 3 },
  { id: 'officer-info', name: 'Officer Info', step: 4 },
  { id: 'processing-info', name: 'Processing Info', step: 5 },
  { id: 'product-info', name: 'Product Info', step: 6 },
  { id: 'billing-info', name: 'Billing & Rates', step: 7 },
  { id: 'equipment-services', name: 'Equipment & Sign', step: 8 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('merchant-info');
  const [emailRecipient, setEmailRecipient] = useState('');
  const [formData, setFormData] = useState({
    // Prefill some fields to help the user/developer see defaults
    AgreementTerm: '36 Months',
    AgreementSignatureOwner1Date: new Date().toLocaleDateString('en-US'),
    AgreementSignatureOfficerDate: new Date().toLocaleDateString('en-US'),
    PGSignatureOwner1Date: new Date().toLocaleDateString('en-US'),
    SalesProfileRetailPercentage: '100',
    SalesProfileInternetPercentage: '0',
    SalesProfileMOTOPercentage: '0',
    SalesProfileOtherPercentage: '0',
    SalesProfileStoredPercentage: '0',
    CustomerProfileIndividualConsumers: '100',
    CustomerProfileBusinesses: '0',
    CustomerProfileGovernment: '0',
    BankAccountType: true, // Default checked (Checking)
    PhysicalSame: true,
    MailingSameAsLegal: true,
    SameAsOwner: true
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [alert, setAlert] = useState(null); // { type: 'success' | 'danger', message: '' }

  // Show a temp auto-dismiss toast alert
  const triggerAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 6000);
  };

  // Helper to copy Legal Address details to Physical or Billing
  const copyAddress = (source, target) => {
    setFormData(prev => {
      const updated = { ...prev };
      if (source === 'Legal' && target === 'Physical') {
        updated.PhysicalStreetAddress = prev.LegalStreetAddress || '';
        updated.PhysicalCity = prev.LegalCity || '';
        updated.PhysicalState = prev.LegalState || '';
        updated.PhysicalZIP = prev.LegalZIP || '';
      } else if (source === 'Legal' && target === 'Billing') {
        updated.BillingStreetAddress = prev.LegalStreetAddress || '';
        updated.BillingCity = prev.LegalCity || '';
        updated.BillingState = prev.LegalState || '';
        updated.BillingZIP = prev.LegalZIP || '';
      }
      return updated;
    });
  };

  // Helper to copy Owner 1 details to Officer details
  const copyOwnerToOfficer = () => {
    setFormData(prev => ({
      ...prev,
      OfficerFirstName: prev.Owner1FirstName || '',
      OfficerLastName: prev.Owner1LastName || '',
      DateofBirthOfficer: prev.DateofBirth || '',
      SocialSecurityOfficer: prev.SocialSecurity || '',
      OfficerHomeStreetAddress: prev.Owner1HomeStreetAddress || '',
      OfficerHomeCity: prev.Owner1HomeCity || '',
      OfficerHomeState: prev.Owner1HomeState || '',
      OfficerHomeZIP: prev.Owner1HomeZIP || ''
    }));
  };

  // Handles text change & checkboxes toggle
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));

    // Clear validation error dynamically
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Central Form Validations
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$|^\+?\d{10,12}$|^\d{10}$/;

    // --- Tab 1: Merchant Information ---
    if (!formData.LegalBusinessName) errors.LegalBusinessName = 'Legal Business Name is required';
    if (!formData.DBA) errors.DBA = 'DBA name is required';
    if (!formData.BusinessTaxID) errors.BusinessTaxID = 'Tax ID (EIN/SSN) is required';
    if (!formData.TimeInBusiness) errors.TimeInBusiness = 'Time in business is required';

    if (!formData.LegalStreetAddress) errors.LegalStreetAddress = 'Street address is required';
    if (!formData.LegalCity) errors.LegalCity = 'City is required';
    if (!formData.LegalState) errors.LegalState = 'State is required';
    if (!formData.LegalZIP) errors.LegalZIP = 'ZIP code is required';

    if (!formData.PhysicalSame) {
      if (!formData.PhysicalStreetAddress) errors.PhysicalStreetAddress = 'Physical address is required';
      if (!formData.PhysicalCity) errors.PhysicalCity = 'Physical city is required';
      if (!formData.PhysicalState) errors.PhysicalState = 'Physical state is required';
      if (!formData.PhysicalZIP) errors.PhysicalZIP = 'Physical ZIP is required';
    }

    if (!formData.MailingSameAsLegal) {
      if (!formData.BillingStreetAddress) errors.BillingStreetAddress = 'Billing address is required';
      if (!formData.BillingCity) errors.BillingCity = 'Billing city is required';
      if (!formData.BillingState) errors.BillingState = 'Billing state is required';
      if (!formData.BillingZIP) errors.BillingZIP = 'Billing ZIP is required';
    }

    // --- Tab 2: Contact Information ---
    if (!formData.ContactFirstName) errors.ContactFirstName = 'First name is required';
    if (!formData.ContactLastName) errors.ContactLastName = 'Last name is required';
    
    if (!formData.ContactPhoneNumber) {
      errors.ContactPhoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.ContactPhoneNumber.replace(/[\s()-]/g, ''))) {
      errors.ContactPhoneNumber = 'Invalid phone number format';
    }

    if (!formData.ContactEmailAddress) {
      errors.ContactEmailAddress = 'Email is required';
    } else if (!emailRegex.test(formData.ContactEmailAddress)) {
      errors.ContactEmailAddress = 'Invalid email address';
    }

    if (!formData.WebsiteURL) errors.WebsiteURL = 'Website URL is required';
    
    if (!formData.CustomerServicePhoneNumber) {
      errors.CustomerServicePhoneNumber = 'Customer service phone is required';
    } else if (!phoneRegex.test(formData.CustomerServicePhoneNumber.replace(/[\s()-]/g, ''))) {
      errors.CustomerServicePhoneNumber = 'Invalid phone number format';
    }

    if (!formData.CustomerServiceEmailAddress) {
      errors.CustomerServiceEmailAddress = 'Customer service email is required';
    } else if (!emailRegex.test(formData.CustomerServiceEmailAddress)) {
      errors.CustomerServiceEmailAddress = 'Invalid email address';
    }

    // --- Tab 3: Owner Information ---
    if (!formData.NoOwner) {
      if (!formData.Owner1FirstName) errors.Owner1FirstName = 'Owner first name is required';
      if (!formData.Owner1LastName) errors.Owner1LastName = 'Owner last name is required';
      if (!formData.DateofBirth) errors.DateofBirth = 'Date of birth is required';
      
      if (!formData.SocialSecurity) {
        errors.SocialSecurity = 'SSN is required';
      } else {
        const ssnDigits = formData.SocialSecurity.replace(/\D/g, '');
        if (ssnDigits.length !== 9) errors.SocialSecurity = 'SSN must be 9 digits';
      }

      if (!formData.Owner1Percent) {
        errors.Owner1Percent = 'Ownership percentage is required';
      } else {
        const pct1 = parseFloat(formData.Owner1Percent) || 0;
        const pct2 = parseFloat(formData.Owner2Percent) || 0;
        if (pct1 + pct2 > 100) {
          errors.Owner1Percent = 'Total ownership percentages cannot exceed 100%';
        }
      }

      if (!formData.Owner1HomeStreetAddress) errors.Owner1HomeStreetAddress = 'Home street address is required';
      if (!formData.Owner1HomeCity) errors.Owner1HomeCity = 'Home city is required';
      if (!formData.Owner1HomeState) errors.Owner1HomeState = 'Home state is required';
      if (!formData.Owner1HomeZIP) errors.Owner1HomeZIP = 'Home ZIP code is required';
    }

    // --- Tab 4: Officer Information ---
    if (!formData.SameAsOwner) {
      if (!formData.OfficerFirstName) errors.OfficerFirstName = 'Officer first name is required';
      if (!formData.OfficerLastName) errors.OfficerLastName = 'Officer last name is required';
      if (!formData.DateofBirthOfficer) errors.DateofBirthOfficer = 'Date of birth is required';
      
      if (!formData.SocialSecurityOfficer) {
        errors.SocialSecurityOfficer = 'SSN is required';
      } else {
        const ssnDigits = formData.SocialSecurityOfficer.replace(/\D/g, '');
        if (ssnDigits.length !== 9) errors.SocialSecurityOfficer = 'SSN must be 9 digits';
      }

      if (!formData.OfficerHomeStreetAddress) errors.OfficerHomeStreetAddress = 'Home address is required';
      if (!formData.OfficerHomeCity) errors.OfficerHomeCity = 'City is required';
      if (!formData.OfficerHomeState) errors.OfficerHomeState = 'State is required';
      if (!formData.OfficerHomeZIP) errors.OfficerHomeZIP = 'ZIP code is required';
    }

    // --- Tab 5: Processing Information ---
    if (!formData.VisaMCMonthlyVolume) errors.VisaMCMonthlyVolume = 'Monthly volume is required';
    if (!formData.HighestTransactionAmount) errors.HighestTransactionAmount = 'Highest ticket is required';
    if (!formData.AverageTransactionAmount) errors.AverageTransactionAmount = 'Average ticket is required';

    // Sales channel sum validation
    const salesTotal = (
      (parseFloat(formData.SalesProfileRetailPercentage) || 0) +
      (parseFloat(formData.SalesProfileInternetPercentage) || 0) +
      (parseFloat(formData.SalesProfileMOTOPercentage) || 0) +
      (parseFloat(formData.SalesProfileOtherPercentage) || 0) +
      (parseFloat(formData.SalesProfileStoredPercentage) || 0)
    );
    if (salesTotal !== 100) {
      errors.SalesProfileTotal = `Sales Profile Channels must equal exactly 100% (currently ${salesTotal}%)`;
    }

    // Customer profile sum validation
    const customerTotal = (
      (parseFloat(formData.CustomerProfileIndividualConsumers) || 0) +
      (parseFloat(formData.CustomerProfileBusinesses) || 0) +
      (parseFloat(formData.CustomerProfileGovernment) || 0)
    );
    if (customerTotal !== 100) {
      errors.CustomerProfileTotal = `Customer Profile must equal exactly 100% (currently ${customerTotal}%)`;
    }

    if (formData['AcceptEBT?'] && !formData.EBTFSNNumber) {
      errors.EBTFSNNumber = 'FSN number is required when accepting EBT';
    }

    // --- Tab 6: Product Information ---
    if (!formData.ProductDescription) errors.ProductDescription = 'Product description is required';
    if (!formData.RefundPolicyDescription) errors.RefundPolicyDescription = 'Refund policy is required';
    if (!formData.AgentID) errors.AgentID = 'Agent ID is required';
    if (formData['Warranty?'] && !formData.WarrantyDuration) {
      errors.WarrantyDuration = 'Warranty duration is required';
    }

    // --- Tab 7: Billing Information ---
    if (!formData.NameOnAccount) errors.NameOnAccount = 'Bank account name is required';
    
    if (!formData.BankRoutingNumber) {
      errors.BankRoutingNumber = 'Routing number is required';
    } else {
      const routing = formData.BankRoutingNumber.replace(/\D/g, '');
      if (routing.length !== 9) errors.BankRoutingNumber = 'Routing number must be exactly 9 digits';
    }

    if (!formData.BankAccountNumber) errors.BankAccountNumber = 'Account number is required';

    // --- Tab 8: Equipment & Signatures ---
    if (!formData.AgreementTerm) errors.AgreementTerm = 'Agreement term is required';
    if (!formData.AgreementSignatureOwner1Signature) errors.AgreementSignatureOwner1Signature = 'Owner 1 signature name is required';
    if (!formData.AgreementSignatureOwner1Name) errors.AgreementSignatureOwner1Name = 'Owner 1 printed name is required';
    if (!formData.AgreementSignatureOwner1Date) errors.AgreementSignatureOwner1Date = 'Date is required';

    if (!formData.AgreementSignatureOfficerSignature) errors.AgreementSignatureOfficerSignature = 'Officer signature name is required';
    if (!formData.AgreementSignatureOfficerName) errors.AgreementSignatureOfficerName = 'Officer printed name is required';
    if (!formData.AgreementSignatureOfficerJobTitle) errors.AgreementSignatureOfficerJobTitle = 'Job title is required';
    if (!formData.AgreementSignatureOfficerDate) errors.AgreementSignatureOfficerDate = 'Date is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Prevent default form submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDownload = async () => {
    if (!validateForm()) {
      triggerAlert('danger', 'Please correct the validation errors in the form before generating the PDF.');
      return;
    }

    setIsGenerating(true);
    try {
      const blob = await generatePDF(formData);
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const businessName = (formData.LegalBusinessName || 'Merchant').replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.download = `completed_merchant_application_${businessName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      triggerAlert('success', 'Merchant Application PDF downloaded successfully!');
    } catch (err) {
      triggerAlert('danger', 'Failed to generate PDF. Check the browser console logs for details.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEmail = async () => {
    if (!validateForm()) {
      triggerAlert('danger', 'Please correct the validation errors in the form before generating the PDF.');
      return;
    }

    const targetEmail = emailRecipient || formData.ContactEmailAddress;
    if (!targetEmail) {
      triggerAlert('danger', 'Please provide a customer email address to send the PDF.');
      return;
    }

    setIsGenerating(true);
    try {
      const blob = await generatePDF(formData);
      
      const emailFormData = new FormData();
      emailFormData.append('email', targetEmail);
      emailFormData.append('pdfFile', blob, 'merchant_application.pdf');

      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        body: emailFormData,
      });

      const data = await response.json();
      if (response.ok) {
        if (data.previewUrl) {
          triggerAlert('success', `Email sent! Test Preview URL available in browser console.`);
          console.log('Ethereal Email Preview URL:', data.previewUrl);
        } else {
          triggerAlert('success', 'Merchant Application PDF sent successfully to the customer!');
        }
      } else {
        throw new Error(data.error || 'Failed to send email');
      }
    } catch (err) {
      triggerAlert('danger', `Failed to send email: ${err.message}`);
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper to get which tab a validation error belongs to so we can navigate the user
  const getTabOfField = (field) => {
    const merchantFields = [
      'LegalBusinessName', 'DBA', 'BusinessTaxID', 'TimeInBusiness',
      'LegalStreetAddress', 'LegalCity', 'LegalState', 'LegalZIP',
      'PhysicalStreetAddress', 'PhysicalCity', 'PhysicalState', 'PhysicalZIP',
      'BillingStreetAddress', 'BillingCity', 'BillingState', 'BillingZIP'
    ];
    const contactFields = [
      'ContactFirstName', 'ContactLastName', 'ContactPhoneNumber', 'ContactEmailAddress',
      'WebsiteURL', 'CustomerServicePhoneNumber', 'CustomerServiceEmailAddress'
    ];
    const ownerFields = [
      'Owner1FirstName', 'Owner1LastName', 'DateofBirth', 'SocialSecurity', 'Owner1Percent',
      'Owner1HomeStreetAddress', 'Owner1HomeCity', 'Owner1HomeState', 'Owner1HomeZIP'
    ];
    const officerFields = [
      'OfficerFirstName', 'OfficerLastName', 'DateofBirthOfficer', 'SocialSecurityOfficer',
      'OfficerHomeStreetAddress', 'OfficerHomeCity', 'OfficerHomeState', 'OfficerHomeZIP'
    ];
    const processingFields = [
      'VisaMCMonthlyVolume', 'HighestTransactionAmount', 'AverageTransactionAmount',
      'SalesProfileTotal', 'CustomerProfileTotal', 'EBTFSNNumber'
    ];
    const productFields = [
      'ProductDescription', 'RefundPolicyDescription', 'WarrantyDuration', 'AgentID'
    ];
    const billingFields = [
      'NameOnAccount', 'BankRoutingNumber', 'BankAccountNumber'
    ];

    if (merchantFields.includes(field)) return 'merchant-info';
    if (contactFields.includes(field)) return 'contact-info';
    if (ownerFields.includes(field)) return 'owner-info';
    if (officerFields.includes(field)) return 'officer-info';
    if (processingFields.includes(field)) return 'processing-info';
    if (productFields.includes(field)) return 'product-info';
    if (billingFields.includes(field)) return 'billing-info';
    return 'equipment-services';
  };

  // Calculate overall form progress percentage
  const getFormProgress = () => {
    const fieldsToTrack = [
      formData.LegalBusinessName, formData.DBA, formData.BusinessTaxID,
      formData.LegalStreetAddress, formData.LegalCity, formData.LegalZIP,
      formData.ContactFirstName, formData.ContactLastName, formData.ContactEmailAddress,
      formData.WebsiteURL, formData.VisaMCMonthlyVolume, formData.ProductDescription,
      formData.NameOnAccount, formData.BankRoutingNumber, formData.BankAccountNumber,
      formData.AgreementSignatureOwner1Signature, formData.AgreementSignatureOfficerSignature
    ];
    const filled = fieldsToTrack.filter(f => f !== undefined && f !== null && String(f).trim() !== '').length;
    return Math.round((filled / fieldsToTrack.length) * 100);
  };

  const currentTabIdx = TABS.findIndex(t => t.id === activeTab);
  const progressPercent = getFormProgress();

  return (
    <div className="app-container">
      {/* SUCCESS/ERROR TOASTS */}
      {alert && (
        <div className={`alert-banner alert-${alert.type}`}>
          <div style={{ fontSize: '1.25rem' }}>
            {alert.type === 'success' ? '✓' : '⚠'}
          </div>
          <div>{alert.message}</div>
        </div>
      )}

      {/* GENERATOR LOADING OVERLAY */}
      {isGenerating && (
        <div className="loading-overlay">
          <div className="spinner-outer">
            <div className="spinner"></div>
            <div className="spinner-inner"></div>
          </div>
          <div className="loading-text">Generating Application PDF...</div>
          <div className="loading-subtext">Overlaying form elements onto clean vectors</div>
        </div>
      )}

      {/* HEADER SECTION */}
      <header className="app-header">
        <h1 className="app-title">Merchant Application Form Filler</h1>
        <p className="app-subtitle">
          Complete the web form dashboard below to seamlessly overlay details onto your 10-page merchant processing agreement.
        </p>
      </header>

      {/* PROFESSIONAL STEPPER NAVIGATION */}
      <div className="stepper-wrapper">
        <nav className="nav-stepper">
          {TABS.map((tab, index) => {
            const hasError = Object.keys(validationErrors).some(field => getTabOfField(field) === tab.id);
            const isActive = activeTab === tab.id;
            const isPast = currentTabIdx > index;

            return (
              <div 
                key={tab.id} 
                className={`stepper-item ${isActive ? 'active' : ''} ${isPast ? 'completed' : ''} ${hasError ? 'has-error' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="step-counter">
                  {isPast && !hasError ? '✓' : tab.step}
                </div>
                <div className="step-name">
                  {tab.name}
                  {hasError && <span className="error-dot">●</span>}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* MAIN TWO-COLUMN DASHBOARD */}
      <main className="grid-layout">
        {/* LEFT FORM WORKSPACE PANEL */}
        <section className="panel-card">
          <form onSubmit={handleSubmit} noValidate>
            {activeTab === 'merchant-info' && (
              <MerchantInformation
                formData={formData}
                onChange={handleChange}
                validationErrors={validationErrors}
                copyAddress={copyAddress}
              />
            )}
            {activeTab === 'contact-info' && (
              <ContactInformation
                formData={formData}
                onChange={handleChange}
                validationErrors={validationErrors}
              />
            )}
            {activeTab === 'owner-info' && (
              <OwnerInformation
                formData={formData}
                onChange={handleChange}
                validationErrors={validationErrors}
              />
            )}
            {activeTab === 'officer-info' && (
              <OfficerInformation
                formData={formData}
                onChange={handleChange}
                validationErrors={validationErrors}
                copyOwnerToOfficer={copyOwnerToOfficer}
              />
            )}
            {activeTab === 'processing-info' && (
              <ProcessingInformation
                formData={formData}
                onChange={handleChange}
                validationErrors={validationErrors}
              />
            )}
            {activeTab === 'product-info' && (
              <ProductInformation
                formData={formData}
                onChange={handleChange}
                validationErrors={validationErrors}
              />
            )}
            {activeTab === 'billing-info' && (
              <BillingInformation
                formData={formData}
                onChange={handleChange}
                validationErrors={validationErrors}
              />
            )}
            {activeTab === 'equipment-services' && (
              <EquipmentServices
                formData={formData}
                onChange={handleChange}
                validationErrors={validationErrors}
              />
            )}

            {/* LOWER WIZARD CONTROL BUTTONS */}
            <div className="actions-bar">
              <button
                type="button"
                className="btn btn-secondary"
                disabled={currentTabIdx === 0}
                onClick={() => setActiveTab(TABS[currentTabIdx - 1].id)}
              >
                ← Previous Section
              </button>

              <div className="actions-right">
                <button
                  type="button"
                  onClick={validateForm}
                  className="btn btn-secondary"
                  style={{ borderColor: Object.keys(validationErrors).length > 0 ? 'var(--danger)' : '' }}
                >
                  Verify Form
                </button>

                {currentTabIdx < TABS.length - 1 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setActiveTab(TABS[currentTabIdx + 1].id)}
                  >
                    Next Section →
                  </button>
                ) : (
                  <div className="actions-finish">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleDownload}
                    >
                      Download PDF 🗎
                    </button>
                    <div className="email-send-group">
                      <input 
                        type="email" 
                        placeholder="Customer Email" 
                        className="form-input email-input" 
                        value={emailRecipient} 
                        onChange={(e) => setEmailRecipient(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleEmail}
                      >
                        Send PDF via Email ✉
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </section>

        {/* RIGHT METADATA & VALIDATION SIDEBAR PANEL */}
        <aside className="sidebar-panel">
          {/* Progress Widget */}
          <div className="sidebar-card">
            <h3 className="sidebar-title">
              <span>🗹 Completion Status</span>
            </h3>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="progress-text">
              <span>Required Fields</span>
              <span>{progressPercent}% Complete</span>
            </div>
          </div>

          {/* Validation Alert Widget */}
          <div className="sidebar-card">
            <h3 className="sidebar-title" style={{ color: Object.keys(validationErrors).length > 0 ? 'var(--danger)' : 'var(--success)' }}>
              <span>{Object.keys(validationErrors).length > 0 ? '⚠ Validation Issues' : '✓ Validation Clear'}</span>
            </h3>
            {Object.keys(validationErrors).length > 0 ? (
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Click on an issue below to jump directly to the tab and input field.
                </p>
                <div className="error-summary-list">
                  {Object.entries(validationErrors).map(([field, errText]) => (
                    <div
                      key={field}
                      className="error-summary-item"
                      onClick={() => {
                        const targetTab = getTabOfField(field);
                        setActiveTab(targetTab);
                        setTimeout(() => {
                          const element = document.getElementById(field);
                          if (element) {
                            element.focus();
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }, 100);
                      }}
                    >
                      <span>•</span>
                      <span><strong>{field.replace(/([A-Z])/g, ' $1').trim()}:</strong> {errText}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                All mandatory checks are passing. You are ready to generate your completed vector agreement!
              </p>
            )}
          </div>
          
          {/* Template Info Card */}
          <div className="sidebar-card" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div style={{ fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Template details</div>
            <div>Source: MerchantApplication_cleaned.pdf</div>
            <div>Layout: Vector overlays</div>
            <div>Total pages: 10 pages</div>
            <div>Field mappings: 165 positions</div>
          </div>
        </aside>
      </main>
    </div>
  );
}