// api/agencyApi.ts
import api from "@/api/api";
import { AGENCY_ENDPOINTS } from "@/api/config";
import { Agency, Category } from "@/types/agency";

export const fetchAgencies = async (params: {
  categoryId?: string;
  type?: "Entreprise" | "Agence" | "ONG";
  domain?: "Voyage" | "Marketing" | "Événementiel" | "Autre";
  limit?: number;
  offset?: number;
}): Promise<{ results: Agency[]; count: number; next: string | null; previous: string | null }> => {
  const response = await api.get(AGENCY_ENDPOINTS.LIST_AGENCIES, { params });
  return response.data;
};

export const fetchAgencyDetails = async (agencyId: string): Promise<Agency> => {
  const response = await api.get(AGENCY_ENDPOINTS.GET_AGENCY(agencyId));
  return response.data;
};

export const fetchAgencyCategories = async (): Promise<Category[]> => {
  const response = await api.get(AGENCY_ENDPOINTS.LIST_CATEGORIES);
  return response.data;
};

// Créer une catégorie (admin)
export const createCategory = async (data: {
  name: string;
  type: "Entreprise" | "Agence" | "ONG";
  domain: "Voyage" | "Marketing" | "Événementiel" | "Autre";
  image: string;
}): Promise<Category> => {
  const response = await api.post(AGENCY_ENDPOINTS.LIST_CATEGORIES, data);
  return response.data;
};

// Mettre à jour une catégorie (admin)
export const updateCategory = async (
  categoryId: string,
  data: Partial<{
    name: string;
    type: "Entreprise" | "Agence" | "ONG";
    domain: "Voyage" | "Marketing" | "Événementiel" | "Autre";
    image: string;
  }>
): Promise<Category> => {
  const response = await api.patch(AGENCY_ENDPOINTS.GET_CATEGORY(categoryId), data);
  return response.data;
};

// Supprimer une catégorie (admin)
export const deleteCategory = async (categoryId: string): Promise<void> => {
  await api.delete(AGENCY_ENDPOINTS.GET_CATEGORY(categoryId));
};
