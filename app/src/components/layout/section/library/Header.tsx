import React, { useState, useEffect, useMemo } from "react";

const Header: React.FC = () => {
  const phrases = useMemo(
    () => [
      "⏳ Bibliothèque numérique : Etudier simplement avec une connexion Internet !",
      "🌟 Livraison gratuite sur toutes les commandes d'au moins 4 livres !",
      "🎉 Profitez des soldes jusqu'à -70% sur une sélection de livres !",
      "📦 Nouveaux Livres ajoutés chaque semaine !",
    ],
    [] // Pas de dépendances, car les phrases sont statiques
  );

  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % phrases.length;
      setCurrentPhrase(phrases[index]);
    }, 4000);
    return () => clearInterval(interval);
  }, [phrases]); // phrases est stable grâce à useMemo

  return (
    <div className="cober">
      <div className="col-md-900 col-sm-19">
        <header className="ozeba">
          <div className="announcement-text">
            <p id="rotating-phrases">{currentPhrase}</p>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;