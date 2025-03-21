// api/libraryApi.ts
import api from "@/api/api"; // Instance avec tokens
import { LIBRARY_ENDPOINTS } from "@/api/config";
import { Book, Abonnement } from "@/types/library";

// Liste des livres (paginée)
export const fetchBooks = async (params: {
  q?: string;
  genre?: string;
  is_free?: boolean;
  ordering?: string;
  limit?: number;
  offset?: number;
}): Promise<{ results: Book[]; count: number; next: string | null; previous: string | null }> => {
  const response = await api.get(LIBRARY_ENDPOINTS.LIST_BOOKS, { params });
  return response.data;
};

// Détails d’un livre
export const fetchBookDetails = async (bookId: string): Promise<Book> => {
  const response = await api.get(LIBRARY_ENDPOINTS.GET_BOOK(bookId));
  return response.data;
};

// Créer un abonnement
export const createSubscription = async (data: {
  plan_id: string;
  payment_confirmed: boolean;
}): Promise<Abonnement> => {
  const response = await api.post(LIBRARY_ENDPOINTS.CREATE_SUBSCRIPTION, data);
  return response.data;
};

// Accéder au PDF (achat ou abonnement)
export const accessPDF = async (bookId: string, data: {
  code?: string;
  payment_confirmed?: boolean;
}): Promise<{ pdf_url: string }> => {
  const response = await api.post(LIBRARY_ENDPOINTS.ACCESS_PDF(bookId), data);
  return response.data;
};

// Prévisualiser un PDF (abonnement sécurisé)
export const previewPDF = async (bookId: string, data: {
  code: string;
  device_token: string;
}): Promise<{ preview_url: string; subscription_code: string }> => {
  const response = await api.post(LIBRARY_ENDPOINTS.PREVIEW_PDF(bookId), data);
  return response.data;
};

// Télécharger un PDF gratuit
export const downloadFreePDF = async (bookId: string): Promise<{ download_url: string }> => {
  const response = await api.get(LIBRARY_ENDPOINTS.DOWNLOAD_FREE_PDF(bookId));
  return response.data;
};

// Signaler la fin de la lecture (pour invalider le cache appareil)
export const endPreview = async (bookId: string, subscriptionCode: string): Promise<void> => {
  // À implémenter si vous ajoutez une vue backend pour ça
  // Exemple : await api.post(`${LIBRARY_ENDPOINTS.PREVIEW_PDF(bookId)}/end/`, { code: subscriptionCode });
  console.log(`Fin de lecture signalée pour ${bookId} avec code ${subscriptionCode}`);
};