// components/EngrosSection.tsx
"use client";

import Link from "next/link";
import { useEngrosSection } from "@/hooks/useEnGrosSection";

const EngrosSection: React.FC = () => {
  const { sections, loading, error } = useEngrosSection();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <>
      {sections.map((section, index) => (
        <section key={index} className="pu col-12">
          <div className="product-grid">
            {section.map((product) => (
              <div key={product.id} className="product-iteme">
                <div className="image-container">
                  <Link href={`/store/product/${product.id}`} className="price-link" target="_blank">
                    <img className="product-image" src={product.image} alt={product.name} />
                    <div className="overlay-text">{product.name}</div>
                  </Link>
                </div>
                <span style={{ color: "orange" }}>
                  {renderStars(product.avgRating)} ({product.reviews.length})
                </span>
                <span className="old-price">{product.prix_normal.toLocaleString()} CFA</span>
                <span className="new-price">{product.bestPrixEngros.toLocaleString()} CFA</span>
                <br />
                <span className="lien">{product.description}</span>
                <button
                  className="add-to-cart-btn"
                  style={{ backgroundColor: "rgb(5, 146, 68)", border: "1px solid #fff" }}
                  onClick={() => (window.location.href = "/connexion_client")}
                >
                  Discuter maintenant
                </button>
                <Link href="/maker" id="page_plus">Voir ce stock</Link>
              </div>
            ))}
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(index + 1) * 33}%` }}></div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default EngrosSection;