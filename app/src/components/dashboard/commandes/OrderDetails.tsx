import { Order, Product, Shop } from './types';
import ProductReviewAndReport from './ProductReviewAndReport';
import ReviewResponseForm from './ReviewResponseForm';

interface OrderDetailsProps {
  order: Order;
  shops: Shop[];
  products: Product[];
  userEmail?: string; // For clients to submit reviews/reports
  userRole?: 'staff' | 'vendor' | 'client'; // To control visibility
}

const OrderDetails = ({ order, shops, products, userEmail, userRole }: OrderDetailsProps) => {
  const shop = shops.find((s) => s.id === order.shopId);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${i <= rating ? 'text-warning' : 'text-muted'}`}
          aria-hidden="true"
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3>Commande #{order.id}</h3>
        <p><strong>Client :</strong> {order.clientEmail}</p>
        <p><strong>Boutique :</strong> {shop?.name || 'N/A'}</p>
        <p><strong>Statut :</strong> {order.status}</p>
        <p><strong>Date de création :</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Adresse de livraison :</strong> {order.shippingAddress}</p>
        <p><strong>Montant total :</strong> {order.totalAmount} €</p>
        <p><strong>Code de suivi :</strong> {order.trackingCode}</p>

        <h4>Produits</h4>
        <ul>
          {order.products.map((item, index) => {
            const product = products.find((p) => p.id === item.productId);
            const variant = product?.variants?.[item.variantIndex];
            return (
              <li key={index}>
                {product?.name} - {variant?.size} ({variant?.colors.map((c) => c.color).join(', ')}) - Quantité: {item.quantity}
                {userRole === 'client' && userEmail && (
                  <ProductReviewAndReport
                    order={order}
                    product={product!}
                    variantIndex={item.variantIndex}
                    quantity={item.quantity}
                    userEmail={userEmail}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <h4>Historique des statuts</h4>
        <ul className="x-timeline">
          {order.statusHistory?.map((entry, index) => (
            <li key={index} className="x-timeline-item">
              <span className="x-timeline-date">{new Date(entry.date).toLocaleString()}</span>
              <span className="x-timeline-status">{entry.status}</span>
              {entry.comment && <span className="x-timeline-comment"> - {entry.comment}</span>}
            </li>
          ))}
        </ul>

        {(userRole === 'staff' || userRole === 'client') && (
          <>
            <h4>Signalements soumis</h4>
            {order.reports?.length ? (
              <ul>
                {order.reports.map((report, index) => {
                  const product = products.find((p) => p.id === report.productId);
                  return (
                    <li key={index}>
                      <strong>{product?.name}</strong> - Par: {report.clientEmail} - {report.comment} (
                      {new Date(report.createdAt).toLocaleDateString()})
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Aucun signalement soumis.</p>
            )}
          </>
        )}

        {(userRole === 'vendor' || userRole === 'client') && (
          <>
            <h4>Avis soumis</h4>
            {order.reviews?.length ? (
              <ul>
                {order.reviews.map((review, index) => {
                  const product = products.find((p) => p.id === review.productId);
                  return (
                    <li key={index}>
                      <strong>{product?.name}</strong> - Par: {review.clientEmail} - Note: {renderStars(review.rating)} ({review.rating}/5) - {review.comment} (
                      {new Date(review.createdAt).toLocaleDateString()})
                      {userRole === 'vendor' && userEmail && (
                        <ReviewResponseForm review={review} vendorEmail={userEmail} />
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Aucun avis soumis.</p>
            )}
          </>
        )}

        <h4>Transporteur</h4>
        <p>
          Colissimo (simulé) -{' '}
          <a href="https://www.colissimo.fr" target="_blank" rel="noopener noreferrer">
            Suivi détaillé
          </a>
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;