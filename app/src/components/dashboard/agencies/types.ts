export interface Agency {
  id: string;
  name: string;
  description: string;
  image: string;
  services: Service[];
  opportunities: Opportunity[];
  address: string;
  phone: string;
  hours: string;
  email: string;
  website: string;
  categoryId: string; // Référence à une catégorie
  type: "Entreprise" | "Agence" | "ONG";
  domain: "Voyage" | "Marketing" | "Événementiel" | "Autre";
  creatorEmail: string; // Email du créateur (staff ou utilisateur)
  creatorType: "staff" | "user"; // Type de créateur
  isApproved: boolean; // Statut de confirmation
  createdAt: string;
  lastUpdated: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string; // Format: "100 FCFA par jour" ou "1000 FCFA minimum par mois"
  contact: string; // Numéro de contact pour ce service
  descriptionUrl: string; // URL pour plus de détails sur le service
  descriptionImage: string; // Image illustrative du service
  createdAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: "Job" | "Partnership" | "Other"; // Type d'opportunité
  endDate: string; // Date de fin de l'opportunité
  subscriptionLink?: string; // Lien de souscription (optionnel)
  contactNumber: string; // Numéro de contact
  createdAt: string;
}