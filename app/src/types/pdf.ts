// types/pdf.ts
export interface BookPDF {
  id: string;
  book: string; // ID du livre associé
  is_free: boolean;
  file: string; // URL ou chemin du fichier PDF
}

export interface DownloadLink {
  id: string;
  user: string;
  book_pdf: string; // ID du BookPDF associé
  link: string;
  download_limit: number;
  downloads_used: number;
}

export interface CreatePDFPayload {
  bookId: string; // Changé 'book' en 'bookId' pour clarté
  is_free: boolean;
  file: string;
}

export interface UpdatePDFPayload {
  is_free?: boolean;
  file?: string;
}