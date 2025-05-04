'use client';

import React, { useState, useEffect } from 'react';
import TopHeader from '@/components/layout/listing/TopHeader';
import Footer from '@/components/Footer';
import DocumentItem from './DocumentItem';
import DocumentModal from './DocumentModal';
import '@/styles/css/library.css';
import '@/styles/library-2.css';

interface Document {
  id: string;
  title: string;
  image: string;
  author?: string;
  category: string;
  publisher: string;
  publicationYear: string;
  pages: string;
  language: string;
  rating?: number;
  isFree: boolean;
  pdfPrice?: string;
  physicalPrice?: string;
  hasPhysical: boolean;
  hasPdf: boolean;
  description: string;
  weight?: string;
  size?: string;
  stock?: string;
}

const documents: Document[] = [
  {
    id: 'doc1',
    title: 'Mathématique SE',
    image: '/media/1erSE.jpeg',
    author: 'Julien Mercier',
    category: 'Mathématiques',
    publisher: 'Galaxie Éditions',
    publicationYear: '2024',
    pages: '320',
    language: 'Français',
    rating: 3.8,
    isFree: true,
    hasPhysical: true,
    hasPdf: true,
    physicalPrice: '15.99',
    weight: '0.5',
    size: '15x21x2',
    stock: '100',
    description: 'Un manuel complet pour les mathématiques de niveau SE, avec exercices et solutions.',
  },
  {
    id: 'doc2',
    title: 'Politique Africaine',
    image: '/media/roman_politique_africaine.jpeg',
    author: 'Clara Dubois',
    category: 'Politique',
    publisher: 'Plume d’Or',
    publicationYear: '2025',
    pages: '180',
    language: 'Français',
    rating: 5.0,
    isFree: true,
    hasPhysical: true,
    hasPdf: true,
    physicalPrice: '12.99',
    weight: '0.3',
    size: '14x20x1.5',
    stock: '50',
    description: 'Une analyse approfondie des dynamiques politiques en Afrique contemporaine.',
  },
  {
    id: 'doc3',
    title: 'Conte sénégalaire',
    image: '/media/conte.png',
    author: 'Clara Dubois',
    category: 'Littérature',
    publisher: 'Plume d’Or',
    publicationYear: '2025',
    pages: '180',
    language: 'Français',
    rating: 5.0,
    isFree: true,
    hasPhysical: true,
    hasPdf: true,
    physicalPrice: '10.99',
    weight: '0.25',
    size: '13x19x1',
    stock: '75',
    description: 'Recueil de contes traditionnels sénégalais, riches en morale et culture.',
  },
  {
    id: 'doc4',
    title: 'Tradition Africaine',
    image: '/media/TRADITION.jpeg',
    author: 'Clara Dubois',
    category: 'Culture',
    publisher: 'Plume d’Or',
    publicationYear: '2025',
    pages: '200',
    language: 'Français',
    rating: 4.5,
    isFree: true,
    hasPhysical: true,
    hasPdf: true,
    physicalPrice: '14.99',
    weight: '0.4',
    size: '15x22x1.8',
    stock: '60',
    description: 'Exploration des traditions et coutumes africaines à travers les âges.',
  },
  {
    id: 'doc5',
    title: 'Physique L1',
    image: '/media/Physique L1.jpeg',
    author: 'Clara Dubois',
    category: 'Physique',
    publisher: 'Éditions Scientifiques',
    publicationYear: '2025',
    pages: '250',
    language: 'Anglais',
    rating: 4.2,
    isFree: false,
    pdfPrice: '12.99',
    physicalPrice: '19.99',
    hasPhysical: true,
    hasPdf: true,
    weight: '0.6',
    size: '16x24x2',
    stock: '80',
    description: 'Cours de physique pour première année universitaire, avec exemples pratiques.',
  },
  {
    id: 'doc6',
    title: 'Physique et Chimie',
    image: '/media/Physique_Chimie.jpeg',
    author: 'Clara Dubois',
    category: 'Chimie',
    publisher: 'Éditions Scientifiques',
    publicationYear: '2025',
    pages: '300',
    language: 'Français',
    rating: 4.0,
    isFree: false,
    pdfPrice: '14.99',
    physicalPrice: '22.99',
    hasPhysical: true,
    hasPdf: true,
    weight: '0.7',
    size: '17x25x2.5',
    stock: '90',
    description: 'Manuel combinant physique et chimie pour étudiants du secondaire.',
  },
  {
    id: 'doc7',
    title: 'Littérature Négro-Africaine',
    image: '/media/LIttérature_Négro_africaine.jpeg',
    author: 'Aminata Sow',
    category: 'Littérature',
    publisher: 'Plume d’Or',
    publicationYear: '2025',
    pages: '220',
    language: 'Français',
    rating: 4.8,
    isFree: false,
    pdfPrice: '11.99',
    physicalPrice: '16.99',
    hasPhysical: true,
    hasPdf: true,
    weight: '0.35',
    size: '14x20x1.7',
    stock: '70',
    description: 'Anthologie des œuvres majeures de la littérature négro-africaine.',
  },
  {
    id: 'doc8',
    title: 'Mathématique SM',
    image: '/media/SM_1ere.jpeg',
    author: 'Clara Dubois',
    category: 'Mathématiques',
    publisher: 'Galaxie Éditions',
    publicationYear: '2025',
    pages: '280',
    language: 'Français',
    rating: 4.3,
    isFree: false,
    pdfPrice: '13.99',
    physicalPrice: '18.99',
    hasPhysical: true,
    hasPdf: true,
    weight: '0.55',
    size: '15x22x2',
    stock: '85',
    description: 'Cours de mathématiques pour SM, avec exercices corrigés.',
  },
  {
    id: 'doc9',
    title: 'Yacouba, Chasseur Africain',
    image: '/media/YACOUBA_CHASSEUR_AFRICAIN.jpeg',
    author: 'Moussa Diallo',
    category: 'Littérature',
    publisher: 'Plume d’Or',
    publicationYear: '2025',
    pages: '190',
    language: 'Français',
    rating: 4.7,
    isFree: false,
    pdfPrice: '10.99',
    physicalPrice: '15.99',
    hasPhysical: true,
    hasPdf: true,
    weight: '0.3',
    size: '13x19x1.5',
    stock: '65',
    description: 'Roman d’aventure suivant Yacouba, un chasseur dans la savane africaine.',
  },
  {
    id: 'doc10',
    title: 'Histoire de l’Afrique',
    image: 'https://via.placeholder.com/300x200',
    author: 'Fatou Keita',
    category: 'Histoire',
    publisher: 'Éditions Historiques',
    publicationYear: '2025',
    pages: '350',
    language: 'Français',
    rating: 4.9,
    isFree: true,
    hasPhysical: true,
    hasPdf: false,
    physicalPrice: '24.99',
    weight: '0.8',
    size: '16x24x3',
    stock: '55',
    description: 'Une histoire complète de l’Afrique, des origines à nos jours.',
  },
  {
    id: 'doc11',
    title: 'Chimie Organique',
    image: 'https://via.placeholder.com/300x200',
    author: 'Clara Dubois',
    category: 'Chimie',
    publisher: 'Éditions Scientifiques',
    publicationYear: '2025',
    pages: '270',
    language: 'Anglais',
    rating: 4.1,
    isFree: false,
    pdfPrice: '15.99',
    physicalPrice: '20.99',
    hasPhysical: true,
    hasPdf: true,
    weight: '0.6',
    size: '15x23x2',
    stock: '95',
    description: 'Introduction à la chimie organique pour étudiants universitaires.',
  },
  {
    id: 'doc12',
    title: 'Poésie Africaine',
    image: 'https://via.placeholder.com/300x200',
    author: 'Léopold Senghor',
    category: 'Littérature',
    publisher: 'Plume d’Or',
    publicationYear: '2025',
    pages: '160',
    language: 'Français',
    rating: 4.6,
    isFree: true,
    hasPhysical: true,
    hasPdf: true,
    physicalPrice: '11.99',
    weight: '0.25',
    size: '12x18x1',
    stock: '80',
    description: 'Recueil de poèmes célébrant la culture et l’identité africaine.',
  },
  {
    id: 'doc13',
    title: 'Algèbre Avancée',
    image: 'https://via.placeholder.com/300x200',
    author: 'Clara Dubois',
    category: 'Mathématiques',
    publisher: 'Galaxie Éditions',
    publicationYear: '2025',
    pages: '310',
    language: 'Français',
    rating: 4.4,
    isFree: false,
    pdfPrice: '16.99',
    physicalPrice: '21.99',
    hasPhysical: true,
    hasPdf: true,
    weight: '0.65',
    size: '16x24x2.2',
    stock: '70',
    description: 'Cours avancé d’algèbre pour étudiants en mathématiques.',
  },
  {
    id: 'doc14',
    title: 'Philosophie Africaine',
    image: 'https://via.placeholder.com/300x200',
    author: 'Kwame Nkrumah',
    category: 'Philosophie',
    publisher: 'Plume d’Or',
    publicationYear: '2025',
    pages: '240',
    language: 'Français',
    rating: 4.5,
    isFree: true,
    hasPhysical: true,
    hasPdf: true,
    physicalPrice: '13.99',
    weight: '0.4',
    size: '14x20x1.8',
    stock: '60',
    description: 'Exploration des courants philosophiques africains modernes.',
  },
  {
    id: 'doc15',
    title: 'Biologie Cellulaire',
    image: 'https://via.placeholder.com/300x200',
    author: 'Clara Dubois',
    category: 'Biologie',
    publisher: 'Éditions Scientifiques',
    publicationYear: '2026',
    pages: '290',
    language: 'Anglais',
    rating: 4.3,
    isFree: false,
    pdfPrice: '17.99',
    physicalPrice: '23.99',
    hasPhysical: true,
    hasPdf: true,
    weight: '0.7',
    size: '16x24x2.5',
    stock: '85',
    description: 'Manuel de biologie cellulaire pour étudiants en sciences.',
  },
  {
    id: 'doc16',
    title: 'Contes du Mali',
    image: 'https://via.placeholder.com/300x200',
    author: 'Amadou Hampâté Bâ',
    category: 'Littérature',
    publisher: 'Plume d’Or',
    publicationYear: '2026',
    pages: '170',
    language: 'Français',
    rating: 4.8,
    isFree: true,
    hasPhysical: true,
    hasPdf: true,
    physicalPrice: '12.99',
    weight: '0.3',
    size: '13x19x1.5',
    stock: '75',
    description: 'Recueil de contes traditionnels maliens pleins de sagesse.',
  },
  {
    id: 'doc17',
    title: 'Économie Africaine',
    image: 'https://via.placeholder.com/300x200',
    author: 'Clara Dubois',
    category: 'Économie',
    publisher: 'Éditions Économiques',
    publicationYear: '2026',
    pages: '330',
    language: 'Français',
    rating: 4.2,
    isFree: false,
    pdfPrice: '18.99',
    physicalPrice: '25.99',
    hasPhysical: true,
    hasPdf: true,
    weight: '0.8',
    size: '16x24x3',
    stock: '50',
    description: 'Analyse des dynamiques économiques en Afrique subsaharienne.',
  },
  {
    id: 'doc18',
    title: 'Géographie de l’Afrique',
    image: 'https://via.placeholder.com/300x200',
    author: 'Clara Dubois',
    category: 'Géographie',
    publisher: 'Éditions Géographiques',
    publicationYear: '2026',
    pages: '260',
    language: 'Français',
    rating: 4.4,
    isFree: true,
    hasPhysical: true,
    hasPdf: false,
    physicalPrice: '19.99',
    weight: '0.5',
    size: '15x22x2',
    stock: '65',
    description: 'Étude des paysages et populations africaines.',
  },
  {
    id: 'doc19',
    title: 'Astronomie pour Débutants',
    image: 'https://via.placeholder.com/300x200',
    author: 'Clara Dubois',
    category: 'Astronomie',
    publisher: 'Éditions Scientifiques',
    publicationYear: '2026',
    pages: '230',
    language: 'Anglais',
    rating: 4.0,
    isFree: false,
    pdfPrice: '12.99',
    physicalPrice: '17.99',
    hasPhysical: true,
    hasPdf: true,
    weight: '0.45',
    size: '14x20x1.8',
    stock: '90',
    description: 'Introduction à l’astronomie pour les amateurs.',
  },
  {
    id: 'doc20',
    title: 'Mythes et Légendes',
    image: 'https://via.placeholder.com/300x200',
    author: 'Ousmane Diop',
    category: 'Littérature',
    publisher: 'Plume d’Or',
    publicationYear: '2026',
    pages: '200',
    language: 'Français',
    rating: 4.6,
    isFree: true,
    hasPhysical: true,
    hasPdf: true,
    physicalPrice: '14.99',
    weight: '0.35',
    size: '13x19x1.7',
    stock: '70',
    description: 'Collection de mythes et légendes africains.',
  },
  {
    id: 'doc21',
    title: 'Mythes et Légendes',
    image: 'https://via.placeholder.com/300x200',
    author: 'Ousmane Diop',
    category: 'Littérature',
    publisher: 'Plume d’Or',
    publicationYear: '2026',
    pages: '200',
    language: 'Français',
    rating: 4.6,
    isFree: true,
    hasPhysical: true,
    hasPdf: true,
    physicalPrice: '14.99',
    weight: '0.35',
    size: '13x19x1.7',
    stock: '70',
    description: 'Collection de mythes et légendes africains.',
  },
  {
    id: 'doc22',
    title: 'Mythes et Légendes',
    image: 'https://via.placeholder.com/300x200',
    author: 'Ousmane Diop',
    category: 'Littérature',
    publisher: 'Plume d’Or',
    publicationYear: '2026',
    pages: '200',
    language: 'Français',
    rating: 4.6,
    isFree: true,
    hasPhysical: true,
    hasPdf: true,
    physicalPrice: '14.99',
    weight: '0.35',
    size: '13x19x1.7',
    stock: '70',
    description: 'Collection de mythes et légendes africains.',
  },
];

