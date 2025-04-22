"use client";

import React, { useState } from "react";

const CategoryCatalog: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const catalogItems = [
    { name: "Santé, Beauté", image: "/Photo/beauté.jpg", href: "/maker" },
    { name: "Bébé & Jouet", image: "/Photo/bébé.jpg", href: "/maker" },
    { name: "Vêtements", image: "/Photo/tissu.jpg", href: "/maker" },
    { name: "Chaussures", image: "/Photo/ch6.jpg", href: "/maker" },
    { name: "Électroménager", image: "/Photo/decoration.jpg", href: "/maker" },
    { name: "Artisanat", image: "/Photo/resource.jpg", href: "/maker" },
    { name: "Agriculture", image: "/Photo/agriculture.jpg", href: "/maker" },
    { name: "Matière Première", image: "/Photo/mpremiere.jpg", href: "/maker" },
    { name: "Bricolage", image: "/Photo/bricolage.jpg", href: "/maker" },
    { name: "Immobilier", image: "/Photo/immobilier.jpg", href: "/maker" },
    { name: "Informatique", image: "/Photo/informatique.jpg", href: "/maker" },
    { name: "Électronique", image: "/Photo/electronique.jpg", href: "/maker" },
    { name: "Industriel", image: "/Photo/industrie.jpg", href: "/maker" },
    { name: "Pharmacopée", image: "/Photo/choix_produit.jpg", href: "/maker" },
    { name: "Maison & Bureau", image: "/Photo/bureau.jpg", href: "/maker" },
    { name: "Médecine", image: "/Photo/medecine.jpg", href: "/maker" },
    { name: "Fourniture", image: "/Photo/fourniture.jpg", href: "/maker" },
    { name: "Sécurité", image: "/Photo/securité.jpg", href: "/maker" },
    { name: "Bijouterie", image: "/Photo/bijoux.jpg", href: "/maker" },
    { name: "Boisson", image: "/Photo/boisson.jpg", href: "/maker" },
    { name: "Pharmacie", image: "/Photo/pharmacie.jpg", href: "/maker" },
  ];

  return (
    <section className="cathalogues">
      <div className="catha row col-12">
        <div className="arti col-sm-4">
          <div className="catalog-icon" id="catalog-icon" onClick={toggleModal}>
            <i className="fas fa-bars" style={{ fontSize: "2em", marginTop: "10px", color: "#004353" }}></i>
            <span className="catalog-text animate4">Catalogues</span>
          </div>

          {isModalOpen && (
            <div className="modal" id="catalog-modal" style={{ display: "block" }}>
              <div className="modal-content">
                <span className="close-button" id="close-button" onClick={toggleModal}>×</span>
                <h2>CATALOGUES</h2>
                <ul className="catalog-list">
                  {catalogItems.map((item, index) => (
                    <li key={index}>
                      <a href={item.href} target="_blank">
                        <img src={item.image} alt={item.name} />
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="plus col-sm-6">
          <div className="most-searched-products">
            <h5>Rechercher(+):</h5>
            <div className="product col-sm-1">
              <a href="/services" target="_blank">Services</a>
            </div>
            <div className="product col-sm-1">
              <a href="/filtre" target="_blank">Vêtements</a>
            </div>
            <div className="product col-sm-1">
              <a href="/filtre" target="_blank">TIC</a>
            </div>
          </div>
        </div>

        <div className="download col-sm-2 mt-3">
          <a href="#" target="_blank">
            <i className="fas fa-download"></i> Télécharger l’Application
          </a>
        </div>
      </div>
    </section>
  );
};

export default CategoryCatalog;