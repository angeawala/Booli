"use client";

import React, { useState, useEffect } from "react";
import { usePromotions } from "@/hooks/usePromotions";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

const PromotionSection: React.FC = () => {
  const { promotions, loading, error } = usePromotions();
  const { addItem } = useCart();
  const [timers, setTimers] = useState<{ [key: string]: string }>({});

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = promotions.reduce((acc, promo) => {
        const remainingSeconds = Math.max(0, Math.floor((new Date(promo.endTime).getTime() - Date.now()) / 1000));
        acc[promo.id] = formatTime(remainingSeconds);
        return acc;
      }, {} as { [key: string]: string });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [promotions]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  const handleAddToCart = (productId: string) => {
    addItem(productId, undefined, 1); // Ajoute la première variante par défaut
  };

  return (
    <section className="produ-grid col-12 px-4" id="Publicite">
      <div className="col-12 text-center">
        <h3 className="hddi">Profitez de nos meilleures offres</h3>
      </div>

      {promotions.map((promo, index) => (
        <React.Fragment key={promo.id}>
          {(index === 5 || index === 10 || index === 15 || index === 20 || index === 25 || index === 30) && (
            <div className="barre-decompte">
              <p>Temps restant : Profitez-en !</p>
              <div className="minuteur" data-time={Math.floor((new Date(promo.endTime).getTime() - Date.now()) / 1000)}>
                {timers[promo.id] || "00:00:00"}
              </div>
            </div>
          )}
          <div className="produ-iteme">
            <div className="image-contai">
              <div className="new-badge">-{promo.discountPercentage}% Profiter</div>
              <Link href={`/store/product/${promo.product.id}`} className="price-link">
                <img className="produ-image" src={promo.product.image} alt={promo.product.name} />
              </Link>
            </div>
            <span className="old-price">{promo.oldPrice} CFA</span>
            <span className="new-price">{promo.newPrice} CFA</span>
            <br />
            <span className="lien">{promo.product.name}</span>
            <Link href={`/store/product/${promo.product.id}`} className="details">
              <i className="fas fa-info-circle"></i> Détails
            </Link>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(promo.product.id)}>
              <i className="fas fa-cart-plus"></i> Ajouter au panier
            </button>
            <Link href="/store/filter" id="page_plus">
              Voir plus
            </Link>
          </div>
        </React.Fragment>
      ))}
    </section>
  );
};

export default PromotionSection;