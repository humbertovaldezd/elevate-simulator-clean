// src/components/modals/SuccessModal.jsx

import React from 'react';

export default function SuccessModal({ onNext }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Well done!</h2>
        <p style={styles.text}>You have successfully completed this level.<br />Ready to move forward?</p>
        <button style={styles.button} onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // más oscuro, más elegante
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#1e1e2f', // un gris oscuro bonito
    padding: '30px 20px',
    borderRadius: '12px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '80%',
    boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
    color: '#f0f0f0', // texto blanco-gris muy legible
  },
  title: {
    marginBottom: '15px',
    fontSize: '26px',
    color: '#4CAF50', // verde de éxito, coherente con el botón
  },
  text: {
    marginBottom: '25px',
    fontSize: '18px',
    color: '#ccc', // texto suave
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
};
