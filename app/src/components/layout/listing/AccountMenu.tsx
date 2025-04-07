"use client";

import SignInOrLogout from "@/components/links/SignInOrLogout";

export default function AccountMenu() {
  return (
    <div
      className="connex2 col-sm-2 text-center mt-3 ml-4 x-menu-header"
      style={{ display: "block", position: "relative" }}
    >
      <a href="#" id="connect1-btn">
        <img src="/media/user2.png" id="con" alt="Mon Compte" /> Mon Compte
      </a>
      <div className="dropdown1-menu">
        <SignInOrLogout />
        <a href="dashboard" target="_blank">Tableau de Bord</a>
        <a href="dashboard/suivi_historique" target="_blank">Vos Commandes</a>
        <a href="/connexion_client" target="_blank">Vos Souhaits</a>
      </div>
    </div>
  );
}