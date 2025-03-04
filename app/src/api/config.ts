export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/jwt/create/`,
  REFRESH: `${API_BASE_URL}/auth/jwt/refresh/`,
  VERIFY: `${API_BASE_URL}/auth/jwt/verify/`,
  LOGOUT: `${API_BASE_URL}/auth/logout/`,
  REGISTER: `${API_BASE_URL}/auth/register/`,
};