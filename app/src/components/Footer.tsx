import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="index_footer">
      <div className="pied_de_page col-12 mt-4 text-center">
        <a href="/store">BOOLi-STORE.world</a><br />
        <a href="/suggestion">Suggestion</a> | <a href="/login">Se connecter</a> | <a href="/partnership">Partenaire</a> | <a href="#">Politique et Confidentialité</a><br />
        <a href="/faq">FAQ</a> | <a href="/enterprise">Entreprise</a> | <a href="/contact">Contact</a> | <a href="/forum">Forum</a> | <a href="#">Mieux nous comprendre</a> | <a href="/library">Découvrir des arrivages</a> | <a href="/faq">Comment s’abonner ?</a><br />
        <a href="#">Condition d’utilisation</a>
      </div>
    </footer>
  );
};

export default Footer;