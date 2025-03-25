export interface Order {
    id: string;
    user: string;
    code: string;
    total: number;
    status: "pending" | "shipped" | "delivered" | "cancelled";
    created_at: string;
    items: OrderItem[];
  }
  
  export interface OrderItem {
    id: string;
    order: string;
    product: string; // ID de BaseProduct
    variant?: string; // ID de Variant (optionnel)
    quantity: number;
    price: number;
  }