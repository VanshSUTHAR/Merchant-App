import React from 'react';

export default function ContactInformation({ formData, onChange, validationErrors }) {
  const getErrorClass = (field) => validationErrors[field] ? 'is-invalid' : '';

  return (
    <div className="section-grid">
      <div className="section-title">
        <span>Contact Information</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>* Required fields</span>
      </div>

      <div className="info-callout">
        <div className="info-callout-title">Primary Authorized Contact</div>
        This person will receive critical setup and operations communications regarding your merchant terminal/gateway.
      </div>

      {/* Row 1: Contact Name */}
      <div className="section-grid grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="ContactFirstName">
            First Name <span className="required">*</span>
          </label>
          <input
            id="ContactFirstName"
            type="text"
            name="ContactFirstName"
            className={`form-input ${getErrorClass('ContactFirstName')}`}
            value={formData.ContactFirstName || ''}
            onChange={onChange}
            placeholder="John"
          />
          {validationErrors.ContactFirstName && (
            <div className="invalid-feedback">{validationErrors.ContactFirstName}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="ContactLastName">
            Last Name <span className="required">*</span>
          </label>
          <input
            id="ContactLastName"
            type="text"
            name="ContactLastName"
            className={`form-input ${getErrorClass('ContactLastName')}`}
            value={formData.ContactLastName || ''}
            onChange={onChange}
            placeholder="Doe"
          />
          {validationErrors.ContactLastName && (
            <div className="invalid-feedback">{validationErrors.ContactLastName}</div>
          )}
        </div>
      </div>

      {/* Row 2: Contact Phone & Email */}
      <div className="section-grid grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="ContactPhoneNumber">
            Phone Number <span className="required">*</span>
          </label>
          <input
            id="ContactPhoneNumber"
            type="tel"
            name="ContactPhoneNumber"
            className={`form-input ${getErrorClass('ContactPhoneNumber')}`}
            value={formData.ContactPhoneNumber || ''}
            onChange={onChange}
            placeholder="e.g. 555-0199"
          />
          {validationErrors.ContactPhoneNumber && (
            <div className="invalid-feedback">{validationErrors.ContactPhoneNumber}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="ContactEmailAddress">
            Email Address <span className="required">*</span>
          </label>
          <input
            id="ContactEmailAddress"
            type="email"
            name="ContactEmailAddress"
            className={`form-input ${getErrorClass('ContactEmailAddress')}`}
            value={formData.ContactEmailAddress || ''}
            onChange={onChange}
            placeholder="john.doe@company.com"
          />
          {validationErrors.ContactEmailAddress && (
            <div className="invalid-feedback">{validationErrors.ContactEmailAddress}</div>
          )}
        </div>
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      <div className="section-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', border: 'none' }}>
        Digital & Customer Service Channels
      </div>

      {/* Row 3: Website URL */}
      <div className="form-group">
        <label className="form-label" htmlFor="WebsiteURL">
          Website URL <span className="required">*</span>
        </label>
        <input
          id="WebsiteURL"
          type="url"
          name="WebsiteURL"
          className={`form-input ${getErrorClass('WebsiteURL')}`}
          value={formData.WebsiteURL || ''}
          onChange={onChange}
          placeholder="https://www.yourbusiness.com"
        />
        {validationErrors.WebsiteURL && (
          <div className="invalid-feedback">{validationErrors.WebsiteURL}</div>
        )}
      </div>

      {/* Row 4: Customer Service Phone & Email */}
      <div className="section-grid grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="CustomerServicePhoneNumber">
            Customer Service Phone <span className="required">*</span>
          </label>
          <input
            id="CustomerServicePhoneNumber"
            type="tel"
            name="CustomerServicePhoneNumber"
            className={`form-input ${getErrorClass('CustomerServicePhoneNumber')}`}
            value={formData.CustomerServicePhoneNumber || ''}
            onChange={onChange}
            placeholder="e.g. 800-555-0199"
          />
          {validationErrors.CustomerServicePhoneNumber && (
            <div className="invalid-feedback">{validationErrors.CustomerServicePhoneNumber}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="CustomerServiceEmailAddress">
            Customer Service Email <span className="required">*</span>
          </label>
          <input
            id="CustomerServiceEmailAddress"
            type="email"
            name="CustomerServiceEmailAddress"
            className={`form-input ${getErrorClass('CustomerServiceEmailAddress')}`}
            value={formData.CustomerServiceEmailAddress || ''}
            onChange={onChange}
            placeholder="support@yourbusiness.com"
          />
          {validationErrors.CustomerServiceEmailAddress && (
            <div className="invalid-feedback">{validationErrors.CustomerServiceEmailAddress}</div>
          )}
        </div>
      </div>
    </div>
  );
}
