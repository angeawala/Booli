'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface ViewDetailsModalProps {
  product: any;
  categories: any[];
  subcategories: any[];
  onSave: (updatedProduct: any) => void;
  onClose: () => void;
}

const ViewDetailsModal = ({ product, categories, subcategories, onSave, onClose }: ViewDetailsModalProps) => {
  const [editFormData, setEditFormData] = useState({ ...product });
  const [hasChanges, setHasChanges] = useState(false);

  // Deep comparison to detect changes
  useEffect(() => {
    const deepEqual = (obj1: any, obj2: any): boolean => {
      if (obj1 === obj2) return true;
      if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) return false;

      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length) return false;

      for (const key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!deepEqual(obj1[key], obj2[key])) return false;
      }
      return true;
    };

    setHasChanges(!deepEqual(product, editFormData));
  }, [editFormData, product]);

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveChanges = () => {
    onSave(editFormData);
    toast.success('Modifications enregistrées');
  };

  return (
    <div className="x-modal">
      <div className="x-modal-content">
        <h3>Détails du Produit</h3>
        <div className="mb-3">
          <label className="x-products-label">Type de Produit</label>
          <input
            type="text"
            value={product.type}
            className="form-control x-profile-input-disabled"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="x-products-label">Catégorie</label>
          <input
            type="text"
            value={categories.find((cat: any) => cat.id === product.category)?.name || 'N/A'}
            className="form-control x-profile-input-disabled"
            disabled
          />
        </div>
        {product.type === 'Commercial' && (
          <div className="mb-3">
            <label className="x-products-label">Sous-catégorie</label>
            <input
              type="text"
              value={subcategories.find((sub: any) => sub.id === product.subcategory)?.name || 'N/A'}
              className="form-control x-profile-input-disabled"
              disabled
            />
          </div>
        )}
        <div className="mb-3">
          <label className="x-products-label">Nom</label>
          <input
            type="text"
            name="name"
            value={editFormData.name || ''}
            onChange={handleEditInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="x-products-label">Description</label>
          <textarea
            name="description"
            value={editFormData.description || ''}
            onChange={handleEditInputChange}
            className="form-control"
          />
        </div>
        {product.type === 'Livres' && (
          <>
            <div className="mb-3">
              <label className="x-products-label">Auteur</label>
              <input
                type="text"
                name="bookAuthor"
                value={editFormData.bookAuthor || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="x-products-label">Éditeur</label>
              <input
                type="text"
                name="publisher"
                value={editFormData.publisher || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="x-products-label">Année de Publication</label>
              <input
                type="number"
                name="publicationYear"
                value={editFormData.publicationYear || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            {editFormData.hasPDF && (
              <div className="mb-3">
                <label className="x-products-label">Prix (PDF)</label>
                <input
                  type="number"
                  name="pdfPrice"
                  value={editFormData.pdfPrice || ''}
                  onChange={handleEditInputChange}
                  className="form-control"
                />
              </div>
            )}
            {editFormData.hasPhysical && (
              <>
                <div className="mb-3">
                  <label className="x-products-label">Poids (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={editFormData.weight || ''}
                    onChange={handleEditInputChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="x-products-label">Taille (cm)</label>
                  <input
                    type="text"
                    name="size"
                    value={editFormData.size || ''}
                    onChange={handleEditInputChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="x-products-label">Prix (Physique)</label>
                  <input
                    type="number"
                    name="physicalPrice"
                    value={editFormData.physicalPrice || ''}
                    onChange={handleEditInputChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="x-products-label">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={editFormData.stock || ''}
                    onChange={handleEditInputChange}
                    className="form-control"
                  />
                </div>
              </>
            )}
          </>
        )}
        {product.type === 'Pharmacopée' && (
          <>
            <div className="mb-3">
              <label className="x-products-label">Stock Actuel</label>
              <input
                type="number"
                name="stock"
                value={editFormData.stock || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="x-products-label">Date d'Expiration</label>
              <input
                type="date"
                name="expirationDate"
                value={editFormData.expirationDate || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="x-products-label">Prix</label>
              <input
                type="number"
                name="price"
                value={editFormData.price || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
          </>
        )}
        {product.type === 'Commercial' && (
          <>
            <div className="mb-3">
              <label className="x-products-label">Poids (kg)</label>
              <input
                type="number"
                name="weight"
                value={editFormData.weight || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="x-products-label">Taille (cm)</label>
              <input
                type="text"
                name="size"
                value={editFormData.size || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            {editFormData.variants?.map((variant: any, index: number) => (
              <div key={index} className="border p-3 mb-3">
                <label className="x-products-label">Taille (Variante {index + 1})</label>
                <input
                  type="text"
                  value={variant.size}
                  className="form-control mb-3 x-profile-input-disabled"
                  disabled
                />
                <label className="x-products-label">Couleur</label>
                <input
                  type="text"
                  value={variant.color}
                  className="form-control mb-3 x-profile-input-disabled"
                  disabled
                />
                <label className="x-products-label">Prix</label>
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) => {
                    const updatedVariants = [...editFormData.variants];
                    updatedVariants[index].price = e.target.value;
                    setEditFormData({ ...editFormData, variants: updatedVariants });
                  }}
                  className="form-control mb-3"
                />
                <label className="x-products-label">Stock</label>
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) => {
                    const updatedVariants = [...editFormData.variants];
                    updatedVariants[index].stock = e.target.value;
                    setEditFormData({ ...editFormData, variants: updatedVariants });
                  }}
                  className="form-control mb-3"
                />
              </div>
            ))}
            {editFormData.shopId && (
              <div className="mb-3">
                <label className="x-products-label">Date d'Expiration</label>
                <input
                  type="date"
                  name="expirationDate"
                  value={editFormData.expirationDate || ''}
                  onChange={handleEditInputChange}
                  className="form-control"
                />
              </div>
            )}
          </>
        )}
        <div className="mb-3">
          <label className="x-products-label">Appartient à</label>
          <input
            type="text"
            value={editFormData.ownership === 'enterprise' ? 'Entreprise' : 'Client'}
            className="form-control x-profile-input-disabled"
            disabled
          />
        </div>
        {editFormData.ownership === 'client' && (
          <div className="mb-3">
            <label className="x-products-label">Email du Client</label>
            <input
              type="email"
              name="clientEmail"
              value={editFormData.clientEmail || ''}
              onChange={handleEditInputChange}
              className="form-control"
            />
          </div>
        )}
        <button
          className="btn x-modal-btn me-2"
          onClick={handleSaveChanges}
          disabled={!hasChanges}
        >
          Enregistrer les Modifications
        </button>
        <button className="btn x-modal-close" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ViewDetailsModal;