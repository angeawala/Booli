"use client";

import React from "react";
import { useNonTechCategories } from "@/hooks/useNonTechCategories";
import Link from "next/link";
import { CommercialCategory } from "@/types/commercial_products";

const NonTechCategories: React.FC = () => {
  const { nonTechCategories, loading, error } = useNonTechCategories();

  return (
    <section className="comm">
      <div className="titre col-12 mt-4 text-center">
        <h3 className="hddi">@---- Catégories ----@</h3>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>Erreur : {error}</p>
      ) : nonTechCategories.length === 0 ? (
        <p>Aucune catégorie non technique disponible</p>
      ) : (
        <>
          {/* Section-categorie 1 */}
          <section className="dh col-12">
            <div className="produc-grid">
              {nonTechCategories.slice(0, 3).map((category: CommercialCategory) => (
                <div className="product-iteme" key={category.id}>
                  <div className="image-containe">
                    <Link href={`/store/product/filter?category=${category.id}`} prefetch={false}>
                      <img
                        className="produc-image"
                        id={`category-${category.id}`} // ID basé sur category.id
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
              {nonTechCategories.slice(3, 6).map((category: CommercialCategory) => (
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
              {nonTechCategories.slice(6, 9).map((category: CommercialCategory) => (
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
        </>
      )}
    </section>
  );
};

export default NonTechCategories;