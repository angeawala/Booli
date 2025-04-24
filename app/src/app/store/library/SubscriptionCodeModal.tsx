import React, { useState } from "react";
import SubscriptionModal from "./SubscriptionModal";

interface SubscriptionCodeModalProps {
  documentId: string;
  onClose: () => void;
}

const SubscriptionCodeModal: React.FC<SubscriptionCodeModalProps> = ({
  documentId,
  onClose,
}) => {
  const [code, setCode] = useState("");
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.match(/^BO-[A-Z0-9]{7}$/)) {
      window.location.href = `/store/library/view?docId=${documentId}`;
      onClose();
    } else {
      alert("Code invalide. Format attendu : BO-XXXXXXX");
    }
  };

  return (
    <div id="myModal" className="moda">
      <div className="moda-content">
        <span className="closex" onClick={onClose}>
          ×
        </span>
        <h3>Accéder au document</h3>
        <form id="modalForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Entrez votre code (ex: BO-2323ABD5)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="modal-input"
            required
          />
          <button type="submit" className="modal-submit">
            Valider
          </button>
        </form>
        <button
          className="learn-btn"
          onClick={() => setShowSubscriptionModal(true)}
        >
          Je veux m'abonner
        </button>
      </div>

      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onSubscribe={(newCode) => {
            setCode(newCode);
            setShowSubscriptionModal(false);
          }}
        />
      )}
    </div>
  );
};

export default SubscriptionCodeModal;