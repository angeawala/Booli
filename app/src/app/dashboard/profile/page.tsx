'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../components/dashboard/Loader';
import './../../../styles/dashboard/profil.css';

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: 'Doe',
    prenom: 'John',
    dateNaissance: '1990-01-01',
    sexe: 'Homme',
    email: 'john.doe@example.com',
    twoFactorEnabled: false,
    profession: 'Développeur',
    pays: 'Bénin',
    ville: 'Porto-Novo',
    adresse: '123 Rue Principale',
    numero: '+229 1234 5678',
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handle2FAToggle = () => {
    setLoading(true);
    setTimeout(() => {
      setFormData({ ...formData, twoFactorEnabled: !formData.twoFactorEnabled });
      toast.success(formData.twoFactorEnabled ? '2FA désactivé avec succès' : '2FA activé avec succès');
      setLoading(false);
      // Redirect to login page after 2FA toggle
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 2000);
    }, 1000);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate API call
      if (passwordData.newPassword && passwordData.newPassword !== passwordData.confirmNewPassword) {
        toast.error('Les nouveaux mots de passe ne correspondent pas');
        setLoading(false);
        return;
      }
      toast.success('Modifications enregistrées avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Déconnexion réussie');
      setLoading(false);
      // Redirect to login page
      window.location.href = '/auth/login';
    }, 1000);
  };

  return (
    <div className="x-profile-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Loader loading={loading} />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="x-profile-title">Profil</h2>
        <button type="button" onClick={handleLogout} className="btn x-profile-logout-btn-top">
          <i className="fas fa-sign-out-alt me-2"></i>
          Déconnexion
        </button>
      </div>
      <form className="x-profile-form">
        {/* Non-modifiable fields */}
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <label className="x-profile-label">Email</label>
            <input
              type="email"
              value={formData.email}
              className="form-control x-profile-input x-profile-input-disabled"
              disabled
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="x-profile-label">Date de Naissance</label>
            <input
              type="date"
              value={formData.dateNaissance}
              className="form-control x-profile-input x-profile-input-disabled"
              disabled
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="x-profile-label">Sexe</label>
            <select
              value={formData.sexe}
              className="form-select x-profile-input x-profile-input-disabled"
              disabled
            >
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
        </div>

        {/* Modifiable fields */}
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <label className="x-profile-label">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className="form-control x-profile-input"
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="x-profile-label">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              className="form-control x-profile-input"
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="x-profile-label">Profession</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              className="form-control x-profile-input"
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="x-profile-label">Pays</label>
            <input
              type="text"
              name="pays"
              value={formData.pays}
              onChange={handleInputChange}
              className="form-control x-profile-input"
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="x-profile-label">Ville</label>
            <input
              type="text"
              name="ville"
              value={formData.ville}
              onChange={handleInputChange}
              className="form-control x-profile-input"
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="x-profile-label">Adresse</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              className="form-control x-profile-input"
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="x-profile-label">Numéro de téléphone</label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
              className="form-control x-profile-input"
            />
          </div>
        </div>

        {/* 2FA Toggle */}
        <div className="mb-3">
          <label className="x-profile-label">Authentification à deux facteurs (2FA)</label>
          <div className="x-toggle-switch">
            <input
              type="checkbox"
              id="twoFactor"
              checked={formData.twoFactorEnabled}
              onChange={handle2FAToggle}
            />
            <label htmlFor="twoFactor" className="x-toggle-label"></label>
          </div>
        </div>

        {/* Password Change */}
        <h3 className="x-profile-subtitle">Changer le mot de passe</h3>
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <label className="x-profile-label">Ancien mot de passe</label>
            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="form-control x-profile-input"
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="x-profile-label">Nouveau mot de passe</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="form-control x-profile-input"
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="x-profile-label">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordChange}
              className="form-control x-profile-input"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-4 text-end">
          <button type="button" onClick={handleSave} className="btn x-profile-save-btn">
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
