"use client";

import React from "react";
import { useCategoryIcons } from "@/hooks/useCategoryIcons";
import Link from "next/link";
import { CommercialCategory } from "@/types/commercial_products";

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
          ) : categories.length === 0 ? (
            <p>Aucune catégorie disponible</p>
          ) : (
            categories.map((category: CommercialCategory) => (
              <div className="product-item" key={category.id}>
                <Link href={`/store/product/filter?category=${category.id}`} prefetch={false}>
                  {category.icon ? (
                    <i className={category.icon}></i>
                  ) : (
                    <i className="fas fa-question"></i> // Icône par défaut
                  )}
                  <p>{category.name}</p>
                </Link>
              </div>
            ))
          )}
        </div>
        <button
          className="scroll-btn next-btn"
          onClick={scrollRight}
          aria-label="Faire défiler vers la droite"
        >
          ❯
        </button>
      </div>
    </section>
  );
};

export default CategoryIconScroll;