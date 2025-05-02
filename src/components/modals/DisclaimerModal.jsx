import React, { useState } from 'react';
import Button from '../ui/Button';


export default function DisclaimerModal({ onAccept }) {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 2000
    }}>
      <div style={{
        backgroundColor: '#F0EAD6',
        color: '#0B132B',
        padding: '30px',
        borderRadius: '10px',
        width: '600px',
        textAlign: 'left',
        overflowY: 'auto',
        maxHeight: '90vh'
      }}>
        <h2>⚠️ Important Disclaimers and Considerations</h2>
        <ul>
          <li><strong>Individual Variability:</strong> Dosage and technique may vary based on patient factors.</li>
          <li><strong>Dilution Practices:</strong> Adjust dilution based on goals and treatment area.</li>
          <li><strong>Conversion Ratios:</strong> Dysport and Botox units are not directly comparable.</li>
          <li><strong>Anatomical Knowledge:</strong> Essential to minimize risks and optimize results.</li>
          <li><strong>Onset and Duration:</strong> Effects vary; typical onset in 24–48 hours, lasting 3–4 months.</li>
          <li><strong>Professional Training:</strong> Only qualified professionals should inject Dysport.</li>
        </ul>
        <div style={{ marginTop: '20px' }}>
          <a href="#" style={{ color: '#0B132B', fontWeight: 'bold', textDecoration: 'underline' }}>
            View Full Terms & Conditions
          </a>
        </div>
        <div style={{ marginTop: '20px' }}>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            /> I have read and accept the disclaimers
          </label>
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button
            variant="primary"
            disabled={!checked}
            onClick={onAccept}
            style={{
              backgroundColor: checked ? '#0B132B' : '#999',
              color: '#F0EAD6',
              cursor: checked ? 'pointer' : 'not-allowed',
              opacity: checked ? 1 : 0.6
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
