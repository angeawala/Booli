import React from "react";

interface Document {
  id: string;
  title: string;
  image: string;
  author?: string;
  category: string;
  publisher: string;
  publicationDate: string;
  pages: number;
  language: string;
  rating: number;
  isFree: boolean;
  pdfPrice?: string;
  physicalPrice?: string;
  hasPhysicalProduct: boolean;
  hasPdf: boolean;
  description: string;
}

interface DocumentItemProps {
  document: Document;
  onClick: () => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document, onClick }) => {
  return (
    <div className="document-item float">
      <div className={document.isFree ? "new-badge" : "new-badge2"}>
        <i
          className={`fas ${document.isFree ? "fa-lock-open" : "fa-lock"} icon`}
          title={document.isFree ? "Cadenas ouvert" : "Cadenas fermé"}
        ></i>{" "}
        DOCUMENT {document.isFree ? "Gratuit" : "Payant"}
      </div>
      <img
        src={document.image}
        alt={`Couverture de ${document.title}`}
        className="document-cover"
        onClick={onClick}
      />
      <p>{document.title}</p>
      {document.author && <div className="book-author">Par {document.author}</div>}
      <div className="book-specs">
        <p style={{ "--i": 1 } as React.CSSProperties}>
          <i className="fas fa-book"></i> <strong>Catégorie :</strong>{" "}
          {document.category}
        </p>
        <p style={{ "--i": 2 } as React.CSSProperties}>
          <i className="fas fa-pen"></i> <strong>Éditeur :</strong>{" "}
          {document.publisher}
        </p>
        <p style={{ "--i": 3 } as React.CSSProperties}>
          <i className="fas fa-calendar-alt"></i> <strong>Parution :</strong>{" "}
          {document.publicationDate}
        </p>
        <p style={{ "--i": 4 } as React.CSSProperties}>
          <i className="fas fa-file-alt"></i> <strong>Pages :</strong>{" "}
          {document.pages}
        </p>
        <p style={{ "--i": 5 } as React.CSSProperties}>
          <i className="fas fa-language"></i> <strong>Langue :</strong>{" "}
          {document.language}
        </p>
      </div>
      <div className="book-rating">
        {Array(Math.floor(document.rating))
          .fill(0)
          .map((_, i) => (
            <i key={i} className="fas fa-star"></i>
          ))}
        {document.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
        {Array(5 - Math.ceil(document.rating))
          .fill(0)
          .map((_, i) => (
            <i key={i} className="far fa-star"></i>
          ))}{" "}
        ({document.rating}/5)
      </div>
      <button className="learn-btn" onClick={onClick}>
        Voir les détails
      </button>
    </div>
  );
};

export default DocumentItem;