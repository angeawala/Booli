'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/dashboard/Loader';
import '@/styles/dashboard/boutiques.css';


// Interface for Shop data
interface Shop {
  id?: number;
  name: string;
  subcategories: string[];
  image: string;
  email: string;
  contact: string;
  description: string;
  ownerEmail: string;
  status?: string;
  createdAt?: string;
}

// Simulated database using localStorage
const getShops = (): Shop[] => {
  const shops = localStorage.getItem('shops');
  return shops ? JSON.parse(shops) : [];
};

const saveShops = (shops: Shop[]) => {
  localStorage.setItem('shops', JSON.stringify(shops));
};

const getSubcategories = () => {
  const subcategories = localStorage.getItem('subcategories');
  return subcategories ? JSON.parse(subcategories) : [];
};

const GestionBoutiquesPage = () => {
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState<Shop[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [showAddShop, setShowAddShop] = useState(false);
  const [newShop, setNewShop] = useState<Shop>({
    name: '',
    subcategories: [],
    image: '',
    email: '',
    contact: '',
    description: '',
    ownerEmail: '',
  });

  // Load data on mount
  useEffect(() => {
    setShops(getShops());
    setSubcategories(getSubcategories());
  }, []);

  const handleAddShop = () => {
    setLoading(true);
    setTimeout(() => {
      const shop: Shop = {
        ...newShop,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      const updatedShops = [...shops, shop];
      setShops(updatedShops);
      saveShops(updatedShops);
      setShowAddShop(false);
      setNewShop({
        name: '',
        subcategories: [],
        image: '',
        email: '',
        contact: '',
        description: '',
        ownerEmail: '',
      });
      toast.success('Boutique ajoutée avec succès, en attente de vérification');
      setLoading(false);
    }, 1000);
  };

  const handleVerifyShop = (id: number, status: string) => {
    setLoading(true);
    setTimeout(() => {
      const updatedShops = shops.map((shop) =>
        shop.id === id ? { ...shop, status } : shop
      );
      setShops(updatedShops);
      saveShops(updatedShops);
      toast.success(`Boutique ${status === 'approved' ? 'approuvée' : 'rejetée'}`);
      setLoading(false);
    }, 1000);
  };

  const handleDeleteShop = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette boutique ?')) {
      const updatedShops = shops.filter((shop) => shop.id !== id);
      setShops(updatedShops);
      saveShops(updatedShops);
      toast.success('Boutique supprimée');
    }
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    const updatedSubcategories = newShop.subcategories.includes(subcategoryId)
      ? newShop.subcategories.filter((id: string) => id !== subcategoryId)
      : [...newShop.subcategories, subcategoryId];
    setNewShop({ ...newShop, subcategories: updatedSubcategories });
  };

  return (
    <div className="x-shops-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Loader loading={loading} />
      <div className="d-flex justify-content-between align-items-center mb-4 x-header-container">
        <h2 className="x-shops-title">Gestion des Boutiques</h2>
        <div>
          <button className="btn x-add-btn" onClick={() => setShowAddShop(true)}>
            <i className="fas fa-plus me-2"></i> Ajouter une Boutique
          </button>
        </div>
      </div>

      {/* Shop Listing */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Propriétaire</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((shop) => (
              <tr key={shop.id}>
                <td>{shop.name}</td>
                <td>{shop.email}</td>
                <td>{shop.contact}</td>
                <td>{shop.ownerEmail}</td>
                <td>{shop.status === 'pending' ? 'En attente' : shop.status === 'approved' ? 'Approuvé' : 'Rejeté'}</td>
                <td className="x-action-column">
                  {shop.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-success btn-sm x-action-btn me-1"
                        onClick={() => handleVerifyShop(shop.id!, 'approved')}
                      >
                        <i className="fas fa-check"></i>
                      </button>
                      <button
                        className="btn btn-warning btn-sm x-action-btn me-1"
                        onClick={() => handleVerifyShop(shop.id!, 'rejected')}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-danger btn-sm x-action-btn"
                    onClick={() => handleDeleteShop(shop.id!)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Shop Modal */}
      {showAddShop && (
        <div className="x-modal">
          <div className="x-modal-content">
            <h3>Ajouter une Boutique</h3>
            <div className="mb-3">
              <label className="x-shops-label">Nom de la Boutique</label>
              <input
                type="text"
                value={newShop.name}
                onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Sous-catégories (Commercial)</label>
              <div className="row">
                {subcategories.map((sub: any) => (
                  <div key={sub.id} className="col-6">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`subcategory-${sub.id}`}
                        checked={newShop.subcategories.includes(sub.id)}
                        onChange={() => handleSubcategoryChange(sub.id)}
                      />
                      <label className="form-check-label" htmlFor={`subcategory-${sub.id}`}>
                        {sub.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Image</label>
              <input
                type="file"
                onChange={(e: any) => setNewShop({ ...newShop, image: e.target.files[0]?.name || '' })}
                className="form-control"
                accept="image/*"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Email de la Boutique</label>
              <input
                type="email"
                value={newShop.email}
                onChange={(e) => setNewShop({ ...newShop, email: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Contact</label>
              <input
                type="text"
                value={newShop.contact}
                onChange={(e) => setNewShop({ ...newShop, contact: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Description</label>
              <textarea
                value={newShop.description}
                onChange={(e) => setNewShop({ ...newShop, description: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Email du Propriétaire</label>
              <input
                type="email"
                value={newShop.ownerEmail}
                onChange={(e) => setNewShop({ ...newShop, ownerEmail: e.target.value })}
                className="form-control"
              />
            </div>
            <button
              className="btn x-modal-btn me-2"
              onClick={handleAddShop}
              disabled={!newShop.name || !newShop.email || !newShop.contact || !newShop.ownerEmail}
            >
              Ajouter
            </button>
            <button className="btn x-modal-close" onClick={() => setShowAddShop(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionBoutiquesPage;