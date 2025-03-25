import api from "@/api/api"; // Instance avec tokens
import { CART_ENDPOINTS } from "@/api/config";
import { Cart, CartItem } from "@/types/cart";

// Récupérer le panier actuel
export const fetchCart = async (): Promise<Cart> => {
  const response = await api.get(CART_ENDPOINTS.GET_CART);
  return response.data;
};

// Ajouter un produit au panier
export const addToCart = async (data: {
  productId: string;
  variantId?: string;
  quantity: number;
}): Promise<CartItem> => {
  const response = await api.post(CART_ENDPOINTS.ADD_TO_CART, data);
  return response.data;
};

// Modifier un item du panier
export const updateCartItem = async (itemId: string, data: {
  quantity: number;
}): Promise<CartItem> => {
  const response = await api.patch(`${CART_ENDPOINTS.GET_CART}items/${itemId}/`, data);
  return response.data;
};

// Supprimer un item du panier
export const deleteCartItem = async (itemId: string): Promise<void> => {
  await api.delete(`${CART_ENDPOINTS.GET_CART}items/${itemId}/`);
};

// Vider le panier
export const clearCart = async (): Promise<void> => {
  await api.delete(CART_ENDPOINTS.GET_CART);
};