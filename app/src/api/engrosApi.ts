// api/engrosApi.ts
import api from "@/api/api";
import { ENGROS_ENDPOINTS } from "@/api/config";
import { EngrosProduct , CreateEngrosProductPayload, UpdateEngrosProductPayload} from "@/types/engros";

export const fetchEngrosProducts = async (params: {
  commercialProduct?: string;
  minQuantityMin?: number;
  minQuantityMax?: number;
  prixEngrosMin?: number;
  prixEngrosMax?: number;
  ordering?: "prix_normal" | "-prix_normal" | "prix_reduit" | "-prix_reduit" | "created_at" | "-created_at";
  limit?: number;
  offset?: number;
}): Promise<{ results: EngrosProduct[]; count: number; next: string | null; previous: string | null }> => {
  const response = await api.get(ENGROS_ENDPOINTS.LIST_ENGROS_PRODUCTS, { params });
  return response.data;
};

export const fetchEngrosProductDetails = async (engrosProductId: string): Promise<EngrosProduct> => {
  const response = await api.get(ENGROS_ENDPOINTS.GET_ENGROS_PRODUCT(engrosProductId));
  return response.data;
};

export const createEngrosProduct = async (data: CreateEngrosProductPayload): Promise<EngrosProduct> => {
  const response = await api.post(ENGROS_ENDPOINTS.CREATE_ENGROS_PRODUCT, data);
  return response.data;
};

export const updateEngrosProduct = async (
  engrosProductId: string,
  data: Partial<UpdateEngrosProductPayload>
): Promise<EngrosProduct> => {
  const response = await api.patch(ENGROS_ENDPOINTS.UPDATE_ENGROS_PRODUCT(engrosProductId), data);
  return response.data;
};

export const deleteEngrosProduct = async (engrosProductId: string): Promise<void> => {
  await api.delete(ENGROS_ENDPOINTS.DELETE_ENGROS_PRODUCT(engrosProductId));
};