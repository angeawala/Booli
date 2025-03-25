"use client";

import React, { useState } from "react";
import { useCategoryDisplay } from "@/hooks/useCategoryDisplay";
import Link from "next/link";

const CategoryDisplay: React.FC = () => {
  const { categories, productsByCategory, loading, error } = useCategoryDisplay(8);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const closePopup = () => setIsPopupOpen(false);

  console.log("CategoryDisplay:", { categories, productsByCategory, loading, error });

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
                  onClick={() => (window.location.href = "/store/product/filter")} // Redirection vers la page de filtre générale
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

        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p>Erreur : {error}</p>
        ) : categories.length === 0 ? (
          <p>Aucune catégorie disponible</p>
        ) : (
          categories.map((category) => {
            const categoryProducts = productsByCategory[category.id] || [];
            return (
              <div key={category.id} className="nb col-sm-2 ml-4 text-center">
                <img
                  src={category.image || "/Photo/default.jpg"}
                  alt={category.name}
                  className="img-fluid"
                  id="photo"
                />
                <br />
                <Link href={`/store/product/filter?category=${category.id}`} id="tit">
                  {category.name.toUpperCase()}
                </Link>
                <br />
                <br />
                {categoryProducts.length > 0 ? (
                  categoryProducts.map((product) => (
                    <React.Fragment key={product.id}>
                      <Link href={`/store/product/${product.id}`}>
                        {product.name}
                      </Link>
                      <br />
                    </React.Fragment>
                  ))
                ) : (
                  <p>Aucun produit disponible</p>
                )}
                <br />
                <Link href={`/store/product/filter?category=${category.id}`} id="voir">
                  Voir plus...
                </Link>
                <br />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default CategoryDisplay;