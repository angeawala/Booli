"use client";

import Link from "next/link";
import React from "react";

// Interface pour une catégorie/agence
interface AgencyCategory {
  id: string;
  name: string;
  image: string;
  type: string;
  domain: string;
  website: string; // Ajouté pour le bouton "Visiter le Site"
}

// Données statiques pour 12 agences
const categories: AgencyCategory[] = [
  {
    id: "bssd",
    name: "Agence BSSD",
    image: "/Photo/bssd.png",
    type: "Agence de voyage",
    domain: "Tourisme",
    website: "https://example.com/bssd",
  },
  {
    id: "hoopa",
    name: "Agence HOPA",
    image: "/Photo/hoopa.png",
    type: "Marketing",
    domain: "Marketing digital",
    website: "https://example.com/hoopa",
  },
  {
    id: "besty",
    name: "Agence BESTY",
    image: "/Photo/besty.png",
    type: "Événementiel",
    domain: "Organisation d'événements",
    website: "https://example.com/besty",
  },
  {
    id: "horizon",
    name: "Agence Horizon",
    image: "/Photo/bssd.png", // Réutilisation d'une image existante
    type: "Agence de voyage",
    domain: "Tourisme",
    website: "https://example.com/horizon",
  },
  {
    id: "nova",
    name: "Agence Nova",
    image: "/Photo/hoopa.png", // Réutilisation d'une image existante
    type: "Marketing",
    domain: "Publicité",
    website: "https://example.com/nova",
  },
  {
    id: "eclat",
    name: "Agence Éclat",
    image: "/Photo/besty.png", // Réutilisation d'une image existante
    type: "Événementiel",
    domain: "Événements",
    website: "https://example.com/eclat",
  },
  {
    id: "lumiere",
    name: "Agence Lumière",
    image: "/Photo/bssd.png", // Réutilisation
    type: "Marketing",
    domain: "Création de contenu",
    website: "https://example.com/lumiere",
  },
  {
    id: "voyageplus",
    name: "Agence VoyagePlus",
    image: "/Photo/hoopa.png", // Réutilisation
    type: "Agence de voyage",
    domain: "Tourisme",
    website: "https://example.com/voyageplus",
  },
  {
    id: "festivita",
    name: "Agence Festivita",
    image: "/Photo/besty.png", // Réutilisation
    type: "Événementiel",
    domain: "Organisation d'événements",
    website: "https://example.com/festivita",
  },
  {
    id: "dynamique",
    name: "Agence Dynamique",
    image: "/Photo/bssd.png", // Réutilisation
    type: "Marketing",
    domain: "Stratégie digitale",
    website: "https://example.com/dynamique",
  },
  {
    id: "aventure",
    name: "Agence Aventure",
    image: "/Photo/hoopa.png", // Réutilisation
    type: "Agence de voyage",
    domain: "Tourisme",
    website: "https://example.com/aventure",
  },
  {
    id: "prestige",
    name: "Agence Prestige",
    image: "/Photo/besty.png", // Réutilisation
    type: "Événementiel",
    domain: "Événements haut de gamme",
    website: "https://example.com/prestige",
  },
];

const AgencySection: React.FC = () => {
  return (
    <section className="produ-grid col-12 px-4" id="greatmarket">
      <div className="col-12 text-center">
        <h3>Continuez l'exploration</h3>
      </div>
      <div className="boutiques">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/store/agences/${category.id}`}
            className="boutique"
          >
            <img src={category.image} alt={category.name} />
            <div className="boutique-info">
              <h2>{category.name}</h2>
              <p>{category.type}</p>
              <p>{category.domain}</p>
              <Link href={category.website} className="visit-site-btn">
                Visiter le Site
              </Link>
            </div>
          </Link>
        ))}
      </div>
      <div >
        <Link href="/store/agences" className="View_more">
          Voir plus
        </Link>
      </div>
    </section>
  );
};

export default AgencySection;