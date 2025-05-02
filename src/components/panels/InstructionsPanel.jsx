import React from 'react';

export default function InstructionsPanel({
  disclaimerCompleted,
  quizCompleted,
  level1Completed,
  level2Completed,
  level3Completed
}) {
  const steps = [
    { label: "Read Disclaimers", completed: disclaimerCompleted },
    { label: "Approve Quiz", completed: quizCompleted },
    { label: "Inject Dysport – Forehead: Level 1", completed: level1Completed },
    { label: "Inject Dysport – Forehead: Level 2", completed: level2Completed },
    { label: "Inject Dysport – Forehead: Level 3", completed: level3Completed }
  ];

  const totalSteps = steps.length;
  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
  const currentActiveStep = steps.findIndex(step => !step.completed);

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      width: '360px',
      height: '90vh',
      backgroundColor: '#F0EAD6',
      color: '#0B132B',
      borderRadius: '20px',
      padding: '28px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
      fontFamily: 'sans-serif',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      
      {/* Top: Logos en fila con animaciones */}
<div style={{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  marginBottom: '20px',
  animation: 'fadeIn 1.5s ease'
}}>
  {/* Logo ELEVATE con borde dorado */}
  <div style={{
    padding: '6px',
    border: '2px solid #D4AF37',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 0 8px rgba(212, 175, 55, 0.6)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
  >
    <img src="/elevate-logo.png" alt="ELEVATE" style={{ height: '80px' }} />
  </div>

  {/* Logo Dysport con borde verde */}
  <div style={{
    padding: '6px',
    border: '2px solid #1E824C',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 0 8px rgba(30, 130, 76, 0.5)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
  >
    <img src="/dysport-logo.png" alt="Dysport" style={{ height: '55px' }} />
  </div>
  </div>

{/* Acróstico */}
<p style={{ fontSize: '0.7rem', color: '#888', margin: 0, textAlign: 'center', maxWidth: '280px', marginBottom: '15px', animation: 'fadeIn 2s ease' }}>
  Enhanced Learning Evaluation for Virtual Aesthetic Training & Excellence
</p>



      {/* Middle: Module Info */}
      <div style={{ width: '100%', marginTop: '40px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>Module:</p>
        <p style={{ marginTop: 6, fontSize: '0.95rem', textAlign: 'center' }}>
          Dysport in the forehead to stop aging
        </p>

        {/* Activities */}
        <div style={{ marginTop: '30px', width: '100%' }}>
          <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>Activities:</p>
          <ul style={{ paddingLeft: '18px', listStyle: 'none', marginTop: '10px' }}>
            {steps.map((step, index) => (
              <li key={index} style={{
                opacity: step.completed || index === currentActiveStep ? 1 : 0.4,
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                pointerEvents: 'none',
                transition: 'opacity 0.5s ease'
              }}>
                {step.completed ? (
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    style={{ marginRight: '8px', transition: 'all 0.3s ease' }}
                  />
                ) : index === currentActiveStep ? (
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#FFA500',
                    marginRight: '8px',
                    animation: 'pulse 1.5s infinite'
                  }} />
                ) : (
                  <input
                    type="checkbox"
                    checked={false}
                    readOnly
                    style={{ marginRight: '8px' }}
                  />
                )}
                <span>{step.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom: Progress bar */}
      <div style={{
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: '10px',
        overflow: 'hidden',
        marginTop: '20px'
      }}>
        <div style={{
          height: '8px',
          width: `${progressPercentage}%`,
          backgroundColor: progressPercentage === 100 ? '#4CAF50' : '#FFA500',
          transition: 'width 0.5s ease, background-color 0.5s ease'
        }} />
      </div>

    </div>
  );
}
