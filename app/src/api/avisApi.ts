// api/avisApi.ts
import api from "@/api/api"; // Instance centralisée avec gestion des tokens
import { AVIS_ENDPOINTS } from "@/api/config";
import { Avis } from "@/types/avis";

// Créer un nouvel avis
export const createAvis = async (data: {
  note: 1 | 2 | 3 | 4 | 5;
  commentaire?: string; // Optionnel car blank=True
  type: "reservation" | "product" | "service" | "pharmacy" | "commercial";
  product_id: string;
}): Promise<Avis> => {
  const response = await api.post(AVIS_ENDPOINTS.CREATE, data);
  return response.data;
};

// Mettre à jour un avis (créateur ou staff)
export const updateAvis = async (
  avisId: string,
  data: {
    note?: 1 | 2 | 3 | 4 | 5;
    commentaire?: string;
  }
): Promise<Avis> => {
  const response = await api.put(AVIS_ENDPOINTS.UPDATE(avisId), data);
  return response.data;
};

// Supprimer un avis (créateur ou staff)
export const deleteAvis = async (avisId: string): Promise<void> => {
  await api.delete(AVIS_ENDPOINTS.DELETE(avisId));
};