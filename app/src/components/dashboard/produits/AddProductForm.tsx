'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface AddProductFormProps {
  categories: any[];
  subcategories: any[];
  onSubmit: (formData: any) => void;
  onClose: () => void;
  isClientPage?: boolean; // New prop to indicate if this is the client page
  userEmail?: string; // User's email for client page
}

const AddProductForm = ({ categories, subcategories, onSubmit, onClose, isClientPage = false, userEmail }: AddProductFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedForm = localStorage.getItem('addProductForm');
    if (savedForm) setFormData(JSON.parse(savedForm));
  }, []);

  // Persist form data to localStorage
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('addProductForm', JSON.stringify(formData));
    }
  }, [formData]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      setFormData({ ...formData, [name]: files ? files[0].name : '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleVariantChange = (index: number, field: string, value: string) => {
    const updatedVariants = [...(formData.variants || [])];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setFormData({ ...formData, variants: updatedVariants });
  };

  const addVariant = () => {
    const updatedVariants = [...(formData.variants || []), { size: '', color: '', price: '', stock: '', image: '' }];
    setFormData({ ...formData, variants: updatedVariants });
  };

  const addCustomField = () => {
    const updatedCustomFields = [...(formData.customFields || []), { name: '', value: '' }];
    setFormData({ ...formData, customFields: updatedCustomFields });
  };

  const handleCustomFieldChange = (index: number, field: string, value: string) => {
    const updatedCustomFields = [...(formData.customFields || [])];
    updatedCustomFields[index] = { ...updatedCustomFields[index], [field]: value };
    setFormData({ ...formData, customFields: updatedCustomFields });
  };

  // Multi-step form navigation
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = () => {
    const finalFormData = {
      ...formData,
      ...(isClientPage ? { ownership: 'client', clientEmail: userEmail } : {}),
    };
    onSubmit(finalFormData);
    setFormData({});
    localStorage.removeItem('addProductForm');
    setCurrentStep(1);
  };

  // Adjust total steps based on whether it's the client page
  const totalSteps = isClientPage ? 4 : 5;

  return (
    <div className="x-modal">
      <div className="x-modal-content">
        <h3>Ajouter un Produit - Étape {currentStep}</h3>
        {currentStep === 1 && (
          <div>
            <label className="x-products-label">Type de Produit</label>
            <select
              name="type"
              value={formData.type || ''}
              onChange={handleInputChange}
              className="form-select mb-3"
            >
              <option value="">Sélectionner un type</option>
              <option value="Livres">Livres (Documents)</option>
              <option value="Pharmacopée">Pharmacopée</option>
              <option value="Commercial">Commercial (Autres)</option>
            </select>
            <button className="btn x-modal-btn" onClick={nextStep} disabled={!formData.type}>
              Suivant
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <label className="x-products-label">Nom {formData.type === 'Livres' ? '(Titre)' : ''}</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="form-control mb-3"
            />
            <label className="x-products-label">Description</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              className="form-control mb-3"
            />
            <label className="x-products-label">Catégorie</label>
            <select
              name="category"
              value={formData.category || ''}
              onChange={handleInputChange}
              className="form-select mb-3"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories
                .filter((cat: any) => cat.type === formData.type)
                .map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
            {formData.type === 'Commercial' && (
              <>
                <label className="x-products-label">Sous-catégorie</label>
                <select
                  name="subcategory"
                  value={formData.subcategory || ''}
                  onChange={handleInputChange}
                  className="form-select mb-3"
                >
                  <option value="">Sélectionner une sous-catégorie</option>
                  {subcategories
                    .filter((sub: any) => sub.categoryId === formData.category)
                    .map((sub: any) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                </select>
              </>
            )}
            <button className="btn x-modal-btn me-2" onClick={prevStep}>
              Précédent
            </button>
            <button className="btn x-modal-btn" onClick={nextStep} disabled={!formData.name || !formData.category}>
              Suivant
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            {formData.type === 'Livres' && (
              <>
                <label className="x-products-label">Auteur</label>
                <input
                  type="text"
                  name="bookAuthor"
                  value={formData.bookAuthor || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
                <label className="x-products-label">Éditeur</label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
                <label className="x-products-label">Année de Publication</label>
                <input
                  type="number"
                  name="publicationYear"
                  value={formData.publicationYear || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
              </>
            )}
            {formData.type === 'Pharmacopée' && (
              <>
                <label className="x-products-label">Stock Actuel</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
                <label className="x-products-label">Date d'Expiration</label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
              </>
            )}
            {formData.type === 'Commercial' && (
              <>
                {subcategories
                  .find((sub: any) => sub.id === formData.subcategory)
                  ?.characteristics.map((char: string, index: number) => (
                    <div key={index}>
                      <label className="x-products-label">{char}</label>
                      <input
                        type="text"
                        name={`char_${char}`}
                        value={formData[`char_${char}`] || ''}
                        onChange={handleInputChange}
                        className="form-control mb-3"
                      />
                    </div>
                  ))}
                <button className="btn x-add-btn mb-3" onClick={addCustomField}>
                  <i className="fas fa-plus me-2"></i> Ajouter un champ personnalisé
                </button>
                {formData.customFields?.map((field: any, index: number) => (
                  <div key={index} className="row mb-3">
                    <div className="col-6">
                      <input
                        type="text"
                        placeholder="Nom du champ"
                        value={field.name}
                        onChange={(e) => handleCustomFieldChange(index, 'name', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        placeholder="Valeur"
                        value={field.value}
                        onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
            <button className="btn x-modal-btn me-2" onClick={prevStep}>
              Précédent
            </button>
            <button className="btn x-modal-btn" onClick={nextStep}>
              Suivant
            </button>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            {formData.type === 'Livres' && (
              <>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    name="hasPDF"
                    checked={formData.hasPDF || false}
                    onChange={(e) => setFormData({ ...formData, hasPDF: e.target.checked })}
                    className="form-check-input"
                    id="hasPDF"
                  />
                  <label className="form-check-label" htmlFor="hasPDF">
                    PDF Disponible
                  </label>
                </div>
                {formData.hasPDF && (
                  <>
                    <label className="x-products-label">Fichier PDF</label>
                    <input
                      type="file"
                      name="pdfFile"
                      onChange={handleInputChange}
                      className="form-control mb-3"
                      accept=".pdf"
                    />
                    <label className="x-products-label">Prix (PDF)</label>
                    <input
                      type="number"
                      name="pdfPrice"
                      value={formData.pdfPrice || ''}
                      onChange={handleInputChange}
                      className="form-control mb-3"
                    />
                  </>
                )}
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    name="hasPhysical"
                    checked={formData.hasPhysical || false}
                    onChange={(e) => setFormData({ ...formData, hasPhysical: e.target.checked })}
                    className="form-check-input"
                    id="hasPhysical"
                  />
                  <label className="form-check-label" htmlFor="hasPhysical">
                    Version Physique Disponible
                  </label>
                </div>
                {formData.hasPhysical && (
                  <>
                    <label className="x-products-label">Poids (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight || ''}
                      onChange={handleInputChange}
                      className="form-control mb-3"
                    />
                    <label className="x-products-label">Taille (cm)</label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size || ''}
                      onChange={handleInputChange}
                      className="form-control mb-3"
                    />
                    <label className="x-products-label">Prix (Physique)</label>
                    <input
                      type="number"
                      name="physicalPrice"
                      value={formData.physicalPrice || ''}
                      onChange={handleInputChange}
                      className="form-control mb-3"
                    />
                    <label className="x-products-label">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock || ''}
                      onChange={handleInputChange}
                      className="form-control mb-3"
                    />
                  </>
                )}
                <label className="x-products-label">Image de Couverture</label>
                <input
                  type="file"
                  name="coverImage"
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  accept="image/*"
                />
              </>
            )}
            {formData.type === 'Pharmacopée' && (
              <>
                <label className="x-products-label">Prix</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
              </>
            )}
            {formData.type === 'Commercial' && (
              <>
                <label className="x-products-label">Poids (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
                <label className="x-products-label">Taille (cm)</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
                <label className="x-products-label">Image 1</label>
                <input
                  type="file"
                  name="image1"
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  accept="image/*"
                />
                <label className="x-products-label">Image 2</label>
                <input
                  type="file"
                  name="image2"
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  accept="image/*"
                />
                <label className="x-products-label">Image 3</label>
                <input
                  type="file"
                  name="image3"
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  accept="image/*"
                />
                <label className="x-products-label">Image 4</label>
                <input
                  type="file"
                  name="image4"
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  accept="image/*"
                />
                <label className="x-products-label">Vidéo de Description</label>
                <input
                  type="file"
                  name="video"
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  accept="video/*"
                />
                <button className="btn x-add-btn mb-3" onClick={addVariant}>
                  <i className="fas fa-plus me-2"></i> Ajouter une Variante
                </button>
                {formData.variants?.map((variant: any, index: number) => (
                  <div key={index} className="border p-3 mb-3">
                    <label className="x-products-label">Taille</label>
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                      className="form-control mb-3"
                    />
                    <label className="x-products-label">Couleur</label>
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                      className="form-control mb-3"
                    />
                    <label className="x-products-label">Prix</label>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                      className="form-control mb-3"
                    />
                    <label className="x-products-label">Stock</label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                      className="form-control mb-3"
                    />
                    <label className="x-products-label">Image</label>
                    <input
                      type="file"
                      onChange={(e: any) => handleVariantChange(index, 'image', e.target.files[0]?.name || '')}
                      className="form-control mb-3"
                      accept="image/*"
                    />
                  </div>
                ))}
              </>
            )}
            <button className="btn x-modal-btn me-2" onClick={prevStep}>
              Précédent
            </button>
            <button
              className="btn x-modal-btn"
              onClick={isClientPage ? handleSubmit : nextStep}
            >
              {isClientPage ? 'Terminer' : 'Suivant'}
            </button>
          </div>
        )}

        {currentStep === 5 && !isClientPage && (
          <div>
            <label className="x-products-label">Appartient à</label>
            <select
              name="ownership"
              value={formData.ownership || ''}
              onChange={handleInputChange}
              className="form-select mb-3"
            >
              <option value="">Sélectionner</option>
              <option value="enterprise">Entreprise</option>
              <option value="client">Client</option>
            </select>
            {formData.ownership === 'client' && (
              <>
                <label className="x-products-label">Email du Client</label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
              </>
            )}
            <button className="btn x-modal-btn me-2" onClick={prevStep}>
              Précédent
            </button>
            <button className="btn x-modal-btn" onClick={handleSubmit}>
              Terminer
            </button>
          </div>
        )}
        <button className="btn x-modal-close" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default AddProductForm;