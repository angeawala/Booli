'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/dashboard/Loader';
import { User } from '@/components/dashboard/users/types';
import { getUsers, saveUsers } from '@/components/dashboard/users/data';
import '@/styles/dashboard/gestion-utilisateurs.css';

const ITEMS_PER_PAGE = 5;

const UserManagementPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filter, Sort, Search, and Pagination States
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('email-asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  // Handle Filtering, Sorting, Searching, and Pagination
  const filteredUsers = users
    .filter((user) => {
      if (filterStatus && user.isActive.toString() !== filterStatus) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return user.email.toLowerCase().includes(query);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'email-asc') {
        return a.email.localeCompare(b.email);
      } else if (sortBy === 'email-desc') {
        return b.email.localeCompare(a.email);
      } else if (sortBy === 'date-asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'date-desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleToggleActive = (email: string, isActive: boolean) => {
    setLoading(true);
    setTimeout(() => {
      const updatedUsers = users.map((user) =>
        user.email === email ? { ...user, isActive: !isActive } : user
      );
      setUsers(updatedUsers);
      saveUsers(updatedUsers);
      toast.success(`Utilisateur ${isActive ? 'désactivé' : 'activé'} avec succès`);
      setLoading(false);
    }, 1000);
  };

  const handleDeleteUser = (email: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    setLoading(true);
    setTimeout(() => {
      const updatedUsers = users.filter((user) => user.email !== email);
      setUsers(updatedUsers);
      saveUsers(updatedUsers);
      toast.success('Utilisateur supprimé avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!selectedUser) return;
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleSaveEdit = () => {
    if (!selectedUser) return;
    setLoading(true);
    setTimeout(() => {
      const updatedUsers = users.map((user) =>
        user.email === selectedUser.email ? selectedUser : user
      );
      setUsers(updatedUsers);
      saveUsers(updatedUsers);
      toast.success('Utilisateur modifié avec succès');
      setSelectedUser(null);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="x-users-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Loader loading={loading} />
      <h2 className="x-users-title">Gestion des Utilisateurs</h2>

      {/* Filters, Search, Sort, and Pagination Controls */}
      <div className="x-users-controls mb-3">
        <div className="x-control-group">
          <label className="x-users-label">Rechercher</label>
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher par email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>

        <div className="x-control-group">
          <label className="x-users-label">Filtrer par statut</label>
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1); // Reset to first page on filter change
            }}
          >
            <option value="">Tous les statuts</option>
            <option value="true">Actif</option>
            <option value="false">Inactif</option>
          </select>
        </div>

        <div className="x-control-group">
          <label className="x-users-label">Trier par</label>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1); // Reset to first page on sort change
            }}
          >
            <option value="email-asc">Email (A-Z)</option>
            <option value="email-desc">Email (Z-A)</option>
            <option value="date-asc">Date (plus ancien)</option>
            <option value="date-desc">Date (plus récent)</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Email</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Statut</th>
              <th>Dernière connexion</th>
              <th>Date d'inscription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.isActive ? 'Actif' : 'Inactif'}</td>
                <td>{new Date(user.lastLogin).toLocaleString()}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className="x-action-icon" onClick={() => setSelectedUser(user)}>
                    <i className="fas fa-eye"></i>
                    <span className="x-action-tooltip">Détails</span>
                  </span>
                  <span className="x-action-icon" onClick={() => handleToggleActive(user.email, user.isActive)}>
                    <i className={`fas ${user.isActive ? 'fa-ban' : 'fa-check'}`}></i>
                    <span className="x-action-tooltip">{user.isActive ? 'Désactiver' : 'Activer'}</span>
                  </span>
                  <span className="x-action-icon" onClick={() => handleDeleteUser(user.email)}>
                    <i className="fas fa-trash"></i>
                    <span className="x-action-tooltip">Supprimer</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="x-pagination mt-3">
        <button
          className="btn x-pagination-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Précédent
        </button>
        <span className="x-pagination-info">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          className="btn x-pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Suivant
        </button>
      </div>

      {/* Details/Edit Modal */}
      {selectedUser && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Détails de l'utilisateur</h3>
            <div className="x-modal-content">
              <div className="mb-3">
                <label className="x-users-label">Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  className="form-control x-modal-input x-modal-input-disabled"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="x-users-label">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={selectedUser.nom}
                  onChange={handleEditChange}
                  className="form-control x-modal-input"
                />
              </div>
              <div className="mb-3">
                <label className="x-users-label">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={selectedUser.prenom}
                  onChange={handleEditChange}
                  className="form-control x-modal-input"
                />
              </div>
              <div className="mb-3">
                <label className="x-users-label">Date de naissance</label>
                <input
                  type="date"
                  value={selectedUser.dateNaissance}
                  className="form-control x-modal-input x-modal-input-disabled"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="x-users-label">Sexe</label>
                <select
                  value={selectedUser.sexe}
                  className="form-select x-modal-input x-modal-input-disabled"
                  disabled
                >
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="x-users-label">2FA</label>
                <input
                  type="text"
                  value={selectedUser.twoFactorEnabled ? 'Activé' : 'Désactivé'}
                  className="form-control x-modal-input x-modal-input-disabled"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="x-users-label">Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={selectedUser.profession}
                  onChange={handleEditChange}
                  className="form-control x-modal-input"
                />
              </div>
              <div className="mb-3">
                <label className="x-users-label">Pays</label>
                <input
                  type="text"
                  name="pays"
                  value={selectedUser.pays}
                  onChange={handleEditChange}
                  className="form-control x-modal-input"
                />
              </div>
              <div className="mb-3">
                <label className="x-users-label">Ville</label>
                <input
                  type="text"
                  name="ville"
                  value={selectedUser.ville}
                  onChange={handleEditChange}
                  className="form-control x-modal-input"
                />
              </div>
              <div className="mb-3">
                <label className="x-users-label">Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  value={selectedUser.adresse}
                  onChange={handleEditChange}
                  className="form-control x-modal-input"
                />
              </div>
              <div className="mb-3">
                <label className="x-users-label">Numéro de téléphone</label>
                <input
                  type="text"
                  name="numero"
                  value={selectedUser.numero}
                  onChange={handleEditChange}
                  className="form-control x-modal-input"
                />
              </div>
              <div className="mb-3">
                <label className="x-users-label">Statut</label>
                <input
                  type="text"
                  value={selectedUser.isActive ? 'Actif' : 'Inactif'}
                  className="form-control x-modal-input x-modal-input-disabled"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="x-users-label">Date de création du compte</label>
                <input
                  type="text"
                  value={new Date(selectedUser.createdAt).toLocaleString()}
                  className="form-control x-modal-input x-modal-input-disabled"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="x-users-label">Dernière connexion</label>
                <input
                  type="text"
                  value={new Date(selectedUser.lastLogin).toLocaleString()}
                  className="form-control x-modal-input x-modal-input-disabled"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="x-users-label">Nombre total de connexions</label>
                <input
                  type="text"
                  value={selectedUser.totalLogins}
                  className="form-control x-modal-input x-modal-input-disabled"
                  disabled
                />
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn x-modal-close"
                onClick={() => setSelectedUser(null)}
              >
                Fermer
              </button>
              <button
                className="btn x-modal-save"
                onClick={handleSaveEdit}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;