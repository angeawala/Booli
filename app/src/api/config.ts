export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// Authentification (inchangé)
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

// Base Products (avis)
export const BASE_PRODUCT_ENDPOINTS = {
  LIST_REVIEWS: (productId: string) => `${API_BASE_URL}/api/base/reviews/${productId}/`,
  CREATE_REVIEW: `${API_BASE_URL}/api/base/reviews/`,
  UPDATE_REVIEW: (reviewId: string) => `${API_BASE_URL}/api/base/reviews/${reviewId}/`,
  DELETE_REVIEW: (reviewId: string) => `${API_BASE_URL}/api/base/reviews/${reviewId}/`,
  GET_PRODUCT: (productId: string) => `${API_BASE_URL}/api/base-products/${productId}/`,
};

// Livres
export const BOOK_ENDPOINTS = {
  LIST_BOOKS: `${API_BASE_URL}/api/books/`,
  GET_BOOK: (id: string) => `${API_BASE_URL}/api/books/${id}/`,
  CREATE_BOOK: `${API_BASE_URL}/api/books/`,
  UPDATE_BOOK: (id: string) => `${API_BASE_URL}/api/books/${id}/`,
  DELETE_BOOK: (id: string) => `${API_BASE_URL}/api/books/${id}/`,
  LIST_CATEGORIES: `${API_BASE_URL}/api/books/categories/`,
  CREATE_CATEGORY: `${API_BASE_URL}/api/books/categories/`,
  UPDATE_CATEGORY: (id: string) => `${API_BASE_URL}/api/books/categories/${id}/`,
  DELETE_CATEGORY: (id: string) => `${API_BASE_URL}/api/books/categories/${id}/`,
};

// Produits commercial
export const COMMERCIAL_ENDPOINTS = {
  LIST_COMMERCIAL: `${API_BASE_URL}/api/commercial-products/`,
  GET_COMMERCIAL: (id: string) => `${API_BASE_URL}/api/commercial-products/${id}/`,
  CREATE_COMMERCIAL: `${API_BASE_URL}/api/commercial-products/`,
  UPDATE_COMMERCIAL: (id: string) => `${API_BASE_URL}/api/commercial-products/${id}/`,
  DELETE_COMMERCIAL: (id: string) => `${API_BASE_URL}/api/commercial-products/${id}/`,
  LIST_CATEGORIES: `${API_BASE_URL}/api/commercial-products/categories/`,
  CREATE_CATEGORY: `${API_BASE_URL}/api/commercial-products/categories/`,
  UPDATE_CATEGORY: (id: string) => `${API_BASE_URL}/api/commercial-products/categories/${id}/`,
  DELETE_CATEGORY: (id: string) => `${API_BASE_URL}/api/commercial-products/categories/${id}/`,
  LIST_SUBCATEGORIES: `${API_BASE_URL}/api/commercial-products/subcategories/`,
  CREATE_SUBCATEGORY: `${API_BASE_URL}/api/commercial-products/subcategories/`,
  GET_SUBCATEGORY: (id: string) => `${API_BASE_URL}/api/commercial-products/subcategories/${id}/`,
  UPDATE_SUBCATEGORY: (id: string) => `${API_BASE_URL}/api/commercial-products/subcategories/${id}/`,
  DELETE_SUBCATEGORY: (id: string) => `${API_BASE_URL}/api/commercial-products/subcategories/${id}/`,
};

// Produits pharmacie
export const PHARMACY_ENDPOINTS = {
  LIST_PHARMACY: `${API_BASE_URL}/api/pharmacy-products/`,
  GET_PHARMACY: (id: string) => `${API_BASE_URL}/api/pharmacy-products/${id}/`,
  CREATE_PHARMACY: `${API_BASE_URL}/api/pharmacy-products/`,
  UPDATE_PHARMACY: (id: string) => `${API_BASE_URL}/api/pharmacy-products/${id}/`,
  DELETE_PHARMACY: (id: string) => `${API_BASE_URL}/api/pharmacy-products/${id}/`,
  LIST_CATEGORIES: `${API_BASE_URL}/api/pharmacy-products/categories/`,
  CREATE_CATEGORY: `${API_BASE_URL}/api/pharmacy-products/categories/`,
  UPDATE_CATEGORY: (id: string) => `${API_BASE_URL}/api/pharmacy-products/categories/${id}/`,
  DELETE_CATEGORY: (id: string) => `${API_BASE_URL}/api/pharmacy-products/categories/${id}/`,
};

// Promotions (nouveau)
export const PROMOTION_ENDPOINTS = {
  LIST_PROMOTIONS: `${API_BASE_URL}/api/promotions/`,
  GET_PROMOTION: (id: string) => `${API_BASE_URL}/api/promotions/${id}/`,
  CREATE_PROMOTION: `${API_BASE_URL}/api/promotions/`,
  UPDATE_PROMOTION: (id: string) => `${API_BASE_URL}/api/promotions/${id}/`,
  DELETE_PROMOTION: (id: string) => `${API_BASE_URL}/api/promotions/${id}/`,
};

