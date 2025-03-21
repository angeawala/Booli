"use client";

import React, { useState, useEffect } from "react";
import { useLibrary } from "@/hooks/useLibrary";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ModalProps {
  isVisible: boolean;
  imageSrc: string;
  description: string;
  documentUrl: string;
  bookId: string;
  onClose: () => void;
}

const DocumentModal: React.FC<ModalProps> = ({ isVisible, imageSrc, description, documentUrl, bookId, onClose }) => {
  const { accessPDF, loading, error } = useLibrary();
  const [code, setCode] = useState("");
  const [isCodeModalVisible, setIsCodeModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (documentUrl && !isCodeModalVisible) {
      setPdfUrl(documentUrl);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        e.preventDefault();
        navigator.clipboard.writeText("");
        alert("La capture d’écran n’est pas autorisée.");
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    if (isVisible) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("contextmenu", handleContextMenu);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [documentUrl, isCodeModalVisible, isVisible]);

  const handleCodeSubmit = async () => {
    try {
      const pdfUrl = await accessPDF(bookId, code);
      setPdfUrl(pdfUrl);
      setCode("");
      setIsCodeModalVisible(false);
    } catch {
      alert(error || "Erreur lors de l’accès au PDF. Vérifiez votre code.");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  if (!isVisible) return null;

  return (
    <div className="Modal_comme_medélé">
      <div id="documentModal" className="modal" style={{ display: "block" }}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>×</span>
          <div className="container">
            <div className="left-panel">
              <img id="modalImage" src={imageSrc} alt="Couverture du livre" className="document-image" />
            </div>
            <div className="right-panel">
              <h3>INFORMATION DU DOCUMENT</h3>
              <p id="modalDescription">{description}</p>
              {loading ? (
                <p>Chargement...</p>
              ) : pdfUrl ? (
                <div className="pdf-viewer" onContextMenu={(e) => e.preventDefault()}>
                  <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                  </Document>
                  <div className="pdf-controls">
                    <button
                      disabled={pageNumber <= 1}
                      onClick={() => setPageNumber((prev) => prev - 1)}
                    >
                      Précédent
                    </button>
                    <p>
                      Page {pageNumber} sur {numPages || "--"}
                    </p>
                    <button
                      disabled={pageNumber >= (numPages || 1)}
                      onClick={() => setPageNumber((prev) => prev + 1)}
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <a href="#" onClick={() => setIsCodeModalVisible(true)} className="Abonné">
                    Je suis Abonné
                  </a>
                  <div id="myModa" className={`moda ${isCodeModalVisible ? "block" : ""}`}>
                    <div className="moda-content">
                      <span className="closex" onClick={() => setIsCodeModalVisible(false)}>×</span>
                      <p className="code">Veuillez entrer votre code d’abonnement :</p>
                      <input
                        type="password"
                        id="passwordInput"
                        placeholder="Exemple : #123456"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                      />
                      <button id="submitPassword" onClick={handleCodeSubmit} disabled={loading}>
                        {loading ? "Envoi..." : "Envoyer"}
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="social-links">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> |
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;