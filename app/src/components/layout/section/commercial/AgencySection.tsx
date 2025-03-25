// components/AgencySection.tsx
"use client";

import Link from "next/link";
import { useAgencySection } from "@/hooks/useAgencySection";

const AgencySection: React.FC = () => {
  const { categories, loading, error } = useAgencySection();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <section className="produ-grid col-12 px-4" id="greatmarket">
      <div className="col-12 text-center">
        <h3>Continuez l&apos;exploration</h3>
      </div>
      <div className="boutiques">
        {categories.map((category) => (
          <Link key={category.id} href={`/store/agences/${category.id}`} className="boutique">
            <img src={category.image} alt={category.name} />
            <div className="boutique-info">
              <h2>{category.name}</h2>
              <p>Type : {category.type}</p>
              <p>Domaine : {category.domain}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link href="#" className="View_more">Voir plus</Link>
    </section>
  );
};

export default AgencySection;