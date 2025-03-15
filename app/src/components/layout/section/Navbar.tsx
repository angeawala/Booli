"use client";

import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="cote col-sm-2">
      <div className="sidebar">
        <ul>
          <li className="menu-item">
            <button onClick={() => window.open("Reservation_acceuil1.html", "_blank")}>
              <i className="fas fa-calendar-check"></i> Réservation
            </button>
            <div className="submenu">
              <div className="submenu-column">
                <h6>Reserver (&apos;Bus..&apos;)</h6>
                <a href="Reservation.html#destinations">Services de reservation</a>
                <a href="Reservation_bus.html">Agences de voyage</a>
              </div>
              <div className="submenu-column">
                <h6>(Hotels_Auberges)</h6>
                <a href="Reservation.html#experiences">Nos Hotels_Autres</a>
                <a href="Reservation++.html">Autres services</a>
              </div>
              <div className="submenu-column">
                <h6>Vols</h6>
                <a href="Reservation.html#blog">Agences de voyage</a>
                <a href="#">Autres services</a>
              </div>
              <div className="submenu-column">
                <h6>Bateau</h6>
                <a href="Reservation.html#batteau">Locations</a>
                <a href="#">Services de locations</a>
              </div>
            </div>
          </li>

          <li className="menu-item">
            <button onClick={() => window.open("Formation_acceuil.html", "_blank")}>
              <i className="fas fa-chalkboard-teacher"></i> Formations
            </button>
            <div className="submenu">
              <div className="submenu-column">
                <h6>BOOLi-STORE Formation</h6>
                <a href="Formation_Blog.html#blog1">+ 1.500 Formations</a>
                <a href="program_lang.html">Exclusivité</a>
              </div>
              <div className="submenu-column">
                <h6>Entreprise (S.A.L)</h6>
                <a href="Formation_Blog.html#blog4">Diverses Formations</a>
                <a href="#">Formation en cours</a>
              </div>
              <div className="submenu-column">
                <h6>ONG</h6>
                <a href="Formation_Blog.html#blog2">Formations disponibles</a>
                <a href="#">Formation en cours</a>
              </div>
              <div className="submenu-column">
                <h6>CENTRE-Professionnel</h6>
                <a href="Formation_Blog.html#blog3">Formations disponibles</a>
                <a href="#">Formation en cours</a>
              </div>
            </div>
          </li>

          <li className="menu-item">
            <button onClick={() => window.open("Opportinuité_acceuil2.html", "_blank")}>
              <i className="fas fa-lightbulb"></i> Opportunités
            </button>
            <div className="submenu">
              <div className="submenu-column">
                <h6>Formations</h6>
                <a href="Formation_Blog.html#blog1">Courtes Formations</a>
                <a href="postule_acceuil.html">Appels d&apos; Offres</a>
              </div>
              <div className="submenu-column">
                <h6>Recherche d&apos; Emploie</h6>
                <a href="Opportinuité.html">Profil</a>
                <a href="#">Procédure</a>
              </div>
              <div className="submenu-column">
                <h6>Assistance en ligne</h6>
                <a href="Opportinuité.html">Profil</a>
                <a href="#">Procedure</a>
              </div>
              <div className="submenu-column">
                <h6>Entreprise</h6>
                <a href="Opportinuité.html">Postuler pour un JOB</a>
                <a href="#">Procédure</a>
              </div>
            </div>
          </li>

          <li className="menu-item">
            <button onClick={() => window.open("services_acceuil.html", "_blank")}>
              <i className="fas fa-concierge-bell"></i> Services
            </button>
            <div className="submenu">
              <div className="submenu-column">
                <h6>Contact-Expert</h6>
                <a href="services_acceuil.html">Divers Secteurs</a>
                <a href="#">Autres services</a>
              </div>
              <div className="submenu-column">
                <h6>Experts</h6>
                <a href="services.html#batteau">Trouver un spécialistes</a>
                <a href="#">Etablissements</a>
              </div>
              <div className="submenu-column">
                <h6>Entreprise de prestations</h6>
                <a href="services.html#experiences">Entreprises</a>
                <a href="#">Entreprises Locales</a>
              </div>
              <div className="submenu-column">
                <h6>Service suplementaire</h6>
                <a href="services.html#blog">Création de compte</a>
                <a href="#">Détails</a>
              </div>
            </div>
          </li>

          <li className="menu-item">
            <button onClick={() => window.open("partenariat aceuil.html", "_blank")}>
              <i className="fas fa-handshake"></i> Partenariat
            </button>
            <div className="submenu">
              <div className="submenu-column">
                <h6>Visibilité</h6>
                <a href="Partenaiat.html#partenaire1">Gagnez en Africains</a>
              </div>
              <div className="submenu-column">
                <h6>Ressources</h6>
                <a href="Partenaiat.html#partenaire2">Accédez aux ressources</a>
              </div>
              <div className="submenu-column">
                <h6>Marketing</h6>
                <a href="Partenaiat.html#partenaire3">Atteigné un large marché</a>
              </div>
              <div className="submenu-column">
                <h6>Faire un Partenariat</h6>
                <a href="Partenaiat.html#partenaire4">Faire un partenariat</a>
              </div>
            </div>
          </li>

          <li className="menu-item">
            <button onClick={() => window.open("#Publicite", "_blank")}>
              <i className="fas fa-laptop"></i> Publicité
            </button>
            <div className="submenu">
              <div className="submenu-column">
                <h6>Produit</h6>
                <a href="#">Découvrez de nouvel arrivage</a>
                <a href="#">Contacter l&apos; entreprise</a>
              </div>
              <div className="submenu-column">
                <h6>Formation</h6>
                <a href="Formation_Blog.html">Annonce de formation</a>
                <a href="#">Formation en cours</a>
              </div>
              <div className="submenu-column">
                <h6>Boutiques</h6>
                <a href="#greatmarket">Nos meilleurs butiques</a>
                <a href="#">Voir tout</a>
              </div>
              <div className="submenu-column">
                <h6>Autres PUB</h6>
                <a href="Opportinuité.html">Découvrir d&apos; autres publicités</a>
                <a href="#">Contacter l&apos; entreprise</a>
              </div>
            </div>
          </li>

          <li className="menu-item">
            <button onClick={() => window.open("Super_marcher.html", "_blank")}>
              <i className="fas fa-shopping-basket"></i> Super Marcher
            </button>
            <div className="submenu">
              <div className="submenu-column">
                <h6>Produit Agricolr</h6>
                <a href="#">Terbercules, Céréales</a>
                <a href="#">Voir d&apos; avantage</a>
              </div>
              <div className="submenu-column">
                <h6>Cosmétiques</h6>
                <a href="#">Pomade, Savon..</a>
                <a href="#">Voir d&apos; avantage</a>
              </div>
              <div className="submenu-column">
                <h6>Accessoires Cuisine</h6>
                <a href="#">casserol, Cuillère</a>
                <a href="#">Voir d&apos; avantage</a>
              </div>
              <div className="submenu-column">
                <h6>Découverte</h6>
                <a href="#" target="_blank">Voir tout</a>
              </div>
            </div>
          </li>

          <li className="menu-item">
            <button onClick={() => window.open("boutique.html", "_blank")}>
              <i className="fas fa-store"></i> Boutiques offi..
            </button>
          </li>
        </ul>

        <div id="pss">
          <a href="cathalogue++.html" target="_blank">Autres Classes</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;