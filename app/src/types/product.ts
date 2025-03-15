// Type pour les produits (basé sur BaseProductSerializer)
export interface BaseProduct {
    id: number;
    name: string;
    category?: number; // ID de la catégorie (optionnel si lié à subcategory)
    subcategory?: number; // ID de la sous-catégorie (optionnel si lié à category)
    price?: number; // À confirmer selon ton modèle
    created_at: string;
    image?: string;
  }