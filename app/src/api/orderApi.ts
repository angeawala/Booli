import api from "@/api/api"; // Instance avec tokens
import { ORDER_ENDPOINTS } from "@/api/config";
import { Order } from "@/types/orders";

// Liste des commandes
export const fetchOrders = async (params: {
  status?: "pending" | "shipped" | "delivered" | "cancelled";
  total_min?: number;
  total_max?: number;
  created_at_min?: string;
  created_at_max?: string;
  ordering?: "total" | "-total" | "created_at" | "-created_at" | "status" | "-status";
}): Promise<Order[]> => {
  const response = await api.get(ORDER_ENDPOINTS.LIST_ORDERS, { params });
  return response.data;
};

// Détails d’une commande
export const fetchOrderDetails = async (orderId: string): Promise<Order> => {
  const response = await api.get(ORDER_ENDPOINTS.GET_ORDER(orderId));
  return response.data;
};

// Créer une commande
export const createOrder = async (): Promise<Order> => {
  const response = await api.post(ORDER_ENDPOINTS.CREATE_ORDER);
  return response.data;
};

// Modifier une commande (admin, ex. statut)
export const updateOrder = async (orderId: string, data: {
  status?: "pending" | "shipped" | "delivered" | "cancelled";
}): Promise<Order> => {
  const response = await api.patch(ORDER_ENDPOINTS.GET_ORDER(orderId), data);
  return response.data;
};

// Supprimer une commande (admin)
export const deleteOrder = async (orderId: string): Promise<void> => {
  await api.delete(ORDER_ENDPOINTS.GET_ORDER(orderId));
};