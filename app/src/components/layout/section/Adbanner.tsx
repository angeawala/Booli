"use client";

import React, { useState, useEffect } from "react";
import "@/styles/AdBanner.css"; // Styles additionnels non inline

const AdBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: "/image/drap.jpg", alt: "Draps" },
    { src: "/image/tech1.jpg", alt: "" },
    { src: "/image/dior.jpg", alt: "Mark dior" },
    { src: "/image/md.jpg", alt: "veste" },
    { src: "/image/sport1.jpg", alt: "Chaussures" },
    { src: "/image/ho.jpg", alt: "" },
  ];

  // Gestion du carrousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change toutes les 5 secondes
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
      <section className="defile">
        <section className="barre">
          <div className="banner col-12">
            <div className="banner-item entreprise">
              Joignez-nous au <i className="fab fa-whatsapp"></i> +2.. 96 78 07 62
            </div>
            <div className="banner-item reduction">
              <strong>Profitez 85% de nos offres</strong>
            </div>
            <div className="banner-item explorer">
              Explorez le monde des affaires en Afrique
            </div>
          </div>
        </section>

      {/* Menu fournisseur */}
      <section>
        <div className="ban col-12">
          <div className="button-bar">
            <button
              onClick={() => window.open("contact_number.html", "_blank")}
              className="btn"
            >
              <i className="fas fa-phone-alt"></i> Appeler pour Commander
            </button>
            <button
              onClick={() => window.open("Panier.html", "_blank")}
              className="btn"
            >
              <i className="fas fa-cart-plus"></i> Voir votre panier
            </button>
            <button className="btn">
              <i className="fas fa-truck"></i> Fournisseurs
            </button>
            <button className="btn">
              <i className="fas fa-star"></i> Nouveautés
            </button>
            <button className="btn">
              <i className="fas fa-envelope"></i> Contacter un Fournisseur
            </button>
          </div>
        </div>
      </section>

      {/* Carrousel publicitaire */}
      <section className="deff">
        <div className="carousel-container col-12">
          <div className="carousel">
            <div
              className="carousel-slide"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <img key={index} src={slide.src} alt={slide.alt} />
              ))}
            </div>
          </div>

          <button className="prev-btn" onClick={prevSlide}>
            ❮
          </button>
          <button className="next-btn" onClick={nextSlide}>
            ❯
          </button>
          <div className="carousel-dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="clignote-titles">
          <h2
            className="clignote"
            style={{
              border: "2px solid #999",
              padding: "10px",
              backgroundColor: "rgba(247, 52, 18, 0.973)",
              width: "240px",
            }}
          >
            Semaine Promo, <i className="fas fa-phone-alt"></i> Appeler pour commander !
          </h2>
          <h2
            className="clignote"
            style={{
              border: "2px solid #999",
              padding: "10px",
              backgroundColor: "rgba(0, 129, 112, 0.973)",
              width: "240px",
            }}
          >
            -80% de réduction
          </h2>
        </div>
        <div className="clignote-titles1">
          <h2
            className="clignote"
            style={{
              border: "2px solid #999",
              padding: "10px",
              backgroundColor: "rgba(0, 183, 255, 0.973)",
              width: "240px",
            }}
          >
            +1000 opportunités pour vous ! Le savez-vous ?
          </h2>
          <h2
            className="clignote"
            style={{
              border: "2px solid #999",
              padding: "10px",
              backgroundColor: "rgba(129, 73, 0, 0.973)",
              width: "240px",
            }}
          >
            Démarre ton opportunité maintenant à BOOLi.com.
          </h2>
        </div>
      </section>
    </section>
  );
};

export default AdBanner;