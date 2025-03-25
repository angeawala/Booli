// api/shopApi.ts
import api from "@/api/api";
import { SHOP_ENDPOINTS } from "@/api/config";
import { Shop } from "@/types/shop";

// Liste de toutes les boutiques
export const fetchAllShops = async (): Promise<Shop[]> => {
  const response = await api.get(SHOP_ENDPOINTS.LIST_SHOPS);
  return response.data;
};

// Détails d'une boutique
export const fetchShopDetails = async (shopId: string): Promise<Shop> => {
  const response = await api.get(SHOP_ENDPOINTS.GET_SHOP(shopId));
  return response.data;
};

// Créer une boutique (admin)
export const createShop = async (data: {
  image: string;
  email: string;
  description: string;
  contact: string;
  address: string;
  categories: string[];
  subcategories: string[];
  created_by: string;
}): Promise<Shop> => {
  const response = await api.post(SHOP_ENDPOINTS.LIST_SHOPS, data);
  return response.data;
};

// Mettre à jour une boutique (admin)
export const updateShop = async (
  shopId: string,
  data: Partial<{
    image: string;
    email: string;
    description: string;
    contact: string;
    address: string;
    categories: string[];
    subcategories: string[];
  }>
): Promise<Shop> => {
  const response = await api.patch(SHOP_ENDPOINTS.GET_SHOP(shopId), data);
  return response.data;
};

// Supprimer une boutique (admin)
export const deleteShop = async (shopId: string): Promise<void> => {
  await api.delete(SHOP_ENDPOINTS.GET_SHOP(shopId));
};