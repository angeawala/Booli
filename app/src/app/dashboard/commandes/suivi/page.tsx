'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/dashboard/Loader';
import OrderDetails from '@/components/dashboard/commandes/OrderDetails';
import { Order, Shop, Product } from '@/components/dashboard/commandes/types';
import { getOrders, getShops, getProducts } from '@/components/dashboard/commandes/data';
import '@/styles/dashboard/commandes.css';

const TrackOrderPage = () => {
  const [loading, setLoading] = useState(false);
  const [trackingCode, setTrackingCode] = useState<string>('');
  const [order, setOrder] = useState<Order | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [recentTrackingCodes, setRecentTrackingCodes] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const userEmail = 'user@example.com'; // Simulated logged-in user

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setTrackingCode(code);
      fetchOrder(code);
    }
    setShops(getShops());
    setProducts(getProducts());

    // Load recent tracking codes from localStorage
    const savedCodes = localStorage.getItem('recentTrackingCodes');
    if (savedCodes) {
      setRecentTrackingCodes(JSON.parse(savedCodes));
    }
  }, [searchParams]);

  const fetchOrder = (code: string) => {
    setLoading(true);
    setTimeout(() => {
      const orders = getOrders();
      const foundOrder = orders.find(
        (o) => o.trackingCode === code && o.clientEmail === userEmail
      );
      if (foundOrder) {
        setOrder(foundOrder);
        // Update recent tracking codes
        const updatedCodes = [
          code,
          ...recentTrackingCodes.filter((c) => c !== code),
        ].slice(0, 5); // Keep only the last 5 codes
        setRecentTrackingCodes(updatedCodes);
        localStorage.setItem('recentTrackingCodes', JSON.stringify(updatedCodes));
      } else {
        toast.error('Commande non trouvée ou accès non autorisé.');
      }
      setLoading(false);
    }, 1000);
  };

  const handleTrack = () => {
    if (!trackingCode) {
      toast.error('Veuillez entrer un code de suivi.');
      return;
    }
    fetchOrder(trackingCode);
  };

  return (
    <div className="x-orders-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Loader loading={loading} />
      <h2 className="x-orders-title">Suivre ma Commande</h2>

      <div className="mb-4">
        <label className="x-shops-label mb-2">Code de Suivi</label>
        <div className="input-group">
          <input
            type="text"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            className="form-control"
            placeholder="Ex: BLS-BVV89-YU52JJ"
          />
          <button className="btn x-modal-btn" onClick={handleTrack}>
            Suivre
          </button>
        </div>
      </div>

      {recentTrackingCodes.length > 0 && (
        <div className="mb-4">
          <h5 className="x-shops-label">Codes récemment suivis</h5>
          <div className="x-recent-tracking">
            {recentTrackingCodes.map((code) => (
              <button
                key={code}
                className="btn btn-outline-primary btn-sm me-2 mb-2"
                onClick={() => {
                  setTrackingCode(code);
                  fetchOrder(code);
                }}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      )}

      {order && <OrderDetails order={order} shops={shops} products={products} />}
    </div>
  );
};

export default TrackOrderPage;