'use client';


import Footer3 from '@/components/Footer3';
import Header from '@/components/layout/listing/Header';
import '@/styles/css/market.css'
import '@/styles/css/style3.css';

export default function HelpPage() {

  return (
    <>
    
      <Header/>

      <section className="main-section">
        <h1>POSEZ TOUTES VOS PRÉOCCUPATIONS A NOTRE &apos; &apos;Chat&apos;&apos;</h1>
        <button className="btn" onClick={() => (window.location.href = '/chat.html')}>
          Discutez avec notre chat
        </button>
      </section>

      <div className="overlay-section">
        <div className="icon-box">
          <i className="fas fa-shopping-cart"></i>
          <h3>Achats</h3>
          <a href="/Panier.html">Commencer</a>
        </div>
        <div className="icon-box">
          <i className="fas fa-tools"></i>
          <h3>Services</h3>
          <a href="/services_acceuil.html">Explorez</a>
        </div>
        <div className="icon-box">
          <i className="fas fa-laptop"></i>
          <h3>Technologie</h3>
          <a href="/Technologie_africaine.html">Explorez</a>
        </div>
        <div className="icon-box">
          <i className="fas fa-car"></i>
          <h3>Réservation</h3>
          <a href="/filtre.html">Commencer</a>
        </div>
        <div className="icon-box">
          <i className="fas fa-briefcase"></i>
          <h3>Business</h3>
          <a href="/acceuil_boutique.html">Commencer</a>
        </div>
      </div>

      <div className="hero">
        <div className="particles">
          <div
            className="particle"
            style={{ top: '10%', left: '20%', width: '10px', height: '10px', animationDuration: '6s' }}
          ></div>
          <div
            className="particle"
            style={{ top: '30%', left: '50%', width: '12px', height: '12px', animationDuration: '7s' }}
          ></div>
          <div
            className="particle"
            style={{ top: '50%', left: '70%', width: '8px', height: '8px', animationDuration: '5s' }}
          ></div>
          <div
            className="particle"
            style={{ top: '60%', left: '80%', width: '15px', height: '15px', animationDuration: '8s' }}
          ></div>
          <div
            className="particle"
            style={{ top: '80%', left: '10%', width: '5px', height: '5px', animationDuration: '10s' }}
          ></div>
        </div>
        <div>
          <h4>Notre équipe technique vous assiste H/H</h4>
          <p>
            Posez-nous toutes vos préoccupations, inquiétudes, et doutes à notre chat pour en savoir
            plus sur BOOLi-STORE.world.
          </p>
        </div>
        <div className="links1">
          <a href="#" className="link1">Livraison</a>
          <a href="#" className="link1">Politique de remboursement</a>
          <a href="#" className="link1">Suivi de commande</a>
          <a href="#" className="link1">Commande et Annulation</a>
          <a href="#" className="link1">Foire numérique</a>
        </div>
      </div>

      <section className="advantages">
        <div className="advantage-card">
          <h3>Facilité de création</h3>
          <p>Pas besoin de compétences techniques, lancez votre boutique en quelques clics.</p>
        </div>
        <div className="advantage-card">
          <h3>Commencer les ventes</h3>
          <p>Choisissez parmi une large gamme de produits et commencez à vendre.</p>
        </div>
        <div className="advantage-card">
          <h3>Paiements sécurisés</h3>
          <p>Intégration de solutions de paiement fiables et sécurisées pour vos transactions.</p>
        </div>
        <div className="advantage-card">
          <h3>Suivi des ventes</h3>
          <p>Suivez vos performances en temps réel et gérez facilement votre inventaire.</p>
        </div>
      </section>

      <section>
        <div className="faq-section">
          <div className="faq-container">
            <div className="faq-item">
              <p>Comment suivre ma commande ?</p>
              <img src="/Photo/colis.jpg" alt="Suivi de commande" />
              <div className="faq-answer">
                Vous pouvez suivre votre commande via votre espace client.
              </div>
            </div>
            <div className="faq-item">
              <p>Quels sont les délais de livraison ?</p>
              <img src="/Photo/visibité.jpg" alt="Délais de livraison" />
              <div className="faq-answer">
                Les délais varient entre 24h et 72h selon la destination.
              </div>
            </div>
            <div className="faq-item">
              <p>Quels sont les frais d&apos; expédition ?</p>
              <img src="/Photo/billet.png" alt="Frais d'expédition" />
              <div className="faq-answer">
                Les frais sont calculés en fonction du poids et de la distance.
              </div>
            </div>
            <div className="faq-item">
              <p>Comment retourner un produit ?</p>
              <img src="/Photo/vente1.jpg" alt="Retour de produit" />
              <div className="faq-answer">
                Vous avez 14 jours pour retourner un produit non utilisé.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="faq-section">
          <div className="faq-container">
            <div className="faq-item">
              <p>Quels modes de paiement acceptez-vous ?</p>
              <img src="/Photo/facture2.jpg" alt="Modes de paiement" />
              <div className="faq-answer">
                Nous acceptons Mobile money, Visa, Mastercard, PayPal et virement bancaire.
              </div>
            </div>
            <div className="faq-item">
              <p>Puis-je modifier ou annuler ma commande ?</p>
              <img src="/Photo/livraison.jpg" alt="Modification de commande" />
              <div className="faq-answer">
                Vous pouvez modifier ou annuler votre commande avant l’expédition.
              </div>
            </div>
            <div className="faq-item">
              <p>Offrez-vous des garanties sur vos produits ?</p>
              <img src="/Photo/verified_panier.jpg" alt="Garantie produit" />
              <div className="faq-answer">
                Oui, nos produits sont garantis entre 1 et 2 ans selon l’article.
              </div>
            </div>
            <div className="faq-item">
              <p>Comment contacter le service client ?</p>
              <img src="/Photo/info_paid.jpg" alt="Service client" />
              <div className="faq-answer">
                Vous pouvez nous contacter par chat, email ou téléphone 24/7.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq">
        <h3>Hi ! Les requêtes fréquentes.</h3>
        <div className="faq-item">
          <h4>Comment créer un compte ?</h4>
          <p>
            Pour créer un compte, cliquez sur le bouton &apos;Connexion&apos; en haut à gauche de la page
            d&apos; accueil, puis remplissez les informations.
          </p>
        </div>
        <div className="faq-item">
          <h4>Comment réinitialiser mon mot de passe ?</h4>
          <p>
            Pour réinitialiser votre mot de passe, cliquez sur &apos;Mot de passe oublié&apos; sur la page
            de connexion et suivez les instructions pour récupérer votre compte.
          </p>
        </div>
        <div className="faq-item">
          <h4>Comment supprimer mon compte ?</h4>
          <p>
            Si vous souhaitez supprimer votre compte, contactez notre service client et nous
            traiterons votre demande dans les plus brefs délais.
          </p>
        </div>
        <div className="faq-item">
          <h4>Comment puis-je créer ma boutique ?</h4>
          <p>
            Il vous suffit de vous inscrire, de choisir un modèle, et de personnaliser votre
            boutique en quelques étapes simples.
          </p>
        </div>
        <div className="faq-item">
          <h4>Quels sont les frais pour utiliser la plateforme ?</h4>
          <p>
            Nos tarifs sont abordables et transparents. Consultez notre page de tarifs pour plus
            d&apos; informations.
          </p>
        </div>
        <div className="faq-item">
          <h4>Est-ce que je peux vendre des produits physiques et numériques ?</h4>
          <p>Oui, vous pouvez vendre des produits physiques et numériques sur notre plateforme.</p>
        </div>
      </section>

      <section>
        <button className="btn-tuto" onClick={() => (window.location.href = '/chat.html')}>
          <i className="fas fa-play-circle"></i> Discutez avec notre chat
        </button>
      </section>

      <Footer3 />
    </>
  );
}