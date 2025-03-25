"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCommercialProduct, editCommercialProduct } from "@/store/slices/commercialProductSlice";
import { CommercialProduct, CreateCommercialProductPayload, UpdateCommercialProductPayload } from "@/types/commercial_products";
import "@/styles/form-modal.css";
import { AppDispatch } from "@/store/store";

// Interface pour les props
interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: CommercialProduct | null;
}

// Interface pour les variantes dans le formulaire
interface VariantForm {
  couleur: string;
  taille: string;
  stock: number;
  prix_ajuste: number;
}

const GenericModal: React.FC<GenericModalProps> = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isEditMode = !!product;

  const [formData, setFormData] = useState<CreateCommercialProductPayload>({
    name: "",
    image: "",
    description: "",
    prix_normal: 0,
    prix_reduit: undefined,
    stock: 0,
    category: "",
    caracteristiques: {},
    variants: [],
    media: { images: [], video: "" },
  });

  const [caracteristiques, setCaracteristiques] = useState<{ key: string; value: string }[]>([]);
  const [variants, setVariants] = useState<VariantForm[]>([]);

  useEffect(() => {
    if (isEditMode && product) {
      setFormData({
        name: product.name,
        image: product.image,
        description: product.description,
        prix_normal: product.prix_normal,
        prix_reduit: product.prix_reduit,
        stock: product.stock,
        category: product.category,
        caracteristiques: product.caracteristiques,
        variants: product.variants,
        media: product.media,
      });
      setCaracteristiques(Object.entries(product.caracteristiques).map(([key, value]) => ({ key, value: String(value) })));
      setVariants(product.variants.map(v => ({ couleur: v.couleur, taille: v.taille, stock: v.stock, prix_ajuste: v.prix_ajuste })));
    }
  }, [isEditMode, product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "prix_normal" || name === "prix_reduit" || name === "stock" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCaracteristiqueChange = (index: number, field: "key" | "value", value: string) => {
    const newCaracteristiques = [...caracteristiques];
    newCaracteristiques[index][field] = value;
    setCaracteristiques(newCaracteristiques);
  };

  const addCaracteristique = () => {
    setCaracteristiques([...caracteristiques, { key: "", value: "" }]);
  };

  const removeCaracteristique = (index: number) => {
    setCaracteristiques(caracteristiques.filter((_, i) => i !== index));
  };

  const handleVariantChange = (
    index: number,
    field: keyof VariantForm,
    value: string // value est toujours string car il vient d'un input
  ) => {
    const newVariants = [...variants];
    if (field === "stock" || field === "prix_ajuste") {
      newVariants[index][field] = parseInt(value) || 0; // Conversion explicite en number
    } else {
      newVariants[index][field] = value; // Reste string pour couleur et taille
    }
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { couleur: "", taille: "", stock: 0, prix_ajuste: 0 }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      caracteristiques: Object.fromEntries(caracteristiques.map(c => [c.key, c.value])),
      variants,
    };

    if (isEditMode && product) {
      dispatch(editCommercialProduct({ productId: product.id, data: payload as UpdateCommercialProductPayload }));
    } else {
      dispatch(addCommercialProduct(payload));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEditMode ? "Modifier le produit" : "Créer un produit"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nom :
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </label>
          <label>
            Image :
            <input type="text" name="image" value={formData.image} onChange={handleInputChange} />
          </label>
          <label>
            Description :
            <textarea name="description" value={formData.description} onChange={handleInputChange} />
          </label>
          <label>
            Prix normal :
            <input type="number" name="prix_normal" value={formData.prix_normal} onChange={handleInputChange} required />
          </label>
          <label>
            Prix réduit :
            <input type="number" name="prix_reduit" value={formData.prix_reduit || ""} onChange={handleInputChange} />
          </label>
          <label>
            Stock :
            <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />
          </label>
          <label>
            Catégorie :
            <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
          </label>

          <h3>Caractéristiques</h3>
          {caracteristiques.map((c, index) => (
            <div key={index} className="caracteristique-row">
              <input
                type="text"
                placeholder="Clé"
                value={c.key}
                onChange={(e) => handleCaracteristiqueChange(index, "key", e.target.value)}
              />
              <input
                type="text"
                placeholder="Valeur"
                value={c.value}
                onChange={(e) => handleCaracteristiqueChange(index, "value", e.target.value)}
              />
              <button type="button" onClick={() => removeCaracteristique(index)}>Supprimer</button>
            </div>
          ))}
          <button type="button" onClick={addCaracteristique}>Ajouter une caractéristique</button>

          <h3>Variantes</h3>
          {variants.map((v, index) => (
            <div key={index} className="variant-row">
              <input
                type="text"
                placeholder="Couleur"
                value={v.couleur}
                onChange={(e) => handleVariantChange(index, "couleur", e.target.value)}
              />
              <input
                type="text"
                placeholder="Taille"
                value={v.taille}
                onChange={(e) => handleVariantChange(index, "taille", e.target.value)}
              />
              <input
                type="number"
                placeholder="Stock"
                value={v.stock}
                onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
              />
              <input
                type="number"
                placeholder="Prix ajusté"
                value={v.prix_ajuste}
                onChange={(e) => handleVariantChange(index, "prix_ajuste", e.target.value)}
              />
              <button type="button" onClick={() => removeVariant(index)}>Supprimer</button>
            </div>
          ))}
          <button type="button" onClick={addVariant}>Ajouter une variante</button>

          <div className="modal-actions">
            <button type="submit">{isEditMode ? "Modifier" : "Créer"}</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenericModal;