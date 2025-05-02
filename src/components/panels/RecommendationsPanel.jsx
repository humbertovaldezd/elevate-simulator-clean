import React from 'react';

export default function RecommendationsPanel() {
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: '#F0EAD6',
      color: '#0B132B',
      padding: '15px',
      borderRadius: '10px',
      width: '300px',
      fontSize: '14px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      zIndex: 1000
    }}>
      <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>🧠 Key Clinical Recommendations</h3>
      <ul>
        <li><strong>50 Units</strong> in 5 sites for glabellar lines.</li>
        <li>Use <strong>2.5 mL</strong> saline dilution.</li>
        <li><strong>Avoid levator palpebrae superioris</strong> to prevent ptosis.</li>
        <li>Effects begin in <strong>24–48 hours</strong>, lasting <strong>3–4 months</strong>.</li>
        <li>Approximate ratio <strong>2.5:1 Dysport:Botox</strong>.</li>
        <li><strong>0.1 mL per injection site</strong>.</li>
        <li>Target the <strong>Frontalis muscle</strong>.</li>
        <li>Use <strong>Manual Palpation, EMG or Ultrasound</strong>.</li>
      </ul>
    </div>
  );
}
