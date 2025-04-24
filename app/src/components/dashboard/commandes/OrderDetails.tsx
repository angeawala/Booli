import { Order, Product, Shop } from './types';

interface OrderDetailsProps {
  order: Order;
  shops: Shop[];
  products: Product[];
}

const OrderDetails = ({ order, shops, products }: OrderDetailsProps) => {
  const shop = shops.find((s) => s.id === order.shopId);

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

        <h4>Transporteur</h4>
        <p>Colissimo (simulé) - <a href="https://www.colissimo.fr" target="_blank" rel="noopener noreferrer">Suivi détaillé</a></p>
      </div>
    </div>
  );
};

export default OrderDetails;