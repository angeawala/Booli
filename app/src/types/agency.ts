// types/agency.ts
export interface Agency {
  id: string;
  name: string;
  description: string;
  image: string;
  services: string;
  address: string;
  phone: string;
  hours: string;
  email: string;
  website: string;
  categoryId: string;
  type: "Entreprise" | "Agence" | "ONG";
  domain: "Voyage" | "Marketing" | "Événementiel" | "Autre";
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}