// Ventes en gros
export const ENGROS_ENDPOINTS = {
  LIST_ENGROS_PRODUCTS: `${API_BASE_URL}/api/engros-products/`,
  GET_ENGROS_PRODUCT: (id: string) => `${API_BASE_URL}/api/engros-products/${id}/`,
  CREATE_ENGROS_PRODUCT: `${API_BASE_URL}/api/engros-products/`,
  UPDATE_ENGROS_PRODUCT: (id: string) => `${API_BASE_URL}/api/engros-products/${id}/`,
  DELETE_ENGROS_PRODUCT: (id: string) => `${API_BASE_URL}/api/engros-products/${id}/`,
};

// Paniers
export const CART_ENDPOINTS = {
  GET_CART: `${API_BASE_URL}/api/cart/`,
  ADD_TO_CART: `${API_BASE_URL}/api/cart/add/`,
  UPDATE_CART_ITEM: (itemId: string) => `${API_BASE_URL}/api/cart/items/${itemId}/`,
  DELETE_CART_ITEM: (itemId: string) => `${API_BASE_URL}/api/cart/items/${itemId}/`,
  CLEAR_CART: `${API_BASE_URL}/api/cart/`,
};

// Commandes
export const ORDER_ENDPOINTS = {
  LIST_ORDERS: `${API_BASE_URL}/api/orders/`,
  GET_ORDER: (id: string) => `${API_BASE_URL}/api/orders/${id}/`,
  CREATE_ORDER: `${API_BASE_URL}/api/orders/create/`,
  UPDATE_ORDER: (id: string) => `${API_BASE_URL}/api/orders/${id}/`,
  DELETE_ORDER: (id: string) => `${API_BASE_URL}/api/orders/${id}/`,
};

// PDFs
export const PDF_ENDPOINTS = {
  STREAM_PDF: (id: string) => `${API_BASE_URL}/api/pdf/stream/${id}/`,
  DOWNLOAD_PDF: (id: string) => `${API_BASE_URL}/api/pdf/download/${id}/`,
  CREATE_PDF: `${API_BASE_URL}/api/pdf/stream/`,
  UPDATE_PDF: (id: string) => `${API_BASE_URL}/api/pdf/stream/${id}/`,
  DELETE_PDF: (id: string) => `${API_BASE_URL}/api/pdf/stream/${id}/`,
  ACCESS_PDF: (bookId: string) => `${API_BASE_URL}/api/pdf/access/${bookId}/`, // Ajouté pour fetchPDFAccess
};

// Abonnements
export const SUBSCRIPTION_ENDPOINTS = {
  GET_SUBSCRIPTION: `${API_BASE_URL}/api/subscription/`,
  ACTIVATE_SUBSCRIPTION: `${API_BASE_URL}/api/subscription/activate/`,
  UPDATE_SUBSCRIPTION: (id: string) => `${API_BASE_URL}/api/subscription/${id}/`,
  DELETE_SUBSCRIPTION: (id: string) => `${API_BASE_URL}/api/subscription/${id}/`,
};

// Tableaux de bord
export const DASHBOARD_ENDPOINTS = {
  CLIENT: `${API_BASE_URL}/api/dashboard/client/`,
  SELLER: `${API_BASE_URL}/api/dashboard/seller/`,
  VISITOR: `${API_BASE_URL}/api/dashboard/visitor/`,
  ADMIN: `${API_BASE_URL}/api/dashboard/admin/`,
};

// Gestion clientèle
export const CUSTOMER_ENDPOINTS = {
  LIST_CUSTOMERS: `${API_BASE_URL}/api/customers/`,
  GET_CUSTOMER: (id: string) => `${API_BASE_URL}/api/customers/${id}/`,
  UPDATE_CUSTOMER: (id: string) => `${API_BASE_URL}/api/customers/${id}/`,
  DELETE_CUSTOMER: (id: string) => `${API_BASE_URL}/api/customers/${id}/`,
  CONTACT_CUSTOMER: `${API_BASE_URL}/api/customers/contact/`,
};

// Gestion Agence
export const AGENCY_ENDPOINTS = {
  LIST_AGENCIES: `${API_BASE_URL}/api/agencies/`,
  GET_AGENCY: (agencyId: string) => `${API_BASE_URL}/api/agencies/${agencyId}/`,
  LIST_CATEGORIES: `${API_BASE_URL}/api/agencies/categories/`,
  GET_CATEGORY: (categoryId: string) => `${API_BASE_URL}/api/agencies/categories/${categoryId}/`,
};

export const SHOP_ENDPOINTS = {
  LIST_SHOPS: `${API_BASE_URL}/api/shops/`,
  GET_SHOP: (shopId: string) => `${API_BASE_URL}/api/shops/${shopId}/`,
};