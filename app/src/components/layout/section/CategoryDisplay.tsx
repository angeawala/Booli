"use client";

import React, { useState } from "react";
import { useCategoryDisplay } from "@/hooks/useCategoryDisplay";

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
                  onClick={() => (window.location.href = "Foire.html")}
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
          <h4>Découvrez nos meilleurs offres adaptés à vos besoins</h4>
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p>Erreur : {error}</p>
        ) : (
          categories.map((category) => {
            const categoryProducts = productsByCategory[category.id] || [];
            const displayedProducts = categoryProducts.slice(0, 8); // 8 produits max par catégorie

            return (
              <div key={category.id} className="nb col-sm-2 ml-4 text-center">
                <img
                  src={category.image || "/Photo/default.jpg"}
                  alt={category.name}
                  className="img-fluid"
                  id="photo"
                />
                <br />
                <a href={`/filtre.html?category_id=${category.id}`} id="tit" target="_blank">
                  {category.name.toUpperCase()}
                </a>
                <br />
                <br />
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((product) => (
                    <React.Fragment key={product.id}>
                      <a
                        href={`/filtre_result.html?category_id=${category.id}&product_name=${encodeURIComponent(product.name)}`}
                        target="_blank"
                      >
                        {product.name}
                      </a>
                      <br />
                    </React.Fragment>
                  ))
                ) : (
                  <p>Aucun produit disponible</p>
                )}
                <br />
                <a href={`/filtre_result.html?category_id=${category.id}`} id="voir" target="_blank">
                  Voir plus...
                </a>
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