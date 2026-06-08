import React from 'react';

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function OfficerInformation({ formData, onChange, validationErrors, copyOwnerToOfficer }) {
  const getErrorClass = (field) => validationErrors[field] ? 'is-invalid' : '';

  return (
    <div className="section-grid">
      <div className="section-title">
        <span>Officer Information</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>* Required fields</span>
      </div>

      <div className="section-grid grid-1">
        <label className="checkbox-card" style={{ padding: '0.9rem 1.1rem', background: 'var(--primary-glow)', border: 'none' }}>
          <input
            type="checkbox"
            name="SameAsOwner"
            checked={!!formData.SameAsOwner}
            onChange={(e) => {
              onChange(e);
              if (e.target.checked) copyOwnerToOfficer();
            }}
          />
          <span className="checkbox-label" style={{ fontWeight: '600' }}>Officer is same person as Owner 1</span>
        </label>
      </div>

      {!formData.SameAsOwner && (
        <div style={{ padding: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: '12px', background: 'hsla(0,0%,100%,0.01)' }}>
          <div className="section-grid">
            {/* Row 1: Name */}
            <div className="section-grid grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="OfficerFirstName">
                  First Name <span className="required">*</span>
                </label>
                <input
                  id="OfficerFirstName"
                  type="text"
                  name="OfficerFirstName"
                  className={`form-input ${getErrorClass('OfficerFirstName')}`}
                  value={formData.OfficerFirstName || ''}
                  onChange={onChange}
                  placeholder="Officer's first name"
                />
                {validationErrors.OfficerFirstName && (
                  <div className="invalid-feedback">{validationErrors.OfficerFirstName}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="OfficerLastName">
                  Last Name <span className="required">*</span>
                </label>
                <input
                  id="OfficerLastName"
                  type="text"
                  name="OfficerLastName"
                  className={`form-input ${getErrorClass('OfficerLastName')}`}
                  value={formData.OfficerLastName || ''}
                  onChange={onChange}
                  placeholder="Officer's last name"
                />
                {validationErrors.OfficerLastName && (
                  <div className="invalid-feedback">{validationErrors.OfficerLastName}</div>
                )}
              </div>
            </div>

            {/* Row 2: DOB, SSN */}
            <div className="section-grid grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="DateofBirthOfficer">
                  Date of Birth <span className="required">*</span>
                </label>
                <input
                  id="DateofBirthOfficer"
                  type="text"
                  name="DateofBirthOfficer"
                  className={`form-input ${getErrorClass('DateofBirthOfficer')}`}
                  value={formData.DateofBirthOfficer || ''}
                  onChange={onChange}
                  placeholder="MM/DD/YYYY"
                />
                {validationErrors.DateofBirthOfficer && (
                  <div className="invalid-feedback">{validationErrors.DateofBirthOfficer}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="SocialSecurityOfficer">
                  SSN <span className="required">*</span>
                </label>
                <input
                  id="SocialSecurityOfficer"
                  type="password"
                  name="SocialSecurityOfficer"
                  className={`form-input ${getErrorClass('SocialSecurityOfficer')}`}
                  value={formData.SocialSecurityOfficer || ''}
                  onChange={onChange}
                  placeholder="XXX-XX-XXXX"
                />
                {validationErrors.SocialSecurityOfficer && (
                  <div className="invalid-feedback">{validationErrors.SocialSecurityOfficer}</div>
                )}
              </div>
            </div>

            {/* Row 3: Address */}
            <div className="form-group">
              <label className="form-label" htmlFor="OfficerHomeStreetAddress">
                Home Street Address <span className="required">*</span>
              </label>
              <input
                id="OfficerHomeStreetAddress"
                type="text"
                name="OfficerHomeStreetAddress"
                className={`form-input ${getErrorClass('OfficerHomeStreetAddress')}`}
                value={formData.OfficerHomeStreetAddress || ''}
                onChange={onChange}
                placeholder="Street Address, Apt/Suite"
              />
              {validationErrors.OfficerHomeStreetAddress && (
                <div className="invalid-feedback">{validationErrors.OfficerHomeStreetAddress}</div>
              )}
            </div>

            <div className="section-grid grid-3">
              <div className="form-group">
                <label className="form-label" htmlFor="OfficerHomeCity">
                  City <span className="required">*</span>
                </label>
                <input
                  id="OfficerHomeCity"
                  type="text"
                  name="OfficerHomeCity"
                  className={`form-input ${getErrorClass('OfficerHomeCity')}`}
                  value={formData.OfficerHomeCity || ''}
                  onChange={onChange}
                  placeholder="City"
                />
                {validationErrors.OfficerHomeCity && (
                  <div className="invalid-feedback">{validationErrors.OfficerHomeCity}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="OfficerHomeState">
                  State <span className="required">*</span>
                </label>
                <select
                  id="OfficerHomeState"
                  name="OfficerHomeState"
                  className={`form-select ${getErrorClass('OfficerHomeState')}`}
                  value={formData.OfficerHomeState || ''}
                  onChange={onChange}
                >
                  <option value="">Select State</option>
                  {STATES.map(st => <option key={st} value={st}>{st}</option>)}
                </select>
                {validationErrors.OfficerHomeState && (
                  <div className="invalid-feedback">{validationErrors.OfficerHomeState}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="OfficerHomeZIP">
                  ZIP Code <span className="required">*</span>
                </label>
                <input
                  id="OfficerHomeZIP"
                  type="text"
                  name="OfficerHomeZIP"
                  className={`form-input ${getErrorClass('OfficerHomeZIP')}`}
                  value={formData.OfficerHomeZIP || ''}
                  onChange={onChange}
                  placeholder="ZIP"
                />
                {validationErrors.OfficerHomeZIP && (
                  <div className="invalid-feedback">{validationErrors.OfficerHomeZIP}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {formData.SameAsOwner && (
        <div className="info-callout" style={{ borderStyle: 'dashed', background: 'transparent' }}>
          <div className="info-callout-title" style={{ color: 'var(--success)' }}>
            ✓ Officer Linked
          </div>
          The Officer Details are dynamically linked to Owner 1's inputs: <strong>{formData.Owner1FirstName} {formData.Owner1LastName}</strong>.
        </div>
      )}
    </div>
  );
}
