import api from "@/api/api"; // Instance Axios avec tokens
import { PROMOTION_ENDPOINTS } from "@/api/config";
import { Promotion } from "@/types/promotions";

// Liste des promotions
export const fetchPromotions = async (params: {
  product?: string; // Filtrer par ID de produit
  discount_min?: number; // Réduction minimale
  discount_max?: number; // Réduction maximale
  old_price_min?: number;
  old_price_max?: number;
  new_price_min?: number;
  new_price_max?: number;
  end_time_min?: string; // Date ISO
  end_time_max?: string; // Date ISO
  ordering?: "discount" | "-discount" | "old_price" | "-old_price" | "new_price" | "-new_price" | "end_time" | "-end_time" | "created_at" | "-created_at";
  limit?: number;
  offset?: number;
}): Promise<{ results: Promotion[]; count: number; next: string | null; previous: string | null }> => {
  const response = await api.get(PROMOTION_ENDPOINTS.LIST_PROMOTIONS, { params });
  return response.data;
};

// Détails d’une promotion
export const fetchPromotionDetails = async (promotionId: string): Promise<Promotion> => {
  const response = await api.get(PROMOTION_ENDPOINTS.GET_PROMOTION(promotionId));
  return response.data;
};

// Créer une promotion (admin)
export const createPromotion = async (data: {
  product: string; // ID du CommercialProduct
  discountPercentage: number;
  oldPrice: number;
  newPrice: number;
  endTime: string; // Date ISO
}): Promise<Promotion> => {
  const response = await api.post(PROMOTION_ENDPOINTS.CREATE_PROMOTION, data);
  return response.data;
};

// Modifier une promotion (admin)
export const updatePromotion = async (
  promotionId: string,
  data: Partial<{
    product: string;
    discountPercentage: number;
    oldPrice: number;
    newPrice: number;
    endTime: string;
  }>
): Promise<Promotion> => {
  const response = await api.patch(PROMOTION_ENDPOINTS.UPDATE_PROMOTION(promotionId), data);
  return response.data;
};

// Supprimer une promotion (admin)
export const deletePromotion = async (promotionId: string): Promise<void> => {
  await api.delete(PROMOTION_ENDPOINTS.DELETE_PROMOTION(promotionId));
};