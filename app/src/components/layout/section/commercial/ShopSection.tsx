"use client";

import React from "react";
import { useShops } from "@/hooks/useShops";
import "@/styles/ShpSection.css";

const ShopSection: React.FC = () => {
  const { shops, loading, error } = useShops();

  if (loading) return <p>Chargement des boutiques...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <section className="produ-grid col-12 px-4 pixa" id="greatmarket1">
      <div className="col-12 text-center">
        <h3 className="hdde">Boutiques officielles</h3>
      </div>
      <div className="shopGrid">
        {shops.map((shop) => (
          <div className="shopCard" key={shop.id}>
            <img src={shop.image || "/Photo/placeholder.jpg"} alt={`Boutique ${shop.description}`} />
            <h3>{shop.description}</h3>
            <div className="detail1">
              <p><strong>Email :</strong> {shop.email}</p>
              <p><strong>Contact :</strong> {shop.contact}</p>
              <p><strong>Avis :</strong> {shop.average_rating}/5 ({shop.rating_count} avis)</p>
            </div>
            <span className="price">Négociable</span> {/* Pas de champ "price" dans ShopSerializer */}
            <a href={`/boutique/${shop.id}`} className="shopButton">Visiter</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopSection;