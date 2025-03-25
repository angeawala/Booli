// types/shop.ts
export interface Shop {
    id: string; // ID simple (ex. "1"), pas de préfixe "shops/"
    image: string;
    email: string;
    description: string;
    contact: string;
    address: string;
    average_rating: number; // Moyenne des évaluations
    rating_count: number; // Nombre d'évaluations
    categories: string[]; // Liste d'IDs ou noms de catégories
    subcategories: string[]; // Liste d'IDs ou noms de sous-catégories
    created_by: string; // ID de l'utilisateur qui a créé la boutique
    created_at: string; // Date ISO
    updated_at: string; // Date ISO
  }