'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Interfaces
interface Category {
  id: string;
  name: string;
  type: ProductType;
}

interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  characteristics?: string[];
}

interface Variant {
  size: string;
  price: string;
  colors: Array<{ color: string; stock: string }>;
}

interface Product {
  id: string;
  type: ProductType;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  bookAuthor?: string;
  publisher?: string;
  publicationYear?: string;
  language?: string;
  pages?: string;
  hasPDF?: boolean;
  isPDFFree?: boolean;
  pdfPrice?: string;
  pdfFile?: string;
  hasPhysical?: boolean;
  weight?: string;
  size?: string;
  physicalPrice?: string;
  stock?: string;
  coverImage?: string;
  price?: string;
  expirationDate?: string;
  descriptiveImage?: string;
  ingredients?: string;
  dosage?: string;
  pharmaType?: string;
  galenicForm?: string;
  packaging?: string;
  contraindications?: string;
  sideEffects?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  video?: string;
  variants?: Variant[];
  customFields?: Array<{ name: string; value: string }>;
  ownership: 'enterprise' | 'client';
  clientEmail?: string;
  characteristics?: Record<string, string>;
}

interface ViewDetailsModalProps {
  product: Product;
  categories: Category[];
  subcategories: Subcategory[];
  onSave: (updatedProduct: Product) => void;
  onClose: () => void;
}

type ProductType = 'Livres' | 'Pharmacopée' | 'Commercial';

const ViewDetailsModal = ({ product, categories, subcategories, onSave, onClose }: ViewDetailsModalProps) => {
  const [editFormData, setEditFormData] = useState<Product>({ ...product });
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

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (
    variantIndex: number,
    colorIndex: number | null,
    field: string,
    value: string
  ) => {
    const updatedVariants = [...(editFormData.variants || [])];
    if (colorIndex !== null) {
      updatedVariants[variantIndex].colors[colorIndex] = {
        ...updatedVariants[variantIndex].colors[colorIndex],
        [field]: value,
      };
    } else {
      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        [field]: value,
      };
    }
    setEditFormData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const handleSaveChanges = () => {
    onSave(editFormData);
    toast.success('Modifications enregistrées');
  };

  return (
    <div className="x-modal">
      <div className="x-modal-content">
        <h3 aria-live="polite">Détails du Produit</h3>
        <div className="mb-3">
          <label htmlFor="type" className="x-products-label">
            Type de Produit
          </label>
          <input
            id="type"
            type="text"
            value={product.type}
            className="form-control x-profile-input-disabled"
            disabled
            aria-disabled="true"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="x-products-label">
            Catégorie
          </label>
          <input
            id="category"
            type="text"
            value={categories.find((cat) => cat.id === product.category)?.name || 'N/A'}
            className="form-control x-profile-input-disabled"
            disabled
            aria-disabled="true"
          />
        </div>
        {product.type === 'Commercial' && (
          <div className="mb-3">
            <label htmlFor="subcategory" className="x-products-label">
              Sous-catégorie
            </label>
            <input
              id="subcategory"
              type="text"
              value={subcategories.find((sub) => sub.id === product.subcategory)?.name || 'N/A'}
              className="form-control x-profile-input-disabled"
              disabled
              aria-disabled="true"
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="name" className="x-products-label">
            Nom
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={editFormData.name || ''}
            onChange={handleEditInputChange}
            className="form-control"
            aria-required="true"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="x-products-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={editFormData.description || ''}
            onChange={handleEditInputChange}
            className="form-control"
            aria-required="true"
          />
        </div>
        {product.type === 'Livres' && (
          <>
            <div className="mb-3">
              <label htmlFor="bookAuthor" className="x-products-label">
                Auteur
              </label>
              <input
                id="bookAuthor"
                type="text"
                name="bookAuthor"
                value={editFormData.bookAuthor || ''}
                onChange={handleEditInputChange}
                className="form-control"
                aria-required="true"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="publisher" className="x-products-label">
                Éditeur
              </label>
              <input
                id="publisher"
                type="text"
                name="publisher"
                value={editFormData.publisher || ''}
                onChange={handleEditInputChange}
                className="form-control"
                aria-required="true"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="publicationYear" className="x-products-label">
                Année de Publication
              </label>
              <input
                id="publicationYear"
                type="number"
                name="publicationYear"
                value={editFormData.publicationYear || ''}
                onChange={handleEditInputChange}
                className="form-control"
                aria-required="true"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="language" className="x-products-label">
                Langue
              </label>
              <input
                id="language"
                type="text"
                name="language"
                value={editFormData.language || ''}
                onChange={handleEditInputChange}
                className="form-control"
                aria-required="true"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pages" className="x-products-label">
                Nombre de Pages
              </label>
              <input
                id="pages"
                type="number"
                name="pages"
                value={editFormData.pages || ''}
                onChange={handleEditInputChange}
                className="form-control"
                aria-required="true"
              />
            </div>
            {editFormData.hasPDF && (
              <div className="mb-3">
                <label htmlFor="pdfPrice" className="x-products-label">
                  Prix (PDF)
                </label>
                <input
                  id="pdfPrice"
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
                  <label htmlFor="weight" className="x-products-label">
                    Poids (kg)
                  </label>
                  <input
                    id="weight"
                    type="number"
                    name="weight"
                    value={editFormData.weight || ''}
                    onChange={handleEditInputChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="size" className="x-products-label">
                    Taille (cm)
                  </label>
                  <input
                    id="size"
                    type="text"
                    name="size"
                    value={editFormData.size || ''}
                    onChange={handleEditInputChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="physicalPrice" className="x-products-label">
                    Prix (Physique)
                  </label>
                  <input
                    id="physicalPrice"
                    type="number"
                    name="physicalPrice"
                    value={editFormData.physicalPrice || ''}
                    onChange={handleEditInputChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="stock" className="x-products-label">
                    Stock
                  </label>
                  <input
                    id="stock"
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
              <label htmlFor="stock" className="x-products-label">
                Stock Actuel
              </label>
              <input
                id="stock"
                type="number"
                name="stock"
                value={editFormData.stock || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="expirationDate" className="x-products-label">
                Date d'Expiration
              </label>
              <input
                id="expirationDate"
                type="date"
                name="expirationDate"
                value={editFormData.expirationDate || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="x-products-label">
                Prix
              </label>
              <input
                id="price"
                type="number"
                name="price"
                value={editFormData.price || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ingredients" className="x-products-label">
                Ingrédients
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={editFormData.ingredients || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dosage" className="x-products-label">
                Posologie
              </label>
              <textarea
                id="dosage"
                name="dosage"
                value={editFormData.dosage || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pharmaType" className="x-products-label">
                Type de Produit
              </label>
              <input
                id="pharmaType"
                type="text"
                name="pharmaType"
                value={editFormData.pharmaType || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="galenicForm" className="x-products-label">
                Forme Galénique
              </label>
              <input
                id="galenicForm"
                type="text"
                name="galenicForm"
                value={editFormData.galenicForm || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="packaging" className="x-products-label">
                Conditionnement
              </label>
              <input
                id="packaging"
                type="text"
                name="packaging"
                value={editFormData.packaging || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contraindications" className="x-products-label">
                Contre-indications
              </label>
              <textarea
                id="contraindications"
                name="contraindications"
                value={editFormData.contraindications || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sideEffects" className="x-products-label">
                Effets Secondaires
              </label>
              <textarea
                id="sideEffects"
                name="sideEffects"
                value={editFormData.sideEffects || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
          </>
        )}
        {product.type === 'Commercial' && (
          <>
            <div className="mb-3">
              <label htmlFor="weight" className="x-products-label">
                Poids (kg)
              </label>
              <input
                id="weight"
                type="number"
                name="weight"
                value={editFormData.weight || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="size" className="x-products-label">
                Taille (cm)
              </label>
              <input
                id="size"
                type="text"
                name="size"
                value={editFormData.size || ''}
                onChange={handleEditInputChange}
                className="form-control"
              />
            </div>
            {editFormData.variants?.map((variant: Variant, variantIndex: number) => (
              <div key={variantIndex} className="border p-3 mb-3">
                <div className="mb-3">
                  <label htmlFor={`variant-size-${variantIndex}`} className="x-products-label">
                    Taille (Variante {variantIndex + 1})
                  </label>
                  <input
                    id={`variant-size-${variantIndex}`}
                    type="text"
                    value={variant.size}
                    className="form-control x-profile-input-disabled"
                    disabled
                    aria-disabled="true"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={`variant-price-${variantIndex}`} className="x-products-label">
                    Prix
                  </label>
                  <input
                    id={`variant-price-${variantIndex}`}
                    type="number"
                    value={variant.price}
                    onChange={(e) =>
                      handleVariantChange(variantIndex, null, 'price', e.target.value)
                    }
                    className="form-control"
                  />
                </div>
                {variant.colors.map((colorObj, colorIndex) => (
                  <div key={colorIndex} className="mb-3">
                    <div className="row">
                      <div className="col-6">
                        <label
                          htmlFor={`variant-color-${variantIndex}-${colorIndex}`}
                          className="x-products-label"
                        >
                          Couleur
                        </label>
                        <input
                          id={`variant-color-${variantIndex}-${colorIndex}`}
                          type="text"
                          value={colorObj.color}
                          className="form-control x-profile-input-disabled"
                          disabled
                          aria-disabled="true"
                        />
                      </div>
                      <div className="col-6">
                        <label
                          htmlFor={`variant-stock-${variantIndex}-${colorIndex}`}
                          className="x-products-label"
                        >
                          Stock
                        </label>
                        <input
                          id={`variant-stock-${variantIndex}-${colorIndex}`}
                          type="number"
                          value={colorObj.stock}
                          onChange={(e) =>
                            handleVariantChange(variantIndex, colorIndex, 'stock', e.target.value)
                          }
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {editFormData.characteristics && (
              <>
                {Object.entries(editFormData.characteristics).map(([key, value], index) => (
                  <div key={index} className="mb-3">
                    <label htmlFor={`char-${key}`} className="x-products-label">
                      {key}
                    </label>
                    <input
                      id={`char-${key}`}
                      type="text"
                      name={`characteristics.${key}`}
                      value={value || ''}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          characteristics: { ...prev.characteristics, [key]: e.target.value },
                        }))
                      }
                      className="form-control"
                    />
                  </div>
                ))}
              </>
            )}
            {editFormData.customFields?.map((field, index) => (
              <div key={index} className="mb-3">
                <label htmlFor={`customField-${index}`} className="x-products-label">
                  {field.name}
                </label>
                <input
                  id={`customField-${index}`}
                  type="text"
                  value={field.value}
                  onChange={(e) => {
                    const updatedFields = [...editFormData.customFields!];
                    updatedFields[index].value = e.target.value;
                    setEditFormData({ ...editFormData, customFields: updatedFields });
                  }}
                  className="form-control"
                />
              </div>
            ))}
            {/*{editFormData.shopId && (
              <div className="mb-3">
                <label htmlFor="expirationDate" className="x-products-label">
                  Date d'Expiration
                </label>
                <input
                  id="expirationDate"
                  type="date"
                  name="expirationDate"
                  value={editFormData.expirationDate || ''}
                  onChange={handleEditInputChange}
                  className="form-control"
                />
              </div>
            )}*/}
          </>
        )}
        <div className="mb-3">
          <label htmlFor="ownership" className="x-products-label">
            Appartient à
          </label>
          <input
            id="ownership"
            type="text"
            value={editFormData.ownership === 'enterprise' ? 'Entreprise' : 'Client'}
            className="form-control x-profile-input-disabled"
            disabled
            aria-disabled="true"
          />
        </div>
        {editFormData.ownership === 'client' && (
          <div className="mb-3">
            <label htmlFor="clientEmail" className="x-products-label">
              Email du Client
            </label>
            <input
              id="clientEmail"
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
          aria-label="Enregistrer les modifications"
        >
          Enregistrer les Modifications
        </button>
        <button
          className="btn x-modal-close"
          onClick={onClose}
          aria-label="Fermer la fenêtre"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ViewDetailsModal;