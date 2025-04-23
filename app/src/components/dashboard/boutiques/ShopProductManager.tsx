'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

// Interface for props
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
  const [editingExpirationProductId, setEditingExpirationProductId] = useState<number | null>(null);
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

  // Filter products associated with the shop
  const shopProducts = products.filter(
    (product: any) => product.shopId === shopId && product.type === 'Commercial'
  );

  // Filter available products for association
  const availableProducts = products.filter(
    (product: any) =>
      product.type === 'Commercial' &&
      (!product.shopId || product.shopId !== shopId) &&
      product.ownership === 'client'
  );

  // Handle associating a product to the shop
  const handleAssociate = () => {
    if (selectedProductId && expirationDate) {
      onAssociateProduct(selectedProductId, expirationDate);
      setShowAssociateModal(false);
      setSelectedProductId(null);
      setExpirationDate('');
    } else {
      toast.error('Veuillez sélectionner un produit et une date d’expiration.');
    }
  };

  // Handle updating expiration date
  const handleUpdateExpiration = (productId: number) => {
    if (!expirationDate) {
      toast.error('Veuillez entrer une date d’expiration.');
      return;
    }
    onUpdateExpiration(productId, expirationDate);
    setEditingExpirationProductId(null);
    setExpirationDate('');
  };

  // Toggle editing mode for expiration date
  const toggleEditExpiration = (productId: number, currentExpiration: string) => {
    setEditingExpirationProductId(productId);
    setExpirationDate(currentExpiration || '');
  };

  // Handle input changes for new product form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0]?.name || '';
    setNewProduct({ ...newProduct, [name]: file });
  };

  // Add a variant to the new product
  const addVariant = () => {
    const updatedVariants = [
      ...(newProduct.variants || []),
      { size: '', colors: [{ color: '', stock: '' }], price: '' },
    ];
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  // Handle variant changes
  const handleVariantChange = (index: number, field: string, value: string) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  // Add a color to a variant
  const addColorToVariant = (variantIndex: number) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[variantIndex].colors.push({ color: '', stock: '' });
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  // Handle color stock changes within a variant
  const handleColorStockChange = (variantIndex: number, colorIndex: number, stock: string) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[variantIndex].colors[colorIndex].stock = stock;
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  // Handle color change within a variant
  const handleColorChange = (variantIndex: number, colorIndex: number, color: string) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[variantIndex].colors[colorIndex].color = color;
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  // Add a custom field
  const addCustomField = () => {
    const updatedCustomFields = [
      ...(newProduct.customFields || []),
      { name: '', value: '' },
    ];
    setNewProduct({ ...newProduct, customFields: updatedCustomFields });
  };

  // Handle custom field changes
  const handleCustomFieldChange = (index: number, field: string, value: string) => {
    const updatedCustomFields = [...newProduct.customFields];
    updatedCustomFields[index] = { ...updatedCustomFields[index], [field]: value };
    setNewProduct({ ...newProduct, customFields: updatedCustomFields });
  };

  // Validate and create a new product
  const handleCreateProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.subcategory ||
      !newProduct.expirationDate
    ) {
      toast.error('Veuillez remplir tous les champs obligatoires (*).');
      return;
    }

    // Validate variants
    const areVariantsValid = newProduct.variants.every((variant: any) =>
      variant.size &&
      variant.price &&
      variant.colors.every((color: any) => color.color && color.stock)
    );
    if (newProduct.variants.length > 0 && !areVariantsValid) {
      toast.error('Veuillez remplir tous les champs des variantes (taille, prix, couleur, stock).');
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

  // Predefined colors for variant selection
  const AVAILABLE_COLORS = [
    'Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Orange',
    'Pink', 'Gray', 'Brown', 'Cyan'
  ];

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
            title="Associer un produit existant à cette boutique"
          >
            <i className="fas fa-link me-2"></i> Associer un Produit
          </button>
          <button
            className="btn x-add-btn"
            onClick={() => setShowCreateModal(true)}
            title="Créer un nouveau produit pour cette boutique"
          >
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
              <th>Stock Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shopProducts.map((product: any) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  {editingExpirationProductId === product.id ? (
                    <div className="d-flex align-items-center">
                      <input
                        type="date"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        className="form-control d-inline-block me-2"
                        style={{ width: 'auto' }}
                        title="Sélectionnez la nouvelle date d’expiration"
                      />
                      <button
                        className="btn btn-success btn-sm x-action-btn me-1"
                        onClick={() => handleUpdateExpiration(product.id)}
                        title="Enregistrer la nouvelle date d’expiration"
                      >
                        <i className="fas fa-save"></i>
                      </button>
                      <button
                        className="btn btn-secondary btn-sm x-action-btn"
                        onClick={() => setEditingExpirationProductId(null)}
                        title="Annuler la modification"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <span className="me-2">{product.expirationDate || 'N/A'}</span>
                      <button
                        className="btn btn-info btn-sm x-action-btn"
                        onClick={() => toggleEditExpiration(product.id, product.expirationDate)}
                        title="Modifier la date d’expiration"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  {product.variants && product.variants.length > 0
                    ? product.variants.reduce(
                        (total: number, variant: any) =>
                          total +
                          (variant.colors?.reduce(
                            (colorTotal: number, color: any) =>
                              colorTotal + (parseInt(color.stock) || 0),
                            0
                          ) || 0),
                        0
                      )
                    : 0}
                </td>
                <td className="x-action-column">
                  {/* Placeholder for additional actions if needed */}
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
              <label className="x-shops-label" title="Sélectionnez un produit à associer">
                Produit *
              </label>
              <select
                className="form-select"
                value={selectedProductId || ''}
                onChange={(e) => setSelectedProductId(parseInt(e.target.value))}
                required
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
              <label className="x-shops-label" title="Date jusqu’à laquelle le produit sera disponible">
                Date d’Expiration *
              </label>
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button
              className="btn x-modal-btn me-2"
              onClick={handleAssociate}
              disabled={!selectedProductId || !expirationDate}
            >
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
              <label className="x-shops-label" title="Nom du produit">
                Nom *
              </label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Ex: T-shirt Coton"
                required
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label" title="Description détaillée du produit">
                Description *
              </label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Décrivez les caractéristiques principales..."
                required
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label" title="Catégorie principale du produit">
                Catégorie *
              </label>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="form-select"
                required
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
              <label className="x-shops-label" title="Sous-catégorie du produit">
                Sous-catégorie *
              </label>
              <select
                name="subcategory"
                value={newProduct.subcategory}
                onChange={handleInputChange}
                className="form-select"
                required
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
              <label className="x-shops-label" title="Poids du produit en kilogrammes">
                Poids (kg) *
              </label>
              <input
                type="number"
                name="weight"
                value={newProduct.weight}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Ex: 0.5"
                required
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label" title="Dimensions du produit (ex: 30x20x10)">
                Taille (cm) *
              </label>
              <input
                type="text"
                name="size"
                value={newProduct.size}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Ex: 30x20x10"
                required
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label" title="Première image du produit">
                Image 1 *
              </label>
              <input
                type="file"
                name="image1"
                onChange={handleFileChange}
                className="form-control"
                accept="image/*"
                required
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label" title="Deuxième image du produit (optionnel)">
                Image 2
              </label>
              <input
                type="file"
                name="image2"
                onChange={handleFileChange}
                className="form-control"
                accept="image/*"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label" title="Troisième image du produit (optionnel)">
                Image 3
              </label>
              <input
                type="file"
                name="image3"
                onChange={handleFileChange}
                className="form-control"
                accept="image/*"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label" title="Quatrième image du produit (optionnel)">
                Image 4
              </label>
              <input
                type="file"
                name="image4"
                onChange={handleFileChange}
                className="form-control"
                accept="image/*"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label" title="Vidéo descriptive du produit (optionnel)">
                Vidéo de Description
              </label>
              <input
                type="file"
                name="video"
                onChange={handleFileChange}
                className="form-control"
                accept="video/*"
              />
            </div>
            <div className="mb-3">
              <label className="x-shops-label" title="Date jusqu’à laquelle le produit sera disponible">
                Date d’Expiration *
              </label>
              <input
                type="date"
                name="expirationDate"
                value={newProduct.expirationDate}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            {newProduct.variants?.map((variant: any, index: number) => (
              <div key={index} className="border p-3 mb-3">
                <label className="x-shops-label" title="Taille ou spécification (ex: M, 1TB)">
                  Taille *
                </label>
                <input
                  type="text"
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                  className="form-control mb-3"
                  placeholder={newProduct.subcategory === 'T-Shirts' ? 'Ex: M' : 'Ex: 1TB'}
                  required
                />
                <label className="x-shops-label" title="Prix pour cette taille">
                  Prix *
                </label>
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                  className="form-control mb-3"
                  placeholder="Ex: 25.99"
                  required
                />
                {variant.colors.map((colorObj: any, colorIndex: number) => (
                  <div key={colorIndex} className="row mb-3">
                    <div className="col-6">
                      <label className="x-shops-label" title="Sélectionnez une couleur disponible">
                        Couleur *
                      </label>
                      <select
                        value={colorObj.color}
                        onChange={(e) => handleColorChange(index, colorIndex, e.target.value)}
                        className="form-select"
                        required
                      >
                        <option value="">Sélectionner une couleur</option>
                        {AVAILABLE_COLORS.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="x-shops-label" title="Stock pour cette couleur">
                        Stock *
                      </label>
                      <input
                        type="number"
                        value={colorObj.stock}
                        onChange={(e) => handleColorStockChange(index, colorIndex, e.target.value)}
                        className="form-control"
                        placeholder="Ex: 50"
                        required
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="btn x-add-btn mb-3"
                  onClick={() => addColorToVariant(index)}
                  title="Ajouter une autre couleur pour cette taille"
                >
                  <i className="fas fa-plus me-2"></i> Ajouter une Couleur
                </button>
              </div>
            ))}
            <button
              className="btn x-add-btn mb-3"
              onClick={addVariant}
              title="Ajouter une nouvelle variante avec une taille différente"
            >
              <i className="fas fa-plus me-2"></i> Ajouter une Variante
            </button>
            {subcategories
              .find((sub: any) => sub.id === newProduct.subcategory)
              ?.characteristics?.map((char: string, index: number) => (
                <div key={index} className="mb-3">
                  <label className="x-shops-label" title={`Valeur pour ${char}`}>
                    {char} *
                  </label>
                  <input
                    type="text"
                    name={`char_${char}`}
                    value={newProduct[`char_${char}`] || ''}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder={`Ex: ${char === 'Matériau' ? 'Coton' : char === 'Puissance' ? '500W' : ''}`}
                    required
                  />
                </div>
              ))}
            {newProduct.customFields?.map((field: any, index: number) => (
              <div key={index} className="row mb-3">
                <div className="col-6">
                  <input
                    type="text"
                    placeholder="Nom du champ (ex: Longueur)"
                    value={field.name}
                    onChange={(e) => handleCustomFieldChange(index, 'name', e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    placeholder="Valeur (ex: 120 cm)"
                    value={field.value}
                    onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            ))}
            <button
              className="btn x-add-btn mb-3"
              onClick={addCustomField}
              title="Ajouter un champ personnalisé au produit"
            >
              <i className="fas fa-plus me-2"></i> Ajouter un Champ Personnalisé
            </button>
            <button
              className="btn x-modal-btn me-2"
              onClick={handleCreateProduct}
              title="Créer le produit et l’associer à la boutique"
            >
              Créer
            </button>
            <button
              className="btn x-modal-close"
              onClick={() => setShowCreateModal(false)}
              title="Annuler et fermer la fenêtre"
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