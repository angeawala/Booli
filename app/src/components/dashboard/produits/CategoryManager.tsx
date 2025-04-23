'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

interface CategoryManagerProps {
  categories: any[];
  onAddCategory: (newCategory: any) => void;
  onUpdateCategory: (updatedCategory: any) => void;
  onDeleteCategory: (id: number) => void;
  onClose: () => void;
}

const CategoryManager = ({ categories, onAddCategory, onUpdateCategory, onDeleteCategory, onClose }: CategoryManagerProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategory, setEditCategory] = useState<any>(null);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory = {
      id: Date.now(),
      type: (e.target as any).type.value,
      name: (e.target as any).name.value,
      icon: (e.target as any).icon.value,
      image: (e.target as any).image?.files[0]?.name || '',
      video: (e.target as any).video?.files[0]?.name || '',
    };
    onAddCategory(newCategory);
    toast.success('Catégorie ajoutée');
  };

  const handleEditCategory = (category: any) => {
    setEditCategory(category);
    setShowEditModal(true);
  };

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCategory = {
      ...editCategory,
      type: (e.target as any).type.value,
      name: (e.target as any).name.value,
      icon: (e.target as any).icon.value,
      image: (e.target as any).image?.files[0]?.name || editCategory.image,
      video: (e.target as any).video?.files[0]?.name || editCategory.video,
    };
    onUpdateCategory(updatedCategory);
    setShowEditModal(false);
    setEditCategory(null);
    toast.success('Catégorie mise à jour');
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      onDeleteCategory(id);
      toast.success('Catégorie supprimée');
    }
  };

  return (
    <div className="x-modal">
      <div className="x-modal-content">
        <h3>Gérer les Catégories</h3>
        <form onSubmit={handleAddCategory}>
          <label className="x-products-label">Type</label>
          <select name="type" className="form-select mb-3">
            <option value="Livres">Livres</option>
            <option value="Pharmacopée">Pharmacopée</option>
            <option value="Commercial">Commercial</option>
          </select>
          <label className="x-products-label">Nom</label>
          <input type="text" name="name" className="form-control mb-3" required />
          <label className="x-products-label">Icône (Classe Font Awesome)</label>
          <input type="text" name="icon" className="form-control mb-3" placeholder="fas fa-book" required />
          <label className="x-products-label">Image</label>
          <input type="file" name="image" className="form-control mb-3" accept="image/*" />
          <label className="x-products-label">Vidéo (pour Commercial)</label>
          <input type="file" name="video" className="form-control mb-3" accept="video/*" />
          <button type="submit" className="btn x-modal-btn">Ajouter</button>
        </form>
        <h4 className="mt-4">Liste des Catégories</h4>
        <ul className="list-group">
          {categories.map((cat: any) => (
            <li key={cat.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{cat.name} ({cat.type})</span>
              <div>
                <button className="btn btn-info btn-sm me-2" onClick={() => handleEditCategory(cat)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCategory(cat.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button className="btn x-modal-close" onClick={onClose}>
          Fermer
        </button>
      </div>

      {/* Edit Category Modal */}
      {showEditModal && editCategory && (
        <div className="x-modal">
          <div className="x-modal-content">
            <h3>Modifier la Catégorie</h3>
            <form onSubmit={handleUpdateCategory}>
              <label className="x-products-label">Type</label>
              <select name="type" className="form-select mb-3" defaultValue={editCategory.type}>
                <option value="Livres">Livres</option>
                <option value="Pharmacopée">Pharmacopée</option>
                <option value="Commercial">Commercial</option>
              </select>
              <label className="x-products-label">Nom</label>
              <input type="text" name="name" className="form-control mb-3" defaultValue={editCategory.name} required />
              <label className="x-products-label">Icône (Classe Font Awesome)</label>
              <input type="text" name="icon" className="form-control mb-3" defaultValue={editCategory.icon} required />
              <label className="x-products-label">Image</label>
              <input type="file" name="image" className="form-control mb-3" accept="image/*" />
              <label className="x-products-label">Vidéo (pour Commercial)</label>
              <input type="file" name="video" className="form-control mb-3" accept="video/*" />
              <button type="submit" className="btn x-modal-btn">Mettre à jour</button>
            </form>
            <button className="btn x-modal-close" onClick={() => setShowEditModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;