'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Review } from './types';
import { getReviews, saveReviews, getOrders, saveOrders } from './data';

interface ReviewResponseFormProps {
  review: Review;
  vendorEmail: string;
}

const ReviewResponseForm: React.FC<ReviewResponseFormProps> = ({ review, vendorEmail }) => {
  const [responseComment, setResponseComment] = useState<string>('');

  const handleSubmitResponse = () => {
    if (!responseComment.trim()) {
      toast.error('Le commentaire de réponse est obligatoire.');
      return;
    }

    const updatedReview: Review = {
      ...review,
      response: {
        vendorEmail,
        comment: responseComment,
        createdAt: new Date().toISOString(),
      },
    };

    // Update reviews in localStorage
    const reviews = getReviews();
    const updatedReviews = reviews.map((r) =>
      r.id === review.id ? updatedReview : r
    );
    saveReviews(updatedReviews);

    // Update order with the updated review
    const orders = getOrders();
    const updatedOrders = orders.map((o) =>
      o.id === review.orderId
        ? {
            ...o,
            reviews: (o.reviews || []).map((r) =>
              r.id === review.id ? updatedReview : r
            ),
          }
        : o
    );
    saveOrders(updatedOrders);

    toast.success('Réponse soumise avec succès.');
    setResponseComment('');
  };

  return (
    <div className="review-response-form mt-2">
      {review.response ? (
        <div className="response-display">
          <strong>Réponse du vendeur ({review.response.vendorEmail}):</strong>{' '}
          {review.response.comment} (
          {new Date(review.response.createdAt).toLocaleDateString()})
        </div>
      ) : (
        <div>
          <textarea
            className="form-control mb-2"
            value={responseComment}
            onChange={(e) => setResponseComment(e.target.value)}
            rows={3}
            placeholder="Votre réponse au commentaire..."
            aria-label="Réponse au commentaire"
          ></textarea>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSubmitResponse}
            aria-label="Soumettre la réponse"
          >
            Soumettre la réponse
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewResponseForm;