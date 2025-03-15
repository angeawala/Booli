import React from "react";
import { useCategoryIcons } from "@/hooks/useCategoryIcons";

const CategoryIconScroll: React.FC = () => {
  const { categories, loading, error } = useCategoryIcons();

  const scrollRight = () => {
    const container = document.querySelector(".product-carousel");
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section className="icone" id="icone">
      <div className="product-container col-12">
        <div className="product-carousel">
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>Erreur : {error}</p>
          ) : (
            categories.map((category) => (
              <div className="product-item" key={category.id}>
                <a href={`/product/filtre?types=categoryid=${category.id}`} target="_blank">
                  {/* Utilisation de l'icône de la catégorie */}
                  {category.icon ? (
                    <i className={category.icon}></i>
                  ) : (
                    <i className="fas fa-question"></i> // Icône par défaut si aucune icône
                  )}
                  <p>{category.name}</p>
                </a>
              </div>
            ))
          )}
        </div>
        <button className="scroll-btn next-btn" onClick={scrollRight}>
          ❯
        </button>
      </div>
    </section>
  );
};

export default CategoryIconScroll;