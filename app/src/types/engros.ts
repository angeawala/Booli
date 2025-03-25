// types/engros.ts
import { BaseProduct } from "@/types/base_products";
import { Variant } from "@/types/commercial_products";

export interface EngrosProduct extends BaseProduct {
  commercialProduct: string; // ID du CommercialProduct associé
  pricingTiers: { minQuantity: number; prixEngros: number }[]; // Prix dégressifs
  variants?: Variant[]; // Hérité de CommercialProduct (optionnel)
}

export interface CreateEngrosProductPayload {
  commercialProduct: string;
  name: string;
  image: string;
  description: string;
  prix_normal: number;
  prix_reduit?: number;
  stock: number;
  pricingTiers: { minQuantity: number; prixEngros: number }[];
  variants?: Omit<Variant, "id" | "product">[];
}

export interface UpdateEngrosProductPayload {
  commercialProduct?: string;
  name?: string;
  image?: string;
  description?: string;
  prix_normal?: number;
  prix_reduit?: number;
  stock?: number;
  pricingTiers?: { minQuantity: number; prixEngros: number }[];
  variants?: Omit<Variant, "id" | "product">[];
}