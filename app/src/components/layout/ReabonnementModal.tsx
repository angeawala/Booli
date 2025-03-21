import React, { useState } from "react";

const ReabonnementModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Formulaire soumis!");
    closeModal();
  };

  return (
    <>
      <a href="#" id="openModal" onClick={openModal}><i className="fa-solid fa-sync-alt"></i> Reabonnement</a>
      <div id="myModal" className={`modalee ${isVisible ? "block" : ""}`}>
        <div className="content">
          <span className="close" onClick={closeModal}>×</span>
          <form id="modalForm" onSubmit={handleSubmit}>
            <h3>REABONNEMENT</h3>
            <input type="text" id="nom" name="nom" required placeholder="Entrer votre nom ici...." />
            <input type="text" id="prenom" name="prenom" required placeholder="Entrer votre prénom ici...." />
            <input type="password" id="password" name="password" required placeholder="Exemple: #2b03ht2@j" />
            <select id="abonnement" name="abonnement" required>
              <option value="basic">Basic</option>
              <option value="premium">Standard</option>
              <option value="vip">Prenium</option>
            </select>
            <select id="paiement" name="paiement" required>
              <option value="carte">Mobile Money</option>
              <option value="carte">Carte de crédit</option>
              <option value="paypal">PayPal</option>
              <option value="virement">Virement bancaire</option>
            </select>
            <button type="submit">Soumettre</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReabonnementModal;