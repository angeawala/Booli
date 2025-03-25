// api/bookApi.ts
import api from "@/api/api"; // Instance avec tokens
import { BOOK_ENDPOINTS } from "@/api/config";
import { Book, BookCategory } from "@/types/books";

// Liste des livres (paginée avec filtres, tris, recherche)
export const fetchBooks = async (params: {
  q?: string;
  category?: string;
  genre?: string;
  editeur?: string;
  langue?: string;
  format?: string;
  prix_normal_min?: number;
  prix_normal_max?: number;
  prix_reduit_min?: number;
  prix_reduit_max?: number;
  stock?: number;
  has_pdf?: boolean;
  ordering?: "name" | "-name" | "prix_normal" | "-prix_normal" | "prix_reduit" | "-prix_reduit" | "parution" | "-parution" | "pages" | "-pages" | "created_at" | "-created_at";
  limit?: number;
  offset?: number;
}): Promise<{ results: Book[]; count: number; next: string | null; previous: string | null }> => {
  const response = await api.get("/api/books/", { params });
  return response.data; // Backend doit inclure pdf: BookPDF dans chaque Book si disponible
};

// Détails d’un livre
export const fetchBookDetails = async (bookId: string): Promise<Book> => {
  const response = await api.get(BOOK_ENDPOINTS.GET_BOOK(bookId));
  return response.data; // Backend doit inclure pdf: BookPDF si disponible
};

// Créer un livre (admin)
export const createBook = async (data: {
  name: string;
  image: string;
  description: string;
  prix_normal: number;
  prix_reduit?: number;
  stock: number;
  category: string;
  genre: string;
  editeur: string;
  parution: string;
  pages: number;
  langue: string;
  format: string;
}): Promise<Book> => {
  const response = await api.post(BOOK_ENDPOINTS.LIST_BOOKS, data);
  return response.data; // Backend peut inclure pdf: null ou BookPDF si créé
};

// Modifier un livre (admin)
export const updateBook = async (
  bookId: string,
  data: Partial<{
    name: string;
    image: string;
    description: string;
    prix_normal: number;
    prix_reduit?: number;
    stock: number;
    category: string;
    genre: string;
    editeur: string;
    parution: string;
    pages: number;
    langue: string;
    format: string;
  }>
): Promise<Book> => {
  const response = await api.patch(BOOK_ENDPOINTS.GET_BOOK(bookId), data);
  return response.data; // Backend doit inclure pdf: BookPDF si disponible
};

// Supprimer un livre (admin)
export const deleteBook = async (bookId: string): Promise<void> => {
  await api.delete(BOOK_ENDPOINTS.GET_BOOK(bookId));
};

// Liste des catégories de livres
export const fetchBookCategories = async (): Promise<BookCategory[]> => {
  const response = await api.get(BOOK_ENDPOINTS.LIST_CATEGORIES);
  return response.data;
};

// Créer une catégorie (admin)
export const createBookCategory = async (data: {
  name: string;
  description: string;
}): Promise<BookCategory> => {
  const response = await api.post(BOOK_ENDPOINTS.LIST_CATEGORIES, data);
  return response.data;
};

// Modifier une catégorie (admin)
export const updateBookCategory = async (
  categoryId: string,
  data: { name?: string; description?: string }
): Promise<BookCategory> => {
  const response = await api.patch(`${BOOK_ENDPOINTS.LIST_CATEGORIES}${categoryId}/`, data);
  return response.data;
};

// Supprimer une catégorie (admin)
export const deleteBookCategory = async (categoryId: string): Promise<void> => {
  await api.delete(`${BOOK_ENDPOINTS.LIST_CATEGORIES}${categoryId}/`);
};