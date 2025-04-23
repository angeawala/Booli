"use client";

import Link from "next/link";
import React from "react";

// Interface pour un produit
interface Product {
  id: string;
  name: string;
  image: string;
  avgRating: number;
  reviews: number;
  prix_normal: number;
  bestPrixEngros: number;
  description: string;
}

// Interface pour une section de produits
interface Section {
  products: Product[];
}

// Données statiques pour 9 produits
const sections: Section[] = [
  {
    products: [
      {
        id: "riz",
        name: "Sacs de riz",
        image: "/Photo/riz7.jpeg",
        avgRating: 5,
        reviews: 99,
        prix_normal: 30000,
        bestPrixEngros: 25000,
        description: "Disponible des céréales",
      },
      {
        id: "pc",
        name: "Ordinateur",
        image: "/Photo/pc2.jpeg",
        avgRating: 3,
        reviews: 75,
        prix_normal: 450000,
        bestPrixEngros: 400000,
        description: "Ordinateur toutes marques disponibles",
      },
      {
        id: "valises",
        name: "Valises et sacs",
        image: "/Photo/tab2.jpeg",
        avgRating: 3,
        reviews: 60,
        prix_normal: 12000,
        bestPrixEngros: 8000,
        description: "Disponible des sacs et valises",
      },
    ],
  },
  {
    products: [
      {
        id: "scooter",
        name: "Scooter",
        image: "/Photo/scooter.jpeg",
        avgRating: 4,
        reviews: 88,
        prix_normal: 800000,
        bestPrixEngros: 750000,
        description: "Scooter (Moto électrique)",
      },
      {
        id: "chaussures",
        name: "Chaussures",
        image: "/Photo/chf2.jpeg",
        avgRating: 3,
        reviews: 70,
        prix_normal: 12000,
        bestPrixEngros: 9000,
        description: "Chaussures pour Femme",
      },
      {
        id: "fonio",
        name: "Fonio",
        image: "/Photo/fonio.jpeg",
        avgRating: 2,
        reviews: 30,
        prix_normal: 1500,
        bestPrixEngros: 1200,
        description: "FONIO",
      },
    ],
  },
  {
    products: [
      {
        id: "televiseur",
        name: "Téléviseur",
        image: "/Photo/riz7.jpeg", // Réutilisation d'une image existante
        avgRating: 4,
        reviews: 85,
        prix_normal: 250000,
        bestPrixEngros: 220000,
        description: "Téléviseurs LED toutes tailles",
      },
      {
        id: "cuisiniere",
        name: "Cuisinière",
        image: "/Photo/pc2.jpeg", // Réutilisation d'une image existante
        avgRating: 3,
        reviews: 50,
        prix_normal: 150000,
        bestPrixEngros: 130000,
        description: "Cuisinières à gaz modernes",
      },
      {
        id: "maize",
        name: "Maïs",
        image: "/Photo/tab2.jpeg", // Réutilisation d'une image existante
        avgRating: 4,
        reviews: 65,
        prix_normal: 2000,
        bestPrixEngros: 1800,
        description: "Maïs de qualité supérieure",
      },
    ],
  },
];

const EngrosSection: React.FC = () => {
  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <>
      <div className="slc justify-content-center">
        <h2 className="hddi hddi-responsive">
          <em>Ventes en gros !</em>
        </h2>
      </div>

      {sections.map((section, index) => (
        <section key={index} className="pu col-12">
          <div className="product-grid">
            {section.products.map((product) => (
              <div key={product.id} className="product-iteme">
                <div className="image-container">
                  <Link
                    href={`/store/product/${product.id}`}
                    className="price-link"
                    target="_blank"
                  >
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="overlay-text">{product.name}</div>
                  </Link>
                </div>
                <span style={{ color: "orange" }}>
                  {renderStars(product.avgRating)} ({product.reviews})
                </span>
                <span className="old-price">{product.prix_normal.toLocaleString()} CFA</span>
                <span className="new-price">{product.bestPrixEngros.toLocaleString()} CFA</span>
                <br />
                <span className="lien">{product.description}</span>
                <Link
                  href="/Affichage_des_produits"
                  className="add-to-cart-btn"
                  target="_blank"
                >
                  <i className="fas fa-cart-plus"></i> Ajoutez au panier
                </Link>
                <button
                  className="add-to-cart-btn"
                  style={{ backgroundColor: "rgb(5, 146, 68)", border: "1px solid #fff" }}
                  onClick={() => (window.location.href = "/connexion_client")}
                >
                  Discuter maintenant
                </button>
                <Link href="/maker" id="page_plus">
                  Voir ce stock
                </Link>
              </div>
            ))}
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${(index + 1) * 33}%` }}
              ></div>
            </div>
          </div>
        </section>
      ))}
      <div style={{ textAlign: "center" }}>
        <Link href="/store/engros" className="View_more">
          Voir plus
        </Link>
      </div>
    </>
  );
};

export default EngrosSection;