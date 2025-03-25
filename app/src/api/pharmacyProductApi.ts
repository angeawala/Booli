import api from "@/api/api"; // Instance avec tokens
import { PHARMACY_ENDPOINTS } from "@/api/config";
import { PharmacyProduct, PharmacyCategory } from "@/types/pharmacy_products";

// Liste des produits pharmacie
export const fetchPharmacyProducts = async (params: {
  q?: string;
  category?: string;
  prix_normal_min?: number;
  prix_normal_max?: number;
  prix_reduit_min?: number;
  prix_reduit_max?: number;
  stock?: number;
  expiration_date_min?: string;
  expiration_date_max?: string;
  ordering?: "name" | "-name" | "prix_normal" | "-prix_normal" | "prix_reduit" | "-prix_reduit" | "expiration_date" | "-expiration_date" | "created_at" | "-created_at";
  limit?: number;
  offset?: number;
}): Promise<{ results: PharmacyProduct[]; count: number; next: string | null; previous: string | null }> => {
  const response = await api.get(PHARMACY_ENDPOINTS.LIST_PHARMACY, { params });
  return response.data;
};

// Détails d’un produit pharmacie
export const fetchPharmacyProductDetails = async (productId: string): Promise<PharmacyProduct> => {
  const response = await api.get(PHARMACY_ENDPOINTS.GET_PHARMACY(productId));
  return response.data;
};

// Créer un produit pharmacie (admin)
export const createPharmacyProduct = async (data: {
  name: string;
  image: string;
  description: string;
  prix_normal: number;
  prix_reduit?: number;
  stock: number;
  category: string;
  precautions: string;
  expiration_date: string;
}): Promise<PharmacyProduct> => {
  const response = await api.post(PHARMACY_ENDPOINTS.LIST_PHARMACY, data);
  return response.data;
};

// Modifier un produit pharmacie (admin)
export const updatePharmacyProduct = async (productId: string, data: Partial<{
  name: string;
  image: string;
  description: string;
  prix_normal: number;
  prix_reduit?: number;
  stock: number;
  category: string;
  precautions: string;
  expiration_date: string;
}>): Promise<PharmacyProduct> => {
  const response = await api.patch(PHARMACY_ENDPOINTS.GET_PHARMACY(productId), data);
  return response.data;
};

// Supprimer un produit pharmacie (admin)
export const deletePharmacyProduct = async (productId: string): Promise<void> => {
  await api.delete(PHARMACY_ENDPOINTS.GET_PHARMACY(productId));
};

// Liste des catégories pharmacie
export const fetchPharmacyCategories = async (): Promise<PharmacyCategory[]> => {
  const response = await api.get(PHARMACY_ENDPOINTS.LIST_CATEGORIES);
  return response.data;
};

// Créer une catégorie (admin)
export const createPharmacyCategory = async (data: {
  name: string;
  description: string;
}): Promise<PharmacyCategory> => {
  const response = await api.post(PHARMACY_ENDPOINTS.LIST_CATEGORIES, data);
  return response.data;
};

// Modifier une catégorie (admin)
export const updatePharmacyCategory = async (categoryId: string, data: {
  name?: string;
  description?: string;
}): Promise<PharmacyCategory> => {
  const response = await api.patch(`${PHARMACY_ENDPOINTS.LIST_CATEGORIES}${categoryId}/`, data);
  return response.data;
};

// Supprimer une catégorie (admin)
export const deletePharmacyCategory = async (categoryId: string): Promise<void> => {
  await api.delete(`${PHARMACY_ENDPOINTS.LIST_CATEGORIES}${categoryId}/`);
};