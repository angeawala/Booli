"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useLibrary } from "@/hooks/useLibrary";
import { Book } from "@/types/library";
import { useRouter } from "next/navigation";

interface DocumentItemProps {
  book: Book;
  onOpenModal: (imageSrc: string, description: string, documentUrl: string) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ book, onOpenModal }) => {
  const { createSubscription, accessPDF } = useLibrary();
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const hasSubscription = useSelector((state: RootState) =>
    state.library.subscriptions.some((sub) => sub.actif)
  );
  const isFree = book.pdf?.is_free || false;

  const handleExploit = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    if (!isFree && !hasSubscription) {
      router.push("/subscriptions");
      return;
    }
    if (isFree && book.pdf_url) {
      onOpenModal(book.cover || "media/default.jpg", `${book.base_product.name} par ${book.author || "Inconnu"}`, book.pdf_url);
    } else {
      try {
        const subscription = await createSubscription({ plan_id: "1", payment_confirmed: true });
        const pdfUrl = await accessPDF(book.id, subscription.code);
        onOpenModal(book.cover || "media/default.jpg", `${book.base_product.name} par ${book.author || "Inconnu"}`, pdfUrl);
      } catch (error) {
        console.error("Erreur lors de l’exploitation du livre:", error);
        alert("Action non autorisée. Veuillez vérifier votre abonnement.");
      }
    }
  };

  const handlePurchase = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    alert(`Achat du livre ${book.base_product.name} simulé !`);
  };

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    if (!isFree && !hasSubscription) {
      router.push("/subscriptions");
      return;
    }
    onOpenModal(
      book.cover || "media/default.jpg",
      `${book.base_product.name} par ${book.author || "Inconnu"}`,
      book.pdf_url || ""
    );
  };

  return (
    <div className="document-item float">
      <div className={isFree ? "new-badge" : "new-badge2"}>
        <i className={`fas fa-lock${isFree ? "-open" : ""} icon`} title={`Cadenas ${isFree ? "ouvert" : "fermé"}`}></i> DOCUMENT {isFree ? "Gratuit" : "PAYANT"}
      </div>
      <img
        src={book.cover || "media/default.jpg"}
        alt={`Couverture de ${book.base_product.name}`}
        className="document-cover"
        onClick={handleOpenModal}
      />
      <p>{book.base_product.name}</p>
      {book.author && <div className="book-author">Par {book.author}</div>}
      {!isFree && (
        <a href="/subscriptions" className="read-button">
          <i className="fas fa-book-open"></i> Emprunter le livre sans acheter
        </a>
      )}
      <div className="book-specs">
        <p style={{ "--i": 1 } as React.CSSProperties}><i className="fas fa-book"></i> <strong>Genre :</strong> {book.genre}</p>
        <p style={{ "--i": 2 } as React.CSSProperties}><i className="fas fa-pen"></i> <strong>Éditeur :</strong> {book.publisher}</p>
        <p style={{ "--i": 3 } as React.CSSProperties}><i className="fas fa-calendar-alt"></i> <strong>Parution :</strong> {book.publication_date}</p>
        <p style={{ "--i": 4 } as React.CSSProperties}><i className="fas fa-file-alt"></i> <strong>Pages :</strong> {book.pages}</p>
        <p style={{ "--i": 5 } as React.CSSProperties}><i className="fas fa-language"></i> <strong>Langue :</strong> {book.language}</p>
        <p style={{ "--i": 6 } as React.CSSProperties}><i className="fas fa-bookmark"></i> <strong>Format :</strong> {book.format}</p>
      </div>
      {!isFree && (
        <div className="book-price">
          {book.pdf?.pdf_price || "12,99"} € <span>15,99 €</span>
        </div>
      )}
      <div className="book-rating">
        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i> (5.0/5)
      </div>
      <button className="learn-btn" onClick={isFree ? handleExploit : handlePurchase}>
        {isFree ? "Exploiter le livre" : "Acheter le livre"}
      </button>
    </div>
  );
};

export default DocumentItem;