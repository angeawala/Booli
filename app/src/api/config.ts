export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/jwt/create/`,
  REFRESH: `${API_BASE_URL}/auth/jwt/refresh/`,
  VERIFY: `${API_BASE_URL}/auth/jwt/verify/`,
  LOGOUT: `${API_BASE_URL}/auth/logout/`,
  REGISTER: `${API_BASE_URL}/auth/register/`,
  CHECK_USER: `${API_BASE_URL}/auth/check-user/`,
  GENERATE_2FA: `${API_BASE_URL}/auth/generate-2fa-token/`,
  VERIFY_2FA: `${API_BASE_URL}/auth/verify-2fa/`,
  ACTIVATE: `${API_BASE_URL}/auth/activate/`,
  RESEND_ACTIVATION: `${API_BASE_URL}/auth/activate/resend/`,
  PASSWORD_RESET_REQUEST: `${API_BASE_URL}/auth/password/reset/request/`,
  PASSWORD_RESET_CONFIRM: `${API_BASE_URL}/auth/password/reset/`,
};
export const CATEGORY_ENDPOINTS = {
  LIST: `${API_BASE_URL}/store/categories/`,
  SEARCH: `${API_BASE_URL}/store/categories/search/`,
  CREATE: `${API_BASE_URL}/store/categories/create/`,
  UPDATE: (categoryId: string) => `${API_BASE_URL}/store/categories/update/${categoryId}/`,
  CREATE_SUBCATEGORY: `${API_BASE_URL}/store/subcategories/create/`,
  UPDATE_SUBCATEGORY: (subcategoryId: string) => `${API_BASE_URL}/store/subcategories/update/${subcategoryId}/`,
};
export const AVIS_ENDPOINTS = {
  CREATE: `${API_BASE_URL}/avis/create/`,
  UPDATE: (avisId: string) => `${API_BASE_URL}/avis/update/${avisId}/`,
  DELETE: (avisId: string) => `${API_BASE_URL}/avis/delete/${avisId}/`,
};
export const PRODUCT_ENDPOINTS = {
  CREATE: `${API_BASE_URL}/store/product/create/`,
};
export const LIBRARY_ENDPOINTS = {
  LIST_BOOKS: `${API_BASE_URL}/product/books/`,
  GET_BOOK: (bookId: string) => `${API_BASE_URL}/product/books/${bookId}/`,
  CREATE_SUBSCRIPTION: `${API_BASE_URL}/product/subscriptions/create/`,
  ACCESS_PDF: (bookId: string) => `${API_BASE_URL}/product/books/${bookId}/pdf/access/`,
  PREVIEW_PDF: (bookId: string) => `${API_BASE_URL}/product/books/${bookId}/pdf/preview/`,
  DOWNLOAD_FREE_PDF: (bookId: string) => `${API_BASE_URL}/product/books/${bookId}/pdf/download/`,
};
export const PHARMACOPE_ENDPOINTS = {
  LIST_PRODUCTS: `${API_BASE_URL}/product/pharma/`,
  GET_PRODUCT: (productId: string) => `${API_BASE_URL}/product/pharma/${productId}/`,
};
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
