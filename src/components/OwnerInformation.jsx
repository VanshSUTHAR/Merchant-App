import React from 'react';

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function OwnerInformation({ formData, onChange, validationErrors }) {
  const getErrorClass = (field) => validationErrors[field] ? 'is-invalid' : '';
  const isDisabled = !!formData.NoOwner;

  return (
    <div className="section-grid">
      <div className="section-title">
        <span>Owner Information</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>* Required fields</span>
      </div>

      <div className="section-grid grid-2">
        <label className="checkbox-card" style={{ borderColor: formData.NoOwner ? 'var(--primary)' : 'var(--border-subtle)' }}>
          <input
            type="checkbox"
            name="NoOwner"
            checked={!!formData.NoOwner}
            onChange={onChange}
          />
          <span className="checkbox-label">This business has no beneficial owners to report (e.g. non-profit, publicly traded)</span>
        </label>

        <label className="checkbox-card" style={{ borderColor: formData['25Owner?'] ? 'var(--primary)' : 'var(--border-subtle)' }}>
          <input
            type="checkbox"
            name="25Owner?"
            checked={!!formData['25Owner?']}
            onChange={onChange}
            disabled={isDisabled}
          />
          <span className="checkbox-label">Does any owner own 25% or more of the company?</span>
        </label>
      </div>

      {!isDisabled && (
        <>
          {/* Owner 1 Section */}
          <div style={{ marginTop: '1.5rem', padding: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: '12px', background: 'hsla(0,0%,100%,0.01)' }}>
            <div className="section-title" style={{ fontSize: '1.25rem', border: 'none', marginBottom: '1rem', color: 'var(--primary)' }}>
              Primary Owner (Owner 1)
            </div>
            
            <div className="section-grid">
              {/* Row 1: Name */}
              <div className="section-grid grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="Owner1FirstName">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    id="Owner1FirstName"
                    type="text"
                    name="Owner1FirstName"
                    className={`form-input ${getErrorClass('Owner1FirstName')}`}
                    value={formData.Owner1FirstName || ''}
                    onChange={onChange}
                    placeholder="Owner's first name"
                  />
                  {validationErrors.Owner1FirstName && (
                    <div className="invalid-feedback">{validationErrors.Owner1FirstName}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="Owner1LastName">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    id="Owner1LastName"
                    type="text"
                    name="Owner1LastName"
                    className={`form-input ${getErrorClass('Owner1LastName')}`}
                    value={formData.Owner1LastName || ''}
                    onChange={onChange}
                    placeholder="Owner's last name"
                  />
                  {validationErrors.Owner1LastName && (
                    <div className="invalid-feedback">{validationErrors.Owner1LastName}</div>
                  )}
                </div>
              </div>

              {/* Row 2: DOB, SSN, Percent */}
              <div className="section-grid grid-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="DateofBirth">
                    Date of Birth <span className="required">*</span>
                  </label>
                  <input
                    id="DateofBirth"
                    type="text"
                    name="DateofBirth"
                    className={`form-input ${getErrorClass('DateofBirth')}`}
                    value={formData.DateofBirth || ''}
                    onChange={onChange}
                    placeholder="MM/DD/YYYY"
                  />
                  {validationErrors.DateofBirth && (
                    <div className="invalid-feedback">{validationErrors.DateofBirth}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="SocialSecurity">
                    SSN <span className="required">*</span>
                  </label>
                  <input
                    id="SocialSecurity"
                    type="password"
                    name="SocialSecurity"
                    className={`form-input ${getErrorClass('SocialSecurity')}`}
                    value={formData.SocialSecurity || ''}
                    onChange={onChange}
                    placeholder="XXX-XX-XXXX"
                  />
                  {validationErrors.SocialSecurity && (
                    <div className="invalid-feedback">{validationErrors.SocialSecurity}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="Owner1Percent">
                    Ownership % <span className="required">*</span>
                  </label>
                  <input
                    id="Owner1Percent"
                    type="number"
                    name="Owner1Percent"
                    min="0"
                    max="100"
                    className={`form-input ${getErrorClass('Owner1Percent')}`}
                    value={formData.Owner1Percent || ''}
                    onChange={onChange}
                    placeholder="e.g. 50"
                  />
                  {validationErrors.Owner1Percent && (
                    <div className="invalid-feedback">{validationErrors.Owner1Percent}</div>
                  )}
                </div>
              </div>

              {/* Row 3: Address */}
              <div className="form-group">
                <label className="form-label" htmlFor="Owner1HomeStreetAddress">
                  Home Street Address <span className="required">*</span>
                </label>
                <input
                  id="Owner1HomeStreetAddress"
                  type="text"
                  name="Owner1HomeStreetAddress"
                  className={`form-input ${getErrorClass('Owner1HomeStreetAddress')}`}
                  value={formData.Owner1HomeStreetAddress || ''}
                  onChange={onChange}
                  placeholder="Street Address, Apt/Suite"
                />
                {validationErrors.Owner1HomeStreetAddress && (
                  <div className="invalid-feedback">{validationErrors.Owner1HomeStreetAddress}</div>
                )}
              </div>

              <div className="section-grid grid-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="Owner1HomeCity">
                    City <span className="required">*</span>
                  </label>
                  <input
                    id="Owner1HomeCity"
                    type="text"
                    name="Owner1HomeCity"
                    className={`form-input ${getErrorClass('Owner1HomeCity')}`}
                    value={formData.Owner1HomeCity || ''}
                    onChange={onChange}
                    placeholder="City"
                  />
                  {validationErrors.Owner1HomeCity && (
                    <div className="invalid-feedback">{validationErrors.Owner1HomeCity}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="Owner1HomeState">
                    State <span className="required">*</span>
                  </label>
                  <select
                    id="Owner1HomeState"
                    name="Owner1HomeState"
                    className={`form-select ${getErrorClass('Owner1HomeState')}`}
                    value={formData.Owner1HomeState || ''}
                    onChange={onChange}
                  >
                    <option value="">Select State</option>
                    {STATES.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                  {validationErrors.Owner1HomeState && (
                    <div className="invalid-feedback">{validationErrors.Owner1HomeState}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="Owner1HomeZIP">
                    ZIP Code <span className="required">*</span>
                  </label>
                  <input
                    id="Owner1HomeZIP"
                    type="text"
                    name="Owner1HomeZIP"
                    className={`form-input ${getErrorClass('Owner1HomeZIP')}`}
                    value={formData.Owner1HomeZIP || ''}
                    onChange={onChange}
                    placeholder="ZIP"
                  />
                  {validationErrors.Owner1HomeZIP && (
                    <div className="invalid-feedback">{validationErrors.Owner1HomeZIP}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Owner 2 Section */}
          <div style={{ marginTop: '1.5rem', padding: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: '12px', background: 'hsla(0,0%,100%,0.01)' }}>
            <div className="section-title" style={{ fontSize: '1.25rem', border: 'none', marginBottom: '1rem', color: 'var(--primary)' }}>
              Secondary Owner (Owner 2 - Optional)
            </div>
            
            <div className="section-grid">
              {/* Row 1: Name */}
              <div className="section-grid grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="Owner2FirstName">
                    First Name
                  </label>
                  <input
                    id="Owner2FirstName"
                    type="text"
                    name="Owner2FirstName"
                    className={`form-input ${getErrorClass('Owner2FirstName')}`}
                    value={formData.Owner2FirstName || ''}
                    onChange={onChange}
                    placeholder="Owner's first name"
                  />
                  {validationErrors.Owner2FirstName && (
                    <div className="invalid-feedback">{validationErrors.Owner2FirstName}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="Owner2LastName">
                    Last Name
                  </label>
                  <input
                    id="Owner2LastName"
                    type="text"
                    name="Owner2LastName"
                    className={`form-input ${getErrorClass('Owner2LastName')}`}
                    value={formData.Owner2LastName || ''}
                    onChange={onChange}
                    placeholder="Owner's last name"
                  />
                  {validationErrors.Owner2LastName && (
                    <div className="invalid-feedback">{validationErrors.Owner2LastName}</div>
                  )}
                </div>
              </div>

              {/* Row 2: DOB, SSN, Percent */}
              <div className="section-grid grid-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="DateofBirth2">
                    Date of Birth
                  </label>
                  <input
                    id="DateofBirth2"
                    type="text"
                    name="DateofBirth2"
                    className={`form-input ${getErrorClass('DateofBirth2')}`}
                    value={formData.DateofBirth2 || ''}
                    onChange={onChange}
                    placeholder="MM/DD/YYYY"
                  />
                  {validationErrors.DateofBirth2 && (
                    <div className="invalid-feedback">{validationErrors.DateofBirth2}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="SocialSecurity2">
                    SSN
                  </label>
                  <input
                    id="SocialSecurity2"
                    type="password"
                    name="SocialSecurity2"
                    className={`form-input ${getErrorClass('SocialSecurity2')}`}
                    value={formData.SocialSecurity2 || ''}
                    onChange={onChange}
                    placeholder="XXX-XX-XXXX"
                  />
                  {validationErrors.SocialSecurity2 && (
                    <div className="invalid-feedback">{validationErrors.SocialSecurity2}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="Owner2Percent">
                    Ownership %
                  </label>
                  <input
                    id="Owner2Percent"
                    type="number"
                    name="Owner2Percent"
                    min="0"
                    max="100"
                    className={`form-input ${getErrorClass('Owner2Percent')}`}
                    value={formData.Owner2Percent || ''}
                    onChange={onChange}
                    placeholder="e.g. 25"
                  />
                  {validationErrors.Owner2Percent && (
                    <div className="invalid-feedback">{validationErrors.Owner2Percent}</div>
                  )}
                </div>
              </div>

              {/* Row 3: Address */}
              <div className="form-group">
                <label className="form-label" htmlFor="Owner2HomeStreetAddress">
                  Home Street Address
                </label>
                <input
                  id="Owner2HomeStreetAddress"
                  type="text"
                  name="Owner2HomeStreetAddress"
                  className={`form-input ${getErrorClass('Owner2HomeStreetAddress')}`}
                  value={formData.Owner2HomeStreetAddress || ''}
                  onChange={onChange}
                  placeholder="Street Address, Apt/Suite"
                />
                {validationErrors.Owner2HomeStreetAddress && (
                  <div className="invalid-feedback">{validationErrors.Owner2HomeStreetAddress}</div>
                )}
              </div>

              <div className="section-grid grid-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="Owner2HomeCity">
                    City
                  </label>
                  <input
                    id="Owner2HomeCity"
                    type="text"
                    name="Owner2HomeCity"
                    className={`form-input ${getErrorClass('Owner2HomeCity')}`}
                    value={formData.Owner2HomeCity || ''}
                    onChange={onChange}
                    placeholder="City"
                  />
                  {validationErrors.Owner2HomeCity && (
                    <div className="invalid-feedback">{validationErrors.Owner2HomeCity}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="Owner2HomeState">
                    State
                  </label>
                  <select
                    id="Owner2HomeState"
                    name="Owner2HomeState"
                    className={`form-select ${getErrorClass('Owner2HomeState')}`}
                    value={formData.Owner2HomeState || ''}
                    onChange={onChange}
                  >
                    <option value="">Select State</option>
                    {STATES.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                  {validationErrors.Owner2HomeState && (
                    <div className="invalid-feedback">{validationErrors.Owner2HomeState}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="Owner2HomeZIP">
                    ZIP Code
                  </label>
                  <input
                    id="Owner2HomeZIP"
                    type="text"
                    name="Owner2HomeZIP"
                    className={`form-input ${getErrorClass('Owner2HomeZIP')}`}
                    value={formData.Owner2HomeZIP || ''}
                    onChange={onChange}
                    placeholder="ZIP"
                  />
                  {validationErrors.Owner2HomeZIP && (
                    <div className="invalid-feedback">{validationErrors.Owner2HomeZIP}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
