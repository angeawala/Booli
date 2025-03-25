// app/store/agences/[categoryId]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useAgencies } from "@/hooks/useAgencies";
import AgencyList from "@/components/layout/section/AgencyList";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";
import { Category } from "@/types/agency";
import SignInOrLogout from "@/components/links/SignInOrLogout";

const AgencyCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { agencies, categories, loading, error } = useAgencies(categoryId as string);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <>
      <section className="agencyprince">
        <div className="agence pt-2">
          <h1>
            Experts (Entreprises, Agences, ONG...) -{" "}
            {categories.find((c: Category) => c.id === categoryId)?.name || "Catégorie"}
          </h1>
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

export default AgencyCategoryPage;