import React, { useState, useEffect } from "react";

const AnnouncementCards: React.FC = () => {
  const cards = [
    {
      id: "card1",
      img: "Photo/choix_produit.jpg",
      title: "FINIS LES PEAGES.",
      text: "Bibliothèque numérique : Télécharger gratuitement des PDF (Livres, epreuvres...)---Abonner-vous pour plus de livres et d'options---Acheter des livres, Romans...en un clic.",
      link: "/library/detail",
    },
    {
      id: "card2",
      img: "Photo/formation1.jpg",
      title: "Apprentissage Numérique",
      text: "Etudier chez vous avec une connexion internet et connectez-vous à une communauté de personne resource.",
      contact: "Contact: joas@gmail.com",
    },
    {
      id: "card3",
      img: "Photo/boolicom.blanc.jpg",
      title: "Laissez une note plus tards !",
      text: "Dites nous si vous etes satisfait ou pas depuis votre fréquentation à notre Bibliothèque.",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex >= cards.length) {
      setIsComplete(true);
      return;
    }
    const delay = 800;
    const interval = 8000;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, currentIndex === 0 ? delay : interval);
    return () => clearTimeout(timer);
  }, [currentIndex, cards.length]);

  const handleCancel = () => setCurrentIndex(cards.length);

  if (isComplete) return null;

  return (
    <section>
      <div id="cards-container">
        {cards.map((card, index) => (
          <div
            className="card"
            id={card.id}
            key={card.id}
            style={{ display: index === currentIndex ? "block" : "none" }}
          >
            <img src={card.img} alt="etude" />
            <p className="phrase2">
              <strong style={{ color: "tomato", fontWeight: 1000, fontSize: "1.3em" }}>{card.title}</strong>
            </p>
            <p className={card.contact ? "phrase2 mt-2" : "phrase2"}>{card.text}</p>
            {card.contact && <p className="phrase1">{card.contact}</p>}
            <button
              className="btn voir-plus"
              onClick={() => (card.link ? (window.location.href = card.link) : null)}
            >
              {card.link ? "-- Découvrir (+) --" : "Vos droits"}
            </button>
            <button className="btn annuler" onClick={handleCancel}>
              Annuler
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnnouncementCards;