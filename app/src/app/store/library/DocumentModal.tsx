import React, { useState } from 'react';
import SubscriptionCodeModal from './SubscriptionCodeModal';

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

interface DocumentModalProps {
  document: Document | null;
  onClose: () => void;
  onAddToCart: (docId: string, type: 'pdf' | 'physical') => void;
}

const DocumentModal: React.FC<DocumentModalProps> = ({ document, onClose, onAddToCart }) => {
  const [showCodeModal, setShowCodeModal] = useState(false);

  if (!document) return null;

  const handleView = () => {
    if (document.isFree && document.hasPdf) {
      window.location.href = `/store/library/view?docId=${document.id}`;
    } else if (document.hasPdf) {
      setShowCodeModal(true);
    }
  };

  return (
    <div id="documentModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose} aria-label="Fermer la fenêtre">
          ×
        </span>
        <div className="container">
          <div className="left-panel">
            <img
              id="modalImage"
              src={document.image}
              alt={`Image de ${document.title}`}
              className="document-image"
            />
          </div>
          <div className="right-panel">
            <h3>INFORMATION DU DOCUMENT</h3>
            <p className="modal-title">{document.title}</p>
            <p>
              <strong>Auteur :</strong> {document.author || 'Non spécifié'}
            </p>
            <p>
              <strong>Catégorie :</strong> {document.category}
            </p>
            <p>
              <strong>Éditeur :</strong> {document.publisher}
            </p>
            <p>
              <strong>Année de Publication :</strong> {document.publicationYear}
            </p>
            <p>
              <strong>Pages :</strong> {document.pages}
            </p>
            <p>
              <strong>Langue :</strong> {document.language}
            </p>
            {document.rating !== undefined && (
              <p>
                <strong>Note :</strong> {document.rating}/5
              </p>
            )}
            {document.hasPhysical && (
              <>
                <p>
                  <strong>Poids :</strong> {document.weight || 'Non spécifié'} kg
                </p>
                <p>
                  <strong>Taille :</strong> {document.size || 'Non spécifié'} cm
                </p>
                <p>
                  <strong>Stock :</strong> {document.stock || 'Non spécifié'}
                </p>
              </>
            )}
            <p>
              <strong>Description :</strong> {document.description}
            </p>
            {document.hasPdf && (
              <button
                className="download-button"
                onClick={handleView}
                aria-label="Visualiser le PDF"
              >
                Visualiser
              </button>
            )}
            {document.hasPdf && !document.isFree && (
              <button
                className="learn-btn"
                onClick={() => onAddToCart(document.id, 'pdf')}
                aria-label={`Acheter le PDF pour ${document.pdfPrice}`}
              >
                Acheter le PDF ({document.pdfPrice})
              </button>
            )}
            {document.hasPhysical && (
              <button
                className="learn-btn"
                onClick={() => onAddToCart(document.id, 'physical')}
                aria-label={`Acheter le livre physique pour ${document.physicalPrice}`}
              >
                Acheter le livre physique ({document.physicalPrice})
              </button>
            )}
            <div className="social-links">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>{' '}
              |{' '}
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>{' '}
              |{' '}
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>{' '}
              |{' '}
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {showCodeModal && (
        <SubscriptionCodeModal
          documentId={document.id}
          onClose={() => setShowCodeModal(false)}
        />
      )}
    </div>
  );
};

export default DocumentModal;