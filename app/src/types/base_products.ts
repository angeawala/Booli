export interface BaseProduct {
    id: string;
    name: string;
    image: string;
    description: string;
    prix_normal: number;
    prix_reduit?: number;
    stock: number;
    reviews: Review[];
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Review {
    id: string;
    product: string;
    user: string;
    note: number;
    commentaire: string;
    created_at: string;
  }