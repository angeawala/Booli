"use client";

import React, { useState } from "react";
import Link from "next/link";

const CategoryDisplay: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const closePopup = () => setIsPopupOpen(false);

  const categories = [
    {
      id: "electromenager",
      name: "ÉLECTROMÉNAGER",
      image: "/Photo/casserol.jpeg",
      products: [
        "Plaques de cuisson",
        "Congélateur",
        "Cuisinière",
        "Aspirateur",
        "Climatiseur",
        "Ventilateur",
        "Chauffe-eau",
        "Smartphone / Tablette",
      ],
      href: "/filtre",
      moreHref: "/filtre_result",
    },
    {
      id: "agriculture",
      name: "AGRICULTURE",
      image: "/media/agriculture.jpeg",
      products: [
        "Graine de Soja",
        "Haricots",
        "Cacao & Blé",
        "Vandzou",
        "Manioc Sec",
        "Tubercules d'Ignames",
        "Riz de montagne",
        "Maïs",
      ],
      href: "/filtre",
      moreHref: "/filtre_result",
    },
    {
      id: "vetements",
      name: "VÊTEMENTS & CHAUSSURES",
      image: "/Photo/vetement.jpg",
      products: [
        "Vestes et Manteaux",
        "Jeans & Pantalons",
        "Pulls & Chemise",
        "Bottes",
        "Baskets",
        "Bijoux & Montres",
        "Sacs à dos",
        "Draps & Tissus",
      ],
      href: "/filtre",
      moreHref: "/filtre_plus",
    },
    {
      id: "medecine",
      name: "MÉDECINE",
      image: "/media/medecine.jpeg",
      products: [
        "Balance Pèse-Personne",
        "Thermomètre",
        "Tensiomètre",
        "Pèse-Personne",
        "Toise et Glucomètre",
        "Bistouri - Lame de bistouri",
        "Marteau à Réflexes",
        "Blouse",
      ],
      href: "/filtre",
      moreHref: "/filtre_result",
    },
  ];

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCarouselIndex(index);
  };

  return (
    <>
      {isPopupOpen && (
        <div id="popupe" className="popup_i">
          <div className="popup_i-header">
            <span className="close-btne" onClick={closePopup}>×</span>
          </div>
          <div className="popup_i-background">
            <div className="popup_i-content">
              <h2 className="title-top">Foire Numérique</h2>
              <p className="blinking-text">
                <strong>-75% De réduction !</strong>
              </p>
              <h2 className="title-bottom">EXPOSITION</h2>
              <div className="container107">
                <div className="cercle-pulsant" style={{ marginLeft: "-65px" }}></div>
                <button
                  onClick={() => (window.location.href = "/Foire")}
                  id="boutonAttention"
                  style={{ padding: "3px" }}
                >
                  Aller à la foire
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="conten col-sm-10">
        <div id="animated-section"></div>
        <div className="cont text-center">
          <h4>Découvrez nos meilleures offres adaptées à vos besoins</h4>
        </div>
        <div className="x-carousel-container">
          <button className="x-carousel-prev" onClick={handlePrev} aria-label="Précédent">◄</button>
          <div className="x-carousel-inner">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`nb col-sm-2 ml-4 text-center ${index === carouselIndex ? "block" : "hidden"}`}
              >
                <img src={category.image} alt={category.name} className="img-fluid" id="photo" />
                <br />
                <Link href={category.href} id="tit" target="_blank">
                  {category.name}
                </Link>
                <br />
                <br />
                {category.products.map((product, idx) => (
                  <React.Fragment key={idx}>
                    <Link href={category.moreHref} target="_blank">
                      {product}
                    </Link>
                    <br />
                  </React.Fragment>
                ))}
                <br />
                <Link href={category.moreHref} id="voir" target="_blank">
                  Voir plus...
                </Link>
                <br />
              </div>
            ))}
          </div>
          <button className="x-carousel-next" onClick={handleNext} aria-label="Suivant">►</button>
          <div className="carousel-dots">
            {categories.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === carouselIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDisplay;