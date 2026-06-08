import React from 'react';

export default function ProcessingInformation({ formData, onChange, validationErrors }) {
  const getErrorClass = (field) => validationErrors[field] ? 'is-invalid' : '';

  // Calculate percentage totals dynamically for user feedback
  const getSalesTotal = () => {
    const r = parseFloat(formData.SalesProfileRetailPercentage) || 0;
    const i = parseFloat(formData.SalesProfileInternetPercentage) || 0;
    const m = parseFloat(formData.SalesProfileMOTOPercentage) || 0;
    const o = parseFloat(formData.SalesProfileOtherPercentage) || 0;
    const s = parseFloat(formData.SalesProfileStoredPercentage) || 0;
    return Math.round((r + i + m + o + s) * 100) / 100;
  };

  const getCustomerTotal = () => {
    const c = parseFloat(formData.CustomerProfileIndividualConsumers) || 0;
    const b = parseFloat(formData.CustomerProfileBusinesses) || 0;
    const g = parseFloat(formData.CustomerProfileGovernment) || 0;
    return Math.round((c + b + g) * 100) / 100;
  };

  const salesTotal = getSalesTotal();
  const customerTotal = getCustomerTotal();

  return (
    <div className="section-grid">
      <div className="section-title">
        <span>Processing Information</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>* Required fields</span>
      </div>

      {/* Row 1: Volumes */}
      <div className="section-grid grid-3">
        <div className="form-group">
          <label className="form-label" htmlFor="VisaMCMonthlyVolume">
            Visa/MC Monthly Volume ($) <span className="required">*</span>
          </label>
          <input
            id="VisaMCMonthlyVolume"
            type="number"
            name="VisaMCMonthlyVolume"
            min="0"
            className={`form-input ${getErrorClass('VisaMCMonthlyVolume')}`}
            value={formData.VisaMCMonthlyVolume || ''}
            onChange={onChange}
            placeholder="e.g. 50000"
          />
          {validationErrors.VisaMCMonthlyVolume && (
            <div className="invalid-feedback">{validationErrors.VisaMCMonthlyVolume}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="HighestTransactionAmount">
            Highest Transaction ($) <span className="required">*</span>
          </label>
          <input
            id="HighestTransactionAmount"
            type="number"
            name="HighestTransactionAmount"
            min="0"
            className={`form-input ${getErrorClass('HighestTransactionAmount')}`}
            value={formData.HighestTransactionAmount || ''}
            onChange={onChange}
            placeholder="e.g. 2000"
          />
          {validationErrors.HighestTransactionAmount && (
            <div className="invalid-feedback">{validationErrors.HighestTransactionAmount}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="AverageTransactionAmount">
            Avg. Transaction ($) <span className="required">*</span>
          </label>
          <input
            id="AverageTransactionAmount"
            type="number"
            name="AverageTransactionAmount"
            min="0"
            className={`form-input ${getErrorClass('AverageTransactionAmount')}`}
            value={formData.AverageTransactionAmount || ''}
            onChange={onChange}
            placeholder="e.g. 85"
          />
          {validationErrors.AverageTransactionAmount && (
            <div className="invalid-feedback">{validationErrors.AverageTransactionAmount}</div>
          )}
        </div>
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* Row 2: Sales Channels (Must sum to 100%) */}
      <div>
        <div className="section-title" style={{ fontSize: '1.2rem', marginBottom: '0.5rem', border: 'none' }}>
          <span>Sales Profile Channels (Must sum to 100%)</span>
          <span className={`percentage-badge ${salesTotal !== 100 ? 'error' : ''}`}>
            Total: {salesTotal}%
          </span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Enter the percentage of sales completed through each channel.
        </p>

        <div className="section-grid grid-5">
          <div className="form-group">
            <label className="form-label" htmlFor="SalesProfileRetailPercentage">Retail %</label>
            <input
              id="SalesProfileRetailPercentage"
              type="number"
              name="SalesProfileRetailPercentage"
              min="0"
              max="100"
              className={`form-input ${getErrorClass('SalesProfileRetailPercentage')}`}
              value={formData.SalesProfileRetailPercentage || ''}
              onChange={onChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="SalesProfileInternetPercentage">Internet %</label>
            <input
              id="SalesProfileInternetPercentage"
              type="number"
              name="SalesProfileInternetPercentage"
              min="0"
              max="100"
              className={`form-input ${getErrorClass('SalesProfileInternetPercentage')}`}
              value={formData.SalesProfileInternetPercentage || ''}
              onChange={onChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="SalesProfileMOTOPercentage">MOTO %</label>
            <input
              id="SalesProfileMOTOPercentage"
              type="number"
              name="SalesProfileMOTOPercentage"
              min="0"
              max="100"
              className={`form-input ${getErrorClass('SalesProfileMOTOPercentage')}`}
              value={formData.SalesProfileMOTOPercentage || ''}
              onChange={onChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="SalesProfileOtherPercentage">Other %</label>
            <input
              id="SalesProfileOtherPercentage"
              type="number"
              name="SalesProfileOtherPercentage"
              min="0"
              max="100"
              className={`form-input ${getErrorClass('SalesProfileOtherPercentage')}`}
              value={formData.SalesProfileOtherPercentage || ''}
              onChange={onChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="SalesProfileStoredPercentage">Stored %</label>
            <input
              id="SalesProfileStoredPercentage"
              type="number"
              name="SalesProfileStoredPercentage"
              min="0"
              max="100"
              className={`form-input ${getErrorClass('SalesProfileStoredPercentage')}`}
              value={formData.SalesProfileStoredPercentage || ''}
              onChange={onChange}
              placeholder="0"
            />
          </div>
        </div>
        {(validationErrors.SalesProfileTotal || validationErrors.SalesProfileRetailPercentage) && (
          <div className="invalid-feedback" style={{ marginTop: '0.5rem' }}>
            {validationErrors.SalesProfileTotal || validationErrors.SalesProfileRetailPercentage}
          </div>
        )}
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* Row 3: Customer Profiles (Must sum to 100%) */}
      <div>
        <div className="section-title" style={{ fontSize: '1.2rem', marginBottom: '0.5rem', border: 'none' }}>
          <span>Customer Profile Breakdown (Must sum to 100%)</span>
          <span className={`percentage-badge ${customerTotal !== 100 ? 'error' : ''}`}>
            Total: {customerTotal}%
          </span>
        </div>
        
        <div className="section-grid grid-3">
          <div className="form-group">
            <label className="form-label" htmlFor="CustomerProfileIndividualConsumers">Individual Consumers %</label>
            <input
              id="CustomerProfileIndividualConsumers"
              type="number"
              name="CustomerProfileIndividualConsumers"
              min="0"
              max="100"
              className={`form-input ${getErrorClass('CustomerProfileIndividualConsumers')}`}
              value={formData.CustomerProfileIndividualConsumers || ''}
              onChange={onChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="CustomerProfileBusinesses">Businesses %</label>
            <input
              id="CustomerProfileBusinesses"
              type="number"
              name="CustomerProfileBusinesses"
              min="0"
              max="100"
              className={`form-input ${getErrorClass('CustomerProfileBusinesses')}`}
              value={formData.CustomerProfileBusinesses || ''}
              onChange={onChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="CustomerProfileGovernment">Government %</label>
            <input
              id="CustomerProfileGovernment"
              type="number"
              name="CustomerProfileGovernment"
              min="0"
              max="100"
              className={`form-input ${getErrorClass('CustomerProfileGovernment')}`}
              value={formData.CustomerProfileGovernment || ''}
              onChange={onChange}
              placeholder="0"
            />
          </div>
        </div>
        {(validationErrors.CustomerProfileTotal || validationErrors.CustomerProfileIndividualConsumers) && (
          <div className="invalid-feedback" style={{ marginTop: '0.5rem' }}>
            {validationErrors.CustomerProfileTotal || validationErrors.CustomerProfileIndividualConsumers}
          </div>
        )}
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* Row 4: Accepted Cards & Rules */}
      <div>
        <div className="section-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', border: 'none' }}>
          Card Acceptance Rules
        </div>

        <div className="section-grid grid-2">
          <label className="checkbox-card">
            <input
              type="checkbox"
              name="AcceptVisa?"
              checked={!!formData['AcceptVisa?']}
              onChange={onChange}
            />
            <span className="checkbox-label">Accept Visa / MasterCard / Amex</span>
          </label>

          <label className="checkbox-card">
            <input
              type="checkbox"
              name="AcceptPINDebit?"
              checked={!!formData['AcceptPINDebit?']}
              onChange={onChange}
            />
            <span className="checkbox-label">Accept PIN Debit Cards</span>
          </label>

          <label className="checkbox-card">
            <input
              type="checkbox"
              name="AcceptedPreviously?"
              checked={!!formData['AcceptedPreviously?']}
              onChange={onChange}
            />
            <span className="checkbox-label">Has this business accepted cards before?</span>
          </label>

          <label className="checkbox-card">
            <input
              type="checkbox"
              name="LimitCards"
              checked={!!formData.LimitCards}
              onChange={onChange}
            />
            <span className="checkbox-label">Apply limit rules to purchasing cards</span>
          </label>
        </div>
      </div>

      {/* EBT Acceptance Row */}
      <div className="section-grid grid-2" style={{ marginTop: '0.5rem' }}>
        <label className="checkbox-card">
          <input
            type="checkbox"
            name="AcceptEBT?"
            checked={!!formData['AcceptEBT?']}
            onChange={onChange}
          />
          <span className="checkbox-label">Accept Electronic Benefits Transfer (EBT)</span>
        </label>

        {formData['AcceptEBT?'] && (
          <div className="form-group">
            <label className="form-label" htmlFor="EBTFSNNumber">
              EBT FSN Number <span className="required">*</span>
            </label>
            <input
              id="EBTFSNNumber"
              type="text"
              name="EBTFSNNumber"
              className={`form-input ${getErrorClass('EBTFSNNumber')}`}
              value={formData.EBTFSNNumber || ''}
              onChange={onChange}
              placeholder="e.g. 1234567"
            />
            {validationErrors.EBTFSNNumber && (
              <div className="invalid-feedback">{validationErrors.EBTFSNNumber}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
