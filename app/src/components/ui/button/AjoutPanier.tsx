"use client";

import { useCart } from "@/hooks/useCart";

// Union des types de produits possibles (à ajuster selon tes vrais types)
interface BaseProduct {
  id: string; // Aligné avec CartItem.product
  name: string;
  price: number;
  variant?: string; // Optionnel si certains produits ont des variants
}

interface CommercialProduct {
  id: string;
  name: string;
  price: number;
  variant?: string;
}

interface PharmacyProduct {
  id: string;
  name: string;
  price: number;
  variant?: string;
}

// Type unifié pour les props
type ProductType = BaseProduct | CommercialProduct | PharmacyProduct;

interface AjoutPanierProps {
  product: ProductType;
}

export default function AjoutPanier({ product }: AjoutPanierProps) {
  const { addItem } = useCart(); // Corrigé addToCart -> addItem

  const handleAddToCart = () => {
    // Appel à addItem avec les données alignées sur CartItem
    addItem(product.id, product.variant, 1); // Quantité initiale de 1
  };

  return (
    <button className="add-to-cart-btn" onClick={handleAddToCart}>
      <i className="fas fa-cart-plus"></i> Ajouter au panier
    </button>
  );
}