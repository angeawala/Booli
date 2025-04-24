export interface User {
  email: string; // Email as the unique identifier
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: 'Homme' | 'Femme' | 'Autre';
  twoFactorEnabled: boolean;
  profession: string;
  pays: string;
  ville: string;
  adresse: string;
  numero: string;
  role: 'client' | 'vendor' | 'staff';
  isActive: boolean;
  createdAt: string; // Date de création du compte
  lastLogin: string; // Dernière connexion
  totalLogins: number; // Nombre total de connexions
}