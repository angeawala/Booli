import { BaseProduct } from "@/types/base_products";

export interface PharmacyProduct extends BaseProduct {
  category: string;
  precautions: string;
  expiration_date: string;
}

export interface PharmacyCategory {
  id: string;
  name: string;
  description: string;
}

export interface CreatePharmacyProductPayload {
  name: string;
  image: string;
  description: string;
  prix_normal: number;
  prix_reduit?: number;
  stock: number;
  category: string;
  ingredient: [];
  precautions: string;
  expiration_date: string;
}

export interface UpdatePharmacyProductPayload {
  name?: string;
  image?: string;
  description?: string;
  prix_normal?: number;
  prix_reduit?: number;
  stock?: number;
  category?: string;
  precautions?: string;
  expiration_date?: string;
}