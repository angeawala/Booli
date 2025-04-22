// SearchBar.tsx
"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useLibrary } from "@/hooks/useLibrary";

const SearchBar: React.FC = () => {
  const { getBooks, loading, error } = useLibrary();
  const bookCategories = useSelector((state: RootState) => state.books.categories);

  const [searchValue, setSearchValue] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const timeoutIdRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const words = useMemo(
    () => [
      "Rechercher des : Bandes Dessinées",
      "Épreuves",
      "Livres",
      "Romans aux programmes",
      "Livres de Sciences et cultures africaines",
      "Bouquets d'histoires",
      "Formations",
      "Loisirs",
      "Journaux & Revues",
      "Ateliers de formation",
    ],
    []
  );

  useEffect(() => {
    let index = 0;
    setPlaceholder(words[index]);
    const interval = setInterval(() => {
      index = (index + 1) % words.length;
      setPlaceholder(words[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);

      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        console.log("Recherche déclenchée avec q :", value);
        getBooks({ q: value, limit: 12, offset: 0 }).catch((err) =>
          console.error("Erreur dans handleSearch :", err)
        );
      }, 500);
    },
    [getBooks]
  );

  const handleFilter = useCallback(
    (filters: {
      q?: string;
      genre?: string;
      has_pdf?: boolean;
      ordering?: "name" | "-name" | "prix_normal" | "-prix_normal" | "prix_reduit" | "-prix_reduit" | "parution" | "-parution" | "pages" | "-pages" | "created_at" | "-created_at";
    }) => {
      console.log("Filtre appliqué :", filters);
      getBooks({ ...filters, limit: 12, offset: 0 }).catch((err) =>
        console.error("Erreur dans handleFilter :", err)
      );
    },
    [getBooks]
  );

  // Typage explicite des options de tri
  const sortOptions = useMemo<
    { label: string; value: "name" | "-name" | "prix_normal" | "-prix_normal" | "prix_reduit" | "-prix_reduit" | "parution" | "-parution" | "pages" | "-pages" | "created_at" | "-created_at" }[]
  >(
    () => [
      { label: "Par Nom (A-Z)", value: "name" },
      { label: "Par Nom (Z-A)", value: "-name" },
      { label: "Prix Normal (croissant)", value: "prix_normal" },
      { label: "Prix Normal (décroissant)", value: "-prix_normal" },
      { label: "Prix Réduit (croissant)", value: "prix_reduit" },
      { label: "Prix Réduit (décroissant)", value: "-prix_reduit" },
      { label: "Date de Parution (récent)", value: "-parution" },
      { label: "Date de Parution (ancien)", value: "parution" },
      { label: "Nombre de Pages (croissant)", value: "pages" },
      { label: "Nombre de Pages (décroissant)", value: "-pages" },
    ],
    []
  );

  return (
    <section className="search-bar-container" id="xxl">
      <div className="search-bar-wrapper">
        <input
          type="text"
          id="searchInput"
          className="search-bar"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearch}
          disabled={loading}
        />
        <button className="search-btn" disabled={loading}>
          <i className="fas fa-search"></i>
        </button>
      </div>
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur : {error}</p>}
      <div className="dropdown">
        <button className="dropdown-btn categorie-btn" disabled={loading}>
          <i className="fas fa-list"></i> Catégories
        </button>
        <div className="dropdown-content categorie-menu ml-2">
          <a href="#" onClick={() => handleFilter({ has_pdf: true })}>
            <i className="fa-solid fa-door-open icon open"></i> Avec PDF
          </a>
          <a href="#" onClick={() => handleFilter({ has_pdf: false })}>
            <i className="fa-solid fa-door-closed icon closed"></i> Sans PDF
          </a>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropdown-btn filter-btn" disabled={loading}>
          <i className="fas fa-filter"></i> Filtrer par Genre
        </button>
        <div className="dropdown-content filter-menu">
          {bookCategories.length > 0 ? (
            bookCategories.map((category) => (
              <a key={category.id} href="#" onClick={() => handleFilter({ genre: category.name })}>
                <i className="fa-solid fa-book"></i> {category.name}
              </a>
            ))
          ) : (
            <p>Aucune catégorie disponible</p>
          )}
        </div>
      </div>
      <div className="dropdown">
        <button className="dropdown-btn sort-btn" disabled={loading}>
          <i className="fas fa-sort"></i> Trier
        </button>
        <div className="dropdown-content sort-menu">
          {sortOptions.map((option) => (
            <a key={option.value} href="#" onClick={() => handleFilter({ ordering: option.value })}>
              <i className="fa-solid fa-sort"></i> {option.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchBar;