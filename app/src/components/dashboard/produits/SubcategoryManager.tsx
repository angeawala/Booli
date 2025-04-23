'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

interface SubcategoryManagerProps {
  categories: any[];
  subcategories: any[];
  onAddSubcategory: (newSubcategory: any) => void;
  onUpdateSubcategory: (updatedSubcategory: any) => void;
  onDeleteSubcategory: (id: number) => void;
  onClose: () => void;
}

const SubcategoryManager = ({ categories, subcategories, onAddSubcategory, onUpdateSubcategory, onDeleteSubcategory, onClose }: SubcategoryManagerProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSubcategory, setEditSubcategory] = useState<any>(null);

  const handleAddSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubcategory = {
      id: Date.now(),
      categoryId: (e.target as any).categoryId.value,
      name: (e.target as any).name.value,
      image: (e.target as any).image?.files[0]?.name || '',
      characteristics: (e.target as any).characteristics.value.split(',').map((c: string) => c.trim()),
    };
    onAddSubcategory(newSubcategory);
    toast.success('Sous-catégorie ajoutée');
  };

  const handleEditSubcategory = (subcategory: any) => {
    setEditSubcategory(subcategory);
    setShowEditModal(true);
  };

  const handleUpdateSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSubcategory = {
      ...editSubcategory,
      categoryId: (e.target as any).categoryId.value,
      name: (e.target as any).name.value,
      image: (e.target as any).image?.files[0]?.name || editSubcategory.image,
      characteristics: (e.target as any).characteristics.value.split(',').map((c: string) => c.trim()),
    };
    onUpdateSubcategory(updatedSubcategory);
    setShowEditModal(false);
    setEditSubcategory(null);
    toast.success('Sous-catégorie mise à jour');
  };

  const handleDeleteSubcategory = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?')) {
      onDeleteSubcategory(id);
      toast.success('Sous-catégorie supprimée');
    }
  };

  return (
    <div className="x-modal">
      <div className="x-modal-content">
        <h3>Gérer les Sous-catégories</h3>
        <form onSubmit={handleAddSubcategory}>
          <label className="x-products-label">Catégorie (Commercial)</label>
          <select name="categoryId" className="form-select mb-3">
            {categories
              .filter((cat: any) => cat.type === 'Commercial')
              .map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
          <label className="x-products-label">Nom</label>
          <input type="text" name="name" className="form-control mb-3" required />
          <label className="x-products-label">Image</label>
          <input type="file" name="image" className="form-control mb-3" accept="image/*" />
          <label className="x-products-label">Caractéristiques (séparées par des virgules)</label>
          <input type="text" name="characteristics" className="form-control mb-3" placeholder="Matériau, Couleur, etc." />
          <button type="submit" className="btn x-modal-btn">Ajouter</button>
        </form>
        <h4 className="mt-4">Liste des Sous-catégories</h4>
        <ul className="list-group">
          {subcategories.map((sub: any) => (
            <li key={sub.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{sub.name} (Catégorie ID: {sub.categoryId})</span>
              <div>
                <button className="btn btn-info btn-sm me-2" onClick={() => handleEditSubcategory(sub)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSubcategory(sub.id)}>
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

      {/* Edit Subcategory Modal */}
      {showEditModal && editSubcategory && (
        <div className="x-modal">
          <div className="x-modal-content">
            <h3>Modifier la Sous-catégorie</h3>
            <form onSubmit={handleUpdateSubcategory}>
              <label className="x-products-label">Catégorie (Commercial)</label>
              <select name="categoryId" className="form-select mb-3" defaultValue={editSubcategory.categoryId}>
                {categories
                  .filter((cat: any) => cat.type === 'Commercial')
                  .map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
              <label className="x-products-label">Nom</label>
              <input type="text" name="name" className="form-control mb-3" defaultValue={editSubcategory.name} required />
              <label className="x-products-label">Image</label>
              <input type="file" name="image" className="form-control mb-3" accept="image/*" />
              <label className="x-products-label">Caractéristiques (séparées par des virgules)</label>
              <input type="text" name="characteristics" className="form-control mb-3" defaultValue={editSubcategory.characteristics.join(', ')} />
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

export default SubcategoryManager;