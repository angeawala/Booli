'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Order, Product, Review, Report } from './types';
import { getReviews, saveReviews, getOrders, saveOrders, getReports, saveReports } from './data';

interface ProductReviewAndReportProps {
  order: Order;
  product: Product;
  variantIndex: number;
  quantity: number;
  userEmail: string;
}

const ProductReviewAndReport: React.FC<ProductReviewAndReportProps> = ({
  order,
  product,
  variantIndex,
  quantity,
  userEmail,
}) => {
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reportComment, setReportComment] = useState<string>('');

  const variant = product.variants?.[variantIndex];

  // Vérifier si un avis existe déjà pour ce produit dans cette commande
  const existingReview = order.reviews?.find(
    (r) => r.productId === product.id && r.variantIndex === variantIndex && r.clientEmail === userEmail
  );

  // Vérifier si un signalement existe déjà pour ce produit dans cette commande
  const existingReport = order.reports?.find(
    (r) => r.productId === product.id && r.variantIndex === variantIndex && r.clientEmail === userEmail
  );

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (reviewRating === 0) {
      toast.error('Veuillez sélectionner une note.');
      return;
    }
    if (!reviewComment.trim()) {
      toast.error('Le commentaire de l\'avis est obligatoire.');
      return;
    }

    const newReview: Review = {
      id: `review-${Date.now()}-${product.id}`, // ID unique
      productId: product.id,
      variantIndex,
      orderId: order.id,
      clientEmail: userEmail,
      rating: reviewRating,
      comment: reviewComment,
      createdAt: new Date().toISOString(),
    };

    // Mettre à jour les avis dans localStorage
    const reviews = getReviews();
    reviews.push(newReview);
    saveReviews(reviews);

    // Mettre à jour la commande avec le nouvel avis
    const orders = getOrders();
    const updatedOrders = orders.map((o) =>
      o.id === order.id
        ? {
            ...o,
            reviews: [...(o.reviews || []), newReview],
          }
        : o
    );
    saveOrders(updatedOrders);

    toast.success('Avis soumis avec succès.');
    setReviewRating(0);
    setReviewComment('');
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reportComment.trim()) {
      toast.error('La description du problème est obligatoire.');
      return;
    }

    const newReport: Report = {
      id: `report-${Date.now()}-${product.id}`, // ID unique
      productId: product.id,
      variantIndex,
      orderId: order.id,
      clientEmail: userEmail,
      comment: reportComment,
      createdAt: new Date().toISOString(),
    };

    // Mettre à jour les signalements dans localStorage
    const reports = getReports();
    reports.push(newReport);
    saveReports(reports);

    // Mettre à jour la commande avec le nouveau signalement
    const orders = getOrders();
    const updatedOrders = orders.map((o) =>
      o.id === order.id
        ? {
            ...o,
            reports: [...(o.reports || []), newReport],
          }
        : o
    );
    saveOrders(updatedOrders);

    toast.success('Signalement soumis avec succès.');
    setReportComment('');
  };

  const renderStarsInput = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          type="button"
          key={i}
          className={`btn btn-link p-0 ${i <= reviewRating ? 'text-warning' : 'text-muted'}`}
          onClick={() => setReviewRating(i)}
          aria-label={`Note de ${i} étoile${i > 1 ? 's' : ''}`}
        >
          <i className="fas fa-star" aria-hidden="true"></i>
        </button>
      );
    }
    return stars;
  };

  if (!variant) {
    return <p className="text-danger">Variante de produit introuvable.</p>;
  }

  return (
    <div className="mt-3">
      {/* Formulaire d'avis */}
      <h6>Laisser un avis pour {product.name} - {variant.size}</h6>
      {existingReview ? (
        <p className="text-muted">Vous avez déjà soumis un avis pour ce produit.</p>
      ) : (
        <form onSubmit={handleReviewSubmit}>
          <div className="mb-3">
            <label className="form-label">Note :</label>
            <div>{renderStarsInput()}</div>
          </div>
          <div className="mb-3">
            <label htmlFor={`review-comment-${product.id}`} className="form-label">
              Commentaire :
            </label>
            <textarea
              id={`review-comment-${product.id}`}
              className="form-control"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={3}
              placeholder="Votre commentaire..."
              aria-label="Commentaire de l'avis"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={reviewRating === 0}
            aria-label="Soumettre l'avis"
          >
            Soumettre l'avis
          </button>
        </form>
      )}

      {/* Formulaire de signalement */}
      <h6 className="mt-4">Signaler un problème</h6>
      {existingReport ? (
        <p className="text-muted">Vous avez déjà soumis un signalement pour ce produit.</p>
      ) : (
        <form onSubmit={handleReportSubmit}>
          <div className="mb-3">
            <label htmlFor={`report-comment-${product.id}`} className="form-label">
              Description du problème :
            </label>
            <textarea
              id={`report-comment-${product.id}`}
              className="form-control"
              value={reportComment}
              onChange={(e) => setReportComment(e.target.value)}
              rows={3}
              placeholder="Décrivez le problème..."
              aria-label="Description du problème"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-danger btn-sm"
            aria-label="Soumettre le signalement"
          >
            Soumettre le signalement
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductReviewAndReport;