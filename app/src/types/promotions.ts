import { CommercialProduct } from "@/types/commercial_products";

export interface Promotion {
  id: string;
  product: CommercialProduct; // Lien vers CommercialProduct
  discountPercentage: number; // Ex. 85 pour -85%
  oldPrice: number; // Prix avant réduction
  newPrice: number; // Prix après réduction
  endTime: string; // Date de fin (ISO string)
  created_at: string;
  updated_at: string;
}