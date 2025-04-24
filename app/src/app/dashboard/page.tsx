'use client';
import { initializeData } from '@/components/dashboard/commandes/data';
import { initializeUsers } from '@/components/dashboard/users/data';
export default function DashboardPage() {
  const handleInitialize = () => {
    initializeData();
    initializeUsers();
  };
  return (
    <div className="container">
      <h2 className="x-dashboard-title mb-4">Bienvenue sur votre Dashboard</h2>
      <div className="row">
        {/* Placeholder Card 1 */}
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="x-dashboard-card">
            <h3 className="x-card-title">Produits</h3>
            <p>Gérez vos produits ici.</p>
            <a href="/dashboard/gestion-produits" className="x-card-link">
              Voir plus <i className="fas fa-arrow-right ms-1"></i>
            </a>
          </div>
        </div>

        {/* Placeholder Card 2 */}
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="x-dashboard-card">
            <h3 className="x-card-title">Cours</h3>
            <p>Accédez à vos cours.</p>
            <a href="/dashboard/mes-cours" className="x-card-link">
              Voir plus <i className="fas fa-arrow-right ms-1"></i>
            </a>
          </div>
        </div>
    <div>
      <h1>Bienvenue</h1>
      <button onClick={handleInitialize}>Initialiser les données de test</button>
    </div>
        {/* Placeholder Card 3 */}
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="x-dashboard-card">
            <h3 className="x-card-title">Utilisateurs</h3>
            <p>Gérez les utilisateurs.</p>
            <a href="/dashboard/gestion-utilisations" className="x-card-link">
              Voir plus <i className="fas fa-arrow-right ms-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
