import React from 'react';

export default function CongratsModal({ onRetry, onExit }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: '40px',
      gap: '40px'
    }}>
      
      {/* Columna Izquierda: Felicitación + Stats + Botones */}
      <div style={{
        backgroundColor: '#F0EAD6',
        borderRadius: '20px',
        padding: '30px',
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ color: '#0B132B', fontSize: '2rem', marginBottom: '10px' }}>Congratulations!</h1>
        <p style={{ color: '#333', fontSize: '1.1rem', marginBottom: '20px', textAlign: 'center' }}>
          You have successfully completed the Injector Training Program.
        </p>

        {/* Estadísticas */}
        <div style={{
          width: '100%',
          marginBottom: '20px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          color: '#0B132B',
          fontSize: '1rem',
          boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '8px 0' }}><strong>Quiz Score:</strong> 100%</p>
          <p style={{ margin: '8px 0' }}><strong>Injections Completed:</strong> 3/3</p>
          <p style={{ margin: '8px 0' }}><strong>Training Status:</strong> Passed ✅</p>
        </div>

        {/* Botones */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={onRetry}
            style={{
              padding: '10px 20px',
              backgroundColor: '#FFA500',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Start Over
          </button>
          <button 
            onClick={() => alert('Download coming soon!')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Download Certificate
          </button>
        </div>
      </div>
      
      {/* Columna Derecha: Certificado grande */}
      <div style={{
        backgroundColor: '#0B132B',
        borderRadius: '20px',
        padding: '20px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
      }}>
        <img 
          src="/certificate-placeholder.png" 
          alt="Certificate of Completion" 
          style={{ width: '100%', borderRadius: '10px' }} 
        />
      </div>

    </div>
  );
}
