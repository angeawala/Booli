export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// Endpoints pour l'authentification
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/jwt/create/`,
  REFRESH: `${API_BASE_URL}/auth/jwt/refresh/`,
  VERIFY: `${API_BASE_URL}/auth/jwt/verify/`,
  LOGOUT: `${API_BASE_URL}/auth/logout/`,
  REGISTER: `${API_BASE_URL}/auth/register/`,
};

// Endpoints pour les catégories et sous-catégories
export const CATEGORY_ENDPOINTS = {
  LIST: `${API_BASE_URL}/store/categories/`,
  PRODUCTS: (categoryId: string) => `${API_BASE_URL}/store/categories/${categoryId}/products/`,
  SEARCH: `${API_BASE_URL}/store/categories/search/`,
  CREATE: `${API_BASE_URL}/store/categories/create/`,
  UPDATE: (categoryId: string) => `${API_BASE_URL}/store/categories/${categoryId}/update/`,
  SUBCATEGORY_PRODUCTS: (subcategoryId: string) =>
    `${API_BASE_URL}/store/subcategories/${subcategoryId}/products/`,
  CREATE_SUBCATEGORY: `${API_BASE_URL}/store/subcategories/create/`,
  UPDATE_SUBCATEGORY: (subcategoryId: string) =>
    `${API_BASE_URL}/store/subcategories/${subcategoryId}/update/`,
};

// Endpoints pour le marché
export const MARKET_ENDPOINTS = {
  SHOPS: {
    LIST: `${API_BASE_URL}/store/shops/`,
    DETAIL: (id: string) => `${API_BASE_URL}/store/shops/${id}/`,
    CREATE: `${API_BASE_URL}/store/shops/`, // POST pour création
    UPDATE: (id: string) => `${API_BASE_URL}/store/shops/${id}/`, // PUT pour mise à jour
    DELETE: (id: string) => `${API_BASE_URL}/store/shops/${id}/`, // DELETE
    PRODUCTS: (id: string) => `${API_BASE_URL}/store/shops/${id}/products/`,
    STATS: (id: string) => `${API_BASE_URL}/store/shops/${id}/stats/`,
  },
  COMPANIES: {
    LIST: `${API_BASE_URL}/store/companies/`,
    DETAIL: (id: string) => `${API_BASE_URL}/store/companies/${id}/`,
    CREATE: `${API_BASE_URL}/store/companies/`,
    UPDATE: (id: string) => `${API_BASE_URL}/store/companies/${id}/`,
    DELETE: (id: string) => `${API_BASE_URL}/store/companies/${id}/`,
    PRODUCTS: (id: string) => `${API_BASE_URL}/store/companies/${id}/products/`,
    STATS: (id: string) => `${API_BASE_URL}/store/companies/${id}/stats/`,
  },
  DOCTORS: {
    LIST: `${API_BASE_URL}/store/doctors/`,
    DETAIL: (id: string) => `${API_BASE_URL}/store/doctors/${id}/`,
    CREATE: `${API_BASE_URL}/store/doctors/`,
    UPDATE: (id: string) => `${API_BASE_URL}/store/doctors/${id}/`,
    DELETE: (id: string) => `${API_BASE_URL}/store/doctors/${id}/`,
    PRODUCTS: (id: string) => `${API_BASE_URL}/store/doctors/${id}/products/`,
    STATS: (id: string) => `${API_BASE_URL}/store/doctors/${id}/stats/`,
  },
  MARKS: {
    LIST: `${API_BASE_URL}/store/marks/`,
    DETAIL: (id: string) => `${API_BASE_URL}/store/marks/${id}/`,
    CREATE: `${API_BASE_URL}/store/marks/`,
    UPDATE: (id: string) => `${API_BASE_URL}/store/marks/${id}/`,
    DELETE: (id: string) => `${API_BASE_URL}/store/marks/${id}/`,
    PRODUCTS: (id: string) => `${API_BASE_URL}/store/marks/${id}/products/`,
    STATS: (id: string) => `${API_BASE_URL}/store/marks/${id}/stats/`,
  },
  SUPERMARKETS: {
    LIST: `${API_BASE_URL}/store/supermarkets/`,
    DETAIL: (id: string) => `${API_BASE_URL}/store/supermarkets/${id}/`,
    CREATE: `${API_BASE_URL}/store/supermarkets/`,
    UPDATE: (id: string) => `${API_BASE_URL}/store/supermarkets/${id}/`,
    DELETE: (id: string) => `${API_BASE_URL}/store/supermarkets/${id}/`,
    PRODUCTS: (id: string) => `${API_BASE_URL}/store/supermarkets/${id}/products/`,
    STATS: (id: string) => `${API_BASE_URL}/store/supermarkets/${id}/stats/`,
  },
};