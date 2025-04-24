import React, { useState } from "react";

interface SubscriptionModalProps {
  onClose: () => void;
  onSubscribe: (code: string) => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  onClose,
  onSubscribe,
}) => {
  const [plan, setPlan] = useState("basic");

  const handleSubscribe = () => {
    const code = `BO-${Math.random().toString(36).substr(2, 7).toUpperCase()}`;
    onSubscribe(code);
    alert("Abonnement réussi ! Code : " + code);
  };

  return (
    <div id="myModa" className="moda">
      <div className="moda-content">
        <span className="closex" onClick={onClose}>
          ×
        </span>
        <h3>Souscrire à un abonnement</h3>
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="modal-select"
        >
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
        <button onClick={handleSubscribe} className="modal-submit">
          Payer et obtenir le code
        </button>
      </div>
    </div>
  );
};

export default SubscriptionModal;