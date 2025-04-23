'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/dashboard/Loader';
import ShopProductManager from '@/components/dashboard/boutiques/ShopProductManager';
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
  ownerEmail?: string;
  status?: string;
  createdAt?: string;
}

// Interface for Product data
interface Product {
  id: number;
  type: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  weight?: string;
  size?: string;
  variants?: Array<{
    size: string;
    colors: Array<{ color: string; stock: string }>;
    price: string;
    bulkPricing?: Array<{ minQuantity: number; pricePerUnit: number }>;
  }>;
  shopId?: number;
  expirationDate?: string;
  promotion?: {
    discountPercentage: number;
    startDate: string;
    endDate: string;
  };
  ownership: string;
  clientEmail?: string;
  createdAt?: string;
  sold?: number;
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

const getProducts = (): Product[] => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

const saveProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};

const MaBoutiquePage = () => {
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState<Shop[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [userShop, setUserShop] = useState<Shop | null>(null);
  const [showCreateShop, setShowCreateShop] = useState(false);
  const [showEditShop, setShowEditShop] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [showBulkPricingModal, setShowBulkPricingModal] = useState(false);
  const [editShopData, setEditShopData] = useState<Shop | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null);
  const [promotionData, setPromotionData] = useState({
    discountPercentage: '',
    startDate: '',
    endDate: '',
  });
  const [bulkPricingData, setBulkPricingData] = useState({
    minQuantity: '',
    pricePerUnit: '',
  });
  const [newShopData, setNewShopData] = useState<Shop>({
    name: '',
    subcategories: [],
    image: '',
    email: '',
    contact: '',
    description: '',
    ownerEmail: '',
  });

  // Simulated logged-in user
  const userEmail = 'user@example.com'; // Replace with actual user authentication logic

  // Load data on mount
  useEffect(() => {
    const allShops = getShops();
    const userShop = allShops.find((shop) => shop.ownerEmail === userEmail);
    setShops(allShops);
    setUserShop(userShop || null);
    setSubcategories(getSubcategories());
    setProducts(getProducts());
    if (userShop) {
      setEditShopData(userShop);
    }
  }, []);

  const handleCreateShop = () => {
    if (
      !newShopData.name ||
      !newShopData.email ||
      !newShopData.contact ||
      !newShopData.ownerEmail
    ) {
      toast.error('Veuillez remplir tous les champs obligatoires (*).');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newShop: Shop = {
        ...newShopData,
        id: Date.now(),
        ownerEmail: userEmail,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      const updatedShops = [...shops, newShop];
      setShops(updatedShops);
      saveShops(updatedShops);
      setUserShop(newShop);
      setShowCreateShop(false);
      setNewShopData({
        name: '',
        subcategories: [],
        image: '',
        email: '',
        contact: '',
        description: '',
        ownerEmail: '',
      });
      toast.success('Boutique créée avec succès, en attente de vérification');
      setLoading(false);
  }, 1000);
};

const handleUpdateShop = () => {
  if (!editShopData) return;
  setLoading(true);
  setTimeout(() => {
    const updatedShops = shops.map((shop) =>
      shop.id === editShopData.id ? { ...editShopData, status: 'pending' } : shop
    );
    setShops(updatedShops);
    saveShops(updatedShops);
    setUserShop(editShopData);
    setShowEditShop(false);
    toast.success('Boutique mise à jour, en attente de vérification');
    setLoading(false);
  }, 1000);
};

const handleSubcategoryChange = (subcategoryId: string, isEdit: boolean = false) => {
  const target = isEdit ? editShopData : newShopData;
  if (!target) return;
  const updatedSubcategories = target.subcategories.includes(subcategoryId)
    ? target.subcategories.filter((id: string) => id !== subcategoryId)
    : [...target.subcategories, subcategoryId];
  if (isEdit) {
    setEditShopData({ ...editShopData!, subcategories: updatedSubcategories });
  } else {
    setNewShopData({ ...newShopData, subcategories: updatedSubcategories });
  }
};

// Handle associating a product with the shop
const handleAssociateProduct = (productId: number, expirationDate: string) => {
  if (!userShop) return;
  setLoading(true);
  setTimeout(() => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, shopId: userShop.id, expirationDate }
        : product
    );
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    toast.success('Produit associé à la boutique');
    setLoading(false);
  }, 1000);
};

