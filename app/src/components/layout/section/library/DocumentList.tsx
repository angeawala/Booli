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
  const [hasFetchedPage, setHasFetchedPage] = useState<number[]>([]); // Suivi des pages chargées
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
    if (hasFetchedPage.includes(currentPage)) {
      console.log(`Page ${currentPage} déjà chargée, useEffect ignoré`);
      return;
    }

    console.log("DocumentList useEffect déclenché pour page :", currentPage);
    const fetchBooksForPage = async () => {
      try {
        await getBooks({ limit: itemsPerPage, offset: (currentPage - 1) * itemsPerPage });
        console.log("Livres récupérés pour page :", currentPage);
      } catch (err) {
        console.error("Erreur dans DocumentList fetch :", err);
      } finally {
        setHasFetchedPage((prev) => [...prev, currentPage]);
      }
    };

    fetchBooksForPage();
  }, [getBooks, currentPage, hasFetchedPage]);

  const handleNext = () => {
    if (nextPage) {
      console.log("Passage à la page suivante :", currentPage + 1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (previousPage) {
      console.log("Retour à la page précédente :", currentPage - 1);
      setCurrentPage((prev) => prev - 1);
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