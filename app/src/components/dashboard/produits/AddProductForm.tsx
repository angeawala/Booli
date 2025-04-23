'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Interface for props
interface AddProductFormProps {
  categories: any[];
  subcategories: any[];
  onSubmit: (formData: any) => void;
  onClose: () => void;
  isClientPage?: boolean;
  userEmail?: string;
}

// Predefined colors for variant selection
const AVAILABLE_COLORS = [
  'Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Orange',
  'Pink', 'Gray', 'Brown', 'Cyan'
];

const AddProductForm = ({ categories, subcategories, onSubmit, onClose, isClientPage = false, userEmail }: AddProductFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({ variants: [], customFields: [], hasPDF: false, hasPhysical: false, isPDFFree: false });

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

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  // Handle variant changes (size, price, colors, and stock per color)
  const handleVariantChange = (index: number, field: string, value: any) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setFormData({ ...formData, variants: updatedVariants });
  };

  // Handle color stock changes within a variant
  const handleColorStockChange = (variantIndex: number, colorIndex: number, stock: string) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].colors[colorIndex].stock = stock;
    setFormData({ ...formData, variants: updatedVariants });
  };

  // Add a new variant
  const addVariant = () => {
    const updatedVariants = [...formData.variants, { size: '', price: '', colors: [{ color: '', stock: '' }] }];
    setFormData({ ...formData, variants: updatedVariants });
  };

  // Add a color to a specific variant
  const addColorToVariant = (variantIndex: number) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].colors.push({ color: '', stock: '' });
    setFormData({ ...formData, variants: updatedVariants });
  };

  // Add a custom field
  const addCustomField = () => {
    const updatedCustomFields = [...(formData.customFields || []), { name: '', value: '' }];
    setFormData({ ...formData, customFields: updatedCustomFields });
  };

  // Handle custom field changes
  const handleCustomFieldChange = (index: number, field: string, value: string) => {
    const updatedCustomFields = [...formData.customFields];
    updatedCustomFields[index] = { ...updatedCustomFields[index], [field]: value };
    setFormData({ ...formData, customFields: updatedCustomFields });
  };

  // Validate required predefined characteristics for commercial products
  const areCharacteristicsFilled = () => {
    if (formData.type !== 'Commercial') return true;
    const selectedSubcategory = subcategories.find((sub: any) => sub.id === formData.subcategory);
    if (!selectedSubcategory?.characteristics) return true;
    return selectedSubcategory.characteristics.every((char: string) => formData[`char_${char}`]);
  };

  // Multi-step form navigation
  const nextStep = () => {
    if (currentStep === 3 && !areCharacteristicsFilled()) {
      toast.error('Veuillez remplir toutes les caractéristiques requises avant de continuer.');
      return;
    }
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = () => {
    // Final validation before submission
    if (!formData.name || !formData.category) {
      toast.error('Les champs Nom et Catégorie sont obligatoires.');
      return;
    }
    if (formData.type === 'Livres') {
      if (!formData.language || !formData.pages) {
        toast.error('La langue et le nombre de pages sont obligatoires pour les livres.');
        return;
      }
      if (formData.hasPDF && !formData.isPDFFree && !formData.pdfPrice) {
        toast.error('Veuillez spécifier un prix pour le PDF ou le marquer comme gratuit.');
        return;
      }
      if (formData.hasPhysical && (!formData.physicalPrice || !formData.stock)) {
        toast.error('Le prix et le stock sont obligatoires pour la version physique.');
        return;
      }
    }
    if (formData.type === 'Pharmacopée' && !formData.stock) {
      toast.error('Le stock est obligatoire pour les produits de pharmacopée.');
      return;
    }

    const finalFormData = {
      ...formData,
      ...(isClientPage ? { ownership: 'client', clientEmail: userEmail } : {}),
    };
    onSubmit(finalFormData);
    setFormData({ variants: [], customFields: [], hasPDF: false, hasPhysical: false, isPDFFree: false });
    localStorage.removeItem('addProductForm');
    setCurrentStep(1);
  };

  // Adjust total steps based on whether it's the client page
  const totalSteps = isClientPage ? 4 : 5;

  return (
    <div className="x-modal">
      <div className="x-modal-content">
        <h3>Ajouter un Produit - Étape {currentStep}</h3>
        {/* Step 1: Select Product Type */}
        {currentStep === 1 && (
          <div>
            <label className="x-products-label" title="Choisissez le type de produit à ajouter">
              Type de Produit *
            </label>
            <select
              name="type"
              value={formData.type || ''}
              onChange={handleInputChange}
              className="form-select mb-3"
              required
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

        {/* Step 2: Basic Product Info */}
        {currentStep === 2 && (
          <div>
            <label className="x-products-label" title="Entrez le nom ou le titre du produit">
              Nom {formData.type === 'Livres' ? '(Titre)' : ''} *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="form-control mb-3"
              placeholder={formData.type === 'Livres' ? 'Ex: Le Petit Prince' : 'Ex: T-shirt Coton'}
              required
            />
            <label className="x-products-label" title="Décrivez le produit en détail">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              className="form-control mb-3"
              placeholder="Décrivez les caractéristiques principales..."
              required
            />
            <label className="x-products-label" title="Sélectionnez la catégorie principale">
              Catégorie *
            </label>
            <select
              name="category"
              value={formData.category || ''}
              onChange={handleInputChange}
              className="form-select mb-3"
              required
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
                <label className="x-products-label" title="Sélectionnez une sous-catégorie pour ce produit">
                  Sous-catégorie *
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory || ''}
                  onChange={handleInputChange}
                  className="form-select mb-3"
                  required
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
            <button
              className="btn x-modal-btn"
              onClick={nextStep}
              disabled={!formData.name || !formData.category || (formData.type === 'Commercial' && !formData.subcategory)}
            >
              Suivant
            </button>
          </div>
        )}

        {/* Step 3: Type-Specific Fields */}
        {currentStep === 3 && (
          <div>
            {formData.type === 'Livres' && (
              <>
                <label className="x-products-label" title="Nom de l'auteur du livre">
                  Auteur *
                </label>
                <input
                  type="text"
                  name="bookAuthor"
                  value={formData.bookAuthor || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  placeholder="Ex: Antoine de Saint-Exupéry"
                  required
                />
                <label className="x-products-label" title="Nom de l'éditeur du livre">
                  Éditeur *
                </label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  placeholder="Ex: Gallimard"
                  required
                />
                <label className="x-products-label" title="Année de publication du livre">
                  Année de Publication *
                </label>
                <input
                  type="number"
                  name="publicationYear"
                  value={formData.publicationYear || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  placeholder="Ex: 1943"
                  required
                />
                <label className="x-products-label" title="Langue principale du livre">
                  Langue *
                </label>
                <select
                  name="language"
                  value={formData.language || ''}
                  onChange={handleInputChange}
                  className="form-select mb-3"
                  required
                >
                  <option value="">Sélectionner une langue</option>
                  <option value="Français">Français</option>
                  <option value="Anglais">Anglais</option>
                  <option value="Espagnol">Espagnol</option>
                  <option value="Allemand">Allemand</option>
                  <option value="Italien">Italien</option>
                  <option value="Autre">Autre</option>
                </select>
                <label className="x-products-label" title="Nombre total de pages">
                  Nombre de Pages *
                </label>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  placeholder="Ex: 120"
                  required
                />
              </>
            )}
            {formData.type === 'Pharmacopée' && (
              <>
                <label className="x-products-label" title="Stock actuel disponible">
                  Stock Actuel *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  placeholder="Ex: 50"
                  required
                />
                <label className="x-products-label" title="Date d'expiration du produit">
                  Date d'Expiration *
                </label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  required
                />
                <label className="x-products-label" title="Image descriptive du produit (optionnel)">
                  Image Descriptive
                </label>
                <input
                  type="file"
                  name="descriptiveImage"
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  accept="image/*"
                />
                {formData.customFields?.map((field: any, index: number) => (
                  <div key={index} className="row mb-3">
                    <div className="col-6">
                      <input
                        type="text"
                        placeholder="Nom du champ (ex: Ingrédient)"
                        value={field.name}
                        onChange={(e) => handleCustomFieldChange(index, 'name', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        placeholder="Valeur (ex: Paracétamol)"
                        value={field.value}
                        onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                ))}
                <button className="btn x-add-btn mb-3" onClick={addCustomField}>
                  <i className="fas fa-plus me-2"></i> Ajouter un Champ Personnalisé
                </button>
              </>
            )}
            {formData.type === 'Commercial' && (
              <>
                {subcategories
                  .find((sub: any) => sub.id === formData.subcategory)
                  ?.characteristics.map((char: string, index: number) => (
                    <div key={index}>
                      <label className="x-products-label" title={`Valeur pour ${char}`}>
                        {char} *
                      </label>
                      <input
                        type="text"
                        name={`char_${char}`}
                        value={formData[`char_${char}`] || ''}
                        onChange={handleInputChange}
                        className="form-control mb-3"
                        placeholder={`Ex: ${char === 'Matériau' ? 'Coton' : char === 'Puissance' ? '500W' : ''}`}
                        required
                      />
                    </div>
                  ))}
                {areCharacteristicsFilled() && (
                  <>
                    {formData.customFields?.map((field: any, index: number) => (
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
                    <button className="btn x-add-btn mb-3" onClick={addCustomField}>
                      <i className="fas fa-plus me-2"></i> Ajouter un Champ Personnalisé
                    </button>
                  </>
                )}
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

        {/* Step 4: Additional Details */}
        {currentStep === 4 && (
          <div>
            {formData.type === 'Livres' && (
              <>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    name="hasPDF"
                    checked={formData.hasPDF}
                    onChange={handleCheckboxChange}
                    className="form-check-input"
                    id="hasPDF"
                  />
                  <label className="form-check-label" htmlFor="hasPDF" title="Cochez si une version PDF est disponible">
                    PDF Disponible
                  </label>
                </div>
                {formData.hasPDF && (
                  <>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        name="isPDFFree"
                        checked={formData.isPDFFree}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                        id="isPDFFree"
                      />
                      <label className="form-check-label" htmlFor="isPDFFree" title="Cochez si le PDF est gratuit">
                        PDF Gratuit
                      </label>
                    </div>
                    <label className="x-products-label" title="Téléchargez le fichier PDF">
                      Fichier PDF *
                    </label>
                    <input
                      type="file"
                      name="pdfFile"
                      onChange={handleInputChange}
                      className="form-control mb-3"
                      accept=".pdf"
                      required
                    />
                    {!formData.isPDFFree && (
                      <>
                        <label className="x-products-label" title="Prix du PDF en devise locale">
                          Prix (PDF) *
                        </label>
                        <input
                          type="number"
                          name="pdfPrice"
                          value={formData.pdfPrice || ''}
                          onChange={handleInputChange}
                          className="form-control mb-3"
                          placeholder="Ex: 5.99"
                          required
                        />
                      </>
                    )}
                  </>
                )}
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    name="hasPhysical"
                    checked={formData.hasPhysical}
                    onChange={handleCheckboxChange}
                    className="form-check-input"
                    id="hasPhysical"
                  />
                  <label className="form-check-label" htmlFor="hasPhysical" title="Cochez si une version physique est disponible">
                    Version Physique Disponible
                  </label>
                </div>
                {formData.hasPhysical && (
                  <>
                    <label className="x-products-label" title="Poids du livre en kilogrammes">
                      Poids (kg) *
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight || ''}
                      onChange={handleInputChange}
                      className="form-control mb-3"
                      placeholder="Ex: 0.5"
                      required
                    />
                    <label className="x-products-label" title="Dimensions du livre (ex: 15x20x2)">
                      Taille (cm) *
                    </label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size || ''}
                      onChange={handleInputChange}
                      className="form-control mb-3"
                      placeholder="Ex: 15x20x2"
                      required
                    />
                    <label className="x-products-label" title="Prix de la version physique">
                      Prix (Physique) *
                    </label>
                    <input
                      type="number"
                      name="physicalPrice"
                      value={formData.physicalPrice || ''}
                      onChange={handleInputChange}
                      className="form-control mb-3"
                      placeholder="Ex: 15.99"
                      required
                    />
                    <label className="x-products-label" title="Stock disponible pour la version physique">
                      Stock *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock || ''}
                      onChange={handleInputChange}
                      className="form-control mb-3"
                      placeholder="Ex: 100"
                      required
                    />
                  </>
                )}
                <label className="x-products-label" title="Image de couverture du livre">
                  Image de Couverture *
                </label>
                <input
                  type="file"
                  name="coverImage"
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  accept="image/*"
                  required
                />
              </>
            )}
            {formData.type === 'Pharmacopée' && (
              <>
                <label className="x-products-label" title="Prix du produit en devise locale">
                  Prix *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  placeholder="Ex: 10.50"
                  required
                />
              </>
            )}
            {formData.type === 'Commercial' && (
              <>
                <label className="x-products-label" title="Poids du produit en kilogrammes">
                  Poids (kg) *
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  placeholder="Ex: 1.2"
                  required
                />
                <label className="x-products-label" title="Dimensions du produit (ex: 30x20x10)">
                  Taille (cm) *
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  placeholder="Ex: 30x20x10"
                  required
                />
                <label className="x-products-label" title="Première image du produit">
                  Image 1 *
                </label>
                <input
                  type="file"
                  name="image1"
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  accept="image/*"
                  required
                />
                <label className="x-products-label" title="Deuxième image du produit (optionnel)">
                  Image 2
                </label>
                <input
                  type="file"
                  name="image2"
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  accept="image/*"
                />
                <label className="x-products-label" title="Troisième image du produit (optionnel)">
                  Image 3
                </label>
                <input
                  type="file"
                  name="image3"
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  accept="image/*"
                />
                <label className="x-products-label" title="Quatrième image du produit (optionnel)">
                  Image 4
                </label>
                <input
                  type="file"
                  name="image4"
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  accept="image/*"
                />
                <label className="x-products-label" title="Vidéo descriptive du produit (optionnel)">
                  Vidéo de Description
                </label>
                <input
                  type="file"
                  name="video"
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  accept="video/*"
                />
                {formData.variants?.map((variant: any, index: number) => (
                  <div key={index} className="border p-3 mb-3">
                    <label className="x-products-label" title="Taille ou spécification (ex: M, 1TB)">
                      Taille *
                    </label>
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                      className="form-control mb-3"
                      placeholder={formData.subcategory === 'T-Shirts' ? 'Ex: M' : 'Ex: 1TB'}
                      required
                    />
                    <label className="x-products-label" title="Prix pour cette taille">
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
                          <label className="x-products-label" title="Sélectionnez une couleur disponible">
                            Couleur *
                          </label>
                          <select
                            value={colorObj.color}
                            onChange={(e) => {
                              const updatedVariants = [...formData.variants];
                              updatedVariants[index].colors[colorIndex].color = e.target.value;
                              setFormData({ ...formData, variants: updatedVariants });
                            }}
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
                          <label className="x-products-label" title="Stock pour cette couleur">
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
                <button className="btn x-add-btn mb-3" onClick={addVariant} title="Ajouter une nouvelle variante avec une taille différente">
                  <i className="fas fa-plus me-2"></i> Ajouter une Variante
                </button>
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

        {/* Step 5: Ownership (Admin Only) */}
        {currentStep === 5 && !isClientPage && (
          <div>
            <label className="x-products-label" title="À qui appartient ce produit ?">
              Appartient à *
            </label>
            <select
              name="ownership"
              value={formData.ownership || ''}
              onChange={handleInputChange}
              className="form-select mb-3"
              required
            >
              <option value="">Sélectionner</option>
              <option value="enterprise">Entreprise</option>
              <option value="client">Client</option>
            </select>
            {formData.ownership === 'client' && (
              <>
                <label className="x-products-label" title="Email du client propriétaire">
                  Email du Client *
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  placeholder="Ex: client@example.com"
                  required
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