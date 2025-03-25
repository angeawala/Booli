import api from "@/api/api"; // Instance avec tokens
import { BASE_PRODUCT_ENDPOINTS } from "@/api/config";
import { Review , BaseProduct} from "@/types/base_products";


// Liste des avis d’un produit
export const fetchReviews = async (productId: string): Promise<Review[]> => {
  const response = await api.get(BASE_PRODUCT_ENDPOINTS.LIST_REVIEWS(productId));
  return response.data;
};

// Ajouter un avis
export const createReview = async (data: {
  productId: string;
  note: number;
  commentaire: string;
}): Promise<Review> => {
  const response = await api.post(BASE_PRODUCT_ENDPOINTS.CREATE_REVIEW, data);
  return response.data;
};

// Modifier un avis
export const updateReview = async (reviewId: string, data: {
  note?: number;
  commentaire?: string;
}): Promise<Review> => {
  const response = await api.patch(`${BASE_PRODUCT_ENDPOINTS.CREATE_REVIEW}${reviewId}/`, data);
  return response.data;
};

// Supprimer un avis
export const deleteReview = async (reviewId: string): Promise<void> => {
  await api.delete(`${BASE_PRODUCT_ENDPOINTS.CREATE_REVIEW}${reviewId}/`);
};

export const fetchProductDetails = async (productId: string): Promise<BaseProduct> => {
    const response = await api.get(BASE_PRODUCT_ENDPOINTS.GET_PRODUCT(productId));
    return response.data;
  };