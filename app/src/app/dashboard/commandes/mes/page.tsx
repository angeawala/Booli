'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/dashboard/Loader';
import OrderDetails from '@/components/dashboard/commandes/OrderDetails';
import { Order, Shop, Product } from '@/components/dashboard/commandes/types';
import { getOrders, saveOrders, getShops, getProducts } from '@/components/dashboard/commandes/data';
import '@/styles/dashboard/commandes.css';

const ITEMS_PER_PAGE = 5;

const ClientOrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const userEmail = 'user@example.com'; // Simulated logged-in user

  // Filter, Sort, Search, and Pagination States
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const userOrders = getOrders().filter(
      (order) => order.clientEmail === userEmail
    );
    setOrders(userOrders);
    setShops(getShops());
    setProducts(getProducts());
  }, []);

  // Handle Filtering, Sorting, Searching, and Pagination
  const filteredOrders = orders
    .filter((order) => {
      if (filterStatus && order.status !== filterStatus) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return order.trackingCode.toLowerCase().includes(query);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'date-desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'amount-asc') {
        return a.totalAmount - b.totalAmount;
      } else if (sortBy === 'amount-desc') {
        return b.totalAmount - a.totalAmount;
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRequestCancellation = (orderId: string) => {
    setLoading(true);
    setTimeout(() => {
      const updatedOrders = orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: 'canceled' as Order['status'],
              updatedAt: new Date().toISOString(),
              statusHistory: [
                ...(order.statusHistory || []),
                {
                  status: 'canceled',
                  date: new Date().toISOString(),
                  comment: 'Demande d’annulation par le client',
                },
              ],
            }
          : order
      );
      setOrders(updatedOrders);
      saveOrders(updatedOrders);
      toast.success('Demande d’annulation enregistrée');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="x-orders-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Loader loading={loading} />
      <h2 className="x-orders-title">Mes Commandes</h2>

      {/* Filters, Search, Sort, and Pagination Controls */}
      <div className="x-orders-controls mb-3">
        <div className="x-control-group">
          <label className="x-shops-label">Rechercher</label>
          <input
            type="text"
            className="form-control"
            placeholder="Code de suivi..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>

        <div className="x-control-group">
          <label className="x-shops-label">Filtrer par statut</label>
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1); // Reset to first page on filter change
            }}
          >
            <option value="">Tous les statuts</option>
            <option value="pending">En cours</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
            <option value="canceled">Annulée</option>
            <option value="disputed">Litige</option>
          </select>
        </div>

        <div className="x-control-group">
          <label className="x-shops-label">Trier par</label>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1); // Reset to first page on sort change
            }}
          >
            <option value="date-desc">Date (plus récent)</option>
            <option value="date-asc">Date (plus ancien)</option>
            <option value="amount-asc">Montant (croissant)</option>
            <option value="amount-desc">Montant (décroissant)</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Montant</th>
              <th>Code de Suivi</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id.slice(0, 8)}...</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>{order.totalAmount} €</td>
                <td>{order.trackingCode}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm x-action-btn me-1"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <i className="fas fa-eye"></i> Détails
                  </button>
                  {order.status === 'pending' && (
                    <button
                      className="btn btn-danger btn-sm x-action-btn me-1"
                      onClick={() => handleRequestCancellation(order.id)}
                    >
                      <i className="fas fa-times"></i> Annuler
                    </button>
                  )}
                  <a
                    href={`/dashboard/commandes/suivi?code=${order.trackingCode}`}
                    className="btn btn-primary btn-sm x-action-btn"
                  >
                    <i className="fas fa-map-marker-alt"></i> Suivre
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="x-pagination mt-3">
        <button
          className="btn x-pagination-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Précédent
        </button>
        <span className="x-pagination-info">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          className="btn x-pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Suivant
        </button>
      </div>

      {selectedOrder && (
        <div className="mt-4">
          <h3>Détails de la commande</h3>
          <OrderDetails order={selectedOrder} shops={shops} products={products} />
          <button
            className="btn x-modal-close mt-2"
            onClick={() => setSelectedOrder(null)}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientOrdersPage;