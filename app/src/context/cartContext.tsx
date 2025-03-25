// src/context/cartContext.tsx (sans uuid)
"use client";

import { createContext, useContext, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  addCartItem,
  editCartItem,
  removeCartItem,
  clearCartItems,
} from "@/store/slices/cartSlice";
import { Cart, CartItem } from "@/types/cart";
import { RootState, AppDispatch } from "@/store/store";

interface CartState {
  cart: Cart | null;
  addItem: (productId: string, variant?: string, quantity?: number) => void;
  updateItem: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartState | undefined>(undefined);

// Générateur d’ID simple sans uuid
const generateTempId = () => `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const reduxCart = useSelector((state: RootState) => state.cart.cart);

  const mergeCarts = useCallback((localCart: Cart | null, serverCart: Cart | null): Cart | null => {
    if (!serverCart) return localCart;
    if (!localCart) return serverCart;

    const serverItemsMap = new Map<string, CartItem>(
      serverCart.items.map((item) => [item.id, item])
    );
    const mergedItems = [...serverCart.items];

    localCart.items.forEach((localItem) => {
      if (!serverItemsMap.has(localItem.id) && localItem.id.startsWith("temp-")) {
        mergedItems.push(localItem);
      }
    });

    return { ...serverCart, items: mergedItems };
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const initialCart = storedCart ? (JSON.parse(storedCart) as Cart) : null;

    if (initialCart) {
      dispatch({ type: "cart/getCart/fulfilled", payload: initialCart });
    }

    dispatch(getCart())
      .unwrap()
      .then((serverCart) => {
        const mergedCart = mergeCarts(initialCart, serverCart as Cart);
        dispatch({ type: "cart/getCart/fulfilled", payload: mergedCart });
      })
      .catch(() => {
        console.log("Serveur non disponible, utilisation du panier local");
      });
  }, [dispatch, mergeCarts]);

  useEffect(() => {
    if (reduxCart) {
      localStorage.setItem("cart", JSON.stringify(reduxCart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [reduxCart]);

  const syncWithServer = useCallback(() => {
    dispatch(getCart())
      .unwrap()
      .then((serverCart) => {
        const mergedCart = mergeCarts(reduxCart, serverCart as Cart);
        dispatch({ type: "cart/getCart/fulfilled", payload: mergedCart });
      })
      .catch(() => {
        console.log("Synchronisation échouée, conservation du panier local");
      });
  }, [dispatch, reduxCart, mergeCarts]);

  const addItem = async (productId: string, variant?: string, quantity: number = 1) => {
    const tempId = generateTempId();
    const tempCartId = reduxCart?.id || generateTempId();
    const newItem: CartItem = {
      id: tempId,
      cart: tempCartId,
      product: productId,
      variant,
      quantity,
    };

    const updatedCart: Cart = reduxCart
      ? { ...reduxCart, items: [...reduxCart.items, newItem] }
      : {
          id: tempCartId,
          user: "anonymous",
          created_at: new Date().toISOString(),
          items: [newItem],
        };
    dispatch({ type: "cart/getCart/fulfilled", payload: updatedCart });

    try {
      const serverItem = (await dispatch(addCartItem({ productId, variant, quantity })).unwrap()) as CartItem;
      const finalCart: Cart = {
        id: serverItem.cart,
        user: reduxCart?.user || "anonymous",
        created_at: reduxCart?.created_at || new Date().toISOString(),
        items: reduxCart
          ? reduxCart.items.map((item) => (item.id === tempId ? serverItem : item))
          : [serverItem],
      };
      dispatch({ type: "cart/getCart/fulfilled", payload: finalCart });
      syncWithServer();
    } catch (error) {
      console.error("Erreur serveur, item conservé localement", error);
    }
  };

  const updateItem = async (itemId: string, quantity: number) => {
    if (!reduxCart) return;

    const updatedItems = reduxCart.items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    dispatch({ type: "cart/getCart/fulfilled", payload: { ...reduxCart, items: updatedItems } });

    try {
      await dispatch(editCartItem({ itemId, data: { quantity } })).unwrap();
      syncWithServer();
    } catch (error) {
      console.error("Erreur serveur, mise à jour conservée localement", error);
    }
  };

  const removeItem = async (itemId: string) => {
    if (!reduxCart) return;

    const updatedItems = reduxCart.items.filter((item) => item.id !== itemId);
    dispatch({ type: "cart/getCart/fulfilled", payload: { ...reduxCart, items: updatedItems } });

    try {
      await dispatch(removeCartItem(itemId)).unwrap();
      syncWithServer();
    } catch (error) {
      console.error("Erreur serveur, suppression conservée localement", error);
    }
  };

  const clearCart = async () => {
    dispatch({ type: "cart/getCart/fulfilled", payload: null });

    try {
      await dispatch(clearCartItems()).unwrap();
      syncWithServer();
    } catch (error) {
      console.error("Erreur serveur, vidage conservé localement", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart: reduxCart, addItem, updateItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};