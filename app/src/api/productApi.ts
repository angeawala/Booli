// api/productApi.ts
import api from "@/api/api"; // Instance centralisée avec tokens
import { PRODUCT_ENDPOINTS } from "@/api/config";
import { BaseProduct } from "@/types/product";

// Créer un nouveau produit
export const createProduct = async (data: {
  name: string;
  category: string | null;
  subcategory?: string | null; // Optionnel
  price: number;
  discount_price?: number | null; // Optionnel
  stock: number;
  devise: string | null;
}): Promise<BaseProduct> => {
  const response = await api.post(PRODUCT_ENDPOINTS.CREATE, data);
  return response.data;
};