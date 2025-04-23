'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

interface ShopProductManagerProps {
  shopId: number;
  products: any[];
  subcategories: any[];
  onAssociateProduct: (productId: number, expirationDate: string) => void;
  onUpdateExpiration: (productId: number, expirationDate: string) => void;
  onCreateProduct: (formData: any) => void;
}

const ShopProductManager = ({
  shopId,
  products,
  subcategories,
  onAssociateProduct,
  onUpdateExpiration,
  onCreateProduct,
}: ShopProductManagerProps) => {
  const [showAssociateModal, setShowAssociateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [expirationDate, setExpirationDate] = useState('');
  const [newProduct, setNewProduct] = useState<any>({
    type: 'Commercial',
    name: '',
    description: '',
    category: '',
    subcategory: '',
    weight: '',
    size: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    video: '',
    variants: [],
    customFields: [],
    expirationDate: '',
  });

  const shopProducts = products.filter(
    (product: any) => product.shopId === shopId && product.type === 'Commercial'
  );
  const availableProducts = products.filter(
    (product: any) =>
      product.type === 'Commercial' &&
      (!product.shopId || product.shopId !== shopId) &&
      product.ownership === 'client'
  );

  const handleAssociate = () => {
    if (selectedProductId && expirationDate) {
      onAssociateProduct(selectedProductId, expirationDate);
      setShowAssociateModal(false);
      setSelectedProductId(null);
      setExpirationDate('');
    } else {
      toast.error('Veuillez sélectionner un produit et une date d’expiration');
    }
  };

  const handleUpdateExpiration = (productId: number) => {
    if (expirationDate) {
      onUpdateExpiration(productId, expirationDate);
      setExpirationDate('');
    } else {
      toast.error('Veuillez entrer une date d’expiration');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0]?.name || '';
    setNewProduct({ ...newProduct, [name]: file });
  };

  const addVariant = () => {
    const updatedVariants = [
      ...(newProduct.variants || []),
      { size: '', color: '', price: '', stock: '', image: '' },
    ];
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  const handleVariantChange = (index: number, field: string, value: string) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  const addCustomField = () => {
    const updatedCustomFields = [
      ...(newProduct.customFields || []),
      { name: '', value: '' },
    ];
    setNewProduct({ ...newProduct, customFields: updatedCustomFields });
  };

  const handleCustomFieldChange = (index: number, field: string, value: string) => {
    const updatedCustomFields = [...newProduct.customFields];
    updatedCustomFields[index] = { ...updatedCustomFields[index], [field]: value };
    setNewProduct({ ...newProduct, customFields: updatedCustomFields });
  };

  const handleCreateProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.subcategory ||
      !newProduct.expirationDate
    ) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    onCreateProduct(newProduct);
    setShowCreateModal(false);
    setNewProduct({
      type: 'Commercial',
      name: '',
      description: '',
      category: '',
      subcategory: '',
      weight: '',
      size: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      video: '',
      variants: [],
      customFields: [],
      expirationDate: '',
    });
  };

  return (
    <div className="mt-4">
      <h3>Gestion des Produits de la Boutique</h3>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Produits Associés</h4>
        <div>
          <button
            className="btn x-add-btn me-2"
            onClick={() => setShowAssociateModal(true)}
            disabled={availableProducts.length === 0}
          >
            <i className="fas fa-link me-2"></i> Associer un Produit
          </button>
          <button className="btn x-add-btn" onClick={() => setShowCreateModal(true)}>
            <i className="fas fa-plus me-2"></i> Créer un Produit
          </button>
        </div>
      </div>

      {/* List of Shop Products */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Date d’Expiration</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shopProducts.map((product: any) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.expirationDate || 'N/A'}</td>
                <td>{product.variants?.reduce((total: number, variant: any) => total + (parseInt(variant.stock) || 0), 0) || 0}</td>
                <td className="x-action-column">
                  <input
                    type="date"
                    value={expirationDate || product.expirationDate || ''}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="form-control d-inline-block me-2"
                    style={{ width: 'auto' }}
                  />
                  <button
                    className="btn btn-info btn-sm x-action-btn"
                    onClick={() => handleUpdateExpiration(product.id)}
                  >
                    <i className="fas fa-save"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Associate Product Modal */}
      {showAssociateModal && (
        <div className="x-modal">
          <div className="x-modal-content">
            <h3>Associer un Produit à la Boutique</h3>
            <div className="mb-3">
              <label className="x-shops-label">Produit</label>
              <select
                className="form-select"
                value={selectedProductId || ''}
                onChange={(e) => setSelectedProductId(parseInt(e.target.value))}
              >
                <option value="">Sélectionner un produit</option>
                {availableProducts.map((product: any) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Date d’Expiration</label>
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="form-control"
              />
            </div>
            <button className="btn x-modal-btn me-2" onClick={handleAssociate}>
              Associer
            </button>
            <button
              className="btn x-modal-close"
              onClick={() => setShowAssociateModal(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Create Product Modal */}
      {showCreateModal && (
        <div className="x-modal">
          <div className="x-modal-content">
            <h3>Créer un Produit pour la Boutique</h3>
            <div className="mb-3">
              <label className="x-shops-label">Nom</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Description</label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Catégorie</label>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Sélectionner une catégorie</option>
                {subcategories
                  .map((sub: any) => sub.categoryId)
                  .filter((value: any, index: number, self: any[]) => self.indexOf(value) === index)
                  .map((catId: any) => (
                    <option key={catId} value={catId}>
                      {catId}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Sous-catégorie</label>
              <select
                name="subcategory"
                value={newProduct.subcategory}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Sélectionner une sous-catégorie</option>
                {subcategories
                  .filter((sub: any) => sub.categoryId === newProduct.category)
                  .map((sub: any) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Poids (kg)</label>
              <input
                type="number"
                name="weight"
                value={newProduct.weight}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Taille (cm)</label>
              <input
                type="text"
                name="size"
                value={newProduct.size}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Image 1</label>
              <input
                type="file"
                name="image1"
                onChange={handleFileChange}
                className="form-control"
                accept="image/*"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Image 2</label>
              <input
                type="file"
                name="image2"
                onChange={handleFileChange}
                className="form-control"
                accept="image/*"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Image 3</label>
              <input
                type="file"
                name="image3"
                onChange={handleFileChange}
                className="form-control"
                accept="image/*"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Image 4</label>
              <input
                type="file"
                name="image4"
                onChange={handleFileChange}
                className="form-control"
                accept="image/*"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Vidéo de Description</label>
              <input
                type="file"
                name="video"
                onChange={handleFileChange}
                className="form-control"
                accept="video/*"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label">Date d’Expiration</label>
              <input
                type="date"
                name="expirationDate"
                value={newProduct.expirationDate}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button className="btn x-add-btn mb-3" onClick={addVariant}>
              <i className="fas fa-plus me-2"></i> Ajouter une Variante
            </button>
            {newProduct.variants?.map((variant: any, index: number) => (
              <div key={index} className="border p-3 mb-3">
                <label className="x-shops-label">Taille</label>
                <input
                  type="text"
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, 'size', e.target.value)
                  }
                  className="form-control mb-3"
                />
                <label className="x-shops-label">Couleur</label>
                <input
                  type="text"
                  value={variant.color}
                  onChange={(e) =>
                    handleVariantChange(index, 'color', e.target.value)
                  }
                  className="form-control mb-3"
                />
                <label className="x-shops-label">Prix</label>
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, 'price', e.target.value)
                  }
                  className="form-control mb-3"
                />
                <label className="x-shops-label">Stock</label>
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, 'stock', e.target.value)
                  }
                  className="form-control mb-3"
                />
                <label className="x-shops-label">Image</label>
                <input
                  type="file"
                  onChange={(e: any) =>
                    handleVariantChange(index, 'image', e.target.files[0]?.name || '')
                  }
                  className="form-control mb-3"
                  accept="image/*"
                />
              </div>
            ))}
            <button className="btn x-add-btn mb-3" onClick={addCustomField}>
              <i className="fas fa-plus me-2"></i> Ajouter un Champ Personnalisé
            </button>
            {newProduct.customFields?.map((field: any, index: number) => (
              <div key={index} className="row mb-3">
                <div className="col-6">
                  <input
                    type="text"
                    placeholder="Nom du champ"
                    value={field.name}
                    onChange={(e) =>
                      handleCustomFieldChange(index, 'name', e.target.value)
                    }
                    className="form-control"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    placeholder="Valeur"
                    value={field.value}
                    onChange={(e) =>
                      handleCustomFieldChange(index, 'value', e.target.value)
                    }
                    className="form-control"
                  />
                </div>
              </div>
            ))}
            <button className="btn x-modal-btn me-2" onClick={handleCreateProduct}>
              Créer
            </button>
            <button
              className="btn x-modal-close"
              onClick={() => setShowCreateModal(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopProductManager;