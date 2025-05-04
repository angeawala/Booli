
'use client';

import { useState, useEffect, useRef } from 'react';
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
}

interface Variant {
  size: string;
  price: string;
  weight: string;
  colors: Array<{ color: string; stock: string }>;
}

interface FormData {
  type?: ProductType;
  name?: string;
  description?: string;
  category?: string;
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
  ownership?: 'enterprise' | 'client';
  clientEmail?: string;
  [key: string]: any;
}

interface FileData {
  [key: string]: File | null;
}

interface AddProductFormProps {
  categories: Category[];
  subcategories: Subcategory[];
  onSubmit: (formData: FormData, files: FileData) => void;
  onClose: () => void;
  isClientPage?: boolean;
  userEmail?: string;
}

type ProductType = 'Livres' | 'Pharmacopée' | 'Commercial';

// Constantes
const AVAILABLE_COLORS = [
  'Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Orange',
  'Pink', 'Gray', 'Brown', 'Cyan'
];

const PHARMA_TYPES = [
  'Sirop', 'Comprimé', 'Gélule', 'Pommade', 'Crème', 'Solution injectable',
  'Suppositoire', 'Poudre', 'Collyre', 'Spray nasal', 'Inhalateur', 'Autre'
];

// Sous-composant : Étape 1 - Type de produit
const Step1ProductType = ({
  formData,
  handleInputChange,
  nextStep,
}: {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  nextStep: () => void;
}) => (
  <div>
    <label htmlFor="type" className="x-products-label">
      Type de Produit *<span className="visually-hidden">Champ obligatoire</span>
    </label>
    <select
      id="type"
      name="type"
      value={formData.type || ''}
      onChange={handleInputChange}
      className="form-select mb-3"
      aria-required="true"
      required
    >
      <option value="">Sélectionner un type</option>
      <option value="Livres">Livres (Documents)</option>
      <option value="Pharmacopée">Pharmacopée</option>
      <option value="Commercial">Commercial (Autres)</option>
    </select>
    <button
      className="btn x-modal-btn"
      onClick={nextStep}
      disabled={!formData.type}
      aria-label="Passer à l'étape suivante"
    >
      Suivant
    </button>
  </div>
);

// Sous-composant : Étape 2 - Informations de base
const Step2BasicInfo = ({
  formData,
  handleInputChange,
  categories,
  subcategories,
  prevStep,
  nextStep,
}: {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  categories: Category[];
  subcategories: Subcategory[];
  prevStep: () => void;
  nextStep: () => void;
}) => (
  <div>
    <label htmlFor="name" className="x-products-label">
      Nom {formData.type === 'Livres' ? '(Titre)' : ''} *<span className="visually-hidden">Champ obligatoire</span>
    </label>
    <input
      id="name"
      type="text"
      name="name"
      value={formData.name || ''}
      onChange={handleInputChange}
      className="form-control mb-3"
      placeholder={formData.type === 'Livres' ? 'Ex: Le Petit Prince' : 'Ex: T-shirt Coton'}
      aria-required="true"
      required
    />
    <label htmlFor="description" className="x-products-label">
      Description *<span className="visually-hidden">Champ obligatoire</span>
    </label>
    <textarea
      id="description"
      name="description"
      value={formData.description || ''}
      onChange={handleInputChange}
      className="form-control mb-3"
      placeholder="Décrivez les caractéristiques principales..."
      aria-required="true"
      required
    />
    <label htmlFor="category" className="x-products-label">
      Catégorie *<span className="visually-hidden">Champ obligatoire</span>
    </label>
    <select
      id="category"
      name="category"
      value={formData.category || ''}
      onChange={handleInputChange}
      className="form-select mb-3"
      aria-required="true"
      required
    >
      <option value="">Sélectionner une catégorie</option>
      {categories
        .filter((cat) => cat.type === formData.type)
        .map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
    </select>
    {formData.type === 'Commercial' && (
      <>
        <label htmlFor="subcategory" className="x-products-label">
          Sous-catégorie *<span className="visually-hidden">Champ obligatoire</span>
        </label>
        <select
          id="subcategory"
          name="subcategory"
          value={formData.subcategory || ''}
          onChange={handleInputChange}
          className="form-select mb-3"
          aria-required="true"
          required
        >
          <option value="">Sélectionner une sous-catégorie</option>
          {subcategories
            .filter((sub) => sub.categoryId === formData.category)
            .map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
        </select>
      </>
    )}
    <button className="btn x-modal-btn me-2" onClick={prevStep} aria-label="Revenir à l'étape précédente">
      Précédent
    </button>
    <button
      className="btn x-modal-btn"
      onClick={nextStep}
      disabled={!formData.name || !formData.category || (formData.type === 'Commercial' && !formData.subcategory)}
      aria-label="Passer à l'étape suivante"
    >
      Suivant
    </button>
  </div>
);

// Sous-composant : Étape 3 - Champs spécifiques au type
const Step3TypeSpecific = ({
  formData,
  handleInputChange,
  subcategories,
  prevStep,
  nextStep,
}: {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: any } }) => void;
  subcategories: Subcategory[];
  prevStep: () => void;
  nextStep: () => void;
}) => {
  return (
    <div>
      {formData.type === 'Livres' && (
        <>
          <label htmlFor="bookAuthor" className="x-products-label">
            Auteur *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <input
            id="bookAuthor"
            type="text"
            name="bookAuthor"
            value={formData.bookAuthor || ''}
            onChange={handleInputChange}
            className="form-control mb-3"
            placeholder="Ex: Antoine de Saint-Exupéry"
            aria-required="true"
            required
          />
          <label htmlFor="publisher" className="x-products-label">
            Éditeur *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <input
            id="publisher"
            type="text"
            name="publisher"
            value={formData.publisher || ''}
            onChange={handleInputChange}
            className="form-control mb-3"
            placeholder="Ex: Gallimard"
            aria-required="true"
            required
          />
          <label htmlFor="publicationYear" className="x-products-label">
            Année de Publication *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <input
            id="publicationYear"
            type="number"
            name="publicationYear"
            value={formData.publicationYear || ''}
            onChange={handleInputChange}
            className="form-control mb-3"
            placeholder="Ex: 1943"
            aria-required="true"
            required
          />
          <label htmlFor="language" className="x-products-label">
            Langue *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <select
            id="language"
            name="language"
            value={formData.language || ''}
            onChange={handleInputChange}
            className="form-select mb-3"
            aria-required="true"
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
          <label htmlFor="pages" className="x-products-label">
            Nombre de Pages *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <input
            id="pages"
            type="number"
            name="pages"
            value={formData.pages || ''}
            onChange={handleInputChange}
            className="form-control mb-3"
            placeholder="Ex: 120"
            aria-required="true"
            required
          />
        </>
      )}
      {formData.type === 'Pharmacopée' && (
        <>
          <label htmlFor="stock" className="x-products-label">
            Stock Actuel *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <input
            id="stock"
            type="number"
            name="stock"
            value={formData.stock || ''}
            onChange={handleInputChange}
            className="form-control mb-3"
            placeholder="Ex: 50"
            aria-required="true"
            required
          />
          <label htmlFor="expirationDate" className="x-products-label">
            Date d'Expiration *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <input
            id="expirationDate"
            type="date"
            name="expirationDate"
            value={formData.expirationDate || ''}
            onChange={handleInputChange}
            className="form-control mb-3"
            aria-required="true"
            required
          />
          <label htmlFor="ingredients" className="x-products-label">
            Ingrédients *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients || ''}
            onChange={handleInputChange}
            className="form-control mb-3"
            placeholder="Ex: Paracétamol, Eau purifiée, Sirop de glucose"
            aria-required="true"
            required
          />
          <label htmlFor="dosage" className="x-products-label">
            Posologie *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <textarea
            id="dosage"
            name="dosage"
            value={formData.dosage || ''}
            onChange={handleInputChange}
            className="form-control mb-3"
            placeholder="Ex: 1 cuillère à soupe 2 fois par jour"
            aria-required="true"
            required
          />
          <label htmlFor="pharmaType" className="x-products-label">
            Type de Produit *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <select
            id="pharmaType"
            name="pharmaType"
            value={formData.pharmaType || ''}
            onChange={handleInputChange}
            className="form-select mb-3"
            aria-required="true"
            required
          >
            <option value="">Sélectionner un type</option>
            {PHARMA_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <label htmlFor="galenicForm" className="x-products-label">
            Forme Galénique *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <input
            id="galenicForm"
            type="text"
            name="galenicForm"
            value={formData.galenicForm || ''}
            onChange={handleInputChange}
            className="form-control mb-3"
            placeholder="Ex: Liquide, Comprimé, Gélule"
            aria-required="true"
            required
          />
          <label htmlFor="packaging" className="x-products-label">
            Conditionnement *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <input
            id="packaging"
            type="text"
            name="packaging"
            value={formData.packaging || ''}
            onChange={handleInputChange}
            className="form-control mb-3"
            placeholder="Ex: Flacon de 100 ml, Boîte de 30 comprimés"
            aria-required="true"
            required
          />
          <label htmlFor="contraindications" className="x-products-label">
            Contre-indications
          </label>
          <textarea
            id="contraindications"
            name="contraindications"
            value={formData.contraindications || ''}
            onChange={handleInputChange}
            className="form-control mb-3"
            placeholder="Ex: Déconseillé aux femmes enceintes"
          />
          <label htmlFor="sideEffects" className="x-products-label">
            Effets Secondaires
          </label>
          <textarea
            id="sideEffects"
            name="sideEffects"
            value={formData.sideEffects || ''}
            onChange={handleInputChange}
            className="form-control mb-3"
            placeholder="Ex: Somnolence, Nausées"
          />
          <label htmlFor="descriptiveImage" className="x-products-label">
            Image Descriptive
          </label>
          <input
            id="descriptiveImage"
            type="file"
            name="descriptiveImage"
            onChange={handleInputChange}
            className="form-control mb-3"
            accept="image/*"
          />
        </>
      )}
      {formData.type === 'Commercial' && (
        <CustomFields
          customFields={formData.customFields || []}
          onChange={(updated) => handleInputChange({
            target: { name: 'customFields', value: updated },
          } as any)}
        />
      )}
      <button className="btn x-modal-btn me-2" onClick={prevStep} aria-label="Revenir à l'étape précédente">
        Précédent
      </button>
      <button className="btn x-modal-btn" onClick={nextStep} aria-label="Passer à l'étape suivante">
        Suivant
      </button>
    </div>
  );
};

// Sous-composant : Étape 4 - Détails supplémentaires
const Step4AdditionalDetails = ({
  formData,
  handleInputChange,
  handleCheckboxChange,
  handleFileChange,
  handleVariantChange,
  addVariant,
  addColorToVariant,
  isClientPage,
  prevStep,
  nextStep,
  handleSubmit,
}: {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVariantChange: (index: number, field: string, value: any) => void;
  addVariant: () => void;
  addColorToVariant: (index: number) => void;
  isClientPage: boolean;
  prevStep: () => void;
  nextStep: () => void;
  handleSubmit: () => void;
}) => (
  <div>
    {formData.type === 'Livres' && (
      <>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="hasPDF"
            checked={formData.hasPDF || false}
            onChange={handleCheckboxChange}
            className="form-check-input"
            id="hasPDF"
          />
          <label className="form-check-label" htmlFor="hasPDF">
            PDF Disponible
          </label>
        </div>
        {formData.hasPDF && (
          <>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="isPDFFree"
                checked={formData.isPDFFree || false}
                onChange={handleCheckboxChange}
                className="form-check-input"
                id="isPDFFree"
              />
              <label className="form-check-label" htmlFor="isPDFFree">
                PDF Gratuit
              </label>
            </div>
            <label htmlFor="pdfFile" className="x-products-label">
              Fichier PDF *<span className="visually-hidden">Champ obligatoire</span>
            </label>
            <input
              id="pdfFile"
              type="file"
              name="pdfFile"
              onChange={handleFileChange}
              className="form-control mb-3"
              accept=".pdf"
              aria-required="true"
              required
            />
            {!formData.isPDFFree && (
              <>
                <label htmlFor="pdfPrice" className="x-products-label">
                  Prix (PDF) *<span className="visually-hidden">Champ obligatoire</span>
                </label>
                <input
                  id="pdfPrice"
                  type="number"
                  name="pdfPrice"
                  value={formData.pdfPrice || ''}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                  placeholder="Ex: 5.99"
                  aria-required="true"
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
            checked={formData.hasPhysical || false}
            onChange={handleCheckboxChange}
            className="form-check-input"
            id="hasPhysical"
          />
          <label className="form-check-label" htmlFor="hasPhysical">
            Version Physique Disponible
          </label>
        </div>
        {formData.hasPhysical && (
          <>
            <label htmlFor="weight" className="x-products-label">
              Poids (kg) *<span className="visually-hidden">Champ obligatoire</span>
            </label>
            <input
              id="weight"
              type="number"
              name="weight"
              value={formData.weight || ''}
              onChange={handleInputChange}
              className="form-control mb-3"
              placeholder="Ex: 0.5"
              aria-required="true"
              required
            />
            <label htmlFor="size" className="x-products-label">
              Taille (cm) *<span className="visually-hidden">Champ obligatoire</span>
            </label>
            <input
              id="size"
              type="text"
              name="size"
              value={formData.size || ''}
              onChange={handleInputChange}
              className="form-control mb-3"
              placeholder="Ex: 15x20x2"
              aria-required="true"
              required
            />
            <label htmlFor="physicalPrice" className="x-products-label">
              Prix (Physique) *<span className="visually-hidden">Champ obligatoire</span>
            </label>
            <input
              id="physicalPrice"
              type="number"
              name="physicalPrice"
              value={formData.physicalPrice || ''}
              onChange={handleInputChange}
              className="form-control mb-3"
              placeholder="Ex: 15.99"
              aria-required="true"
              required
            />
            <label htmlFor="stock" className="x-products-label">
              Stock *<span className="visually-hidden">Champ obligatoire</span>
            </label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={formData.stock || ''}
              onChange={handleInputChange}
              className="form-control mb-3"
              placeholder="Ex: 100"
              aria-required="true"
              required
            />
          </>
        )}
        <label htmlFor="coverImage" className="x-products-label">
          Image de Couverture *<span className="visually-hidden">Champ obligatoire</span>
        </label>
        <input
          id="coverImage"
          type="file"
          name="coverImage"
          onChange={handleFileChange}
          className="form-control mb-3"
          accept="image/*"
          aria-required="true"
          required
        />
      </>
    )}
    {formData.type === 'Pharmacopée' && (
      <>
        <label htmlFor="price" className="x-products-label">
          Prix *<span className="visually-hidden">Champ obligatoire</span>
        </label>
        <input
          id="price"
          type="number"
          name="price"
          value={formData.price || ''}
          onChange={handleInputChange}
          className="form-control mb-3"
          placeholder="Ex: 10.50"
          aria-required="true"
          required
        />
      </>
    )}
    {formData.type === 'Commercial' && (
      <>
        <label htmlFor="image1" className="x-products-label">
          Image 1 *<span className="visually-hidden">Champ obligatoire</span>
        </label>
        <input
          id="image1"
          type="file"
          name="image1"
          onChange={handleFileChange}
          className="form-control mb-3"
          accept="image/*"
          aria-required="true"
          required
        />
        <label htmlFor="image2" className="x-products-label">
          Image 2
        </label>
        <input
          id="image2"
          type="file"
          name="image2"
          onChange={handleFileChange}
          className="form-control mb-3"
          accept="image/*"
        />
        <label htmlFor="image3" className="x-products-label">
          Image 3
        </label>
        <input
          id="image3"
          type="file"
          name="image3"
          onChange={handleFileChange}
          className="form-control mb-3"
          accept="image/*"
        />
        <label htmlFor="image4" className="x-products-label">
          Image 4
        </label>
        <input
          id="image4"
          type="file"
          name="image4"
          onChange={handleFileChange}
          className="form-control mb-3"
          accept="image/*"
        />
        <label htmlFor="video" className="x-products-label">
          Vidéo de Description
        </label>
        <input
          id="video"
          type="file"
          name="video"
          onChange={handleFileChange}
          className="form-control mb-3"
          accept="video/*"
        />
        <ProductVariants
          variants={formData.variants || []}
          onChange={(updated) =>
            handleInputChange({
              target: { name: 'variants', value: updated },
            } as any)
          }
          addVariant={addVariant}
          addColorToVariant={addColorToVariant}
          availableColors={AVAILABLE_COLORS}
        />
      </>
    )}
    <button className="btn x-modal-btn me-2" onClick={prevStep} aria-label="Revenir à l'étape précédente">
      Précédent
    </button>
    <button
      className="btn x-modal-btn"
      onClick={isClientPage ? handleSubmit : nextStep}
      aria-label={isClientPage ? 'Soumettre le formulaire' : 'Passer à l’étape suivante'}
    >
      {isClientPage ? 'Terminer' : 'Suivant'}
    </button>
  </div>
);

// Sous-composant : Étape 5 - Propriété (admin uniquement)
const Step5Ownership = ({
  formData,
  handleInputChange,
  prevStep,
  handleSubmit,
}: {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  prevStep: () => void;
  handleSubmit: () => void;
}) => (
  <div>
    <label htmlFor="ownership" className="x-products-label">
      Appartient à *<span className="visually-hidden">Champ obligatoire</span>
    </label>
    <select
      id="ownership"
      name="ownership"
      value={formData.ownership || ''}
      onChange={handleInputChange}
      className="form-select mb-3"
      aria-required="true"
      required
    >
      <option value="">Sélectionner</option>
      <option value="enterprise">Entreprise</option>
      <option value="client">Client</option>
    </select>
    {formData.ownership === 'client' && (
      <>
        <label htmlFor="clientEmail" className="x-products-label">
          Email du Client *<span className="visually-hidden">Champ obligatoire</span>
        </label>
        <input
          id="clientEmail"
          type="email"
          name="clientEmail"
          value={formData.clientEmail || ''}
          onChange={handleInputChange}
          className="form-control mb-3"
          placeholder="Ex: client@example.com"
          aria-required="true"
          required
        />
      </>
    )}
    <button className="btn x-modal-btn me-2" onClick={prevStep} aria-label="Revenir à l'étape précédente">
      Précédent
    </button>
    <button className="btn x-modal-btn" onClick={handleSubmit} aria-label="Soumettre le formulaire">
      Terminer
    </button>
  </div>
);

// Sous-composant : Gestion des variantes
const ProductVariants = ({
  variants,
  onChange,
  addVariant,
  addColorToVariant,
  availableColors,
}: {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
  addVariant: () => void;
  addColorToVariant: (index: number) => void;
  availableColors: string[];
}) => {
  const handleVariantChange = (index: number, field: string, value: any) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleColorChange = (variantIndex: number, colorIndex: number, field: string, value: string) => {
    const updated = [...variants];
    updated[variantIndex].colors[colorIndex] = {
      ...updated[variantIndex].colors[colorIndex],
      [field]: value,
    };
    onChange(updated);
  };

  return (
    <>
      {variants.map((variant, index) => (
        <div key={index} className="border p-3 mb-3">
          <label htmlFor={`variant-size-${index}`} className="x-products-label">
            Taille *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <input
            id={`variant-size-${index}`}
            type="text"
            value={variant.size}
            onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
            className="form-control mb-3"
            placeholder="Ex: M"
            aria-required="true"
            required
          />
          <label htmlFor={`variant-price-${index}`} className="x-products-label">
            Prix *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <input
            id={`variant-price-${index}`}
            type="number"
            value={variant.price}
            onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
            className="form-control mb-3"
            placeholder="Ex: 25.99"
            aria-required="true"
            required
          />
          <label htmlFor={`variant-weight-${index}`} className="x-products-label">
            Poids (kg) *<span className="visually-hidden">Champ obligatoire</span>
          </label>
          <input
            id={`variant-weight-${index}`}
            type="number"
            value={variant.weight}
            onChange={(e) => handleVariantChange(index, 'weight', e.target.value)}
            className="form-control mb-3"
            placeholder="Ex: 0.8"
            aria-required="true"
            required
          />
          {variant.colors.map((colorObj, colorIndex) => (
            <div key={colorIndex} className="row mb-3">
              <div className="col-6">
                <label htmlFor={`color-${index}-${colorIndex}`} className="x-products-label">
                  Couleur *<span className="visually-hidden">Champ obligatoire</span>
                </label>
                <select
                  id={`color-${index}-${colorIndex}`}
                  value={colorObj.color}
                  onChange={(e) => handleColorChange(index, colorIndex, 'color', e.target.value)}
                  className="form-select"
                  aria-required="true"
                  required
                >
                  <option value="">Sélectionner une couleur</option>
                  {availableColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <label htmlFor={`stock-${index}-${colorIndex}`} className="x-products-label">
                  Stock *<span className="visually-hidden">Champ obligatoire</span>
                </label>
                <input
                  id={`stock-${index}-${colorIndex}`}
                  type="number"
                  value={colorObj.stock}
                  onChange={(e) => handleColorChange(index, colorIndex, 'stock', e.target.value)}
                  className="form-control"
                  placeholder="Ex: 50"
                  aria-required="true"
                  required
                />
              </div>
            </div>
          ))}
          <button
            className="btn x-add-btn mb-3"
            onClick={() => addColorToVariant(index)}
            aria-label="Ajouter une couleur à la variante"
          >
            <i className="fas fa-plus me-2"></i> Ajouter une Couleur
          </button>
        </div>
      ))}
      <button
        className="btn x-add-btn mb-3"
        onClick={addVariant}
        aria-label="Ajouter une nouvelle variante"
      >
        <i className="fas fa-plus me-2"></i> Ajouter une Variante
      </button>
    </>
  );
};

// Sous-composant : Gestion des champs personnalisés
const CustomFields = ({
  customFields,
  onChange,
}: {
  customFields: Array<{ name: string; value: string }>;
  onChange: (customFields: Array<{ name: string; value: string }>) => void;
}) => {
  const addCustomField = () => {
    onChange([...customFields, { name: '', value: '' }]);
  };

  const handleCustomFieldChange = (index: number, field: string, value: string) => {
    const updated = [...customFields];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <>
      {customFields.map((field, index) => (
        <div key={index} className="row mb-3">
          <div className="col-6">
            <input
              type="text"
              placeholder="Nom du champ (ex: Matériau)"
              value={field.name}
              onChange={(e) => handleCustomFieldChange(index, 'name', e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <input
              type="text"
              placeholder="Valeur (ex: Cuir)"
              value={field.value}
              onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
              className="form-control"
            />
          </div>
        </div>
      ))}
      <button className="btn x-add-btn mb-3" onClick={addCustomField} aria-label="Ajouter un champ personnalisé">
        <i className="fas fa-plus me-2"></i> Ajouter un Champ Personnalisé
      </button>
    </>
  );
};

// Composant principal
const AddProductForm = ({
  categories,
  subcategories,
  onSubmit,
  onClose,
  isClientPage = false,
  userEmail,
}: AddProductFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    variants: [],
    customFields: [],
    hasPDF: false,
    hasPhysical: false,
    isPDFFree: false,
  });
  const [files, setFiles] = useState<FileData>({});
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedForm = localStorage.getItem('addProductForm');
    if (savedForm) {
      const parsed = JSON.parse(savedForm);
      const savedAt = parsed.timestamp || Date.now();
      if (Date.now() - savedAt < 24 * 60 * 60 * 1000) {
        const loadedData = parsed.data;
        // Valider ownership
        loadedData.ownership =
          loadedData.ownership === 'enterprise' || loadedData.ownership === 'client'
            ? loadedData.ownership
            : undefined;
        setFormData(loadedData);
      } else {
        localStorage.removeItem('addProductForm');
      }
    }
  }, []);

  // Sauvegarder les données dans localStorage avec debouncing
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      if (Object.keys(formData).length > 0) {
        localStorage.setItem(
          'addProductForm',
          JSON.stringify({ data: formData, timestamp: Date.now() })
        );
      }
    }, 300);
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData]);

  // Gestion des changements d'entrée
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: any } }
  ) => {
    const { name, value } = 'target' in e ? e.target : e;
    if (name === 'ownership') {
      const validOwnership = value === 'enterprise' || value === 'client' ? value : undefined;
      setFormData((prev) => ({ ...prev, ownership: validOwnership }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Gestion des cases à cocher
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Gestion des fichiers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
      setFormData((prev) => ({ ...prev, [name]: files[0].name }));
    }
  };

  // Gestion des variantes
  const handleVariantChange = (index: number, field: string, value: any) => {
    const updatedVariants = [...(formData.variants || [])];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setFormData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const addVariant = () => {
    const updatedVariants = [
      ...(formData.variants || []),
      { size: '', price: '', weight: '', colors: [{ color: '', stock: '' }] },
    ];
    setFormData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const addColorToVariant = (variantIndex: number) => {
    const updatedVariants = [...(formData.variants || [])];
    updatedVariants[variantIndex].colors.push({ color: '', stock: '' });
    setFormData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  // Validation des étapes
  const validateStep = (step: number): string[] => {
    const errors: string[] = [];
    if (step === 1 && !formData.type) {
      errors.push('Le type de produit est obligatoire.');
    }
    if (step === 2) {
      if (!formData.name) errors.push('Le nom est obligatoire.');
      if (!formData.description) errors.push('La description est obligatoire.');
      if (!formData.category) errors.push('La catégorie est obligatoire.');
      if (formData.type === 'Commercial' && !formData.subcategory) {
        errors.push('La sous-catégorie est obligatoire.');
      }
    }
    if (step === 3) {
      if (formData.type === 'Livres') {
        if (!formData.bookAuthor) errors.push("L'auteur est obligatoire.");
        if (!formData.publisher) errors.push("L'éditeur est obligatoire.");
        if (!formData.publicationYear) errors.push("L'année de publication est obligatoire.");
        if (!formData.language) errors.push('La langue est obligatoire.');
        if (!formData.pages) errors.push('Le nombre de pages est obligatoire.');
      }
      if (formData.type === 'Pharmacopée') {
        if (!formData.stock) errors.push('Le stock est obligatoire.');
        if (!formData.expirationDate) errors.push("La date d'expiration est obligatoire.");
        if (!formData.ingredients) errors.push('Les ingrédients sont obligatoires.');
        if (!formData.dosage) errors.push('La posologie est obligatoire.');
        if (!formData.pharmaType) errors.push('Le type de produit est obligatoire.');
        if (!formData.galenicForm) errors.push('La forme galénique est obligatoire.');
        if (!formData.packaging) errors.push('Le conditionnement est obligatoire.');
      }
    }
    if (step === 4) {
      if (formData.type === 'Livres') {
        if (formData.hasPDF && !formData.pdfFile) errors.push('Le fichier PDF est obligatoire.');
        if (formData.hasPDF && !formData.isPDFFree && !formData.pdfPrice) {
          errors.push('Le prix du PDF est obligatoire.');
        }
        if (formData.hasPhysical) {
          if (!formData.weight) errors.push('Le poids est obligatoire.');
          if (!formData.size) errors.push('La taille est obligatoire.');
          if (!formData.physicalPrice) errors.push('Le prix physique est obligatoire.');
          if (!formData.stock) errors.push('Le stock est obligatoire.');
        }
        if (!formData.coverImage) errors.push("L'image de couverture est obligatoire.");
      }
      if (formData.type === 'Pharmacopée' && !formData.price) {
        errors.push('Le prix est obligatoire.');
      }
      if (formData.type === 'Commercial') {
        if (!formData.image1) errors.push("L'image 1 est obligatoire.");
        if (formData.variants?.some((v) => !v.size || !v.price || !v.weight || v.colors.some((c) => !c.color || !c.stock))) {
          errors.push('Toutes les variantes doivent avoir une taille, un prix, un poids, une couleur et un stock.');
        }
      }
    }
    if (step === 5 && !isClientPage) {
      if (!formData.ownership) errors.push("La propriété est obligatoire.");
      if (formData.ownership === 'client' && !formData.clientEmail) {
        errors.push("L'email du client est obligatoire.");
      }
    }
    return errors;
  };

  // Navigation entre les étapes
  const nextStep = () => {
    const errors = validateStep(currentStep);
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => setCurrentStep(currentStep - 1);

  // Soumission du formulaire
  const handleSubmit = () => {
    const errors = validateStep(currentStep);
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    const validatedFormData = {
      ...formData,
      ownership: formData.ownership === 'enterprise' || formData.ownership === 'client' ? formData.ownership : undefined,
    };

    const finalFormData: FormData = {
      ...validatedFormData,
      ...(isClientPage ? { ownership: 'client', clientEmail: userEmail } : {}),
    };

    onSubmit(finalFormData, files);
    setFormData({ variants: [], customFields: [], hasPDF: false, hasPhysical: false, isPDFFree: false });
    setFiles({});
    localStorage.removeItem('addProductForm');
    setCurrentStep(1);
  };

  // Nombre total d'étapes
  const totalSteps = isClientPage ? 4 : 5;

  return (
    <div className="x-modal">
      <div className="x-modal-content">
        <h3 aria-live="polite">Ajouter un Produit - Étape {currentStep} sur {totalSteps}</h3>
        {currentStep === 1 && (
          <Step1ProductType
            formData={formData}
            handleInputChange={handleInputChange}
            nextStep={nextStep}
          />
        )}
        {currentStep === 2 && (
          <Step2BasicInfo
            formData={formData}
            handleInputChange={handleInputChange}
            categories={categories}
            subcategories={subcategories}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}
        {currentStep === 3 && (
          <Step3TypeSpecific
            formData={formData}
            handleInputChange={handleInputChange}
            subcategories={subcategories}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}
        {currentStep === 4 && (
          <Step4AdditionalDetails
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            handleFileChange={handleFileChange}
            handleVariantChange={handleVariantChange}
            addVariant={addVariant}
            addColorToVariant={addColorToVariant}
            isClientPage={isClientPage}
            prevStep={prevStep}
            nextStep={nextStep}
            handleSubmit={handleSubmit}
          />
        )}
        {currentStep === 5 && !isClientPage && (
          <Step5Ownership
            formData={formData}
            handleInputChange={handleInputChange}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        )}
        <button
          className="btn x-modal-close"
          onClick={onClose}
          aria-label="Fermer le formulaire"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default AddProductForm;
