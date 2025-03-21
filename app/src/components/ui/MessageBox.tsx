"use client";

import { useState, useEffect } from "react";

export default function MessageBox() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 43000); // 3000 + 40000

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  const handleCancelClick = () => {
    setIsVisible(false);
  };

  const handleReadClick = () => {
    window.location.href = "store/library";
  };

  return (
    <div className={`message-box ${isVisible ? "show" : ""}`} id="messageBox" style={{ display: isVisible ? "block" : "none" }}>
      <h4>Guide Bibliothèque</h4>
      <p>Télécharger des (Livres, Romans, epreuves...) gratuitement !</p>
      <div className="actions">
        <button className="btn read" id="readButton" onClick={handleReadClick}>
          Savoir plus
        </button>
        <button className="btn cancel" id="cancelButton" onClick={handleCancelClick}>
          Annuler
        </button>
      </div>
    </div>
  );
}