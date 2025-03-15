
import { useContext } from "react";
import {CartContext} from "@/context/CartContext"
// Hook personnalisé pour utiliser le contexte
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  }