'use client';

import Link from 'next/link';
import { useState } from 'react';
import '@/styles/dashboard/sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
          <Link href="/dashboard/profile" className="x-nav-link">
            <i className="fas fa-user me-2"></i>
            <span>Profil</span>
          </Link>
          <Link href="/dashboard/gestion-utilisations" className="x-nav-link">
            <i className="fas fa-users-cog me-2"></i>
            <span>Gestion des Utilisations</span>
          </Link>
          <Link href="/dashboard/produits" className="x-nav-link">
            <i className="fas fa-box me-2"></i>
            <span>Gestion des Produits</span>
          </Link>
          <Link href="/dashboard/produits/mes" className="x-nav-link">
            <i className="fas fa-boxes me-2"></i>
            <span>Mes Produits</span>
          </Link>
          <Link href="/dashboard/boutiques" className="x-nav-link">
            <i className="fas fa-store me-2"></i>
            <span>Gestion des Boutiques</span>
          </Link>
          <Link href="/dashboard/boutiques/mes" className="x-nav-link">
            <i className="fas fa-shop me-2"></i>
            <span>Ma Boutique</span>
          </Link>
          <Link href="/dashboard/gestion-cours" className="x-nav-link">
            <i className="fas fa-chalkboard-teacher me-2"></i>
            <span>Gestion des Cours</span>
          </Link>
          <Link href="/dashboard/mes-cours" className="x-nav-link">
            <i className="fas fa-book me-2"></i>
            <span>Mes Cours</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;