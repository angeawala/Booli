'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/dashboard/Loader';
import OrderDetails from '@/components/dashboard/commandes/OrderDetails';
import { Shop, Order, Product } from '@/components/dashboard/commandes/types';
import { getOrders, saveOrders, getShops, getProducts } from '@/components/dashboard/commandes/data';
import '@/styles/dashboard/commandes.css';

const ITEMS_PER_PAGE = 5;

const StaffOrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter, Sort, Search, and Pagination States
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setOrders(getOrders());
    setShops(getShops());
    setProducts(getProducts());
  }, []);

  // Handle Filtering, Sorting, Searching, and Pagination
  const filteredOrders = orders
    .filter((order) => {
      if (filterStatus && order.status !== filterStatus) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          order.clientEmail.toLowerCase().includes(query) ||
          order.trackingCode.toLowerCase().includes(query)
        );
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

  const handleStatusChange = (orderId: string, newStatus: string, comment?: string) => {
    setLoading(true);
    setTimeout(() => {
      const updatedOrders = orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus as Order['status'],
              updatedAt: new Date().toISOString(),
              statusHistory: [
                ...(order.statusHistory || []),
                { status: newStatus, date: new Date().toISOString(), comment },
              ],
            }
          : order
      );
      setOrders(updatedOrders);
      saveOrders(updatedOrders);
      toast.success('Statut mis à jour avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleBulkStatusChange = () => {
    if (!bulkStatus || selectedOrders.length === 0) {
      toast.error('Veuillez sélectionner des commandes et un statut.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const updatedOrders = orders.map((order) =>
        selectedOrders.includes(order.id)
          ? {
              ...order,
              status: bulkStatus as Order['status'],
              updatedAt: new Date().toISOString(),
              statusHistory: [
                ...(order.statusHistory || []),
                { status: bulkStatus, date: new Date().toISOString() },
              ],
            }
          : order
      );
      setOrders(updatedOrders);
      saveOrders(updatedOrders);
      setSelectedOrders([]);
      setBulkStatus('');
      toast.success('Statuts mis à jour avec succès');
      setLoading(false);
    }, 1000);
  };

  const toggleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const exportToCSV = () => {
    const headers = 'ID,Client,Boutique,Date,Statut,Montant\n';
    const rows = filteredOrders
      .map((order) => {
        const shop = shops.find((s) => s.id === order.shopId);
        return `${order.id},${order.clientEmail},${shop?.name || 'N/A'},${order.createdAt},${order.status},${order.totalAmount}`;
      })
      .join('\n');
    const csv = headers + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="x-orders-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Loader loading={loading} />
      <h2 className="x-orders-title">Gestion des Commandes (Staff)</h2>

      {/* Filters, Search, Sort, and Pagination Controls */}
      <div className="x-orders-controls mb-3">
        <div className="x-control-group">
          <label className="x-shops-label">Rechercher</label>
          <input
            type="text"
            className="form-control"
            placeholder="Client ou code de suivi..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Rechercher par client ou code de suivi"
          />
        </div>

        <div className="x-control-group">
          <label className="x-shops-label">Filtrer par statut</label>
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filtrer par statut"
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
              setCurrentPage(1);
            }}
            aria-label="Trier les commandes"
          >
            <option value="date-desc">Date (plus récent)</option>
            <option value="date-asc">Date (plus ancien)</option>
            <option value="amount-asc">Montant (croissant)</option>
            <option value="amount-desc">Montant (décroissant)</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <select
            className="form-select d-inline-block me-2"
            value={bulkStatus}
            onChange={(e) => setBulkStatus(e.target.value)}
            aria-label="Sélectionner un statut pour mise à jour groupée"
          >
            <option value="">Sélectionner un statut</option>
            <option value="pending">En cours</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
            <option value="canceled">Annulée</option>
            <option value="disputed">Litige</option>
          </select>
          <button
            className="btn x-modal-btn me-2"
            onClick={handleBulkStatusChange}
            disabled={selectedOrders.length === 0 || !bulkStatus}
            aria-label={`Appliquer le statut à ${selectedOrders.length} commande(s)`}
          >
            Appliquer à {selectedOrders.length} commande(s)
          </button>
        </div>
        <button
          className="btn x-add-btn"
          onClick={exportToCSV}
          aria-label="Exporter les commandes en CSV"
        >
          <i className="fas fa-download me-2"></i> Exporter en CSV
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedOrders(
                      e.target.checked ? paginatedOrders.map((order) => order.id) : []
                    )
                  }
                  checked={
                    paginatedOrders.length > 0 &&
                    selectedOrders.length === paginatedOrders.length
                  }
                  aria-label="Sélectionner toutes les commandes"
                />
              </th>
              <th>ID</th>
              <th>Client</th>
              <th>Boutique</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Montant</th>
              <th>Code de Suivi</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => {
              const shop = shops.find((s) => s.id === order.shopId);
              return (
                <tr key={order.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleSelectOrder(order.id)}
                      aria-label={`Sélectionner la commande ${order.id}`}
                    />
                  </td>
                  <td>{order.id.slice(0, 8)}...</td>
                  <td>{order.clientEmail}</td>
                  <td>{shop?.name || 'N/A'}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="form-select"
                      aria-label={`Changer le statut de la commande ${order.id}`}
                    >
                      <option value="pending">En cours</option>
                      <option value="shipped">Expédiée</option>
                      <option value="delivered">Livrée</option>
                      <option value="canceled">Annulée</option>
                      <option value="disputed">Litige</option>
                    </select>
                  </td>
                  <td>{order.totalAmount} €</td>
                  <td>{order.trackingCode}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm x-action-btn"
                      onClick={() => setSelectedOrder(order)}
                      aria-label={`Voir les détails de la commande ${order.id}`}
                    >
                      <i className="fas fa-eye"></i> Détails
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="x-pagination mt-3">
        <button
          className="btn x-pagination-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          aria-label="Page précédente"
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
          aria-label="Page suivante"
        >
          Suivant
        </button>
      </div>

      {selectedOrder && (
        <div className="mt-4">
          <h3>Détails de la commande</h3>
          <OrderDetails
            order={selectedOrder}
            shops={shops}
            products={products}
            userRole="staff"
          />
          <button
            className="btn x-modal-close mt-2"
            onClick={() => setSelectedOrder(null)}
            aria-label="Fermer les détails de la commande"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default StaffOrdersPage;