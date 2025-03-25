import React, { useState, useEffect } from "react";
import SignInOrLogout from "@/components/links/SignInOrLogout";

const SideMenu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
    }, 1000);
  }, []);

  const toggleMenu = () => setIsVisible(!isVisible);

  return (
    <section className="main-section">
      <section className="fond">
        <nav id="side-menu" className={`side-menu ${isVisible ? "show-menu" : ""}`}>
          <button id="menu-toggle" className={`menu-toggle-btn ${isVisible ? "menu-visible" : ""}`} onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>
          <ul className="menu-list">
            <h2>BIBLIOTHEQUE [BL]</h2>
            <img src="/media/bibliotheque.png" alt="" id="image" />
            <li><a href=""><i className="fas fa-home"></i> Accueil</a></li>
            <li><i className="fas fa-sign-in-alt"></i> <SignInOrLogout/></li>
            <li><a href="/subscriptions"><i className="fa-solid fa-newspaper"></i> Abonnement</a></li>
            {/* Modal de réabonnement géré dans un composant séparé */}
            <li><a href="/library"><i className="fa-solid fa-book-open"></i> LIVRES</a></li>
            <li><a href="#"><i className="fa-solid fa-film"></i> Bandes dessinées</a></li>
            <li><a href="#"><i className="fa-solid fa-database"></i> Banque d’Epreuve</a></li>
            <li><a href="/formation"><i className="fa-solid fa-exclamation-triangle"></i> Formation</a></li>
            <li><a href="/forum"><i className="fas fa-comments"></i> Forum (Aide)</a></li>
            <li><a href="/quiz"><i className="fas fa-gamepad" title="QUIZ"></i> Apprentissage et Loisire</a></li>
            <li><a href="/subscriptions/purchase"><i className="fas fa-cart-plus" id="conu"></i> Achat de Doc</a></li>
            <li><a href="/library/detail"><i className="fas fa-info-circle"></i> Conduite</a></li>
          </ul>
        </nav>
      </section>
    </section>
  );
};

export default SideMenu;