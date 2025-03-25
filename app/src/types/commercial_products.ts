// types/commercial_products.ts
import { BaseProduct } from "@/types/base_products";

// Interface principale pour un produit commercial
export interface CommercialProduct extends BaseProduct {
  category: string; // ID de CommercialCategory
  subCategory?: string; // ID de CommercialSubCategory (optionnel)
  caracteristiques: Record<string, string | number | boolean>;
  variants: Variant[];
  media: Media;
}

// Interface pour une variante
export interface Variant {
  id: string;
  product: string;
  couleur: string;
  taille: string;
  stock: number;
  prix_ajuste: number;
}

// Interface pour les médias
export interface Media {
  id: string;
  product: string;
  video?: string;
  images: (string | null)[];
}

// Interface pour une catégorie commerciale
export interface CommercialCategory {
  id: string;
  name: string;
  description: string;
  is_tech: boolean;
  image: string;
  icon: string; // Classe FontAwesome
}

// Interface pour une sous-catégorie commerciale
export interface CommercialSubCategory {
  id: string;
  name: string;
  description: string;
  category: string; // Clé étrangère vers CommercialCategory (ID)
  image?: string; // Optionnel
}

// Payload pour créer un produit commercial
export interface CreateCommercialProductPayload {
  name: string;
  image: string;
  description: string;
  prix_normal: number;
  prix_reduit?: number;
  stock: number;
  category: string;
  subCategory?: string; // Ajouté
  caracteristiques: Record<string, string | number | boolean>;
  variants?: Omit<Variant, "id" | "product">[];
  media?: Omit<Media, "id" | "product">;
}

// Payload pour mettre à jour un produit commercial
export interface UpdateCommercialProductPayload {
  name?: string;
  image?: string;
  description?: string;
  prix_normal?: number;
  prix_reduit?: number;
  stock?: number;
  category?: string;
  subCategory?: string; // Ajouté
  caracteristiques?: Record<string, string | number | boolean>;
  variants?: Omit<Variant, "id" | "product">[];
  media?: Omit<Media, "id" | "product">;
}

// Payload pour créer une sous-catégorie
export interface CreateCommercialSubCategoryPayload {
  name: string;
  description: string;
  category: string; // ID de CommercialCategory
  image?: string;
}

// Payload pour mettre à jour une sous-catégorie
export interface UpdateCommercialSubCategoryPayload {
  name?: string;
  description?: string;
  category?: string; // ID de CommercialCategory
  image?: string;
}