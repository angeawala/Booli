// api/pdfApi.ts
import api from "@/api/api"; // Instance avec tokens
import { PDF_ENDPOINTS } from "@/api/config";
import { BookPDF, CreatePDFPayload, UpdatePDFPayload } from "@/types/pdf";

// Stream un PDF
export const streamPDF = async (pdfId: string): Promise<{ pdf_url: string }> => {
  const response = await api.get(PDF_ENDPOINTS.STREAM_PDF(pdfId));
  return response.data; // Retourne { pdf_url: string }
};

// Télécharger un PDF
export const downloadPDF = async (pdfId: string): Promise<{ download_url: string }> => {
  const response = await api.get(PDF_ENDPOINTS.DOWNLOAD_PDF(pdfId));
  return response.data; // Retourne { download_url: string }
};

// Récupérer l’URL du PDF pour accès (utilisé par accessPDF)
export const fetchPDFAccess = async (bookId: string, subscriptionCode?: string): Promise<string> => {
  const response = await api.get(PDF_ENDPOINTS.ACCESS_PDF(bookId), {
    headers: subscriptionCode ? { "X-Subscription-Code": subscriptionCode } : undefined,
  });
  return response.data.pdf_url; // Retourne l’URL directe du PDF
};

// Créer un PDF (admin)
export const createPDF = async (data: CreatePDFPayload): Promise<BookPDF> => {
  const response = await api.post(PDF_ENDPOINTS.CREATE_PDF, data); // Utilise CREATE_PDF
  return response.data;
};

// Modifier un PDF (admin)
export const updatePDF = async (pdfId: string, data: UpdatePDFPayload): Promise<BookPDF> => {
  const response = await api.patch(PDF_ENDPOINTS.UPDATE_PDF(pdfId), data);
  return response.data;
};

// Supprimer un PDF (admin)
export const deletePDF = async (pdfId: string): Promise<void> => {
  await api.delete(PDF_ENDPOINTS.DELETE_PDF(pdfId));
};