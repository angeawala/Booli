import api from "@/api/api"; // Instance avec tokens
import { CUSTOMER_ENDPOINTS } from "@/api/config";
import { Customer } from "@/types/customer";

// Liste des clients
export const fetchCustomers = async (params: {
  orders_count_min?: number;
  orders_count_max?: number;
  created_at_min?: string;
  created_at_max?: string;
  ordering?: "orders_count" | "-orders_count" | "created_at" | "-created_at";
  limit?: number;
  offset?: number;
}): Promise<{ results: Customer[]; count: number; next: string | null; previous: string | null }> => {
  const response = await api.get(CUSTOMER_ENDPOINTS.LIST_CUSTOMERS, { params });
  return response.data;
};

// Détails d’un client
export const fetchCustomerDetails = async (customerId: string): Promise<Customer> => {
  const response = await api.get(CUSTOMER_ENDPOINTS.GET_CUSTOMER(customerId));
  return response.data;
};

// Modifier un client (admin)
export const updateCustomer = async (customerId: string, data: {
  phone?: string;
  address?: string;
}): Promise<Customer> => {
  const response = await api.patch(CUSTOMER_ENDPOINTS.GET_CUSTOMER(customerId), data);
  return response.data;
};

// Supprimer un client (admin)
export const deleteCustomer = async (customerId: string): Promise<void> => {
  await api.delete(CUSTOMER_ENDPOINTS.GET_CUSTOMER(customerId));
};

// Contacter un client
export const contactCustomer = async (data: {
  customerId: string;
  message: string;
}): Promise<void> => {
  await api.post(CUSTOMER_ENDPOINTS.CONTACT_CUSTOMER, data);
};