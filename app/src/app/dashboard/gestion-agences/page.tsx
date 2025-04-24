'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/dashboard/Loader';
import { Agency, Category } from '@/components/dashboard/agencies/types';
import { getAgencies, saveAgencies, getCategories, saveCategories } from '@/components/dashboard/agencies/data';
import '@/styles/dashboard/gestion-agences.css';

const AgenciesManagementPage = () => {
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [newAgency, setNewAgency] = useState({
    name: '',
    description: '',
    image: '',
    address: '',
    phone: '',
    hours: '',
    email: '',
    website: '',
    categoryId: '',
    type: 'Agence' as 'Entreprise' | 'Agence' | 'ONG',
    domain: 'Voyage' as 'Voyage' | 'Marketing' | 'Événementiel' | 'Autre',
  });
  const [editingAgency, setEditingAgency] = useState<Agency | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', image: '' });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    setAgencies(getAgencies());
    setCategories(getCategories());
  }, []);

  const handleAddAgency = () => {
    if (!newAgency.name || !newAgency.description || !newAgency.categoryId) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const agency: Agency = {
        id: `agency${Date.now()}`,
        ...newAgency,
        services: [],
        opportunities: [],
        creatorEmail: 'staff@example.com', // À remplacer par l'utilisateur connecté
        creatorType: 'staff',
        isApproved: true,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      const updatedAgencies = [...agencies, agency];
      setAgencies(updatedAgencies);
      saveAgencies(updatedAgencies);
      setNewAgency({
        name: '',
        description: '',
        image: '',
        address: '',
        phone: '',
        hours: '',
        email: '',
        website: '',
        categoryId: '',
        type: 'Agence',
        domain: 'Voyage',
      });
      toast.success('Agence ajoutée avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleEditAgency = (agency: Agency) => {
    setEditingAgency(agency);
  };

  const handleUpdateAgency = () => {
    if (!editingAgency || !editingAgency.name || !editingAgency.description || !editingAgency.categoryId) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const updatedAgencies = agencies.map((agency) =>
        agency.id === editingAgency.id
          ? { ...editingAgency, lastUpdated: new Date().toISOString() }
          : agency
      );
      setAgencies(updatedAgencies);
      saveAgencies(updatedAgencies);
      setEditingAgency(null);
      toast.success('Agence mise à jour avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleDeleteAgency = (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette agence ?')) return;
    setLoading(true);
    setTimeout(() => {
      const updatedAgencies = agencies.filter((agency) => agency.id !== id);
      setAgencies(updatedAgencies);
      saveAgencies(updatedAgencies);
      toast.success('Agence supprimée avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleToggleApproval = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      const updatedAgencies = agencies.map((agency) =>
        agency.id === id ? { ...agency, isApproved: !agency.isApproved } : agency
      );
      setAgencies(updatedAgencies);
      saveAgencies(updatedAgencies);
      toast.success('Statut d’approbation mis à jour');
      setLoading(false);
    }, 1000);
  };

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.description) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const updatedCategories = [
        ...categories,
        {
          id: `cat${Date.now()}`,
          name: newCategory.name,
          description: newCategory.description,
          image: newCategory.image || 'https://example.com/default.jpg',
        },
      ];
      setCategories(updatedCategories);
      saveCategories(updatedCategories);
      setNewCategory({ name: '', description: '', image: '' });
      toast.success('Catégorie ajoutée avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || !editingCategory.name || !editingCategory.description) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const updatedCategories = categories.map((cat) =>
        cat.id === editingCategory.id ? editingCategory : cat
      );
      setCategories(updatedCategories);
      saveCategories(updatedCategories);
      setEditingCategory(null);
      toast.success('Catégorie mise à jour avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleDeleteCategory = (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) return;
    setLoading(true);
    setTimeout(() => {
      const updatedCategories = categories.filter((cat) => cat.id !== id);
      setCategories(updatedCategories);
      saveCategories(updatedCategories);
      toast.success('Catégorie supprimée avec succès');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="x-agencies-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Loader loading={loading} />
      <h2 className="x-agencies-title">Gestion des Agences</h2>

      {/* Button to Manage Categories */}
      <button
        className="btn x-modal-save mb-4"
        onClick={() => setShowCategoriesModal(true)}
      >
        Gérer les Catégories
      </button>

      {/* Add Agency Form */}
      <div className="x-create-agency-form mb-4">
        <h3 className="x-form-title">Ajouter une Agence</h3>
        <div className="mb-3">
          <label className="x-agencies-label">Nom *</label>
          <input
            type="text"
            value={newAgency.name}
            onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })}
            className="form-control x-modal-input"
            placeholder="Ex: Voyage Évasion"
          />
        </div>
        <div className="mb-3">
          <label className="x-agencies-label">Description *</label>
          <textarea
            value={newAgency.description}
            onChange={(e) => setNewAgency({ ...newAgency, description: e.target.value })}
            className="form-control x-modal-input"
            placeholder="Ex: Agence de voyage spécialisée dans les destinations exotiques."
          />
        </div>
        <div className="mb-3">
          <label className="x-agencies-label">Image (URL)</label>
          <input
            type="text"
            value={newAgency.image}
            onChange={(e) => setNewAgency({ ...newAgency, image: e.target.value })}
            className="form-control x-modal-input"
            placeholder="Ex: https://example.com/voyage-evasion.jpg"
          />
        </div>
        <div className="mb-3">
          <label className="x-agencies-label">Adresse</label>
          <input
            type="text"
            value={newAgency.address}
            onChange={(e) => setNewAgency({ ...newAgency, address: e.target.value })}
            className="form-control x-modal-input"
            placeholder="Ex: 123 Rue des Voyageurs, Porto-Novo"
          />
        </div>
        <div className="mb-3">
          <label className="x-agencies-label">Téléphone</label>
          <input
            type="text"
            value={newAgency.phone}
            onChange={(e) => setNewAgency({ ...newAgency, phone: e.target.value })}
            className="form-control x-modal-input"
            placeholder="Ex: +229 1234 5678"
          />
        </div>
        <div className="mb-3">
          <label className="x-agencies-label">Horaires</label>
          <input
            type="text"
            value={newAgency.hours}
            onChange={(e) => setNewAgency({ ...newAgency, hours: e.target.value })}
            className="form-control x-modal-input"
            placeholder="Ex: Lun-Ven : 9h-17h"
          />
        </div>
        <div className="mb-3">
          <label className="x-agencies-label">Email</label>
          <input
            type="email"
            value={newAgency.email}
            onChange={(e) => setNewAgency({ ...newAgency, email: e.target.value })}
            className="form-control x-modal-input"
            placeholder="Ex: contact@voyage-evasion.com"
          />
        </div>
        <div className="mb-3">
          <label className="x-agencies-label">Site web</label>
          <input
            type="text"
            value={newAgency.website}
            onChange={(e) => setNewAgency({ ...newAgency, website: e.target.value })}
            className="form-control x-modal-input"
            placeholder="Ex: https://voyage-evasion.com"
          />
        </div>
        <div className="mb-3">
          <label className="x-agencies-label">Catégorie *</label>
          <select
            value={newAgency.categoryId}
            onChange={(e) => setNewAgency({ ...newAgency, categoryId: e.target.value })}
            className="form-select x-modal-input"
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="x-agencies-label">Type</label>
          <select
            value={newAgency.type}
            onChange={(e) =>
              setNewAgency({ ...newAgency, type: e.target.value as 'Entreprise' | 'Agence' | 'ONG' })
            }
            className="form-select x-modal-input"
          >
            <option value="Entreprise">Entreprise</option>
            <option value="Agence">Agence</option>
            <option value="ONG">ONG</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="x-agencies-label">Domaine</label>
          <select
            value={newAgency.domain}
            onChange={(e) =>
              setNewAgency({
                ...newAgency,
                domain: e.target.value as 'Voyage' | 'Marketing' | 'Événementiel' | 'Autre',
              })
            }
            className="form-select x-modal-input"
          >
            <option value="Voyage">Voyage</option>
            <option value="Marketing">Marketing</option>
            <option value="Événementiel">Événementiel</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <button className="btn x-modal-save" onClick={handleAddAgency}>
          Ajouter l'Agence
        </button>
      </div>

      {/* Agencies List */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Type</th>
              <th>Domaine</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agencies.map((agency) => {
              const category = categories.find((cat) => cat.id === agency.categoryId);
              return (
                <tr key={agency.id}>
                  <td>{agency.name}</td>
                  <td>{category ? category.name : 'Inconnue'}</td>
                  <td>{agency.type}</td>
                  <td>{agency.domain}</td>
                  <td>{agency.isApproved ? 'Approuvée' : 'En attente'}</td>
                  <td>
                    <span className="x-action-icon" onClick={() => handleEditAgency(agency)}>
                      <i className="fas fa-edit"></i>
                      <span className="x-action-tooltip">Modifier</span>
                    </span>
                    <span className="x-action-icon" onClick={() => handleDeleteAgency(agency.id)}>
                      <i className="fas fa-trash"></i>
                      <span className="x-action-tooltip">Supprimer</span>
                    </span>
                    <span className="x-action-icon" onClick={() => handleToggleApproval(agency.id)}>
                      <i className={`fas ${agency.isApproved ? 'fa-times' : 'fa-check'}`}></i>
                      <span className="x-action-tooltip">
                        {agency.isApproved ? 'Désapprouver' : 'Approuver'}
                      </span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Agency Modal */}
      {editingAgency && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Modifier l'Agence</h3>
            <div className="mb-3">
              <label className="x-agencies-label">Nom *</label>
              <input
                type="text"
                value={editingAgency.name}
                onChange={(e) => setEditingAgency({ ...editingAgency, name: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Voyage Évasion"
              />
            </div>
            <div className="mb-3">
              <label className="x-agencies-label">Description *</label>
              <textarea
                value={editingAgency.description}
                onChange={(e) =>
                  setEditingAgency({ ...editingAgency, description: e.target.value })
                }
                className="form-control x-modal-input"
                placeholder="Ex: Agence de voyage spécialisée dans les destinations exotiques."
              />
            </div>
            <div className="mb-3">
              <label className="x-agencies-label">Image (URL)</label>
              <input
                type="text"
                value={editingAgency.image}
                onChange={(e) => setEditingAgency({ ...editingAgency, image: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: https://example.com/voyage-evasion.jpg"
              />
            </div>
            <div className="mb-3">
              <label className="x-agencies-label">Adresse</label>
              <input
                type="text"
                value={editingAgency.address}
                onChange={(e) => setEditingAgency({ ...editingAgency, address: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: 123 Rue des Voyageurs, Porto-Novo"
              />
            </div>
            <div className="mb-3">
              <label className="x-agencies-label">Téléphone</label>
              <input
                type="text"
                value={editingAgency.phone}
                onChange={(e) => setEditingAgency({ ...editingAgency, phone: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: +229 1234 5678"
              />
            </div>
            <div className="mb-3">
              <label className="x-agencies-label">Horaires</label>
              <input
                type="text"
                value={editingAgency.hours}
                onChange={(e) => setEditingAgency({ ...editingAgency, hours: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Lun-Ven : 9h-17h"
              />
            </div>
            <div className="mb-3">
              <label className="x-agencies-label">Email</label>
              <input
                type="email"
                value={editingAgency.email}
                onChange={(e) => setEditingAgency({ ...editingAgency, email: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: contact@voyage-evasion.com"
              />
            </div>
            <div className="mb-3">
              <label className="x-agencies-label">Site web</label>
              <input
                type="text"
                value={editingAgency.website}
                onChange={(e) => setEditingAgency({ ...editingAgency, website: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: https://voyage-evasion.com"
              />
            </div>
            <div className="mb-3">
              <label className="x-agencies-label">Catégorie *</label>
              <select
                value={editingAgency.categoryId}
                onChange={(e) =>
                  setEditingAgency({ ...editingAgency, categoryId: e.target.value })
                }
                className="form-select x-modal-input"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="x-agencies-label">Type</label>
              <select
                value={editingAgency.type}
                onChange={(e) =>
                  setEditingAgency({
                    ...editingAgency,
                    type: e.target.value as 'Entreprise' | 'Agence' | 'ONG',
                  })
                }
                className="form-select x-modal-input"
              >
                <option value="Entreprise">Entreprise</option>
                <option value="Agence">Agence</option>
                <option value="ONG">ONG</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="x-agencies-label">Domaine</label>
              <select
                value={editingAgency.domain}
                onChange={(e) =>
                  setEditingAgency({
                    ...editingAgency,
                    domain: e.target.value as 'Voyage' | 'Marketing' | 'Événementiel' | 'Autre',
                  })
                }
                className="form-select x-modal-input"
              >
                <option value="Voyage">Voyage</option>
                <option value="Marketing">Marketing</option>
                <option value="Événementiel">Événementiel</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <button className="btn x-modal-save mb-3" onClick={handleUpdateAgency}>
              Mettre à jour
            </button>
            <button className="btn x-modal-close mt-2" onClick={() => setEditingAgency(null)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Categories Management Modal */}
      {showCategoriesModal && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Gérer les Catégories d'Agences</h3>

            {/* Add Category Form */}
            <div className="mb-4">
              <h4 className="x-form-title">Ajouter une Catégorie</h4>
              <div className="mb-3">
                <label className="x-agencies-label">Nom *</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: Voyage"
                />
              </div>
              <div className="mb-3">
                <label className="x-agencies-label">Description *</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: Agences spécialisées dans les voyages et le tourisme."
                />
              </div>
              <div className="mb-3">
                <label className="x-agencies-label">Image (URL)</label>
                <input
                  type="text"
                  value={newCategory.image}
                  onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: https://example.com/voyage.jpg"
                />
              </div>
              <button className="btn x-modal-save" onClick={handleAddCategory}>
                Ajouter la Catégorie
              </button>
            </div>

            {/* Categories List */}
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td>
                        <a href={category.image} target="_blank" rel="noopener noreferrer">
                          Voir l'image
                        </a>
                      </td>
                      <td>
                        <span className="x-action-icon" onClick={() => handleEditCategory(category)}>
                          <i className="fas fa-edit"></i>
                          <span className="x-action-tooltip">Modifier</span>
                        </span>
                        <span className="x-action-icon" onClick={() => handleDeleteCategory(category.id)}>
                          <i className="fas fa-trash"></i>
                          <span className="x-action-tooltip">Supprimer</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="btn x-modal-close mt-2" onClick={() => setShowCategoriesModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Modifier la Catégorie</h3>
            <div className="mb-3">
              <label className="x-agencies-label">Nom *</label>
              <input
                type="text"
                value={editingCategory.name}
                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Voyage"
              />
            </div>
            <div className="mb-3">
              <label className="x-agencies-label">Description *</label>
              <textarea
                value={editingCategory.description}
                onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Agences spécialisées dans les voyages et le tourisme."
              />
            </div>
            <div className="mb-3">
              <label className="x-agencies-label">Image (URL)</label>
              <input
                type="text"
                value={editingCategory.image}
                onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: https://example.com/voyage.jpg"
              />
            </div>
            <button className="btn x-modal-save mb-3" onClick={handleUpdateCategory}>
              Mettre à jour
            </button>
            <button className="btn x-modal-close mt-2" onClick={() => setEditingCategory(null)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgenciesManagementPage;