// DocumentList.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useLibrary } from "@/hooks/useLibrary";
import DocumentItem from "./DocumentItem";

interface DocumentListProps {
  onOpenModal: (imageSrc: string, description: string, documentUrl: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ onOpenModal }) => {
  const { books, loading, error, getBooks, totalCount, nextPage, previousPage } = useLibrary();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasFetched, setHasFetched] = useState(false); // Contrôle pour éviter les appels multiples
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
    if (hasFetched) return;

    console.log("DocumentList useEffect déclenché pour page :", currentPage);
    const fetchBooksForPage = async () => {
      try {
        await getBooks({ limit: itemsPerPage, offset: (currentPage - 1) * itemsPerPage });
        console.log("Livres récupérés pour page :", currentPage);
      } catch (err) {
        console.error("Erreur dans DocumentList fetch :", err);
      } finally {
        setHasFetched(true);
      }
    };

    fetchBooksForPage();
  }, [getBooks, currentPage, hasFetched]);

  const handleNext = () => {
    if (nextPage) {
      console.log("Passage à la page suivante :", currentPage + 1);
      setCurrentPage((prev) => prev + 1);
      setHasFetched(false); // Permet de relancer le fetch pour la nouvelle page
    }
  };

  const handlePrevious = () => {
    if (previousPage) {
      console.log("Retour à la page précédente :", currentPage - 1);
      setCurrentPage((prev) => prev - 1);
      setHasFetched(false); // Permet de relancer le fetch pour la nouvelle page
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <article className="menu_principale">
      <div id="panneau col-12" className="animated-border">
        <div className="document-list">
          {books.map((book) => (
            <DocumentItem
              key={book.id}
              book={book}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
        <div className="pagination">
          <button onClick={handlePrevious} disabled={!previousPage || loading}>
            Précédent
          </button>
          <span>Page {currentPage} / {totalPages}</span>
          <button onClick={handleNext} disabled={!nextPage || loading}>
            Suivant
          </button>
        </div>
      </div>
    </article>
  );
};

export default DocumentList;