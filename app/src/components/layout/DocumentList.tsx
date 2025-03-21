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
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
    getBooks({ limit: itemsPerPage, offset: (currentPage - 1) * itemsPerPage });
  }, [getBooks, currentPage]);

  const handleNext = () => {
    if (nextPage) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (previousPage) setCurrentPage((prev) => prev - 1);
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
          <button onClick={handlePrevious} disabled={!previousPage}>
            Précédent
          </button>
          <span>Page {currentPage} / {totalPages}</span>
          <button onClick={handleNext} disabled={!nextPage}>
            Suivant
          </button>
        </div>
      </div>
    </article>
  );
};

export default DocumentList;