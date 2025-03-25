"use client";

import React, { useState, useEffect } from "react";
import "@/styles/AdPopup.css";

const AdPopup: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = [
    { text: "BOOLi-STORE vous remercie pour votre fidélité !", color: "red" },
    { text: "Profitez de nos offres spéciales !", color: "green" },
    { text: "Explorez nos nouveaux produits !", color: "blue" },
    { text: "Inscrivez-vous pour ne plus rater d’opportunité !", color: "orange" },
    { text: "N’hésitez pas à nous contacter si vous rencontrez des difficultés", color: "beige" },
  ];

  // Gestion du pop-up
  useEffect(() => {
    const showPopup = setTimeout(() => setIsPopupVisible(true), 2000);
    const hidePopup = setTimeout(() => setIsPopupVisible(false), 10000);
    return () => {
      clearTimeout(showPopup);
      clearTimeout(hidePopup);
    };
  }, []);

  // Gestion de la section de services
  useEffect(() => {
    const showSection = setTimeout(() => {
      setIsSectionVisible(true);
      const blinkInterval = setInterval(() => {
        setBlinkCount((prev) => {
          if (prev >= 5) {
            clearInterval(blinkInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 400);
      setTimeout(() => setIsSectionVisible(false), 36000);
      return () => clearInterval(blinkInterval);
    }, 9000);
    return () => clearTimeout(showSection);
  }, []);

  // Gestion du bouton scrollTop
  useEffect(() => {
    const handleScroll = () => {
      setScrollTopVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gestion du texte clignotant
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [texts.length]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeSection = () => {
    setIsSectionVisible(false);
  };

  return (
    <>
      {/* Pop-up d'annonce */}
      <div id="popup-annonce" className="an_up" style={{ display: isPopupVisible ? "block" : "none" }}>
        <div className="glow-effect"></div>
        <h4>BOOLi-STORE (IF) !</h4>
        <p>Les tendances en temps réel sur le continent Africain. Ne laissez aucune opportunité vous échapper !</p>
        <div className="trend-graph">
          <div className="bar1-chart">
            <div className="bar1 volailles" data-value="767">
              <span className="bar1-value">Expension</span>
              <span className="bar1-label"></span>
            </div>
            <div className="bar1 volailles import" data-value="35">
              <span className="bar1-value">2010</span>
            </div>
            <div className="bar1 porcs" data-value="411">
              <span className="bar1-value">Croiss</span>
              <span className="bar1-label"></span>
            </div>
            <div className="bar1 porcs import" data-value="54">
              <span className="bar1-value">Acces</span>
            </div>
            <div className="bar1 bovins-lait" data-value="144">
              <span className="bar1-value">Fifelise</span>
              <span className="bar1-label"></span>
            </div>
            <div className="bar1 bovins-lait import" data-value="20">
              <span className="bar1-value">25</span>
            </div>
            <div className="bar1 chevres" data-value="138">
              <span className="bar1-value">Juenes</span>
              <span className="bar1-label"></span>
            </div>
            <div className="bar1 chevres import" data-value="54">
              <span className="bar1-value">mineur</span>
            </div>
            <div className="bar1 moutons" data-value="85">
              <span className="bar1-value">20</span>
              <span className="bar1-label"></span>
            </div>
            <div className="bar1 moutons import" data-value="33">
              <span className="bar1-value">Inf</span>
            </div>
            <div className="bar1 autres" data-value="55">
              <span className="bar1-value">A</span>
              <span className="bar1-label"></span>
            </div>
            <div className="bar1 autres import" data-value="39">
              <span className="bar1-value">T</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section de services */}
      <section>
        <div
          className="section-container_j"
          id="section-container_j"
          style={{
            bottom: isSectionVisible ? "0" : "-200px",
            opacity: blinkCount % 2 === 0 && blinkCount < 6 ? "1" : "0",
            transition: "opacity 0.2s, bottom 0.5s",
          }}
        >
          <button className="close-section_j" onClick={closeSection}>
            ×
          </button>
          <a href="Reservation_alert.html" className="service-link_j" target="_blank">
            <i className="fas fa-calendar-alt"></i>
            <span>Réservation</span>
          </a>
          <a href="services alert.html" className="service-link_j" target="_blank">
            <i className="fas fa-concierge-bell"></i>
            <span>Services</span>
          </a>
          <a href="Opportinuité_acceuil2.html" className="service-link_j" target="_blank">
            <i className="fas fa-briefcase"></i>
            <span>Opportunité</span>
          </a>
          <a href="acceuil_boutique.html" className="service-link_j" target="_blank">
            <i className="fas fa-business-time"></i>
            <span>Business</span>
          </a>
          <a href="euducation.html" className="service-link_j" target="_blank">
            <i className="fas fa-graduation-cap"></i>
            <span>Éducation</span>
          </a>
          <a href="Formation_acceuil.html" className="service-link_j" target="_blank">
            <i className="fas fa-chalkboard-teacher"></i>
            <span>Formations</span>
          </a>
          <a href="nouveauté.html" className="service-link_j" target="_blank">
            <i className="fas fa-ellipsis-h"></i>
            <span>Tendances & Nouveautés</span>
          </a>
        </div>
      </section>

      {/* Bouton scrollTop et texte clignotant */}
      <section>
        <button
          id="scrollTop"
          className="scroll-top"
          onClick={scrollToTop}
          style={{ display: scrollTopVisible ? "flex" : "none" }}
        >
          <i className="fa-solid fa-chevron-up"></i>
        </button>
      </section>
      <section className="produ-grid col-12 px-1" id="color">
        <div className="text-container">
          <p
            id="blinking-text"
            style={{
              color: texts[currentTextIndex].color,
              opacity: currentTextIndex % 2 === 0 ? "1" : "0",
              transition: "opacity 0.5s",
            }}
          >
            {texts[currentTextIndex].text}
          </p>
        </div>
      </section>
    </>
  );
};

export default AdPopup;