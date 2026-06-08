import React from 'react';

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function MerchantInformation({ formData, onChange, validationErrors, copyAddress }) {
  const getErrorClass = (field) => validationErrors[field] ? 'is-invalid' : '';

  return (
    <div className="section-grid">
      <div className="section-title">
        <span>Merchant Information</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>* Required fields</span>
      </div>

      {/* Row 1: Legal Name & DBA */}
      <div className="section-grid grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="LegalBusinessName">
            Legal Business Name <span className="required">*</span>
          </label>
          <input
            id="LegalBusinessName"
            type="text"
            name="LegalBusinessName"
            className={`form-input ${getErrorClass('LegalBusinessName')}`}
            value={formData.LegalBusinessName || ''}
            onChange={onChange}
            placeholder="e.g. Acme Corporation LLC"
          />
          {validationErrors.LegalBusinessName && (
            <div className="invalid-feedback">{validationErrors.LegalBusinessName}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="DBA">
            DBA (Doing Business As) <span className="required">*</span>
          </label>
          <input
            id="DBA"
            type="text"
            name="DBA"
            className={`form-input ${getErrorClass('DBA')}`}
            value={formData.DBA || ''}
            onChange={onChange}
            placeholder="e.g. Acme Retail Solutions"
          />
          {validationErrors.DBA && (
            <div className="invalid-feedback">{validationErrors.DBA}</div>
          )}
        </div>
      </div>

      {/* Row 2: Tax ID, Time in Business, Ownership */}
      <div className="section-grid grid-3">
        <div className="form-group">
          <label className="form-label" htmlFor="BusinessTaxID">
            Business Tax ID (EIN / SSN) <span className="required">*</span>
          </label>
          <input
            id="BusinessTaxID"
            type="text"
            name="BusinessTaxID"
            className={`form-input ${getErrorClass('BusinessTaxID')}`}
            value={formData.BusinessTaxID || ''}
            onChange={onChange}
            placeholder="e.g. 12-3456789"
          />
          {validationErrors.BusinessTaxID && (
            <div className="invalid-feedback">{validationErrors.BusinessTaxID}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="TimeInBusiness">
            Time in Business <span className="required">*</span>
          </label>
          <input
            id="TimeInBusiness"
            type="text"
            name="TimeInBusiness"
            className={`form-input ${getErrorClass('TimeInBusiness')}`}
            value={formData.TimeInBusiness || ''}
            onChange={onChange}
            placeholder="e.g. 3 Years, 2 Months"
          />
          {validationErrors.TimeInBusiness && (
            <div className="invalid-feedback">{validationErrors.TimeInBusiness}</div>
          )}
        </div>

        <div className="form-group" style={{ justifyContent: 'center' }}>
          <label className="checkbox-card" style={{ marginTop: '1.4rem' }}>
            <input
              type="checkbox"
              name="BusinessTaxIDType"
              checked={!!formData.BusinessTaxIDType}
              onChange={onChange}
            />
            <span className="checkbox-label">Is Corporation/LLC Tax ID (EIN)?</span>
          </label>
        </div>
      </div>

      {/* Row 3: Ownership Details */}
      <div className="section-grid grid-2">
        <div className="form-group">
          <label className="checkbox-card">
            <input
              type="checkbox"
              name="TypeOfOwnership"
              checked={!!formData.TypeOfOwnership}
              onChange={onChange}
            />
            <span className="checkbox-label">Is Sole Proprietorship?</span>
          </label>
        </div>

        <div className="form-group">
          <label className="checkbox-card">
            <input
              type="checkbox"
              name="PrivateOrPublic"
              checked={!!formData.PrivateOrPublic}
              onChange={onChange}
            />
            <span className="checkbox-label">Is Publicly Traded Corporation?</span>
          </label>
        </div>
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* Legal Address Section */}
      <div className="section-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', border: 'none' }}>
        Legal Address
      </div>
      <div className="section-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="LegalStreetAddress">
            Street Address <span className="required">*</span>
          </label>
          <input
            id="LegalStreetAddress"
            type="text"
            name="LegalStreetAddress"
            className={`form-input ${getErrorClass('LegalStreetAddress')}`}
            value={formData.LegalStreetAddress || ''}
            onChange={onChange}
            placeholder="123 Main Street, Suite 100"
          />
          {validationErrors.LegalStreetAddress && (
            <div className="invalid-feedback">{validationErrors.LegalStreetAddress}</div>
          )}
        </div>

        <div className="section-grid grid-3">
          <div className="form-group">
            <label className="form-label" htmlFor="LegalCity">
              City <span className="required">*</span>
            </label>
            <input
              id="LegalCity"
              type="text"
              name="LegalCity"
              className={`form-input ${getErrorClass('LegalCity')}`}
              value={formData.LegalCity || ''}
              onChange={onChange}
              placeholder="e.g. San Francisco"
            />
            {validationErrors.LegalCity && (
              <div className="invalid-feedback">{validationErrors.LegalCity}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="LegalState">
              State <span className="required">*</span>
            </label>
            <select
              id="LegalState"
              name="LegalState"
              className={`form-select ${getErrorClass('LegalState')}`}
              value={formData.LegalState || ''}
              onChange={onChange}
            >
              <option value="">Select State</option>
              {STATES.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
            {validationErrors.LegalState && (
              <div className="invalid-feedback">{validationErrors.LegalState}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="LegalZIP">
              ZIP Code <span className="required">*</span>
            </label>
            <input
              id="LegalZIP"
              type="text"
              name="LegalZIP"
              className={`form-input ${getErrorClass('LegalZIP')}`}
              value={formData.LegalZIP || ''}
              onChange={onChange}
              placeholder="e.g. 94103"
            />
            {validationErrors.LegalZIP && (
              <div className="invalid-feedback">{validationErrors.LegalZIP}</div>
            )}
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* Physical Address Section */}
      <div className="section-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', border: 'none' }}>
        <span>Physical Address</span>
        <label className="checkbox-card" style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none', background: 'var(--primary-glow)' }}>
          <input
            type="checkbox"
            name="PhysicalSame"
            checked={!!formData.PhysicalSame}
            onChange={(e) => {
              onChange(e);
              if (e.target.checked) copyAddress('Legal', 'Physical');
            }}
          />
          <span className="checkbox-label" style={{ fontSize: '0.8rem' }}>Same as Legal Address</span>
        </label>
      </div>

      {!formData.PhysicalSame && (
        <div className="section-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="PhysicalStreetAddress">
              Street Address <span className="required">*</span>
            </label>
            <input
              id="PhysicalStreetAddress"
              type="text"
              name="PhysicalStreetAddress"
              className={`form-input ${getErrorClass('PhysicalStreetAddress')}`}
              value={formData.PhysicalStreetAddress || ''}
              onChange={onChange}
              placeholder="123 Storefront Ave"
            />
            {validationErrors.PhysicalStreetAddress && (
              <div className="invalid-feedback">{validationErrors.PhysicalStreetAddress}</div>
            )}
          </div>

          <div className="section-grid grid-3">
            <div className="form-group">
              <label className="form-label" htmlFor="PhysicalCity">
                City <span className="required">*</span>
              </label>
              <input
                id="PhysicalCity"
                type="text"
                name="PhysicalCity"
                className={`form-input ${getErrorClass('PhysicalCity')}`}
                value={formData.PhysicalCity || ''}
                onChange={onChange}
                placeholder="e.g. San Francisco"
              />
              {validationErrors.PhysicalCity && (
                <div className="invalid-feedback">{validationErrors.PhysicalCity}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="PhysicalState">
                State <span className="required">*</span>
              </label>
              <select
                id="PhysicalState"
                name="PhysicalState"
                className={`form-select ${getErrorClass('PhysicalState')}`}
                value={formData.PhysicalState || ''}
                onChange={onChange}
              >
                <option value="">Select State</option>
                {STATES.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
              {validationErrors.PhysicalState && (
                <div className="invalid-feedback">{validationErrors.PhysicalState}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="PhysicalZIP">
                ZIP Code <span className="required">*</span>
              </label>
              <input
                id="PhysicalZIP"
                type="text"
                name="PhysicalZIP"
                className={`form-input ${getErrorClass('PhysicalZIP')}`}
                value={formData.PhysicalZIP || ''}
                onChange={onChange}
                placeholder="e.g. 94103"
              />
              {validationErrors.PhysicalZIP && (
                <div className="invalid-feedback">{validationErrors.PhysicalZIP}</div>
              )}
            </div>
          </div>
        </div>
      )}

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* Mailing/Billing Address Section */}
      <div className="section-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', border: 'none' }}>
        <span>Billing Address</span>
        <label className="checkbox-card" style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none', background: 'var(--primary-glow)' }}>
          <input
            type="checkbox"
            name="MailingSameAsLegal"
            checked={!!formData.MailingSameAsLegal}
            onChange={(e) => {
              onChange(e);
              if (e.target.checked) copyAddress('Legal', 'Billing');
            }}
          />
          <span className="checkbox-label" style={{ fontSize: '0.8rem' }}>Same as Legal Address</span>
        </label>
      </div>

      {!formData.MailingSameAsLegal && (
        <div className="section-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="BillingStreetAddress">
              Street Address <span className="required">*</span>
            </label>
            <input
              id="BillingStreetAddress"
              type="text"
              name="BillingStreetAddress"
              className={`form-input ${getErrorClass('BillingStreetAddress')}`}
              value={formData.BillingStreetAddress || ''}
              onChange={onChange}
              placeholder="e.g. PO Box 456"
            />
            {validationErrors.BillingStreetAddress && (
              <div className="invalid-feedback">{validationErrors.BillingStreetAddress}</div>
            )}
          </div>

          <div className="section-grid grid-3">
            <div className="form-group">
              <label className="form-label" htmlFor="BillingCity">
                City <span className="required">*</span>
              </label>
              <input
                id="BillingCity"
                type="text"
                name="BillingCity"
                className={`form-input ${getErrorClass('BillingCity')}`}
                value={formData.BillingCity || ''}
                onChange={onChange}
                placeholder="e.g. San Francisco"
              />
              {validationErrors.BillingCity && (
                <div className="invalid-feedback">{validationErrors.BillingCity}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="BillingState">
                State <span className="required">*</span>
              </label>
              <select
                id="BillingState"
                name="BillingState"
                className={`form-select ${getErrorClass('BillingState')}`}
                value={formData.BillingState || ''}
                onChange={onChange}
              >
                <option value="">Select State</option>
                {STATES.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
              {validationErrors.BillingState && (
                <div className="invalid-feedback">{validationErrors.BillingState}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="BillingZIP">
                ZIP Code <span className="required">*</span>
              </label>
              <input
                id="BillingZIP"
                type="text"
                name="BillingZIP"
                className={`form-input ${getErrorClass('BillingZIP')}`}
                value={formData.BillingZIP || ''}
                onChange={onChange}
                placeholder="e.g. 94103"
              />
              {validationErrors.BillingZIP && (
                <div className="invalid-feedback">{validationErrors.BillingZIP}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
