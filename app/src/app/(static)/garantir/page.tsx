'use client';

import '@/styles/css/market.css';
import '@/styles/css/style2.css';
import { useEffect } from 'react';
import Footer3 from '@/components/Footer3';
import Header from '@/components/layout/listing/Header';
import TopHeader from '@/components/layout/listing/TopHeader';

export default function GuaranteesPage() {
  useEffect(() => {
    // Script inline pour les guarantee-cards
    const inlineScript = document.createElement('script');
    inlineScript.textContent = `
      const guaranteeCards = document.querySelectorAll('.guarantee-card');
      guaranteeCards.forEach(card => {
        card.addEventListener('click', () => {
          alert('Pour plus de détails sur cette garantie, veuillez nous contacter.');
        });
      });
    `;
    document.body.appendChild(inlineScript);
  }, []);

  return (
    <>
    <TopHeader/>
      <Header/> {/* Masque la barre de recherche et le panier */}

      <section className="header-section">
        <h1>Nos Garanties</h1>
        <p id="phrase">
          Nous vous offrons des garanties sur chacun de vos achats sur le site. Découvrez-les
          ci-dessous.
        </p>
      </section>

      <section className="return-refund mt-4">
        <div className="text">
          <h2>Acheter en toute sérénité à BOOLi-STORE !</h2>
          <p>
            Si votre produit ne correspond pas à vos attentes, présente un défaut ou si vous
            changez d’avis, nous vous proposons plusieurs solutions adaptées pour un retour ou un
            remboursement en toute simplicité. Découvrez ci-dessous toutes nos garanties.
          </p>
          <p>
            <i className="fas fa-check"></i> <strong>Garantie de conformité</strong>
          </p>
          <p>
            Si le produit reçu ne correspond pas à la description ou aux caractéristiques
            annoncées, vous pouvez demander un échange ou un remboursement.
          </p>
          <p>
            <i className="fas fa-check"></i> <strong>Garantie contre les défauts de fabrication</strong>
          </p>
          <p>
            Tout produit présentant un défaut de fabrication sera réparé ou remplacé sans frais
            dans la période couverte par la garantie.
          </p>
          <p>
            <i className="fas fa-check"></i> <strong>Garantie de satisfaction</strong>
          </p>
          <p>
            Si vous n’êtes pas satisfait de votre achat, vous pouvez le retourner sous X jours
            après réception pour un échange ou un remboursement.
          </p>
          <p>
            <i className="fas fa-check"></i> <strong>Garantie de service après-vente (SAV)</strong>
          </p>
          <p>
            Assistance technique et support client pour toute question ou problème lié à
            l’utilisation du produit.
          </p>
          <p>
            <i className="fas fa-check"></i> <strong>Garantie d’échange rapide</strong>
          </p>
          <p>Remplacement accéléré du produit en cas de panne avérée sous garantie.</p>
          <p>
            <i className="fas fa-check"></i> <strong>Garantie prolongée (optionnelle)</strong>
          </p>
          <p>Possibilité d’étendre la garantie en souscrivant à une extension payante.</p>
          <p>
            <i className="fas fa-check"></i> <strong>Garantie de remboursement</strong>
          </p>
          <p>
            Remboursement intégral si le produit est retourné dans son état d’origine sous X jours.
          </p>
          <p>
            <i className="fas fa-check"></i> <strong>Garantie de prise en charge des frais de retour</strong>
          </p>
          <p>
            Si le retour est dû à une erreur de notre part ou à un défaut du produit, les frais de
            retour sont entièrement pris en charge.
          </p>
        </div>
        <img src="/Photo/facture3.jpg" alt="i#produit" />
      </section>

      <section className="guarantees-section">
        <div className="guarantee-card">
          <div className="icon">
            <img src="/Photo/international.jpg" alt="Garantie 1" />
          </div>
          <h2>Satisfaction Garantie</h2>
          <p className="phras">
            Nous garantissons une satisfaction totale avec une politique de remboursement sous 3
            jours si vous n’êtes pas satisfait de votre produit.
          </p>
        </div>

        <div className="guarantee-card">
          <div className="icon">
            <img src="/Photo/verified_panier.jpg" alt="Authenticité" />
          </div>
          <h2>Authenticité Assurée</h2>
          <p className="phras">
            Chaque produit vendu sur notre site est 100% authentique et vérifié pour correspondre
            aux descriptions affichées.
          </p>
        </div>

        <div className="guarantee-card">
          <div className="icon">
            <img src="/Photo/avion_express.jpg" alt="Livraison Rapide" />
          </div>
          <h2>Livraison Rapide</h2>
          <p className="phras">
            Nous offrons une garantie de livraison rapide avec la possibilité de suivre votre
            commande en temps réel.
          </p>
        </div>
      </section>

      <section className="garantie-container">
        <h2>Nos Garanties Après-Vente</h2>
        <div className="garantie-grid">
          <div className="garantie-card">
            <i className="fas fa-box-open"></i>
            <h3>Garantie de Conformité</h3>
            <p>
              Si votre produit ne correspond pas à votre commande, nous le remplaçons ou vous
              remboursons.
            </p>
          </div>

          <div className="garantie-card">
            <i className="fas fa-tools"></i>
            <h3>Garantie Réparation</h3>
            <p>
              Tout défaut de fabrication est pris en charge et réparé gratuitement pendant la
              période de garantie.
            </p>
          </div>

          <div className="garantie-card">
            <i className="fas fa-exchange-alt"></i>
            <h3>Échange Facile</h3>
            <p>Vous pouvez échanger votre produit sous 30 jours après réception en cas de non-satisfaction.</p>
          </div>

          <div className="garantie-card">
            <i className="fas fa-money-bill-wave"></i>
            <h3>Remboursement Rapide</h3>
            <p>Recevez votre remboursement en 7 jours après validation du retour.</p>
          </div>

          <div className="garantie-card">
            <i className="fas fa-shipping-fast"></i>
            <h3>Retour Gratuit</h3>
            <p>Nous prenons en charge les frais de retour en cas de produit défectueux ou erroné.</p>
          </div>

          <div className="garantie-card">
            <i className="fas fa-headset"></i>
            <h3>Service Client 24/7</h3>
            <p>Notre équipe est disponible 24h/24 et 7j/7 pour toute assistance.</p>
          </div>

          <div className="garantie-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Protection Casse Accidentelle</h3>
            <p>En cas de casse involontaire, nous réparons ou remplaçons votre produit.</p>
          </div>

          <div className="garantie-card">
            <i className="fas fa-star"></i>
            <h3>Assistance VIP</h3>
            <p>Un support exclusif et des avantages premium pour nos clients fidèles.</p>
          </div>
        </div>
      </section>

      <Footer3 />
    </>
  );
}