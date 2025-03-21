// src/components/Footer3.tsx
import SignInOrLogout from "./links/SignInOrLogout"; // Ajustez le chemin selon votre structure

const Footer3 = () => {
  return (
    <footer className="indx_footer">
      <div className="pied_de_page col-12 mt-4 text-center">
        <a href="">BOOLi-STORE.world</a>
        <br />
        <a href="/comment.html">Suggestion</a> | <SignInOrLogout /> |{' '}
        <a href="/Partenaiat.html">Partenaire</a> |{' '}
        <a href="#">Politique et Confidentialité</a>
        <br />
        <a href="/help.html">FAQ</a> | <a href="/enterprise.html"> Entreprise</a> |{' '}
        <a href="/contact.html"> Contact</a> | <a href="/Forum.html"> Forum</a> |{' '}
        <a href="#"> Mieux nous comprendre</a> |{' '}
        <a href="/library.css"> Découvrir des arrivages</a> |{' '}
        <a href="/help.html"> Comment s&apos; abonner ?</a>
        <br />
        <a href="#"> Condition d&apos; utilisation</a>
      </div>
    </footer>
  );
};

export default Footer3;