// Handle updating the expiration date of a shop product
const handleUpdateExpiration = (productId: number, expirationDate: string) => {
  setLoading(true);
  setTimeout(() => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, expirationDate } : product
    );
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    toast.success('Date d’expiration mise à jour');
    setLoading(false);
  }, 1000);
};

// Handle creating a new product directly in the shop
const handleCreateProduct = (formData: Product) => {
  if (!userShop) return;
  setLoading(true);
  setTimeout(() => {
    const newProduct: Product = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      sold: 0,
      shopId: userShop.id,
      ownership: 'client',
      clientEmail: userEmail,
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    toast.success('Produit créé et associé à la boutique');
    setLoading(false);
  }, 1000);
};

// Handle adding a promotion to a product variant
const handleAddPromotion = () => {
  if (
    !selectedProductId ||
    selectedVariantIndex === null ||
    !promotionData.discountPercentage ||
    !promotionData.startDate ||
    !promotionData.endDate
  ) {
    toast.error('Veuillez remplir tous les champs pour la promotion.');
    return;
  }

  // Validate dates
  const today = new Date('2025-04-23'); // Current date as per prompt
  const startDate = new Date(promotionData.startDate);
  const endDate = new Date(promotionData.endDate);

  if (startDate < today) {
    toast.error('La date de début ne peut pas être antérieure à aujourd’hui.');
    return;
  }
  if (startDate >= endDate) {
    toast.error('La date de début doit être antérieure à la date de fin.');
    return;
  }

  setLoading(true);
  setTimeout(() => {
    const updatedProducts = products.map((product) =>
      product.id === selectedProductId
        ? {
            ...product,
            variants: product.variants?.map((variant: any, index: number) =>
              index === selectedVariantIndex
                ? {
                    ...variant,
                    promotion: {
                      discountPercentage: parseFloat(promotionData.discountPercentage),
                      startDate: promotionData.startDate,
                      endDate: promotionData.endDate,
                    },
                  }
                : variant
            ),
          }
        : product
    );
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setShowPromotionModal(false);
    setSelectedProductId(null);
    setSelectedVariantIndex(null);
    setPromotionData({ discountPercentage: '', startDate: '', endDate: '' });
    toast.success('Promotion ajoutée avec succès');
    setLoading(false);
  }, 1000);
};

// Handle adding bulk pricing to a product variant
const handleAddBulkPricing = () => {
  if (
    !selectedProductId ||
    selectedVariantIndex === null ||
    !bulkPricingData.minQuantity ||
    !bulkPricingData.pricePerUnit
  ) {
    toast.error('Veuillez remplir tous les champs pour le prix en gros.');
    return;
  }

  const minQuantity = parseInt(bulkPricingData.minQuantity);
  const pricePerUnit = parseFloat(bulkPricingData.pricePerUnit);

  setLoading(true);
  setTimeout(() => {
    const updatedProducts = products.map((product) => {
      if (product.id !== selectedProductId) return product;

      const updatedVariants = product.variants?.map((variant: any, index: number) => {
        if (index !== selectedVariantIndex) return variant;

        const existingBulkPricing = variant.bulkPricing || [];
        const newBulkPricingEntry = { minQuantity, pricePerUnit };

        // Validate bulk pricing condition: minQuantity1 > minQuantity2 => pricePerUnit1 > pricePerUnit2
        for (const pricing of existingBulkPricing) {
          if (
            (minQuantity > pricing.minQuantity && pricePerUnit <= pricing.pricePerUnit) ||
            (minQuantity < pricing.minQuantity && pricePerUnit >= pricing.pricePerUnit)
          ) {
            toast.error(
              'Les prix en gros doivent respecter la règle : si minQuantity1 > minQuantity2, alors pricePerUnit1 > pricePerUnit2.'
            );
            setLoading(false);
            return product; // Return unchanged product to prevent update
          }
        }

        return {
          ...variant,
          bulkPricing: [...existingBulkPricing, newBulkPricingEntry].sort(
            (a: any, b: any) => a.minQuantity - b.minQuantity
          ),
        };
      });

      return { ...product, variants: updatedVariants };
    });

    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setShowBulkPricingModal(false);
    setSelectedProductId(null);
    setSelectedVariantIndex(null);
    setBulkPricingData({ minQuantity: '', pricePerUnit: '' });
    toast.success('Prix en gros ajouté avec succès');
    EricksonsetLoading(false);
  }, 1000);
};

const shopProducts = products.filter(
  (product) => product.shopId === userShop?.id && product.type === 'Commercial'
);

