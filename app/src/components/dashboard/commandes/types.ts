export interface Shop {
  id: string;
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
  id: string;
  type: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  weight?: string;
  size?: string;
  variants?: ProductVariant[];
  shopId?: string;
  expirationDate?: string;
  ownership: string;
  clientEmail?: string;
  createdAt?: string;
  sold?: number;
}

export interface Review {
  id: string;
  productId: string;
  variantIndex: number;
  orderId: string;
  clientEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
  response?: {
    vendorEmail: string;
    comment: string;
    createdAt: string;
  };
}

export interface Report {
  id: string;
  productId: string;
  variantIndex: number;
  orderId: string;
  clientEmail: string;
  comment: string;
  createdAt: string;
}

export interface Order {
  id: string;
  clientEmail: string;
  shopId: string;
  products: Array<{
    productId: string;
    variantIndex: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'canceled' | 'disputed';
  trackingCode: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt?: string;
  statusHistory?: Array<{
    status: string;
    date: string;
    comment?: string;
  }>;
  reviews?: Review[];
  reports?: Report[];
}