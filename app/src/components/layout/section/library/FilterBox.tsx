// FilterBox.tsx
"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useLibrary } from "@/hooks/useLibrary";
import { BookCategory } from "@/types/books";

const FilterBox: React.FC = () => {
  const { getBooks, loading, error } = useLibrary();
  const bookCategories = useSelector((state: RootState) => state.books.categories) as BookCategory[];

  const [isVisible, setIsVisible] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleFilter = () => setIsVisible(!isVisible);

  const handleFilterChange = async (genre: string) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(newSelectedGenres);

    try {
      // Si aucun genre sélectionné, on récupère tous les livres
      const filters = newSelectedGenres.length > 0 ? { genre: newSelectedGenres.join(",") } : {};
      await getBooks({ ...filters, limit: 12, offset: 0 });
    } catch (err) {
      console.error("Erreur lors du filtrage :", err);
    }
  };

  return (
    <section>
      <button className="filtre-btn" onClick={toggleFilter} disabled={loading}>
        <i className="fas fa-space-shuttle icon"></i> + DE CATÉGORIES
      </button>
      <div className={`filtre-box ${isVisible ? "show" : ""}`} id="filterBox">
        <span className="close-filtre" onClick={toggleFilter}>
          ✖
        </span>
        <h3>+ de Catégories</h3>
        {loading && <p>Chargement...</p>}
        {error && <p>Erreur : {error}</p>}
        {bookCategories.length === 0 ? (
          <p>Aucune catégorie disponible</p>
        ) : (
          bookCategories.map((category) => (
            <label key={category.id}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(category.name)}
                onChange={() => handleFilterChange(category.name)}
                disabled={loading}
              />
              {category.name}
            </label>
          ))
        )}
      </div>
    </section>
  );
};

export default FilterBox;