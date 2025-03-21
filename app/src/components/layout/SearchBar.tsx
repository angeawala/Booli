"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useLibrary } from "@/hooks/useLibrary";
import debounce from "lodash/debounce";

const SearchBar: React.FC = () => {
  const { getBooks, loading, error } = useLibrary();
  const bookCategories = useSelector((state: RootState) => state.category.bookCategories);
  const [searchValue, setSearchValue] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const words = useMemo(
    () => [
      "Rechercher des : Bandes Déssinés",
      "Epreuves",
      "Livres",
      "Romans aux programmes",
      "Livres de Sciences et cultures africaines",
      "Bouquets d'histoires",
      "Formations",
      "Loisires",
      "Journeaux & Revu",
      "Atelier de formation",
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

  // Fonction de recherche avec debounce inline
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);

      const debouncedFetch = debounce(async () => {
        console.log("Recherche déclenchée avec :", value);
        try {
          await getBooks({ q: value, limit: 12, offset: 0 });
        } catch (err) {
          console.error("Erreur lors de la recherche :", err);
        }
      }, 500);

      debouncedFetch();
    },
    [getBooks] // Dépendance explicite
  );

  // Fonction de filtrage avec dépendance explicite
  const handleFilter = useCallback(
    (filters: { q?: string; genre?: string; ordering?: string; is_free?: boolean; subscription?: boolean }) => {
      console.log("Filtre appliqué :", filters);
      (async () => {
        try {
          await getBooks({ ...filters, limit: 12, offset: 0 });
        } catch (err) {
          console.error("Erreur lors du filtrage :", err);
        }
      })();
    },
    [getBooks] // Dépendance explicite
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
          <a href="#" onClick={() => handleFilter({ is_free: true })}>
            <i className="fa-solid fa-door-open icon open"></i> Gratuit
          </a>
          <a href="#" onClick={() => handleFilter({ subscription: true })}>
            <i className="fa-solid fa-crown icon subscription"></i> Abonnement
          </a>
          <a href="#" onClick={() => handleFilter({ is_free: false })}>
            <i className="fa-solid fa-door-closed icon closed"></i> Payant
          </a>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropdown-btn filter-btn" disabled={loading}>
          <i className="fas fa-filter"></i> Filtrer
        </button>
        <div className="dropdown-content filter-menu">
          {bookCategories.slice(0, 3).map((category) => (
            <a key={category.id} href="#" onClick={() => handleFilter({ genre: category.name })}>
              <i className="fa-solid fa-book"></i> {category.name}
            </a>
          ))}
        </div>
      </div>
      <div className="dropdown">
        <button className="dropdown-btn sort-btn" disabled={loading}>
          <i className="fas fa-sort"></i> Trier
        </button>
        <div className="dropdown-content sort-menu">
          <a href="#" onClick={() => handleFilter({ ordering: "base_product__name" })}>
            <i className="fa-solid fa-id-card"></i> Par Nom
          </a>
          <a href="#" onClick={() => handleFilter({ ordering: "-rating" })}>
            <i className="fa-solid fa-trophy"></i> Meilleurs
          </a>
          <a href="#" onClick={() => handleFilter({ genre: bookCategories[0]?.name || "Cultures" })}>
            <i className="fa-solid fa-landmark"></i> Cultures
          </a>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;