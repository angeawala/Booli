// api/categoryApi.ts
import api from "@/api/api"; // Import de l'instance centralisée
import { CATEGORY_ENDPOINTS } from "@/api/config";
import { Category, SubCategory } from "@/types/category";

// Récupérer toutes les catégories
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get(CATEGORY_ENDPOINTS.LIST);
  return response.data;
};

// Rechercher des catégories
export const searchCategories = async (query: string): Promise<Category[]> => {
  const response = await api.get(CATEGORY_ENDPOINTS.SEARCH, { params: { q: query } });
  return response.data;
};

// Créer une nouvelle catégorie
export const createCategory = async (data: {
  name: string;
  category_type: string;
  is_non_tech: boolean;
  image?: string; // Optionnel
  icon?: string; // Optionnel
}): Promise<Category> => {
  const response = await api.post(CATEGORY_ENDPOINTS.CREATE, data);
  return response.data;
};

// Mettre à jour une catégorie
export const updateCategory = async (
  categoryId: string,
  data: {
    name?: string;
    category_type?: string;
    is_non_tech?: boolean;
    image?: string;
    icon?: string;
  }
): Promise<Category> => {
  const response = await api.put(CATEGORY_ENDPOINTS.UPDATE(categoryId), data);
  return response.data;
};

// Créer une nouvelle sous-catégorie
export const createSubCategory = async (data: {
  name: string;
  image?: string; // Optionnel
  category: string; // UUID de la catégorie parente
}): Promise<SubCategory> => {
  const response = await api.post(CATEGORY_ENDPOINTS.CREATE_SUBCATEGORY, data);
  return response.data;
};

// Mettre à jour une sous-catégorie
export const updateSubCategory = async (
  subcategoryId: string,
  data: {
    name?: string;
    image?: string;
    category?: string; // UUID optionnel
  }
): Promise<SubCategory> => {
  const response = await api.put(CATEGORY_ENDPOINTS.UPDATE_SUBCATEGORY(subcategoryId), data);
  return response.data;
};