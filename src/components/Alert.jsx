import React from 'react';

const Alert = ({ type, message, onClose }) => {
  const bgColor = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700'
  }[type];

  return (
    <div className={`${bgColor} border-l-4 p-4 mb-4 relative`} role="alert">
      <p>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-4"
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;