// api/subscriptionApi.ts
import api from "@/api/api";
import { SUBSCRIPTION_ENDPOINTS } from "@/api/config";
import { Subscription } from "@/types/subscription";

// Récupérer le statut de l’abonnement
export const fetchSubscription = async (): Promise<Subscription> => {
  const response = await api.get(SUBSCRIPTION_ENDPOINTS.GET_SUBSCRIPTION);
  return response.data;
};

// Activer un abonnement
export const activateSubscription = async (data: {
  code: string; // Entrée comme "code", mais retourne "code_verification"
  device_token: string;
}): Promise<Subscription> => {
  const response = await api.post(SUBSCRIPTION_ENDPOINTS.ACTIVATE_SUBSCRIPTION, data);
  return response.data;
};

// Modifier un abonnement (admin)
export const updateSubscription = async (
  subscriptionId: string,
  data: { is_active?: boolean; end_date?: string; device_token?: string }
): Promise<Subscription> => {
  const response = await api.patch(SUBSCRIPTION_ENDPOINTS.UPDATE_SUBSCRIPTION(subscriptionId), data);
  return response.data;
};

// Supprimer un abonnement (admin)
export const deleteSubscription = async (subscriptionId: string): Promise<void> => {
  await api.delete(SUBSCRIPTION_ENDPOINTS.DELETE_SUBSCRIPTION(subscriptionId));
};