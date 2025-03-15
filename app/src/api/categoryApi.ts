import axios from "axios";
import { CATEGORY_ENDPOINTS } from "@/api/config";
import { store } from "@/store/store";
import { Category, SubCategory} from "@/types/category";
import {BaseProduct} from "@/types/product";

// Configuration de l'instance axios
const api = axios.create({
  baseURL: CATEGORY_ENDPOINTS.LIST.split("/store/")[0],
  withCredentials: true,
});

// Intercepteur pour inclure le token JWT
api.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Récupérer toutes les catégories
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get(CATEGORY_ENDPOINTS.LIST);
  return response.data;
};

// Récupérer les produits d'une catégorie
export const getCategoryProducts = async (categoryId: string): Promise<BaseProduct[]> => {
  const response = await api.get(CATEGORY_ENDPOINTS.PRODUCTS(categoryId));
  return response.data;
};

// Récupérer les produits d'une sous-catégorie
export const getSubCategoryProducts = async (subcategoryId: string): Promise<BaseProduct[]> => {
  const response = await api.get(CATEGORY_ENDPOINTS.SUBCATEGORY_PRODUCTS(subcategoryId));
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
  category: number; // ID de la catégorie parente
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
    category?: number;
  }
): Promise<SubCategory> => {
  const response = await api.put(CATEGORY_ENDPOINTS.UPDATE_SUBCATEGORY(subcategoryId), data);
  return response.data;
};