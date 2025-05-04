import React from 'react';

interface Document {
  id: string;
  title: string;
  image: string;
  author?: string;
  category: string;
  publisher: string;
  publicationYear: string;
  pages: string;
  language: string;
  rating?: number;
  isFree: boolean;
  pdfPrice?: string;
  physicalPrice?: string;
  hasPhysical: boolean;
  hasPdf: boolean;
  description: string;
  weight?: string;
  size?: string;
  stock?: string;
}

interface DocumentItemProps {
  document: Document;
  onClick: () => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document, onClick }) => {
  const renderStars = (rating: number | undefined) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = rating && rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star" aria-hidden="true"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt" aria-hidden="true"></i>);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star" aria-hidden="true"></i>);
    }
    return stars;
  };

  return (
    <div className="document-item float">
      <div className={document.isFree ? 'new-badge' : 'new-badge2'}>
        <i
          className={`fas ${document.isFree ? 'fa-lock-open' : 'fa-lock'} icon`}
          title={document.isFree ? 'Cadenas ouvert' : 'Cadenas fermé'}
          aria-label={document.isFree ? 'Document gratuit' : 'Document payant'}
        ></i>{' '}
        DOCUMENT {document.isFree ? 'Gratuit' : 'Payant'}
      </div>
      <img
        src={document.image}
        alt={`Couverture de ${document.title}`}
        className="document-cover"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        aria-label={`Voir les détails de ${document.title}`}
      />
      <p className="document-title">{document.title}</p>
      {document.author && <div className="book-author">Par {document.author}</div>}
      <div className="book-specs">
        <p>
          <i className="fas fa-book" aria-hidden="true"></i> <strong>Catégorie :</strong>{' '}
          {document.category}
        </p>
        <p>
          <i className="fas fa-calendar-alt" aria-hidden="true"></i>{' '}
          <strong>Parution :</strong> {document.publicationYear}
        </p>
        <p>
          <i className="fas fa-file-alt" aria-hidden="true"></i> <strong>Pages :</strong>{' '}
          {document.pages}
        </p>
      </div>
      <div className="book-rating" aria-label={`Note : ${document.rating || 'Non noté'} sur 5`}>
        {renderStars(document.rating)}
        {document.rating !== undefined && ` (${document.rating}/5)`}
      </div>
      <button className="learn-btn" onClick={onClick} aria-label={`Voir les détails de ${document.title}`}>
        Voir les détails
      </button>
    </div>
  );
};

export default DocumentItem;