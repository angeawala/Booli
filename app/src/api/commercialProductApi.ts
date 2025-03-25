// api/commercialProductApi.ts
import api from "@/api/api";
import { COMMERCIAL_ENDPOINTS } from "@/api/config";
import {
  CommercialProduct,
  CommercialCategory,
  CommercialSubCategory,
  CreateCommercialProductPayload,
  UpdateCommercialProductPayload,
  CreateCommercialSubCategoryPayload,
  UpdateCommercialSubCategoryPayload,
} from "@/types/commercial_products";

// Liste des produits commerciaux
export const fetchCommercialProducts = async (params: {
  q?: string;
  category?: string;
  is_tech?: boolean;
  prix_normal_min?: number;
  prix_normal_max?: number;
  prix_reduit_min?: number;
  prix_reduit_max?: number;
  stock?: number;
  couleur?: string;
  taille?: string;
  caracteristiques?: string;
  ordering?: "name" | "-name" | "prix_normal" | "-prix_normal" | "prix_reduit" | "-prix_reduit" | "stock" | "-stock" | "created_at" | "-created_at";
  limit?: number;
  offset?: number;
}): Promise<{ results: CommercialProduct[]; count: number; next: string | null; previous: string | null }> => {
  const response = await api.get(COMMERCIAL_ENDPOINTS.LIST_COMMERCIAL, { params });
  return response.data;
};

// Détails d’un produit commercial
export const fetchCommercialProductDetails = async (productId: string): Promise<CommercialProduct> => {
  const response = await api.get(COMMERCIAL_ENDPOINTS.GET_COMMERCIAL(productId));
  return response.data;
};

// Créer un produit commercial (admin)
export const createCommercialProduct = async (data: CreateCommercialProductPayload): Promise<CommercialProduct> => {
  const response = await api.post(COMMERCIAL_ENDPOINTS.CREATE_COMMERCIAL, data);
  return response.data;
};

// Modifier un produit commercial (admin)
export const updateCommercialProduct = async (productId: string, data: UpdateCommercialProductPayload): Promise<CommercialProduct> => {
  const response = await api.patch(COMMERCIAL_ENDPOINTS.UPDATE_COMMERCIAL(productId), data);
  return response.data;
};

// Supprimer un produit commercial (admin)
export const deleteCommercialProduct = async (productId: string): Promise<void> => {
  await api.delete(COMMERCIAL_ENDPOINTS.DELETE_COMMERCIAL(productId));
};

// Liste des catégories commerciales
export const fetchCommercialCategories = async (): Promise<CommercialCategory[]> => {
  const response = await api.get(COMMERCIAL_ENDPOINTS.LIST_CATEGORIES);
  return response.data;
};

// Créer une catégorie (admin)
export const createCommercialCategory = async (data: {
  name: string;
  description: string;
  is_tech: boolean;
  image: string;
  icon: string;
}): Promise<CommercialCategory> => {
  const response = await api.post(COMMERCIAL_ENDPOINTS.CREATE_CATEGORY, data);
  return response.data;
};

// Modifier une catégorie (admin)
export const updateCommercialCategory = async (
  categoryId: string,
  data: Partial<{ name: string; description: string; is_tech: boolean; image: string; icon: string }>
): Promise<CommercialCategory> => {
  const response = await api.patch(COMMERCIAL_ENDPOINTS.UPDATE_CATEGORY(categoryId), data);
  return response.data;
};

// Supprimer une catégorie (admin)
export const deleteCommercialCategory = async (categoryId: string): Promise<void> => {
  await api.delete(COMMERCIAL_ENDPOINTS.DELETE_CATEGORY(categoryId));
};

// Liste des sous-catégories commerciales
export const fetchCommercialSubCategories = async (): Promise<CommercialSubCategory[]> => {
  const response = await api.get(COMMERCIAL_ENDPOINTS.LIST_SUBCATEGORIES);
  return response.data;
};

// Détails d’une sous-catégorie
export const fetchCommercialSubCategoryDetails = async (subCategoryId: string): Promise<CommercialSubCategory> => {
  const response = await api.get(COMMERCIAL_ENDPOINTS.GET_SUBCATEGORY(subCategoryId));
  return response.data;
};

// Créer une sous-catégorie (admin)
export const createCommercialSubCategory = async (data: CreateCommercialSubCategoryPayload): Promise<CommercialSubCategory> => {
  const response = await api.post(COMMERCIAL_ENDPOINTS.CREATE_SUBCATEGORY, data);
  return response.data;
};

// Modifier une sous-catégorie (admin)
export const updateCommercialSubCategory = async (
  subCategoryId: string,
  data: UpdateCommercialSubCategoryPayload
): Promise<CommercialSubCategory> => {
  const response = await api.patch(COMMERCIAL_ENDPOINTS.UPDATE_SUBCATEGORY(subCategoryId), data);
  return response.data;
};

// Supprimer une sous-catégorie (admin)
export const deleteCommercialSubCategory = async (subCategoryId: string): Promise<void> => {
  await api.delete(COMMERCIAL_ENDPOINTS.DELETE_SUBCATEGORY(subCategoryId));
};