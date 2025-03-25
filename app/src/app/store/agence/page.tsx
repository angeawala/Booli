// pages/store/agences/index.tsx
"use client";

import React from "react";
import { useAgencies } from "@/hooks/useAgencies";
import AgencyList from "@/components/layout/section/AgencyList";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";
import SignInOrLogout from "@/components/links/SignInOrLogout";

const AgenciesPage: React.FC = () => {
  const { agencies, categories, loading, error } = useAgencies();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <>
      <section className="agencyprince">
        <div className="agence pt-2">
          <h1>Experts (Entreprises, Agences, ONG...)</h1>
          <Link href="#" className="more-link">
            Afficher plus d&apos; entreprises →
          </Link>
          <CategoryFilter categories={categories} />
          <AgencyList agencies={agencies} />
        </div>
      </section>
      <footer className="indx_footer" style={{ backgroundColor: "#2d132c" }}>
        <div className="pied_de_page col-12 mt-4 text-center">
          <a href="store/product">BOOLi.world</a>
          <br />
          <a href="/comment">Suggestion</a> | <SignInOrLogout/> |{" "}
          <a href="/Partenaiat.html">Partenaire</a> |{" "}
          <a href="politique/">Politique et Confidentialité</a>
          <br />
          <a href="help/">FAQ</a> | <a href="">Entreprise</a> |{" "}
          <a href="home/contact">Contact</a> | <a href="/Forum.html">Forum</a>
        </div>
      </footer>
    </>
  );
};

export default AgenciesPage;