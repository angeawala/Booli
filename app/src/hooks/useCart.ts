"use client";

import { useCartContext } from "@/context/cartContext";
import { CartItem } from "@/types/cart";

export const useCart = () => {
  const { cart, addItem, updateItem, removeItem, clearCart } = useCartContext();

  const cartItems = cart?.items || [];
  const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  const isSynced = cartItems.every((item: CartItem) => !item.id.startsWith("temp-"));

  return {
    cartItems,
    totalItems,
    isSynced,
    addItem,
    updateItem,
    removeItem,
    clearCart,
  };
};