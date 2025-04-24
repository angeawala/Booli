
export interface Shop {
  id: string; // Changed to UUID (string)
  name: string;
  subcategories: string[];
  image: string;
  email: string;
  contact: string;
  description: string;
  ownerEmail?: string;
  status?: string;
  createdAt?: string;
}

export interface ProductVariant {
  size: string;
  colors: Array<{ color: string; stock: string }>;
  price: string;
  bulkPricing?: Array<{ minQuantity: number; pricePerUnit: number }>;
  promotion?: {
    discountPercentage: number;
    startDate: string;
    endDate: string;
  };
}

export interface Product {
  id: string; // Changed to UUID (string)
  type: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  weight?: string;
  size?: string;
  variants?: ProductVariant[];
  shopId?: string; // Changed to UUID (string)
  expirationDate?: string;
  ownership: string;
  clientEmail?: string;
  createdAt?: string;
  sold?: number;
}

export interface Order {
  id: string; // Changed to UUID (string)
  clientEmail: string;
  shopId: string; // Changed to UUID (string)
  products: Array<{
    productId: string; // Changed to UUID (string)
    variantIndex: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'canceled' | 'disputed';
  trackingCode: string; // Format: BLS-BVV89-YU52JJ
  shippingAddress: string;
  createdAt: string;
  updatedAt?: string;
  statusHistory?: Array<{
    status: string;
    date: string;
    comment?: string;
  }>;
}