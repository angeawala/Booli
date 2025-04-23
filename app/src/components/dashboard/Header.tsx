// src/components/dashboard/Header.tsx
import Link from 'next/link';
import './../../styles/dashboard/header.css';

const Header = () => {
  return (
    <header className="x-header">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="x-header-title d-none d-md-block">Dashboard</h1>
        <div className="x-header-actions">
          <Link href="/dashboard/profile" className="x-header-btn btn">
            <i className="fas fa-user-circle me-md-2"></i>
            <span className="d-none d-md-inline">Profil</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
