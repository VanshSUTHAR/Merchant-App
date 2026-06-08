import React from 'react';

export default function EquipmentServices({ formData, onChange, validationErrors }) {
  const getErrorClass = (field) => validationErrors[field] ? 'is-invalid' : '';

  return (
    <div className="section-grid">
      <div className="section-title">
        <span>Equipment & Service Providers</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>* Required fields</span>
      </div>

      {/* Row 1: New Equipment toggle */}
      <div className="section-grid grid-1">
        <label className="checkbox-card" style={{ padding: '0.9rem 1.1rem', background: 'var(--primary-glow)', border: 'none' }}>
          <input
            type="checkbox"
            name="NewEquipment"
            checked={!!formData.NewEquipment}
            onChange={onChange}
          />
          <span className="checkbox-label" style={{ fontWeight: '600' }}>Order new hardware or terminal equipment?</span>
        </label>
      </div>

      {/* Row 2: Equipment Models */}
      <div className="section-grid grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="TerminalModel">Terminal Hardware Model</label>
          <input
            id="TerminalModel"
            type="text"
            name="TerminalModel"
            className="form-input"
            value={formData.TerminalModel || ''}
            onChange={onChange}
            placeholder="e.g. Pax A920 Pro, Dejavoo QD4"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="GatewayModel">Gateway Provider / Software</label>
          <input
            id="GatewayModel"
            type="text"
            name="GatewayModel"
            className="form-input"
            value={formData.GatewayModel || ''}
            onChange={onChange}
            placeholder="e.g. Authorize.net, NMI, Cardpointe"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="PINPadModel">PIN Pad Model (Optional)</label>
          <input
            id="PINPadModel"
            type="text"
            name="PINPadModel"
            className="form-input"
            value={formData.PINPadModel || ''}
            onChange={onChange}
            placeholder="e.g. Pax S300"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="POSSystemModel">Point-of-Sale (POS) System</label>
          <input
            id="POSSystemModel"
            type="text"
            name="POSSystemModel"
            className="form-input"
            value={formData.POSSystemModel || ''}
            onChange={onChange}
            placeholder="e.g. Clover, Toast, Square Register"
          />
        </div>
      </div>

      {/* Row 3: Other Equipment Options */}
      <div className="section-grid grid-2">
        <div className="section-grid grid-2-1">
          <div className="form-group">
            <label className="form-label">Add-on Item Description</label>
            <input type="text" name="OtherFeeDescription5" className="form-input" value={formData.OtherFeeDescription5 || ''} onChange={onChange} placeholder="e.g. Receipt Paper Rolls" />
          </div>
          <div className="form-group">
            <label className="form-label">Cost ($)</label>
            <input type="text" name="EquipmentOther1" className="form-input" value={formData.EquipmentOther1 || ''} onChange={onChange} placeholder="15.00" />
          </div>
        </div>

        <div className="section-grid grid-2-1">
          <div className="form-group">
            <label className="form-label">Add-on Item Description</label>
            <input type="text" name="OtherFeeDescription6" className="form-input" value={formData.OtherFeeDescription6 || ''} onChange={onChange} placeholder="e.g. Stand / Mount" />
          </div>
          <div className="form-group">
            <label className="form-label">Cost ($)</label>
            <input type="text" name="EquipmentOther2" className="form-input" value={formData.EquipmentOther2 || ''} onChange={onChange} placeholder="45.00" />
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* Row 4: Agreement term details */}
      <div className="section-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', border: 'none' }}>
        Agreement Term Details
      </div>

      <div className="section-grid grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="AgreementTerm">
            Agreement Term (Months) <span className="required">*</span>
          </label>
          <input
            id="AgreementTerm"
            type="text"
            name="AgreementTerm"
            className={`form-input ${getErrorClass('AgreementTerm')}`}
            value={formData.AgreementTerm || ''}
            onChange={onChange}
            placeholder="e.g. 36 Months"
          />
          {validationErrors.AgreementTerm && (
            <div className="invalid-feedback">{validationErrors.AgreementTerm}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="PercentOfVolume">
            Processing Reserve Percentage (%)
          </label>
          <input
            id="PercentOfVolume"
            type="text"
            name="PercentOfVolume"
            className="form-input"
            value={formData.PercentOfVolume || ''}
            onChange={onChange}
            placeholder="e.g. 5.0 (leave blank if 0)"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="OtherAccountSetupNotes">Equipment & Account Setup Notes</label>
        <textarea
          id="OtherAccountSetupNotes"
          name="OtherAccountSetupNotes"
          rows="2"
          className="form-input"
          value={formData.OtherAccountSetupNotes || ''}
          onChange={onChange}
          placeholder="Specify any routing details, terminal parameters, serial numbers, etc..."
        />
      </div>

      <hr style={{ border: 'none', borderBottom: '1px solid var(--border-subtle)', margin: '1rem 0' }} />

      {/* Row 5: Agreements & Signatures (Page 2 overlay fields) */}
      <div className="section-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem', border: 'none' }}>
        Electronic Signatures & Verification
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        Type your legal name to e-sign the application. These values will draw onto the signatures block.
      </p>

      {/* Owner 1 Signature */}
      <div style={{ padding: '1.25rem', border: '1px solid var(--border-subtle)', borderRadius: '10px', background: 'hsla(0,0%,100%,0.01)', marginBottom: '1rem' }}>
        <div className="section-title" style={{ fontSize: '1.05rem', border: 'none', marginBottom: '0.75rem', color: 'var(--primary)' }}>
          Merchant Agreement Signature (Owner 1)
        </div>
        <div className="section-grid grid-3">
          <div className="form-group">
            <label className="form-label" htmlFor="AgreementSignatureOwner1Signature">Sign (Type Name) <span className="required">*</span></label>
            <input
              id="AgreementSignatureOwner1Signature"
              type="text"
              name="AgreementSignatureOwner1Signature"
              className={`form-input ${getErrorClass('AgreementSignatureOwner1Signature')}`}
              value={formData.AgreementSignatureOwner1Signature || ''}
              onChange={onChange}
              placeholder="e.g. John Doe"
            />
            {validationErrors.AgreementSignatureOwner1Signature && (
              <div className="invalid-feedback">{validationErrors.AgreementSignatureOwner1Signature}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="AgreementSignatureOwner1Name">Full Printed Name <span className="required">*</span></label>
            <input
              id="AgreementSignatureOwner1Name"
              type="text"
              name="AgreementSignatureOwner1Name"
              className={`form-input ${getErrorClass('AgreementSignatureOwner1Name')}`}
              value={formData.AgreementSignatureOwner1Name || ''}
              onChange={onChange}
              placeholder="e.g. John Doe"
            />
            {validationErrors.AgreementSignatureOwner1Name && (
              <div className="invalid-feedback">{validationErrors.AgreementSignatureOwner1Name}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="AgreementSignatureOwner1Date">Date Signed <span className="required">*</span></label>
            <input
              id="AgreementSignatureOwner1Date"
              type="text"
              name="AgreementSignatureOwner1Date"
              className={`form-input ${getErrorClass('AgreementSignatureOwner1Date')}`}
              value={formData.AgreementSignatureOwner1Date || ''}
              onChange={onChange}
              placeholder="MM/DD/YYYY"
            />
            {validationErrors.AgreementSignatureOwner1Date && (
              <div className="invalid-feedback">{validationErrors.AgreementSignatureOwner1Date}</div>
            )}
          </div>
        </div>

        {/* Personal Guarantee Signature */}
        <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px dotted var(--border-subtle)' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Personal Guarantee Signature (Owner 1)</div>
          <div className="section-grid grid-3">
            <div className="form-group">
              <label className="form-label">Sign (Type Name)</label>
              <input type="text" name="PGSignatureOwner1Signature" className="form-input" value={formData.PGSignatureOwner1Signature || ''} onChange={onChange} placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label className="form-label">Printed Name</label>
              <input type="text" name="PGSignatureOwner1Name" className="form-input" value={formData.PGSignatureOwner1Name || ''} onChange={onChange} placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label className="form-label">Date Signed</label>
              <input type="text" name="PGSignatureOwner1Date" className="form-input" value={formData.PGSignatureOwner1Date || ''} onChange={onChange} placeholder="MM/DD/YYYY" />
            </div>
          </div>
        </div>
      </div>

      {/* Owner 2 Signature (Conditional) */}
      {!formData.NoOwner && formData.Owner2FirstName && (
        <div style={{ padding: '1.25rem', border: '1px solid var(--border-subtle)', borderRadius: '10px', background: 'hsla(0,0%,100%,0.01)', marginBottom: '1rem' }}>
          <div className="section-title" style={{ fontSize: '1.05rem', border: 'none', marginBottom: '0.75rem', color: 'var(--primary)' }}>
            Merchant Agreement Signature (Owner 2)
          </div>
          <div className="section-grid grid-3">
            <div className="form-group">
              <label className="form-label">Sign (Type Name)</label>
              <input type="text" name="AgreementSignatureOwner2Signature" className="form-input" value={formData.AgreementSignatureOwner2Signature || ''} onChange={onChange} placeholder="Jane Doe" />
            </div>
            <div className="form-group">
              <label className="form-label">Full Printed Name</label>
              <input type="text" name="AgreementSignatureOwner2Name" className="form-input" value={formData.AgreementSignatureOwner2Name || ''} onChange={onChange} placeholder="Jane Doe" />
            </div>
            <div className="form-group">
              <label className="form-label">Date Signed</label>
              <input type="text" name="AgreementSignatureOwner2Date" className="form-input" value={formData.AgreementSignatureOwner2Date || ''} onChange={onChange} placeholder="MM/DD/YYYY" />
            </div>
          </div>

          {/* Personal Guarantee Signature */}
          <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px dotted var(--border-subtle)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Personal Guarantee Signature (Owner 2)</div>
            <div className="section-grid grid-3">
              <div className="form-group">
                <label className="form-label">Sign (Type Name)</label>
                <input type="text" name="PGSignatureOwner2Signature" className="form-input" value={formData.PGSignatureOwner2Signature || ''} onChange={onChange} placeholder="Jane Doe" />
              </div>
              <div className="form-group">
                <label className="form-label">Printed Name</label>
                <input type="text" name="PGSignatureOwner2Name" className="form-input" value={formData.PGSignatureOwner2Name || ''} onChange={onChange} placeholder="Jane Doe" />
              </div>
              <div className="form-group">
                <label className="form-label">Date Signed</label>
                <input type="text" name="PGSignatureOwner2Date" className="form-input" value={formData.PGSignatureOwner2Date || ''} onChange={onChange} placeholder="MM/DD/YYYY" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Officer Signature */}
      <div style={{ padding: '1.25rem', border: '1px solid var(--border-subtle)', borderRadius: '10px', background: 'hsla(0,0%,100%,0.01)' }}>
        <div className="section-title" style={{ fontSize: '1.05rem', border: 'none', marginBottom: '0.75rem', color: 'var(--primary)' }}>
          Merchant Agreement Signature (Officer / Authorized Rep)
        </div>
        <div className="section-grid grid-4">
          <div className="form-group">
            <label className="form-label" htmlFor="AgreementSignatureOfficerSignature">Sign (Type Name) <span className="required">*</span></label>
            <input
              id="AgreementSignatureOfficerSignature"
              type="text"
              name="AgreementSignatureOfficerSignature"
              className={`form-input ${getErrorClass('AgreementSignatureOfficerSignature')}`}
              value={formData.AgreementSignatureOfficerSignature || ''}
              onChange={onChange}
              placeholder="e.g. John Doe"
            />
            {validationErrors.AgreementSignatureOfficerSignature && (
              <div className="invalid-feedback">{validationErrors.AgreementSignatureOfficerSignature}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="AgreementSignatureOfficerName">Full Printed Name <span className="required">*</span></label>
            <input
              id="AgreementSignatureOfficerName"
              type="text"
              name="AgreementSignatureOfficerName"
              className={`form-input ${getErrorClass('AgreementSignatureOfficerName')}`}
              value={formData.AgreementSignatureOfficerName || ''}
              onChange={onChange}
              placeholder="e.g. John Doe"
            />
            {validationErrors.AgreementSignatureOfficerName && (
              <div className="invalid-feedback">{validationErrors.AgreementSignatureOfficerName}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="AgreementSignatureOfficerJobTitle">Job Title <span className="required">*</span></label>
            <input
              id="AgreementSignatureOfficerJobTitle"
              type="text"
              name="AgreementSignatureOfficerJobTitle"
              className={`form-input ${getErrorClass('AgreementSignatureOfficerJobTitle')}`}
              value={formData.AgreementSignatureOfficerJobTitle || ''}
              onChange={onChange}
              placeholder="e.g. President, Treasurer"
            />
            {validationErrors.AgreementSignatureOfficerJobTitle && (
              <div className="invalid-feedback">{validationErrors.AgreementSignatureOfficerJobTitle}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="AgreementSignatureOfficerDate">Date Signed <span className="required">*</span></label>
            <input
              id="AgreementSignatureOfficerDate"
              type="text"
              name="AgreementSignatureOfficerDate"
              className={`form-input ${getErrorClass('AgreementSignatureOfficerDate')}`}
              value={formData.AgreementSignatureOfficerDate || ''}
              onChange={onChange}
              placeholder="MM/DD/YYYY"
            />
            {validationErrors.AgreementSignatureOfficerDate && (
              <div className="invalid-feedback">{validationErrors.AgreementSignatureOfficerDate}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
