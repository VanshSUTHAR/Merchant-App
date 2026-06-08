import React from 'react';

export default function BillingInformation({ formData, onChange, validationErrors }) {
  const getErrorClass = (field) => validationErrors[field] ? 'is-invalid' : '';

  return (
    <div className="section-grid">
      <div className="section-title">
        <span>Billing & Financial Settings</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>* Required fields</span>
      </div>

      {/* ACH BANK ACCOUNT CARD */}
      <div style={{ padding: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: '12px', background: 'hsla(263, 85%, 64%, 0.03)', marginBottom: '1.5rem' }}>
        <div className="section-title" style={{ fontSize: '1.2rem', border: 'none', marginBottom: '1rem', color: 'var(--primary)' }}>
          ACH Settlement Account Details
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          This checking or savings account will be used for daily deposits and processing fee withdrawals.
        </p>

        <div className="section-grid">
          <div className="section-grid grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="NameOnAccount">
                Name on Bank Account <span className="required">*</span>
              </label>
              <input
                id="NameOnAccount"
                type="text"
                name="NameOnAccount"
                className={`form-input ${getErrorClass('NameOnAccount')}`}
                value={formData.NameOnAccount || ''}
                onChange={onChange}
                placeholder="e.g. Acme Corp Operating Account"
              />
              {validationErrors.NameOnAccount && (
                <div className="invalid-feedback">{validationErrors.NameOnAccount}</div>
              )}
            </div>

            <div className="form-group" style={{ justifyContent: 'center' }}>
              <label className="checkbox-card" style={{ marginTop: '1.4rem' }}>
                <input
                  type="checkbox"
                  name="BankAccountType"
                  checked={!!formData.BankAccountType}
                  onChange={onChange}
                />
                <span className="checkbox-label">Is Business Checking Account? (Uncheck for Savings)</span>
              </label>
            </div>
          </div>

          <div className="section-grid grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="BankRoutingNumber">
                Bank Routing Number (9 Digits) <span className="required">*</span>
              </label>
              <input
                id="BankRoutingNumber"
                type="text"
                name="BankRoutingNumber"
                className={`form-input ${getErrorClass('BankRoutingNumber')}`}
                value={formData.BankRoutingNumber || ''}
                onChange={onChange}
                placeholder="e.g. 021000021"
              />
              {validationErrors.BankRoutingNumber && (
                <div className="invalid-feedback">{validationErrors.BankRoutingNumber}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="BankAccountNumber">
                Bank Account Number <span className="required">*</span>
              </label>
              <input
                id="BankAccountNumber"
                type="password"
                name="BankAccountNumber"
                className={`form-input ${getErrorClass('BankAccountNumber')}`}
                value={formData.BankAccountNumber || ''}
                onChange={onChange}
                placeholder="Account Number"
              />
              {validationErrors.BankAccountNumber && (
                <div className="invalid-feedback">{validationErrors.BankAccountNumber}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* PRICING PLANS */}
      <div className="section-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem', border: 'none' }}>
        Credit & Debit Card Pricing Schedule
      </div>

      {/* Tiered Settings Cards */}
      <div className="section-grid grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Tiered Rates Card */}
        <div style={{ padding: '1.25rem', border: '1px solid var(--border-subtle)', borderRadius: '10px', background: 'hsla(0,0%,100%,0.01)' }}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="checkbox-card">
              <input
                type="checkbox"
                name="TierSettingsHighTier"
                checked={!!formData.TierSettingsHighTier}
                onChange={onChange}
              />
              <span className="checkbox-label" style={{ fontWeight: '700' }}>Enable Tiered Pricing Rates</span>
            </label>
          </div>

          <div className="section-grid grid-2">
            <div className="form-group">
              <label className="form-label">Qual. %</label>
              <input type="text" name="TieredQualifiedPercentage" className="form-input" value={formData.TieredQualifiedPercentage || ''} onChange={onChange} placeholder="e.g. 1.85" />
            </div>
            <div className="form-group">
              <label className="form-label">Qual. Item ($)</label>
              <input type="text" name="TieredQualifiedPerItem" className="form-input" value={formData.TieredQualifiedPerItem || ''} onChange={onChange} placeholder="0.10" />
            </div>
            <div className="form-group">
              <label className="form-label">Mid-Qual %</label>
              <input type="text" name="TieredMidQualifiedPercentage" className="form-input" value={formData.TieredMidQualifiedPercentage || ''} onChange={onChange} placeholder="2.50" />
            </div>
            <div className="form-group">
              <label className="form-label">Mid-Qual Item</label>
              <input type="text" name="TieredMidQualifiedPerItem" className="form-input" value={formData.TieredMidQualifiedPerItem || ''} onChange={onChange} placeholder="0.10" />
            </div>
            <div className="form-group">
              <label className="form-label">Non-Qual %</label>
              <input type="text" name="TieredNonQualifiedPercentage" className="form-input" value={formData.TieredNonQualifiedPercentage || ''} onChange={onChange} placeholder="3.50" />
            </div>
            <div className="form-group">
              <label className="form-label">Non-Qual Item</label>
              <input type="text" name="TieredNonQualifiedPerItem" className="form-input" value={formData.TieredNonQualifiedPerItem || ''} onChange={onChange} placeholder="0.15" />
            </div>
          </div>
          <label className="checkbox-card" style={{ marginTop: '1rem', padding: '0.5rem 0.8rem' }}>
            <input type="checkbox" name="TierSettingsSub-Qualified" checked={!!formData['TierSettingsSub-Qualified']} onChange={onChange} />
            <span className="checkbox-label" style={{ fontSize: '0.8rem' }}>Sub-Qualified Rate:</span>
            <input type="text" name="TieredSubQualifiedPercentage" className="form-input" style={{ width: '50px', padding: '0.2rem', marginLeft: '5px' }} value={formData.TieredSubQualifiedPercentage || ''} onChange={onChange} placeholder="3.9" />
            <span className="checkbox-label" style={{ fontSize: '0.8rem' }}>/</span>
            <input type="text" name="TieredSubQualifiedPerItem" className="form-input" style={{ width: '50px', padding: '0.2rem' }} value={formData.TieredSubQualifiedPerItem || ''} onChange={onChange} placeholder=".10" />
          </label>
        </div>

        {/* Other pricing (Interchange / flat pricing) */}
        <div style={{ padding: '1.25rem', border: '1px solid var(--border-subtle)', borderRadius: '10px', background: 'hsla(0,0%,100%,0.01)' }}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="checkbox-card">
              <input
                type="checkbox"
                name="Credit"
                checked={!!formData.Credit}
                onChange={onChange}
              />
              <span className="checkbox-label" style={{ fontWeight: '700' }}>Credit Interchange Plus Rates</span>
            </label>
          </div>

          <div className="section-grid grid-2">
            <div className="form-group">
              <label className="form-label">Credit %</label>
              <input type="text" name="OtherPricingCreditPercentage" className="form-input" value={formData.OtherPricingCreditPercentage || ''} onChange={onChange} placeholder="e.g. 0.25" />
            </div>
            <div className="form-group">
              <label className="form-label">Credit Per Item ($)</label>
              <input type="text" name="OtherPricingCreditPerItem" className="form-input" value={formData.OtherPricingCreditPerItem || ''} onChange={onChange} placeholder="0.08" />
            </div>
            <div className="form-group">
              <label className="form-label">Signature Debit %</label>
              <input type="text" name="OtherPricingSigDebitPercentage" className="form-input" value={formData.OtherPricingSigDebitPercentage || ''} onChange={onChange} placeholder="0.15" />
            </div>
            <div className="form-group">
              <label className="form-label">Sig Debit Item ($)</label>
              <input type="text" name="OtherPricingSigDebitPerItem" className="form-input" value={formData.OtherPricingSigDebitPerItem || ''} onChange={onChange} placeholder="0.08" />
            </div>
          </div>

          <div style={{ marginTop: '1.2rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border-subtle)' }}>
            <label className="checkbox-card" style={{ marginBottom: '0.5rem' }}>
              <input type="checkbox" name="PinDebit" checked={!!formData.PinDebit} onChange={onChange} />
              <span className="checkbox-label" style={{ fontWeight: '700' }}>Enable PIN Debit Rates</span>
            </label>
            <div className="section-grid grid-2">
              <div className="form-group">
                <label className="form-label">PIN Debit %</label>
                <input type="text" name="OtherPricingPINDebitPercentage" className="form-input" value={formData.OtherPricingPINDebitPercentage || ''} onChange={onChange} placeholder="0.05" />
              </div>
              <div className="form-group">
                <label className="form-label">PIN Debit Item ($)</label>
                <input type="text" name="OtherPricingPinDebitPerItem" className="form-input" value={formData.OtherPricingPinDebitPerItem || ''} onChange={onChange} placeholder="0.10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* STANDARD FEES */}
      <div className="section-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', border: 'none' }}>
        Standard Processing Fees ($)
      </div>

      <div className="section-grid grid-4">
        <div className="form-group">
          <label className="form-label" htmlFor="AuthFee">Auth / Gateway Fee</label>
          <input id="AuthFee" type="text" name="AuthFee" className="form-input" value={formData.AuthFee || ''} onChange={onChange} placeholder="0.15" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="AVSFee">AVS Verify Fee</label>
          <input id="AVSFee" type="text" name="AVSFee" className="form-input" value={formData.AVSFee || ''} onChange={onChange} placeholder="0.05" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="BatchFee">Batch Settlement</label>
          <input id="BatchFee" type="text" name="BatchFee" className="form-input" value={formData.BatchFee || ''} onChange={onChange} placeholder="0.30" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="ChargebackFee">Chargeback Fee</label>
          <input id="ChargebackFee" type="text" name="ChargebackFee" className="form-input" value={formData.ChargebackFee || ''} onChange={onChange} placeholder="25.00" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="Pre-DisputeFee">Pre-Dispute Alert</label>
          <input id="Pre-DisputeFee" type="text" name="Pre-DisputeFee" className="form-input" value={formData['Pre-DisputeFee'] || ''} onChange={onChange} placeholder="15.00" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="RemediedPre-DisputeFee">Remedied Dispute</label>
          <input id="RemediedPre-DisputeFee" type="text" name="RemediedPre-DisputeFee" className="form-input" value={formData['RemediedPre-DisputeFee'] || ''} onChange={onChange} placeholder="5.00" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="FraudFee">Fraud Screening</label>
          <input id="FraudFee" type="text" name="FraudFee" className="form-input" value={formData.FraudFee || ''} onChange={onChange} placeholder="0.05" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="AcctMainFee">Acct Maintenance</label>
          <input id="AcctMainFee" type="text" name="AcctMainFee" className="form-input" value={formData.AcctMainFee || ''} onChange={onChange} placeholder="10.00" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="MonthMinFee">Monthly Minimum</label>
          <input id="MonthMinFee" type="text" name="MonthMinFee" className="form-input" value={formData.MonthMinFee || ''} onChange={onChange} placeholder="25.00" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="TermFee">Early Term. Fee</label>
          <input id="TermFee" type="text" name="TermFee" className="form-input" value={formData.TermFee || ''} onChange={onChange} placeholder="295.00" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="AppFee">Application Fee</label>
          <input id="AppFee" type="text" name="AppFee" className="form-input" value={formData.AppFee || ''} onChange={onChange} placeholder="0.00" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="AnnualFee">Annual Membership</label>
          <input id="AnnualFee" type="text" name="AnnualFee" className="form-input" value={formData.AnnualFee || ''} onChange={onChange} placeholder="99.00" />
        </div>
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* PCI, HUB & CARD BRAND SURCHARGE FEES */}
      <div className="section-grid grid-3">
        {/* PCI Card */}
        <div style={{ padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '8px', background: 'hsla(0,0%,100%,0.01)' }}>
          <label className="checkbox-card" style={{ marginBottom: '0.5rem', border: 'none', padding: 0 }}>
            <input type="checkbox" name="PCIFeePeriod" checked={!!formData.PCIFeePeriod} onChange={onChange} />
            <span className="checkbox-label" style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>PCI Compliance Fee</span>
          </label>
          <input id="PCIMainFee" type="text" className="form-input" name="PCIMainFee" value={formData.PCIMainFee || ''} onChange={onChange} placeholder="PCI Fee (e.g. 9.95/mo)" />
        </div>

        {/* Hub Card */}
        <div style={{ padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '8px', background: 'hsla(0,0%,100%,0.01)' }}>
          <label className="checkbox-card" style={{ marginBottom: '0.5rem', border: 'none', padding: 0 }}>
            <input type="checkbox" name="MonthlyHub" checked={!!formData.MonthlyHub} onChange={onChange} />
            <span className="checkbox-label" style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Hub Dashboard Fee</span>
          </label>
          <input id="HubFee" type="text" className="form-input" name="HubFee" value={formData.HubFee || ''} onChange={onChange} placeholder="Hub Fee (e.g. 5.00/mo)" />
        </div>

        {/* Card Brand Fees */}
        <div style={{ padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '8px', background: 'hsla(0,0%,100%,0.01)' }}>
          <label className="checkbox-card" style={{ marginBottom: '0.5rem', border: 'none', padding: 0 }}>
            <input type="checkbox" name="CardBrandFees" checked={!!formData.CardBrandFees} onChange={onChange} />
            <span className="checkbox-label" style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Surcharge Customers?</span>
          </label>
          <input id="CardholderSurchargePercentage" type="text" className="form-input" name="CardholderSurchargePercentage" value={formData.CardholderSurchargePercentage || ''} onChange={onChange} placeholder="Surcharge % (e.g. 3.0)" />
        </div>
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* AD-HOC FEES & NOTES */}
      <div className="section-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', border: 'none' }}>
        Custom Ad-Hoc Fees
      </div>
      
      <div className="section-grid grid-2">
        <div className="section-grid grid-2-1">
          <div className="form-group">
            <label className="form-label">Fee 1 Description</label>
            <input type="text" name="OtherFeeDescription1" className="form-input" value={formData.OtherFeeDescription1 || ''} onChange={onChange} placeholder="e.g. Setup Fee" />
          </div>
          <div className="form-group">
            <label className="form-label">Fee 1 Amount ($)</label>
            <input type="text" name="OtherFee1" className="form-input" value={formData.OtherFee1 || ''} onChange={onChange} placeholder="49.00" />
          </div>
        </div>

        <div className="section-grid grid-2-1">
          <div className="form-group">
            <label className="form-label">Fee 2 Description</label>
            <input type="text" name="OtherFeeDescription2" className="form-input" value={formData.OtherFeeDescription2 || ''} onChange={onChange} placeholder="e.g. Wireless Fee" />
          </div>
          <div className="form-group">
            <label className="form-label">Fee 2 Amount ($)</label>
            <input type="text" name="OtherFee2" className="form-input" value={formData.OtherFee2 || ''} onChange={onChange} placeholder="15.00" />
          </div>
        </div>

        <div className="section-grid grid-2-1">
          <div className="form-group">
            <label className="form-label">Fee 3 Description</label>
            <input type="text" name="OtherFeeDescription3" className="form-input" value={formData.OtherFeeDescription3 || ''} onChange={onChange} placeholder="e.g. Paper Statements" />
          </div>
          <div className="form-group">
            <label className="form-label">Fee 3 Amount ($)</label>
            <input type="text" name="OtherFee3" className="form-input" value={formData.OtherFee3 || ''} onChange={onChange} placeholder="10.00" />
          </div>
        </div>

        <div className="section-grid grid-2-1">
          <div className="form-group">
            <label className="form-label">Fee 4 Description</label>
            <input type="text" name="OtherFeeDescription4" className="form-input" value={formData.OtherFeeDescription4 || ''} onChange={onChange} placeholder="e.g. Statement Copy" />
          </div>
          <div className="form-group">
            <label className="form-label">Fee 4 Amount ($)</label>
            <input type="text" name="OtherFee4" className="form-input" value={formData.OtherFee4 || ''} onChange={onChange} placeholder="5.00" />
          </div>
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '1rem' }}>
        <label className="form-label" htmlFor="PricingNote">Special Pricing Notes or Directives</label>
        <textarea
          id="PricingNote"
          name="PricingNote"
          rows="2"
          className="form-input"
          value={formData.PricingNote || ''}
          onChange={onChange}
          placeholder="Specify any special fee waivers, volume-based discounts, or contract clauses..."
        />
      </div>
    </div>
  );
}
