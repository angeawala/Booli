'use client';

import Link from 'next/link';
import { useState } from 'react';
import '@/styles/dashboard/sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    general: false,
    produits: false,
    boutiques: false,
    cours: false,
    commandes: false,
    agences: false,
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className={`x-sidebar ${isOpen ? 'x-sidebar-open' : 'x-sidebar-closed'}`}>
      <button className="x-sidebar-toggle btn d-md-none" onClick={toggleSidebar}>
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
      <div className="x-sidebar-content">
        <div className="x-sidebar-header text-center py-3">
          <h4 className="x-sidebar-title">Dashboard</h4>
        </div>
        <nav className="x-sidebar-nav">
          <div className="x-nav-section">
            <div className="x-nav-section-header" onClick={() => toggleSection('general')}>
              <h5 className="x-nav-section-title">
                <i className={`fas ${openSections.general ? 'fa-caret-down' : 'fa-caret-right'} me-2`}></i>
                Gestion Générale
              </h5>
            </div>
            {openSections.general && (
              <div className="x-nav-sublist">
                <Link href="/dashboard" className="x-nav-link">
                  <i className="fas fa-home me-2"></i>
                  <span>Accueil</span>
                </Link>
                <Link href="/dashboard/profile" className="x-nav-link">
                  <i className="fas fa-user me-2"></i>
                  <span>Profil</span>
                </Link>
                <Link href="/dashboard/gestion-utilisateurs" className="x-nav-link">
                  <i className="fas fa-users me-2"></i>
                  <span>Gestion des Utilisateurs</span>
                </Link>
                <Link href="/dashboard/gestion-roles-permissions" className="x-nav-link">
                  <i className="fas fa-users-cog me-2"></i>
                  <span>Gestion des Rôles et Permissions</span>
                </Link>
              </div>
            )}
          </div>

          <div className="x-nav-section">
            <div className="x-nav-section-header" onClick={() => toggleSection('produits')}>
              <h5 className="x-nav-section-title">
                <i className={`fas ${openSections.produits ? 'fa-caret-down' : 'fa-caret-right'} me-2`}></i>
                Produits
              </h5>
            </div>
            {openSections.produits && (
              <div className="x-nav-sublist">
                <Link href="/dashboard/produits" className="x-nav-link">
                  <i className="fas fa-box me-2"></i>
                  <span>Gestion des Produits</span>
                </Link>
                <Link href="/dashboard/produits/mes" className="x-nav-link">
                  <i className="fas fa-boxes me-2"></i>
                  <span>Mes Produits</span>
                </Link>
              </div>
            )}
          </div>

          <div className="x-nav-section">
            <div className="x-nav-section-header" onClick={() => toggleSection('boutiques')}>
              <h5 className="x-nav-section-title">
                <i className={`fas ${openSections.boutiques ? 'fa-caret-down' : 'fa-caret-right'} me-2`}></i>
                Boutiques
              </h5>
            </div>
            {openSections.boutiques && (
              <div className="x-nav-sublist">
                <Link href="/dashboard/boutiques" className="x-nav-link">
                  <i className="fas fa-store me-2"></i>
                  <span>Gestion des Boutiques</span>
                </Link>
                <Link href="/dashboard/boutiques/mes" className="x-nav-link">
                  <i className="fas fa-shop me-2"></i>
                  <span>Ma Boutique</span>
                </Link>
              </div>
            )}
          </div>

          <div className="x-nav-section">
            <div className="x-nav-section-header" onClick={() => toggleSection('cours')}>
              <h5 className="x-nav-section-title">
                <i className={`fas ${openSections.cours ? 'fa-caret-down' : 'fa-caret-right'} me-2`}></i>
                Cours
              </h5>
            </div>
            {openSections.cours && (
              <div className="x-nav-sublist">
                <Link href="/dashboard/gestion-cours" className="x-nav-link">
                  <i className="fas fa-chalkboard-teacher me-2"></i>
                  <span>Gestion des Cours</span>
                </Link>
                <Link href="/dashboard/mes-cours" className="x-nav-link">
                  <i className="fas fa-book me-2"></i>
                  <span>Mes Cours</span>
                </Link>
              </div>
            )}
          </div>

          <div className="x-nav-section">
            <div className="x-nav-section-header" onClick={() => toggleSection('commandes')}>
              <h5 className="x-nav-section-title">
                <i className={`fas ${openSections.commandes ? 'fa-caret-down' : 'fa-caret-right'} me-2`}></i>
                Commandes
              </h5>
            </div>
            {openSections.commandes && (
              <div className="x-nav-sublist">
                <Link href="/dashboard/commandes/staff" className="x-nav-link">
                  <i className="fas fa-clipboard-list me-2"></i>
                  <span>Gestion des Commandes (Staff)</span>
                </Link>
                <Link href="/dashboard/commandes/vendeurs" className="x-nav-link">
                  <i className="fas fa-clipboard-list me-2"></i>
                  <span>Gestion des Commandes (Vendeur)</span>
                </Link>
                <Link href="/dashboard/commandes/mes" className="x-nav-link">
                  <i className="fas fa-shopping-cart me-2"></i>
                  <span>Mes Commandes</span>
                </Link>
                <Link href="/dashboard/commandes/suivi" className="x-nav-link">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  <span>Suivre ma Commande</span>
                </Link>
              </div>
            )}
          </div>

          <div className="x-nav-section">
            <div className="x-nav-section-header" onClick={() => toggleSection('agences')}>
              <h5 className="x-nav-section-title">
                <i className={`fas ${openSections.agences ? 'fa-caret-down' : 'fa-caret-right'} me-2`}></i>
                Agences
              </h5>
            </div>
            {openSections.agences && (
              <div className="x-nav-sublist">
                <Link href="/dashboard/gestion-agences" className="x-nav-link">
                  <i className="fas fa-building me-2"></i>
                  <span>Gestion des Agences</span>
                </Link>
                <Link href="/dashboard/mon-agence" className="x-nav-link">
                  <i className="fas fa-briefcase me-2"></i>
                  <span>Mon Agence</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;