// api/pharmacopeApi.ts
import api from "@/api/api"; // Instance avec tokens
import { PHARMACOPE_ENDPOINTS} from "@/api/config";
import { PharmacopeProduct } from "@/types/pharmacope";


// Liste des produits pharmacopée
export const fetchPharmacopeProducts = async (params: {
  q?: string;
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<{ results: PharmacopeProduct[]; count: number; next: string | null; previous: string | null }> => {
  const response = await api.get(PHARMACOPE_ENDPOINTS.LIST_PRODUCTS, { params });
  return response.data;
};

// Détails d’un produit
export const fetchPharmacopeProductDetails = async (productId: string): Promise<PharmacopeProduct> => {
  const response = await api.get(PHARMACOPE_ENDPOINTS.GET_PRODUCT(productId));
  return response.data;
};

// Créer un produit (exemple admin)
export const createPharmacopeProduct = async (data: Partial<PharmacopeProduct>): Promise<PharmacopeProduct> => {
  const response = await api.post(PHARMACOPE_ENDPOINTS.LIST_PRODUCTS, data);
  return response.data;
};