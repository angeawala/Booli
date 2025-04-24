"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as pdfjsLib from "pdfjs-dist";

// Configurer le worker local
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const ViewDocument: React.FC = () => {
  const router = useRouter();
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // URL du PDF
  const pdfUrl = "/pdf/eamac.pdf"; // Votre PDF de test

  // Charger le PDF en tant que flux sécurisé
  useEffect(() => {
    fetch(pdfUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then((buffer) => {
        const loadingTask = pdfjsLib.getDocument({ data: buffer });
        return loadingTask.promise;
      })
      .then((pdf) => {
        console.log("PDF chargé avec succès, nombre de pages :", pdf.numPages);
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setError(null);
      })
      .catch((err) => {
        console.error("Erreur de chargement du PDF :", err);
        setError(`Impossible de charger le PDF : ${err.message}`);
      });
  }, []);

  // Rendre la page actuelle
  const renderPage = () => {
    if (pdfDoc && canvasRef.current) {
      pdfDoc.getPage(currentPage).then((page) => {
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current!;
        const context = canvas.getContext("2d")!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext).promise.then(() => {
          console.log(`Page ${currentPage} rendue avec scale ${scale}.`);
        });
      });
    }
  };

  useEffect(() => {
    renderPage();
  }, [pdfDoc, currentPage, scale]);

  // Fonctions de navigation
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="view-document-container">
      <button className="back-btn" onClick={() => router.back()}>
        <i className="fas fa-arrow-left"></i> Retour
      </button>
      {error ? (
        <div className="error-message">{error}</div>
      ) : !pdfDoc ? (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="pdf-viewer">
          {/* Barre d'outils en haut */}
          <div className="pdf-toolbar pdf-toolbar-top">
            <button onClick={zoomIn} className="toolbar-btn" title="Zoom avant">
              <i className="fas fa-search-plus"></i>
              <span className="btn-text">Zoom +</span>
            </button>
            <button onClick={zoomOut} className="toolbar-btn" title="Zoom arrière">
              <i className="fas fa-search-minus"></i>
              <span className="btn-text">Zoom -</span>
            </button>
            <span className="page-info">
              Page {currentPage} / {numPages}
            </span>
          </div>

          {/* Canvas PDF */}
          <div className="pdf-canvas-container">
            <canvas ref={canvasRef} className="pdf-canvas" />
          </div>

          {/* Barre d'outils en bas */}
          <div className="pdf-toolbar pdf-toolbar-bottom">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
              className="toolbar-btn"
              title="Page précédente"
            >
              <i className="fas fa-chevron-left"></i>
              <span className="btn-text">Précédent</span>
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage >= numPages}
              className="toolbar-btn"
              title="Page suivante"
            >
              <i className="fas fa-chevron-right"></i>
              <span className="btn-text">Suivant</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDocument;