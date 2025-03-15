// Types pour les catégories et sous-catégories
export interface SubCategory {
    id: string;
    name: string;
    image: string | null; // URL de l'image ou null si non défini
    category: number; // ID de la catégorie parente
    created_by: number; // ID de l'utilisateur
    created_at: string; // Date ISO (ex: "2023-01-01T12:00:00Z")
    updated_at: string; // Date ISO
  }
  
  export interface Category {
    id: string;
    name: string;
    category_type: string; // À préciser si tu as une liste de choix dans ton modèle
    is_non_tech: boolean;
    image: string | null; // URL de l'image ou null
    icon: string | null; // URL de l'icône ou null
    subcategories: SubCategory[]; // Liste de sous-catégories
    created_by: number; // ID de l'utilisateur
    created_at: string; // Date ISO
    updated_at: string; // Date ISO
  }
  