return (
  <div className="x-shops-page">
    <ToastContainer position="top-right" autoClose={3000} />
    <Loader loading={loading} />
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="x-shops-title">Ma Boutique</h2>
      {!userShop && (
        <div>
          <button className="btn x-add-btn" onClick={() => setShowCreateShop(true)}>
            <i className="fas fa-plus me-2"></i> Créer une Boutique
          </button>
        </div>
      )}
    </div>

    {/* Display Shop Info */}
    {userShop ? (
      <>
        <div className="card mb-4">
          <div className="card-body">
            <h3>{userShop.name}</h3>
            <p><strong>Email :</strong> {userShop.email}</p>
            <p><strong>Contact :</strong> {userShop.contact}</p>
            <p><strong>Description :</strong> {userShop.description}</p>
            <p>
              <strong>Statut :</strong>{' '}
              {userShop.status === 'pending'
                ? 'En attente'
                : userShop.status === 'approved'
                ? 'Approuvé'
                : 'Rejeté'}
            </p>
            <p><strong>Sous-catégories :</strong></p>
            <ul>
              {subcategories
                .filter((sub: any) => userShop.subcategories.includes(sub.id))
                .map((sub: any) => (
                  <li key={sub.id}>{sub.name}</li>
                ))}
            </ul>
            {userShop.status !== 'rejected' && (
              <button className="btn x-add-btn" onClick={() => setShowEditShop(true)}>
                <i className="fas fa-edit me-2"></i> Modifier la Boutique
              </button>
            )}
          </div>
        </div>

        {/* Shop Product Management */}
        {userShop.status === 'approved' ? (
          <>
            <ShopProductManager
              shopId={userShop.id!}
              products={products}
              subcategories={subcategories}
              onAssociateProduct={handleAssociateProduct}
              onUpdateExpiration={handleUpdateExpiration}
              onCreateProduct={handleCreateProduct}
            />

            {/* Promotions and Bulk Pricing Management */}
            <div className="mt-4">
              <h3>Gestion des Promotions et Prix en Gros</h3>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Produits avec Promotions/Prix en Gros</h4>
                <div>
                  <button
                    className="btn x-add-btn me-2"
                    onClick={() => setShowPromotionModal(true)}
                    disabled={shopProducts.length === 0}
                  >
                    <i className="fas fa-tag me-2"></i> Ajouter une Promotion
                  </button>
                  <button
                    className="btn x-add-btn"
                    onClick={() => setShowBulkPricingModal(true)}
                    disabled={shopProducts.length === 0}
                  >
                    <i className="fas fa-boxes me-2"></i> Ajouter un Prix en Gros
                  </button>
                </div>
              </div>

              {/* List of Products with Promotions/Bulk Pricing */}
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Variante</th>
                      <th>Promotion</th>
                      <th>Prix en Gros</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shopProducts.map((product: Product) =>
                      product.variants && product.variants.length > 0 ? (
                        product.variants.map((variant, index: number) => (
                          <tr key={`${product.id}-${index}`}>
                            <td>{product.name}</td>
                            <td>{`${variant.size} (${variant.colors.map((c) => c.color).join(', ')})`}</td>
                            <td>
                              {variant.promotion
                                ? `${variant.promotion.discountPercentage}% (du ${variant.promotion.startDate} au ${variant.promotion.endDate})`
                                : 'Aucune'}
                            </td>
                            <td>
                              {variant.bulkPricing?.length > 0
                                ? variant.bulkPricing
                                    .map(
                                      (bp) =>
                                        `${bp.pricePerUnit} par unité (min ${bp.minQuantity})`
                                    )
                                    .join(', ')
                                : 'Aucun'}
                            </td>
                          </tr>
                        ))
                      ) : null
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <p>Votre boutique doit être approuvée avant de pouvoir gérer les produits.</p>
        )}
      </>
    ) : (
      <p>Vous n'avez pas encore de boutique. Créez-en une pour commencer.</p>
    )}

    {/* Create Shop Modal */}
    {showCreateShop && (
      <div className="x-modal">
        <div className="x-modal-content">
          <h3>Créer une Boutique</h3>
          <div className="mb-3">
            <label className="x-shops-label">Nom de la Boutique *</label>
            <input
              type="text"
              value={newShopData.name}
              onChange={(e) =>
                setNewShopData({ ...newShopData, name: e.target.value })
              }
              className="form-control"
              placeholder="Ex: Ma Boutique"
              required
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
                      checked={newShopData.subcategories.includes(sub.id)}
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
              onChange={(e: any) =>
                setNewShopData({ ...newShopData, image: e.target.files[0]?.name || '' })
              }
              className="form-control"
              accept="image/*"
            />
          </div>
          <div className="mb-3">
            <label className="x-shops-label">Email de la Boutique *</label>
            <input
              type="email"
              value={newShopData.email}
              onChange={(e) =>
                setNewShopData({ ...newShopData, email: e.target.value })
              }
              className="form-control"
              placeholder="Ex: boutique@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="x-shops-label">Contact *</label>
            <input
              type="text"
              value={newShopData.contact}
              onChange={(e) =>
                setNewShopData({ ...newShopData, contact: e.target.value })
              }
              className="form-control"
              placeholder="Ex: +33 1 23 45 67 89"
              required
            />
          </div>
          <div className="mb-3">
            <label className="x-shops-label">Description</label>
            <textarea
              value={newShopData.description}
              onChange={(e) =>
                setNewShopData({ ...newShopData, description: e.target.value })
              }
              className="form-control"
              placeholder="Décrivez votre boutique..."
            />
          </div>
          <div className="mb-3">
            <label className="x-shops-label">Email du Propriétaire *</label>
            <input
              type="email"
              value={newShopData.ownerEmail}
              onChange={(e) =>
                setNewShopData({ ...newShopData, ownerEmail: e.target.value })
              }
              className="form-control"
              placeholder="Ex: proprietaire@example.com"
              required
            />
          </div>
          <button
            className="btn x-modal-btn me-2"
            onClick={handleCreateShop}
            disabled={
              !newShopData.name ||
              !newShopData.email ||
              !newShopData.contact ||
              !newShopData.ownerEmail
            }
          >
            Créer
          </button>
          <button className="btn x-modal-close" onClick={() => setShowCreateShop(false)}>
            Fermer
          </button>
        </div>
      </div>
    )}

    {/* Edit Shop Modal */}
    {showEditShop && userShop && (
      <div className="x-modal">
        <div className="x-modal-content">
          <h3>Modifier la Boutique</h3>
          <div className="mb-3">
            <label className="x-shops-label">Nom de la Boutique</label>
            <input
              type="text"
              value={editShopData?.name || ''}
              onChange={(e) =>
                setEditShopData((prev) => (prev ? { ...prev, name: e.target.value } : null))
              }
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
                      id={`subcategory-edit-${sub.id}`}
                      checked={editShopData?.subcategories.includes(sub.id) || false}
                      onChange={() => handleSubcategoryChange(sub.id, true)}
                    />
                    <label className="form-check-label" htmlFor={`subcategory-edit-${sub.id}`}>
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
              onChange={(e: any) =>
                setEditShopData((prev) =>
                  prev ? { ...prev, image: e.target.files[0]?.name || prev.image } : null
                )
              }
              className="form-control"
              accept="image/*"
            />
          </div>
          <div className="mb-3">
            <label className="x-shops-label">Email de la Boutique</label>
            <input
              type="email"
              value={editShopData?.email || ''}
              onChange={(e) =>
                setEditShopData((prev) => (prev ? { ...prev, email: e.target.value } : null))
              }
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="x-shops-label">Contact</label>
            <input
              type="text"
              value={editShopData?.contact || ''}
              onChange={(e) =>
                setEditShopData((prev) => (prev ? { ...prev, contact: e.target.value } : null))
              }
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="x-shops-label">Description</label>
            <textarea
              value={editShopData?.description || ''}
              onChange={(e) =>
                setEditShopData((prev) =>
                  prev ? { ...prev, description: e.target.value } : null
                )
              }
              className="form-control"
            />
          </div>
          <button
            className="btn x-modal-btn me-2"
            onClick={handleUpdateShop}
            disabled={!editShopData?.name || !editShopData?.email || !editShopData?.contact}
          >
            Enregistrer
          </button>
          <button className="btn x-modal-close" onClick={() => setShowEditShop(false)}>
            Fermer
          </button>
        </div>
      </div>
    )}

    {/* Add Promotion Modal */}
    {showPromotionModal && (
      <div className="x-modal">
        <div className="x-modal-content">
          <h3>Ajouter une Promotion</h3>
          <div className="mb-3">
            <label className="x-shops-label">Produit *</label>
            <select
              className="form-select"
              value={selectedProductId || ''}
              onChange={(e) => {
                setSelectedProductId(parseInt(e.target.value));
                setSelectedVariantIndex(null); // Reset variant selection
              }}
            >
              <option value="">Sélectionner un produit</option>
              {shopProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          {selectedProductId !== null && (
            <div className="mb-3">
              <label className="x-shops-label">Variante *</label>
              <select
                className="form-select"
                value={selectedVariantIndex !== null ? selectedVariantIndex : ''}
                onChange={(e) => setSelectedVariantIndex(parseInt(e.target.value))}
              >
                <option value="">Sélectionner une variante</option>
                {shopProducts
                  .find((product) => product.id === selectedProductId)
                  ?.variants?.map((variant: any, index: number) => (
                    <option key={index} value={index}>
                      {`${variant.size} (${variant.colors.map((c: any) => c.color).join(', ')})`}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div className="mb-3">
            <label className="x-shops-label">Pourcentage de Réduction (%) *</label>
            <input
              type="number"
              value={promotionData.discountPercentage}
              onChange={(e) =>
                setPromotionData({ ...promotionData, discountPercentage: e.target.value })
              }
              className="form-control"
              placeholder="Ex: 20"
              required
            />
          </div>
          <div className="mb-3">
            <label className="x-shops-label">Date de Début *</label>
            <input
              type="date"
              value={promotionData.startDate}
              onChange={(e) =>
                setPromotionData({ ...promotionData, startDate: e.target.value })
              }
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="x-shops-label">Date de Fin *</label>
            <input
              type="date"
              value={promotionData.endDate}
              onChange={(e) =>
                setPromotionData({ ...promotionData, endDate: e.target.value })
              }
              className="form-control"
              required
            />
          </div>
          <button
            className="btn x-modal-btn me-2"
            onClick={handleAddPromotion}
            disabled={
              !selectedProductId ||
              selectedVariantIndex === null ||
              !promotionData.discountPercentage ||
              !promotionData.startDate ||
              !promotionData.endDate
            }
          >
            Ajouter
          </button>
          <button
            className="btn x-modal-close"
            onClick={() => setShowPromotionModal(false)}
          >
            Fermer
          </button>
        </div>
      </div>
    )}

    {/* Add Bulk Pricing Modal */}
    {showBulkPricingModal && (
      <div className="x-modal">
        <div className="x-modal-content">
          <h3>Ajouter un Prix en Gros</h3>
          <div className="mb-3">
            <label className="x-shops-label">Produit *</label>
            <select
              className="form-select"
              value={selectedProductId || ''}
              onChange={(e) => {
                setSelectedProductId(parseInt(e.target.value));
                setSelectedVariantIndex(null); // Reset variant selection
              }}
            >
              <option value="">Sélectionner un produit</option>
              {shopProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          {selectedProductId !== null && (
            <div className="mb-3">
              <label className="x-shops-label">Variante *</label>
              <select
                className="form-select"
                value={selectedVariantIndex !== null ? selectedVariantIndex : ''}
                onChange={(e) => setSelectedVariantIndex(parseInt(e.target.value))}
              >
                <option value="">Sélectionner une variante</option>
                {shopProducts
                  .find((product) => product.id === selectedProductId)
                  ?.variants?.map((variant: any, index: number) => (
                    <option key={index} value={index}>
                      {`${variant.size} (${variant.colors.map((c: any) => c.color).join(', ')})`}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div className="mb-3">
            <label className="x-shops-label">Quantité Minimale *</label>
            <input
              type="number"
              value={bulkPricingData.minQuantity}
              onChange={(e) =>
                setBulkPricingData({ ...bulkPricingData, minQuantity: e.target.value })
              }
              className="form-control"
              placeholder="Ex: 10"
              required
            />
          </div>
          <div className="mb-3">
            <label className="x-shops-label">Prix par Unité *</label>
            <input
              type="number"
              value={bulkPricingData.pricePerUnit}
              onChange={(e) =>
                setBulkPricingData({ ...bulkPricingData, pricePerUnit: e.target.value })
              }
              className="form-control"
              placeholder="Ex: 15.99"
              required
            />
          </div>
          <button
            className="btn x-modal-btn me-2"
            onClick={handleAddBulkPricing}
            disabled={
              !selectedProductId ||
              selectedVariantIndex === null ||
              !bulkPricingData.minQuantity ||
              !bulkPricingData.pricePerUnit
            }
          >
            Ajouter
          </button>
          <button
            className="btn x-modal-close"
            onClick={() => setShowBulkPricingModal(false)}
          >
            Fermer
          </button>
        </div>
      </div>
    )}
  </div>
);
};

export default MaBoutiquePage;