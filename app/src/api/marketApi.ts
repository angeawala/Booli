import axios from "axios";
import { MARKET_ENDPOINTS } from "@/api/config";
import { store } from "@/store/store";
import { Supermarket, Shop, Company, Doctor, Mark, Stats } from "@/types/market";
import { BaseProduct } from "@/types/product";

// Configuration de l'instance axios
const api = axios.create({
  baseURL: MARKET_ENDPOINTS.SUPERMARKETS.LIST.split("/store/")[0], // Jusqu'à /store/
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

// Shops
export const getShops = async (): Promise<Shop[]> => {
  const response = await api.get(MARKET_ENDPOINTS.SHOPS.LIST);
  return response.data;
};

export const getShopById = async (id: string): Promise<Shop> => {
  const response = await api.get(MARKET_ENDPOINTS.SHOPS.DETAIL(id));
  return response.data;
};

export const createShop = async (data: Partial<Shop>): Promise<Shop> => {
  const response = await api.post(MARKET_ENDPOINTS.SHOPS.CREATE, data);
  return response.data;
};

export const updateShop = async (id: string, data: Partial<Shop>): Promise<Shop> => {
  const response = await api.put(MARKET_ENDPOINTS.SHOPS.UPDATE(id), data);
  return response.data;
};

export const deleteShop = async (id: string): Promise<void> => {
  await api.delete(MARKET_ENDPOINTS.SHOPS.DELETE(id));
};

export const getShopProducts = async (id: string): Promise<BaseProduct[]> => {
  const response = await api.get(MARKET_ENDPOINTS.SHOPS.PRODUCTS(id));
  return response.data;
};

export const getShopStats = async (id: string): Promise<Stats> => {
  const response = await api.get(MARKET_ENDPOINTS.SHOPS.STATS(id));
  return response.data;
};

// Companies
export const getCompanies = async (): Promise<Company[]> => {
  const response = await api.get(MARKET_ENDPOINTS.COMPANIES.LIST);
  return response.data;
};

export const getCompanyById = async (id: string): Promise<Company> => {
  const response = await api.get(MARKET_ENDPOINTS.COMPANIES.DETAIL(id));
  return response.data;
};

export const createCompany = async (data: Partial<Company>): Promise<Company> => {
  const response = await api.post(MARKET_ENDPOINTS.COMPANIES.CREATE, data);
  return response.data;
};

export const updateCompany = async (id: string, data: Partial<Company>): Promise<Company> => {
  const response = await api.put(MARKET_ENDPOINTS.COMPANIES.UPDATE(id), data);
  return response.data;
};

export const deleteCompany = async (id: string): Promise<void> => {
  await api.delete(MARKET_ENDPOINTS.COMPANIES.DELETE(id));
};

export const getCompanyProducts = async (id: string): Promise<BaseProduct[]> => {
  const response = await api.get(MARKET_ENDPOINTS.COMPANIES.PRODUCTS(id));
  return response.data;
};

export const getCompanyStats = async (id: string): Promise<Stats> => {
  const response = await api.get(MARKET_ENDPOINTS.COMPANIES.STATS(id));
  return response.data;
};

// Doctors
export const getDoctors = async (): Promise<Doctor[]> => {
  const response = await api.get(MARKET_ENDPOINTS.DOCTORS.LIST);
  return response.data;
};

export const getDoctorById = async (id: string): Promise<Doctor> => {
  const response = await api.get(MARKET_ENDPOINTS.DOCTORS.DETAIL(id));
  return response.data;
};

export const createDoctor = async (data: Partial<Doctor>): Promise<Doctor> => {
  const response = await api.post(MARKET_ENDPOINTS.DOCTORS.CREATE, data);
  return response.data;
};

export const updateDoctor = async (id: string, data: Partial<Doctor>): Promise<Doctor> => {
  const response = await api.put(MARKET_ENDPOINTS.DOCTORS.UPDATE(id), data);
  return response.data;
};

export const deleteDoctor = async (id: string): Promise<void> => {
  await api.delete(MARKET_ENDPOINTS.DOCTORS.DELETE(id));
};

export const getDoctorProducts = async (id: string): Promise<BaseProduct[]> => {
  const response = await api.get(MARKET_ENDPOINTS.DOCTORS.PRODUCTS(id));
  return response.data;
};

export const getDoctorStats = async (id: string): Promise<Stats> => {
  const response = await api.get(MARKET_ENDPOINTS.DOCTORS.STATS(id));
  return response.data;
};

// Marks
export const getMarks = async (): Promise<Mark[]> => {
  const response = await api.get(MARKET_ENDPOINTS.MARKS.LIST);
  return response.data;
};

export const getMarkById = async (id: string): Promise<Mark> => {
  const response = await api.get(MARKET_ENDPOINTS.MARKS.DETAIL(id));
  return response.data;
};

export const createMark = async (data: Partial<Mark>): Promise<Mark> => {
  const response = await api.post(MARKET_ENDPOINTS.MARKS.CREATE, data);
  return response.data;
};

export const updateMark = async (id: string, data: Partial<Mark>): Promise<Mark> => {
  const response = await api.put(MARKET_ENDPOINTS.MARKS.UPDATE(id), data);
  return response.data;
};

export const deleteMark = async (id: string): Promise<void> => {
  await api.delete(MARKET_ENDPOINTS.MARKS.DELETE(id));
};

export const getMarkProducts = async (id: string): Promise<BaseProduct[]> => {
  const response = await api.get(MARKET_ENDPOINTS.MARKS.PRODUCTS(id));
  return response.data;
};

export const getMarkStats = async (id: string): Promise<Stats> => {
  const response = await api.get(MARKET_ENDPOINTS.MARKS.STATS(id));
  return response.data;
};

// Supermarkets
export const getSupermarkets = async (): Promise<Supermarket[]> => {
  const response = await api.get(MARKET_ENDPOINTS.SUPERMARKETS.LIST);
  return response.data;
};

export const getSupermarketById = async (id: string): Promise<Supermarket> => {
  const response = await api.get(MARKET_ENDPOINTS.SUPERMARKETS.DETAIL(id));
  return response.data;
};

export const createSupermarket = async (data: Partial<Supermarket>): Promise<Supermarket> => {
  const response = await api.post(MARKET_ENDPOINTS.SUPERMARKETS.CREATE, data);
  return response.data;
};

export const updateSupermarket = async (id: string, data: Partial<Supermarket>): Promise<Supermarket> => {
  const response = await api.put(MARKET_ENDPOINTS.SUPERMARKETS.UPDATE(id), data);
  return response.data;
};

export const deleteSupermarket = async (id: string): Promise<void> => {
  await api.delete(MARKET_ENDPOINTS.SUPERMARKETS.DELETE(id));
};

export const getSupermarketProducts = async (id: string): Promise<BaseProduct[]> => {
  const response = await api.get(MARKET_ENDPOINTS.SUPERMARKETS.PRODUCTS(id));
  return response.data;
};

export const getSupermarketStats = async (id: string): Promise<Stats> => {
  const response = await api.get(MARKET_ENDPOINTS.SUPERMARKETS.STATS(id));
  return response.data;
};