const categories = [
  'Mathématiques',
  'Littérature',
  'Physique',
  'Chimie',
  'Histoire',
  'Politique',
  'Culture',
  'Philosophie',
  'Biologie',
  'Économie',
  'Géographie',
  'Astronomie',
];

const languages = ['Français', 'Anglais'];

const LibrarySection: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [statusFilter, setStatusFilter] = useState<string>('Tous');
  const [languageFilter, setLanguageFilter] = useState<string>('Toutes');
  const [sortOption, setSortOption] = useState('note-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const documentsPerPage = 20;

  // Simuler un chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Réinitialiser la page lors d'un changement de filtre, tri ou recherche
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, statusFilter, languageFilter, sortOption]);

  // Fermer les menus déroulants lors d'un clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-btn, .filtre-btn')) {
        setShowStatusMenu(false);
        setShowLanguageMenu(false);
        setShowSortMenu(false);
        setShowCategoryMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Filtrage des documents
  const filteredDocuments = documents
    .filter((doc) => {
      const query = searchQuery.toLowerCase();
      return (
        doc.title.toLowerCase().includes(query) ||
        (doc.author && doc.author.toLowerCase().includes(query)) ||
        doc.description.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query)
      );
    })
    .filter((doc) => (selectedCategory === 'Toutes' ? true : doc.category === selectedCategory))
    .filter((doc) =>
      statusFilter === 'Tous' ? true : statusFilter === 'Gratuit' ? doc.isFree : !doc.isFree
    )
    .filter((doc) => (languageFilter === 'Toutes' ? true : doc.language === languageFilter));

  // Tri des documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortOption) {
      case 'note-asc':
        return (a.rating || 0) - (b.rating || 0);
      case 'note-desc':
        return (b.rating || 0) - (a.rating || 0);
      case 'pdfPrice-asc':
        return (
          (parseFloat(a.pdfPrice?.replace(',', '.') || '999') -
            parseFloat(b.pdfPrice?.replace(',', '.') || '999')) ||
          0
        );
      case 'pdfPrice-desc':
        return (
          (parseFloat(b.pdfPrice?.replace(',', '.') || '0') -
            parseFloat(a.pdfPrice?.replace(',', '.') || '0')) ||
          0
        );
      case 'physicalPrice-asc':
        return (
          (parseFloat(a.physicalPrice?.replace(',', '.') || '999') -
            parseFloat(b.physicalPrice?.replace(',', '.') || '999')) ||
          0
        );
      case 'physicalPrice-desc':
        return (
          (parseFloat(b.physicalPrice?.replace(',', '.') || '0') -
            parseFloat(a.physicalPrice?.replace(',', '.') || '0')) ||
          0
        );
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedDocuments.length / documentsPerPage);
  const startIndex = (currentPage - 1) * documentsPerPage;
  const paginatedDocuments = sortedDocuments.slice(startIndex, startIndex + documentsPerPage);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <TopHeader />
          <section className="search-bar-container" id="xxl">
            <div className="search-bar-wrapper">
              <input
                type="text"
                placeholder="Rechercher par titre, auteur, description, catégorie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
                id="searchInput"
                aria-label="Rechercher des documents"
              />
            </div>
            <div className="dropdown">
              <button
                className="dropdown-btn categorie-btn"
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                aria-expanded={showStatusMenu}
                aria-label="Filtrer par statut"
              >
                <i className='fas fa-circle-check'></i> Statut
              </button>
              <div className={`filter-menu dropdown-content ${showStatusMenu ? 'show' : ''}`}>
                {['Tous', 'Gratuit', 'Payant'].map((status) => (
                  <a
                    key={status}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setStatusFilter(status);
                      setShowStatusMenu(false);
                    }}
                    aria-label={`Filtrer par ${status}`}
                  >
                    {status}
                  </a>
                ))}
              </div>
            </div>
            <div className="dropdown">
              <button
                className="dropdown-btn filter-btn"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                aria-expanded={showLanguageMenu}
                aria-label="Filtrer par langue"
              >
                <i className='fas fa-globe'></i> Langue
              </button>
              <div className={`filter-menu dropdown-content ${showLanguageMenu ? 'show' : ''}`}>
                {['Toutes', ...languages].map((lang) => (
                  <a
                    key={lang}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setLanguageFilter(lang);
                      setShowLanguageMenu(false);
                    }}
                    aria-label={`Filtrer par ${lang}`}
                  >
                    {lang}
                  </a>
                ))}
              </div>
            </div>
            <div className="dropdown">
              <button
                className="dropdown-btn sort-btn"
                onClick={() => setShowSortMenu(!showSortMenu)}
                aria-expanded={showSortMenu}
                aria-label="Trier les documents"
              >
                <i className='fas fa-sort'></i> Trier
              </button>
              <div className={`sort-menu dropdown-content ${showSortMenu ? 'show' : ''}`}>
                {[
                  { value: 'note-desc', label: 'Note (décroissant)' },
                  { value: 'note-asc', label: 'Note (croissant)' },
                  { value: 'pdfPrice-asc', label: 'Prix PDF (croissant)' },
                  { value: 'pdfPrice-desc', label: 'Prix PDF (décroissant)' },
                  { value: 'physicalPrice-asc', label: 'Prix physique (croissant)' },
                  { value: 'physicalPrice-desc', label: 'Prix physique (décroissant)' },
                ].map((option) => (
                  <a
                    key={option.value}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSortOption(option.value);
                      setShowSortMenu(false);
                    }}
                    aria-label={`Trier par ${option.label}`}
                  >
                    {option.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
            <button
              className="filtre-btn"
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              aria-expanded={showCategoryMenu}
              aria-label="Afficher les catégories"
            >
              <i className="fas fa-space-shuttle icon"></i> + DE Catégories
            </button>
            <div
              className={`filtre-box ${showCategoryMenu ? 'show' : ''}`}
              onMouseLeave={() => setTimeout(() => setShowCategoryMenu(false), 300)}
            >
              {['Toutes', ...categories].map((cat) => (
                <a
                  key={cat}
                  href="#"
                  className="filter"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(cat);
                    setShowCategoryMenu(false);
                  }}
                  aria-label={`Filtrer par ${cat}`}
                >
                  {cat}
                </a>
              ))}
            </div>
          <div className="document-list">
            {paginatedDocuments.length === 0 ? (
              <p className="no-results">Aucun document trouvé.</p>
            ) : (
              paginatedDocuments.map((doc) => (
                <DocumentItem
                  key={doc.id}
                  document={doc}
                  onClick={() => setSelectedDocument(doc)}
                />
              ))
            )}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
          {selectedDocument && (
            <DocumentModal
              document={selectedDocument}
              onClose={() => setSelectedDocument(null)}
              onAddToCart={(docId, type) => alert(`Ajouté au panier : ${docId} (${type})`)}
            />
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default LibrarySection;