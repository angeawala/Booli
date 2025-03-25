export interface Cart {
    id: string;
    user: string;
    created_at: string;
    items: CartItem[];
  }
  
  export interface CartItem {
    id: string;
    cart: string;
    product: string; // ID de BaseProduct
    variant?: string; // ID de Variant (optionnel)
    quantity: number;
  }