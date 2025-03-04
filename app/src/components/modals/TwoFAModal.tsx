// src/components/TwoFAModal.tsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Ajout de l’importation
import 'react-toastify/dist/ReactToastify.css'; // Ajout du CSS

interface TwoFAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
  onResend: () => void;
  email: string;
  expiresAt: string | null;
  isLoading: boolean;
}

const TwoFAModal: React.FC<TwoFAModalProps> = ({ isOpen, onClose, onSubmit, onResend, email, expiresAt, isLoading }) => {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (expiresAt) {
      const updateTimer = () => {
        const now = new Date().getTime();
        const expires = new Date(expiresAt).getTime();
        const diff = Math.max(0, Math.floor((expires - now) / 1000));
        setTimeLeft(diff);
        if (diff <= 0) {
          toast.error('Le code 2FA a expiré. Veuillez en demander un nouveau.');
        }
      };
      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [expiresAt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(code);
  };

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Vérification 2FA</h3>
        <p>Entrez le code envoyé à {email}</p>
        <p>Temps restant : {formatTimeLeft()}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="form-control mb-3"
            placeholder="Code à 6 chiffres"
            maxLength={6}
            required
          />
          <button
            type="submit"
            className="btn btn-lg text-white connex"
            disabled={isLoading}
          >
            {isLoading ? 'Vérification...' : 'Vérifier'}
          </button>
        </form>
        <p className="mt-2">
          <a href="#" onClick={(e) => { e.preventDefault(); onResend(); }}>
            Renvoyer un nouveau code
          </a>
        </p>
        <button onClick={onClose} className="btn btn-secondary mt-2">
          Annuler
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
          border: 2px solid #007bff;
        }
        .btn-secondary {
          background-color: #6c757d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }
        .btn-secondary:hover {
          background-color: #5a6268;
        }
      `}</style>
    </div>
  );
};

export default TwoFAModal;