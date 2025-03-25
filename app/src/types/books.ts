// types/books.ts (alternative)
import { BaseProduct } from "@/types/base_products";
import { BookPDF } from "@/types/pdf";

export interface Book extends BaseProduct {
  category: string;
  genre: string;
  editeur: string;
  parution: string;
  pages: number;
  langue: string;
  format: string;
  has_pdf: boolean; // Toujours utile pour indiquer la présence d’un PDF
  pdf?: BookPDF; // Référence directe à BookPDF
}

export interface BookCategory {
  id: string;
  name: string;
  description: string;
}

export interface CreateBookPayload {
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
}

export interface UpdateBookPayload {
  name?: string;
  image?: string;
  description?: string;
  prix_normal?: number;
  prix_reduit?: number;
  stock?: number;
  category?: string;
  genre?: string;
  editeur?: string;
  parution?: string;
  pages?: number;
  langue?: string;
  format?: string;
}