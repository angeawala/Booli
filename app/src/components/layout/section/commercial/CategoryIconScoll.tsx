"use client";

import React, { useRef } from "react";
import Link from "next/link";

// Interface pour les catégories
interface CommercialCategory {
  id: string;
  name: string;
  icon: string;
  href: string;
}

// Liste statique des catégories basée sur votre HTML
const categories: CommercialCategory[] = [
  { id: "services", name: "Services", icon: "fas fa-concierge-bell", href: "/services_acceuil" },
  { id: "formation", name: "Formation", icon: "fas fa-chalkboard-teacher", href: "/Formation_acceuil" },
  { id: "tourisme", name: "Tourisme", icon: "fas fa-plane", href: "/Tourisme" },
  { id: "bibliotheque", name: "Bibliothèque", icon: "fas fa-book", href: "/librairie_acceuil" },
  { id: "reservation", name: "Réservation", icon: "fas fa-hotel", href: "/Reservation" },
  { id: "affiliation", name: "Affiliation", icon: "fas fa-handshake", href: "/affiliation" },
  { id: "job", name: "JOB", icon: "fas fa-briefcase", href: "/postule_acceuil" },
  { id: "soins", name: "Soins", icon: "fas fa-hospital", href: "/medecine_acceuil" },
  { id: "bourse", name: "Bourse", icon: "fab fa-cc-visa", href: "/electromenager" },
  { id: "cadeaux", name: "Cadeaux", icon: "fas fa-gift", href: "/filtre" },
  { id: "electromenager", name: "Électroménager", icon: "fas fa-tv", href: "/filtre" },
  { id: "medecine", name: "Médecine", icon: "fas fa-medkit", href: "/filtre" },
  { id: "fabricants", name: "Fabricants", icon: "fas fa-industry", href: "/maker" },
  { id: "immobilier", name: "Immobilier", icon: "fas fa-building", href: "/filtre" },
  { id: "accessoire", name: "Accessoire", icon: "fas fa-wrench", href: "/filtre" },
  { id: "electricite", name: "Électricité", icon: "fas fa-bolt", href: "/filtre" },
  { id: "machine", name: "Machine", icon: "fas fa-cogs", href: "/filtre" },
  { id: "agriculture", name: "Agriculture", icon: "fas fa-tractor", href: "/filtre" },
  { id: "sport", name: "Sport", icon: "fas fa-football-ball", href: "/filtre" },
  { id: "environnement", name: "Environnement", icon: "fas fa-leaf", href: "/filtre" },
  { id: "moto", name: "Moto", icon: "fas fa-motorcycle", href: "/filtre" },
];

const CategoryIconScroll: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section className="icone" id="icone">
      <div className="product-container col-12">
        <button
          className="scroll-btn prev-btn"
          onClick={scrollLeft}
          aria-label="Faire défiler vers la gauche"
        >
          ❮
        </button>
        <div className="product-carousel" ref={carouselRef}>
          {categories.map((category) => (
            <div className="product-item" key={category.id}>
              <Link href={category.href} prefetch={false} target="_blank">
                <i className={category.icon}></i>
                <p>{category.name}</p>
              </Link>
            </div>
          ))}
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