// src/components/ui/Button.jsx
import React from 'react';

export default function Button({ children, onClick, disabled = false, style = {} }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 20px',
        border: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        backgroundColor: disabled ? '#bbb' : '#0B132B',
        color: '#F0EAD6',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
