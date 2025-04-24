import { Agency, Category, Service, Opportunity } from './types';

export const getAgencies = (): Agency[] => {
  const agencies = localStorage.getItem('agencies');
  return agencies ? JSON.parse(agencies) : [];
};

export const saveAgencies = (agencies: Agency[]) => {
  localStorage.setItem('agencies', JSON.stringify(agencies));
};

export const getCategories = (): Category[] => {
  const categories = localStorage.getItem('categories');
  return categories ? JSON.parse(categories) : [];
};

export const saveCategories = (categories: Category[]) => {
  localStorage.setItem('categories', JSON.stringify(categories));
};

export const initializeAgenciesAndCategories = () => {
  const categories: Category[] = [
    {
      id: 'cat1',
      name: 'Voyage',
      description: 'Agences spécialisées dans les voyages et le tourisme.',
      image: 'https://example.com/voyage.jpg',
    },
    {
      id: 'cat2',
      name: 'Marketing',
      description: 'Agences de marketing et publicité.',
      image: 'https://example.com/marketing.jpg',
    },
    {
      id: 'cat3',
      name: 'Événementiel',
      description: 'Organisation d’événements et conférences.',
      image: 'https://example.com/evenementiel.jpg',
    },
  ];

  const agencies: Agency[] = [
    {
      id: 'agency1',
      name: 'Voyage Évasion',
      description: 'Agence de voyage spécialisée dans les destinations exotiques.',
      image: 'https://example.com/voyage-evasion.jpg',
      services: [
        {
          id: 'srv1',
          name: 'Circuit Asie',
          description: 'Voyage organisé en Asie du Sud-Est.',
          price: '1000 FCFA minimum par mois',
          contact: '+229 1234 5678',
          descriptionUrl: 'https://example.com/circuit-asie',
          descriptionImage: 'https://example.com/circuit-asie.jpg',
          createdAt: new Date('2025-04-01').toISOString(),
        },
      ],
      opportunities: [
        {
          id: 'opp1',
          title: 'Recrutement Guide',
          description: 'Recherchons des guides touristiques pour l’Asie.',
          type: 'Job',
          endDate: new Date('2025-12-31').toISOString(),
          subscriptionLink: 'https://example.com/apply-guide',
          contactNumber: '+229 1234 5678',
          createdAt: new Date('2025-04-02').toISOString(),
        },
      ],
      address: '123 Rue des Voyageurs, Porto-Novo',
      phone: '+229 1234 5678',
      hours: 'Lun-Ven : 9h-17h',
      email: 'contact@voyage-evasion.com',
      website: 'https://voyage-evasion.com',
      categoryId: 'cat1',
      type: 'Agence',
      domain: 'Voyage',
      creatorEmail: 'staff@example.com',
      creatorType: 'staff',
      isApproved: true,
      createdAt: new Date('2025-04-01').toISOString(),
      lastUpdated: new Date('2025-04-23').toISOString(),
    },
    {
      id: 'agency2',
      name: 'Marketing Pro',
      description: 'Agence de marketing digital pour booster votre visibilité.',
      image: 'https://example.com/marketing-pro.jpg',
      services: [
        {
          id: 'srv2',
          name: 'Campagne Ads',
          description: 'Création de campagnes publicitaires sur les réseaux sociaux.',
          price: '100 FCFA par jour',
          contact: '+33 9876 5432',
          descriptionUrl: 'https://example.com/campagne-ads',
          descriptionImage: 'https://example.com/campagne-ads.jpg',
          createdAt: new Date('2025-04-03').toISOString(),
        },
      ],
      opportunities: [
        {
          id: 'opp2',
          title: 'Partenariat',
          description: 'Recherchons des partenaires pour des campagnes conjointes.',
          type: 'Partnership',
          endDate: new Date('2025-11-30').toISOString(),
          subscriptionLink: 'https://example.com/partnership',
          contactNumber: '+33 9876 5432',
          createdAt: new Date('2025-04-04').toISOString(),
        },
      ],
      address: '456 Avenue Marketing, Paris',
      phone: '+33 9876 5432',
      hours: 'Lun-Sam : 8h-18h',
      email: 'info@marketing-pro.com',
      website: 'https://marketing-pro.com',
      categoryId: 'cat2',
      type: 'Entreprise',
      domain: 'Marketing',
      creatorEmail: 'john.doe@example.com',
      creatorType: 'user',
      isApproved: false,
      createdAt: new Date('2025-04-03').toISOString(),
      lastUpdated: new Date('2025-04-22').toISOString(),
    },
  ];

  saveCategories(categories);
  saveAgencies(agencies);
};