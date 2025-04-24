"use client";

import React from "react";
import Link from "next/link";

// Interface pour une boutique
interface Shop {
  id: string;
  image: string;
  description: string;
  email: string;
  contact: string;
  average_rating: number;
  rating_count: number;
}

// Données statiques basées sur l'HTML
const shops: Shop[] = [
  {
    id: "shop1",
    image: "/Photo/fruit1",
    description: "Produits frais et naturel",
    email: "contact@fruitsfrais.com",
    contact: "+237 600 000 001",
    average_rating: 4.8,
    rating_count: 120,
  },
  {
    id: "shop2",
    image: "/Photo/cereal1.jpg",
    description: "Céréales",
    email: "contact@cereales.com",
    contact: "+237 600 000 002",
    average_rating: 4.8,
    rating_count: 110,
  },
  {
    id: "shop3",
    image: "/Photo/légume1.jpg",
    description: "Légumes & épiceries",
    email: "contact@legumes.com",
    contact: "+237 600 000 003",
    average_rating: 4.2,
    rating_count: 130,
  },
  {
    id: "shop4",
    image: "/Photo/huile.jpg",
    description: "Huiles de cuisine",
    email: "contact@huiles.com",
    contact: "+237 600 000 004",
    average_rating: 4.8,
    rating_count: 120,
  },
  {
    id: "shop5",
    image: "/Photo/ordi2.jpg",
    description: "PC portable",
    email: "contact@pcportable.com",
    contact: "+237 600 000 005",
    average_rating: 4.8,
    rating_count: 105,
  },
  {
    id: "shop6",
    image: "/Photo/gadget.jpg",
    description: "Gadgets divers",
    email: "contact@gadgets.com",
    contact: "+237 600 000 006",
    average_rating: 4.2,
    rating_count: 100,
  },
  {
    id: "shop7",
    image: "/Photo/ordi3.jpg",
    description: "PC Bureau & Accessoir",
    email: "contact@pcbureau.com",
    contact: "+237 600 000 007",
    average_rating: 4.8,
    rating_count: 120,
  },
  {
    id: "shop8",
    image: "/Photo/DISK.jpg",
    description: "Disque dur pour PC",
    email: "contact@diskdur.com",
    contact: "+237 600 000 008",
    average_rating: 3.8,
    rating_count: 120,
  },
  {
    id: "shop9",
    image: "/Photo/pince.jpg",
    description: "Accessoir Électricité",
    email: "contact@accessoireselectricite.com",
    contact: "+237 600 000 009",
    average_rating: 4.8,
    rating_count: 120,
  },
];

const ShopSection: React.FC = () => {
  return (
    <section className="produ-grid col-12 px-4 pixa" id="greatmarket1">
      <div className="col-12 text-center">
        <h3 className="hdde hddi-responsive">Boutiques officielles</h3>
      </div>
      <div className="shopGrid">
        {shops.map((shop) => (
          <div className="shopCard" key={shop.id}>
            <img
              src={shop.image || "/Photo/placeholder.jpg"}
              alt={`Boutique ${shop.description}`}
            />
            <h3>{shop.description}</h3>
            <div className="detail1">
              <p>
                <strong>Email :</strong> {shop.email}
              </p>
              <p>
                <strong>Contact :</strong> {shop.contact}
              </p>
              <p>
                <strong>Avis :</strong> {shop.average_rating}/5 (
                {shop.rating_count} avis)
              </p>
            </div>
            <span className="price">Négociable</span>
            <a href={`/boutique/${shop.id}`} className="shopButton">
              Visiter
            </a>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <Link href="/boutiques" className="View_more">
          Voir plus
        </Link>
      </div>
    </section>
  );
};

export default ShopSection;