// components/CartManager.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react"; // Ajout de useCallback
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  getCart,
  addCartItem,
  editCartItem,
  removeCartItem,
  clearCartItems,
} from "@/store/slices/cartSlice";
import { getReviews } from "@/store/slices/baseProductSlice";
import { CartItem } from "@/types/cart";
import { BaseProduct } from "@/types/base_products";
import { fetchProductDetails } from "@/api/baseProductApi";

interface CartManagerProps {
  onClose?: () => void;
}

const CartManager: React.FC<CartManagerProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, loading: cartLoading, error: cartError } = useSelector((state: RootState) => state.cart);
  const { reviews, loading: reviewsLoading, error: reviewsError } = useSelector((state: RootState) => state.baseProduct);
  const [products, setProducts] = useState<{ [key: string]: BaseProduct }>({});

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Fonction pour charger les produits manquants, stabilisée avec useCallback
  const loadMissingProducts = useCallback(async (items: CartItem[]) => {
    const currentProducts = { ...products }; // Copie locale
    let hasChanges = false;

    for (const item of items) {
      if (!Object.prototype.hasOwnProperty.call(currentProducts, item.product)) {
        try {
          const product = await fetchProductDetails(item.product);
          currentProducts[item.product] = product;
          dispatch(getReviews(item.product));
          hasChanges = true;
        } catch (err) {
          console.error(`Erreur lors du chargement du produit ${item.product}:`, err);
        }
      }
    }

    if (hasChanges) {
      setProducts(currentProducts);
    }
  }, [products, dispatch]); // Dépendances : products et dispatch

  useEffect(() => {
    if (cart?.items) {
      loadMissingProducts(cart.items);
    }
  }, [cart, loadMissingProducts]); // Ajout de loadMissingProducts comme dépendance

  const handleAddItem = (productId: string, variant?: string, quantity: number = 1) => {
    dispatch(addCartItem({ productId, variant, quantity }));
  };

  const handleUpdateItem = (itemId: string, quantity: number) => {
    dispatch(editCartItem({ itemId, data: { quantity } }));
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeCartItem(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCartItems());
  };

  const addExampleItem = () => {
    handleAddItem("example-product-id", undefined, 1);
  };

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => {
      const product = products[item.product];
      const price = product?.prix_reduit || product?.prix_normal || 0;
      return sum + item.quantity * price;
    }, 0);
  };

  if (cartLoading || reviewsLoading) return <div>Chargement...</div>;
  if (cartError) return <div>Erreur panier : {cartError}</div>;
  if (reviewsError) return <div>Erreur avis : {reviewsError}</div>;
  if (!cart || !cart.items.length) return <div>Votre panier est vide.</div>;

  return (
    <div className="cart-manager">
      <h2>Votre Panier</h2>
      <button onClick={addExampleItem}>Ajouter un article (exemple)</button>
      <ul>
        {cart.items.map((item: CartItem) => {
          const product = products[item.product];
          const productReviews = reviews[item.product] || [];
          const averageRating = productReviews.length
            ? productReviews.reduce((sum, r) => sum + r.note, 0) / productReviews.length
            : 0;
          return (
            <li key={item.id} className="cart-item">
              <div>
                <span>
                  {product
                    ? `${product.name} - ${item.quantity} x ${product.prix_reduit || product.prix_normal} CFA`
                    : `Produit ID: ${item.product} (chargement...)`}
                </span>
                {product && (
                  <span>
                    {" "}
                    - Note moyenne : {averageRating.toFixed(1)}/5 ({productReviews.length} avis)
                  </span>
                )}
              </div>
              <div>
                <button onClick={() => handleUpdateItem(item.id, item.quantity + 1)}>+</button>
                <button
                  onClick={() => handleUpdateItem(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <button onClick={() => handleRemoveItem(item.id)}>Supprimer</button>
              </div>
            </li>
          );
        })}
      </ul>
      <p>Total : {calculateTotal(cart.items)} CFA</p>
      <div className="cart-actions">
        <button onClick={handleClearCart}>Vider le panier</button>
        <button onClick={() => alert("Payer maintenant")}>Payer</button>
        {onClose && <button onClick={onClose}>Fermer</button>}
      </div>
    </div>
  );
};

export default CartManager;