"use client";

import { useCart } from "@/hooks/useCart";

interface AjoutPanierProps {
  product: {
    id: number;
    name: string;
    price: number;
  };
}

export default function AjoutPanier({ product }: AjoutPanierProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 0 }); // La quantité sera incrémentée dans addToCart
  };

  return (
    <button className="add-to-cart-btn" onClick={handleAddToCart}>
      <i className="fas fa-cart-plus"></i> Ajouter au panier
    </button>
  );
}