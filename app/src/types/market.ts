import { Category } from "@/types/category";

export interface Supermarket {
  id: string;
  image: string | null;
  email: string;
  description: string;
  contact: string;
  address: string;
  average_rating: number;
  rating_count: number;
  categories: Category[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Shop {
  id: string;
  image: string | null;
  email: string;
  description: string;
  contact: string;
  address: string;
  average_rating: number;
  rating_count: number;
  categories: Category[];
  subcategories: Category[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  image: string | null;
  email: string;
  description: string;
  contact: string;
  address: string;
  average_rating: number;
  rating_count: number;
  categories: Category[];
  website: string;
  purpose: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Doctor {
  id: string;
  image: string | null;
  email: string;
  description: string;
  contact: string;
  address: string;
  average_rating: number;
  rating_count: number;
  categories: Category[];
  specialty: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Mark {
  id: string;
  image: string | null;
  email: string;
  description: string;
  contact: string;
  address: string;
  average_rating: number;
  rating_count: number;
  categories: Category[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

// Type pour les statistiques (remplace any)
export interface Stats {
  [key: string]: number | string | null; // Flexible pour les stats dynamiques
}