// src/components/SuccessModal.tsx
import React from 'react';

interface SuccessModalProps {
  message: string | null;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-success">
        <h3>Succès</h3>
        <p>{message}</p>
        <button onClick={onClose} className="btn btn-success">
          Fermer
        </button>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
          max-width: 400px;
          width: 100%;
        }
        .modal-success {
          border: 2px solid #28a745;
        }
        .btn-success {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }
        .btn-success:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default SuccessModal;