import React from 'react';

export default function ProductInformation({ formData, onChange, validationErrors }) {
  const getErrorClass = (field) => validationErrors[field] ? 'is-invalid' : '';

  return (
    <div className="section-grid">
      <div className="section-title">
        <span>Product & Sales Information</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>* Required fields</span>
      </div>

      {/* Row 1: Product Description */}
      <div className="form-group">
        <label className="form-label" htmlFor="ProductDescription">
          Detailed Description of Products or Services Sold <span className="required">*</span>
        </label>
        <textarea
          id="ProductDescription"
          name="ProductDescription"
          rows="3"
          className={`form-input ${getErrorClass('ProductDescription')}`}
          value={formData.ProductDescription || ''}
          onChange={onChange}
          placeholder="Describe what items or services your business provides. Be specific (e.g. online retail of custom cotton t-shirts)..."
        />
        {validationErrors.ProductDescription && (
          <div className="invalid-feedback">{validationErrors.ProductDescription}</div>
        )}
      </div>

      {/* Row 2: Refund Policy */}
      <div className="form-group">
        <label className="form-label" htmlFor="RefundPolicyDescription">
          Refund and Return Policy Description <span className="required">*</span>
        </label>
        <input
          id="RefundPolicyDescription"
          type="text"
          name="RefundPolicyDescription"
          className={`form-input ${getErrorClass('RefundPolicyDescription')}`}
          value={formData.RefundPolicyDescription || ''}
          onChange={onChange}
          placeholder="e.g. 30 days refund, all sales final, exchange only"
        />
        {validationErrors.RefundPolicyDescription && (
          <div className="invalid-feedback">{validationErrors.RefundPolicyDescription}</div>
        )}
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* Row 3: Warranty details */}
      <div className="section-grid grid-2">
        <label className="checkbox-card" style={{ height: 'fit-content' }}>
          <input
            type="checkbox"
            name="Warranty?"
            checked={!!formData['Warranty?']}
            onChange={onChange}
          />
          <span className="checkbox-label">Does this product/service offer a warranty?</span>
        </label>

        {formData['Warranty?'] && (
          <div className="form-group">
            <label className="form-label" htmlFor="WarrantyDuration">
              Warranty Duration / Terms <span className="required">*</span>
            </label>
            <input
              id="WarrantyDuration"
              type="text"
              name="WarrantyDuration"
              className={`form-input ${getErrorClass('WarrantyDuration')}`}
              value={formData.WarrantyDuration || ''}
              onChange={onChange}
              placeholder="e.g. 1 Year manufacturer warranty"
            />
            {validationErrors.WarrantyDuration && (
              <div className="invalid-feedback">{validationErrors.WarrantyDuration}</div>
            )}
          </div>
        )}
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* Row 4: Fulfillment and Delivery checkmarks */}
      <div className="section-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', border: 'none' }}>
        Fulfillment & Delivery Characteristics
      </div>

      <div className="section-grid grid-3">
        <label className="checkbox-card">
          <input
            type="checkbox"
            name="DelayedDelivery"
            checked={!!formData.DelayedDelivery}
            onChange={onChange}
          />
          <span className="checkbox-label">Delayed Delivery (e.g. pre-orders)</span>
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            name="FulfillmentHouse?"
            checked={!!formData['FulfillmentHouse?']}
            onChange={onChange}
          />
          <span className="checkbox-label">Uses a Fulfillment House</span>
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            name="Affiliatemarketing?"
            checked={!!formData['Affiliatemarketing?']}
            onChange={onChange}
          />
          <span className="checkbox-label">Uses Affiliate Marketing</span>
        </label>
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* Row 5: Restricted Categories */}
      <div className="section-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', border: 'none' }}>
        Special & High-Risk Merchant Categories
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        Check all items that apply to your business activities.
      </p>

      <div className="section-grid grid-3">
        <label className="checkbox-card">
          <input
            type="checkbox"
            name="Tobacco/Vape"
            checked={!!formData['Tobacco/Vape']}
            onChange={onChange}
          />
          <span className="checkbox-label">Tobacco / E-Cig / Vape</span>
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            name="CBD Products"
            checked={!!formData['CBD Products']}
            onChange={onChange}
          />
          <span className="checkbox-label">CBD Products</span>
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            name="RecurringBilling"
            checked={!!formData.RecurringBilling}
            onChange={onChange}
          />
          <span className="checkbox-label">Recurring Subscription Billing</span>
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            name="DebtRepayment"
            checked={!!formData.DebtRepayment}
            onChange={onChange}
          />
          <span className="checkbox-label">Debt Repayment / Collection</span>
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            name="Events"
            checked={!!formData.Events}
            onChange={onChange}
          />
          <span className="checkbox-label">Ticketed Events / Seminars</span>
        </label>
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* Row 6: Operations verification */}
      <div className="section-grid grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="AgentID">
            Agent ID (Referral Partner) <span className="required">*</span>
          </label>
          <input
            id="AgentID"
            type="text"
            name="AgentID"
            className={`form-input ${getErrorClass('AgentID')}`}
            value={formData.AgentID || ''}
            onChange={onChange}
            placeholder="e.g. AGENT-8849"
          />
          {validationErrors.AgentID && (
            <div className="invalid-feedback">{validationErrors.AgentID}</div>
          )}
        </div>

        <div className="form-group" style={{ justifyContent: 'center' }}>
          <label className="checkbox-card" style={{ marginTop: '1.4rem' }}>
            <input
              type="checkbox"
              name="SiteInspection"
              checked={!!formData.SiteInspection}
              onChange={onChange}
            />
            <span className="checkbox-label">Physical site inspection completed?</span>
          </label>
        </div>
      </div>
    </div>
  );
}
