import { User } from './types';

export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const initializeUsers = () => {
  const users: User[] = [
    {
      email: 'john.doe@example.com',
      nom: 'Doe',
      prenom: 'John',
      dateNaissance: '1990-01-01',
      sexe: 'Homme',
      twoFactorEnabled: false,
      profession: 'Développeur',
      pays: 'Bénin',
      ville: 'Porto-Novo',
      adresse: '123 Rue Principale',
      numero: '+229 1234 5678',
      role: 'client',
      isActive: true,
      createdAt: new Date('2025-04-01').toISOString(),
      lastLogin: new Date('2025-04-23T10:00:00').toISOString(),
      totalLogins: 15,
    },
    {
      email: 'vendor@example.com',
      nom: 'Smith',
      prenom: 'Alice',
      dateNaissance: '1985-05-15',
      sexe: 'Femme',
      twoFactorEnabled: true,
      profession: 'Commerçante',
      pays: 'France',
      ville: 'Paris',
      adresse: '456 Avenue des Champs-Élysées',
      numero: '+33 9876 5432',
      role: 'vendor',
      isActive: true,
      createdAt: new Date('2025-04-02').toISOString(),
      lastLogin: new Date('2025-04-22T14:30:00').toISOString(),
      totalLogins: 42,
    },
    {
      email: 'staff@example.com',
      nom: 'Brown',
      prenom: 'Emma',
      dateNaissance: '1988-09-20',
      sexe: 'Femme',
      twoFactorEnabled: true,
      profession: 'Administratrice',
      pays: 'France',
      ville: 'Lyon',
      adresse: '789 Rue de la République',
      numero: '+33 1234 5678',
      role: 'staff',
      isActive: true,
      createdAt: new Date('2025-04-03').toISOString(),
      lastLogin: new Date('2025-04-24T09:15:00').toISOString(),
      totalLogins: 78,
    },
    {
      email: 'jane.doe@example.com',
      nom: 'Doe',
      prenom: 'Jane',
      dateNaissance: '1992-03-10',
      sexe: 'Femme',
      twoFactorEnabled: false,
      profession: 'Designer',
      pays: 'Bénin',
      ville: 'Cotonou',
      adresse: '101 Boulevard de la Marina',
      numero: '+229 8765 4321',
      role: 'client',
      isActive: false,
      createdAt: new Date('2025-04-04').toISOString(),
      lastLogin: new Date('2025-04-20T16:45:00').toISOString(),
      totalLogins: 5,
    },
    {
      email: 'vendor2@example.com',
      nom: 'Johnson',
      prenom: 'Mark',
      dateNaissance: '1980-07-25',
      sexe: 'Homme',
      twoFactorEnabled: false,
      profession: 'Vendeur',
      pays: 'France',
      ville: 'Marseille',
      adresse: '202 Rue du Vieux Port',
      numero: '+33 4567 8901',
      role: 'vendor',
      isActive: true,
      createdAt: new Date('2025-04-05').toISOString(),
      lastLogin: new Date('2025-04-21T11:20:00').toISOString(),
      totalLogins: 30,
    },
  ];
  localStorage.setItem('users', JSON.stringify(users));
};