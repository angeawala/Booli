import api from "@/api/api";
import { DASHBOARD_ENDPOINTS } from "@/api/config";
import { ClientDashboard, SellerDashboard, VisitorDashboard, AdminDashboard } from "@/types/dashboard";

export const fetchClientDashboard = async (): Promise<ClientDashboard> => {
  const response = await api.get(DASHBOARD_ENDPOINTS.CLIENT);
  return response.data;
};

export const fetchSellerDashboard = async (): Promise<SellerDashboard> => {
  const response = await api.get(DASHBOARD_ENDPOINTS.SELLER);
  return response.data;
};

export const fetchVisitorDashboard = async (): Promise<VisitorDashboard> => {
  const response = await api.get(DASHBOARD_ENDPOINTS.VISITOR);
  return response.data;
};

export const fetchAdminDashboard = async (): Promise<AdminDashboard> => {
  const response = await api.get(DASHBOARD_ENDPOINTS.ADMIN);
  return response.data;
};