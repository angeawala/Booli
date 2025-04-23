"use client";

import React from "react";
import Link from "next/link";

// Interface pour une catégorie commerciale
interface CommercialCategory {
  id: string;
  name: string;
  image: string;
}

// Données statiques basées sur l'HTML
const nonTechCategories: CommercialCategory[] = [
  {
    id: "electromenager",
    name: "Électroménager",
    image: "/Photo/tech1.jpg",
  },
  {
    id: "informatique",
    name: "Informatique",
    image: "/Photo/informatique.jpg",
  },
  {
    id: "cereales",
    name: "Matière Première",
    image: "/Photo/mais.jpg",
  },
  {
    id: "bijouterie",
    name: "Bijouterie",
    image: "/Photo/objet_precieux.jpg",
  },
  {
    id: "sport",
    name: "Sport",
    image: "/Photo/sport.jpg",
  },
  {
    id: "medecine",
    name: "Médecine",
    image: "/Photo/medecine.jpg",
  },
  {
    id: "maison_jardin",
    name: "Réservation",
    image: "/Photo/house.jpg",
  },
  {
    id: "tv_hitech",
    name: "Télévision et Accessoire",
    image: "/Photo/tv.jpg",
  },
  {
    id: "mode",
    name: "Mode",
    image: "/Photo/mode.jpg",
  },
];

const NonTechCategories: React.FC = () => {
  return (
    <section className="comm">
      <div className="titre col-12 mt-4 text-center">
        <h3 className="hddi hddi-responsive">@---- Catégories ----@</h3>
      </div>

      {nonTechCategories.length === 0 ? (
        <p>Aucune catégorie non technique disponible</p>
      ) : (
        <>
          {/* Section-categorie 1 */}
          <section className="dh col-12">
            <div className="produc-grid">
              {nonTechCategories.slice(0, 3).map((category) => (
                <div className="product-iteme" key={category.id}>
                  <div className="image-containe">
                    <Link href={`/store/product/filter?category=${category.id}`} prefetch={false}>
                      <img
                        className="produc-image"
                        id={`category-${category.id}`}
                        src={category.image || "/Photo/default.jpg"}
                        alt={category.name}
                      />
                      <div className="overlay-text">{category.name}</div>
                    </Link>
                  </div>
                  <span className="lien">{category.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section-categorie 2 */}
          <section className="dh col-12">
            <div className="produc-grid">
              {nonTechCategories.slice(3, 6).map((category) => (
                <div className="product-iteme" key={category.id}>
                  <div className="image-containe">
                    <Link href={`/store/product/filter?category=${category.id}`} prefetch={false}>
                      <img
                        className="produc-image"
                        id={`category-${category.id}`}
                        src={category.image || "/Photo/default.jpg"}
                        alt={category.name}
                      />
                      <div className="overlay-text">{category.name}</div>
                    </Link>
                  </div>
                  <span className="lien">{category.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section-categorie 3 */}
          <section className="dh col-12">
            <div className="produc-grid">
              {nonTechCategories.slice(6, 9).map((category) => (
                <div className="product-iteme" key={category.id}>
                  <div className="image-containe">
                    <Link href={`/store/product/filter?category=${category.id}`} prefetch={false}>
                      <img
                        className="produc-image"
                        id={`category-${category.id}`}
                        src={category.image || "/Photo/default.jpg"}
                        alt={category.name}
                      />
                      <div className="overlay-text">{category.name}</div>
                    </Link>
                  </div>
                  <span className="lien">{category.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Lien "Voir plus" centré */}
          <div style={{ textAlign: "center" }}>
            <Link href="/store/categories" className="View_more">
              Voir plus
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default NonTechCategories;