import '@/styles/css/market.css';
import '@/styles/css/style2.css';
import Footer3 from '@/components/Footer3';
import Header from '@/components/layout/listing/Header';

export default function RetourRemboursementPage() {

  return (
    <>
      <Header/> {/* Masque la barre de recherche et le panier */}

      <section className="header-section">
        <h2>BOOLi-STORE le retour est assuré !</h2>
        <h1>Retour & Remboursements</h1>
      </section>

      <section className="return-refund mt-4">
        <div className="text">
          <h2>Comment retourner un produit à BOOLi-STORE ?</h2>
          <p>
            Si le colis que vous avez reçu ne correspond pas à votre commande, présente un défaut
            ou ne vous satisfait pas, vous pouvez initier une demande de retour et de
            remboursement. Voici les étapes à suivre :
          </p>
          <p>
            <i className="fas fa-check"></i> <strong>Vérification du produit</strong>
          </p>
          <p>
            Assurez-vous que le produit est dans son état d’origine, avec tous ses accessoires et
            emballages.
          </p>
          <p>
            <i className="fas fa-check"></i> <strong>Demande de retour</strong>
          </p>
          <p>Remplissez le formulaire de retour ci-dessous en précisant le motif du retour.</p>
          <p>
            <i className="fas fa-check"></i> <strong>Validation de la demande</strong>
          </p>
          <p>
            Une fois votre demande examinée, vous recevrez une confirmation avec les instructions
            de retour.
          </p>
          <p>
            <i className="fas fa-check"></i> <strong>Expédition du produit</strong>
          </p>
          <p>Envoyez le produit à l’adresse indiquée en respectant les délais mentionnés.</p>
          <p>
            <i className="fas fa-check"></i> <strong>Contrôle du produit retourné</strong>
          </p>
          <p>
            À réception, notre équipe vérifie l’état du produit pour s’assurer qu’il respecte les
            conditions de retour.
          </p>
          <p>
            <i className="fas fa-check"></i> <strong>Remboursement ou échange</strong>
          </p>
          <p>
            Si le retour est validé, vous recevrez votre remboursement sous 5 jours via le mode de
            paiement initial ou un avoir pour un prochain achat.
          </p>
        </div>
        <img src="/Photo/RETOUR.JPG" alt="i#produit" />
      </section>

      <section className="process-section">
        <h2>Processus de Retour et Remboursement</h2>
        <div className="process-steps">
          <div className="step">
            <i className="fas fa-box-open"></i>
            <p>Vérifiez l’état du produit</p>
          </div>
          <div className="step">
            <i className="fas fa-file-invoice"></i>
            <p>Remplissez le formulaire de retour</p>
          </div>
          <div className="step">
            <i className="fas fa-truck"></i>
            <p>Expédiez le colis</p>
          </div>
          <div className="step">
            <i className="fas fa-money-check-alt"></i>
            <p>Recevez votre remboursement</p>
          </div>
        </div>
      </section>

      <section id="return-stepso">
        <h2>Notre Processus de Retour</h2>
        <div className="stepso">
          <div className="stepo">
            <img src="/Photo/transfert_de_fond.jpg" alt="Étape 1" />
            <h3>Étape 1 : Demande de retour</h3>
            <p>Soumettez votre demande de retour via notre formulaire en ligne.</p>
          </div>
          <div className="stepo">
            <img src="/Photo/colis.jpg" alt="Étape 2" />
            <h3>Étape 2 : Préparez votre colis</h3>
            <p>Emballez le produit à retourner dans son emballage d’origine.</p>
          </div>
          <div className="stepo">
            <img src="/Photo/relais.jpg" alt="Étape 3" />
            <h3>Étape 3 : Expédiez le colis</h3>
            <p>Envoyez votre colis à notre adresse via le service de votre choix.</p>
          </div>
          <div className="stepo">
            <img src="/Photo/facture2.jpg" alt="Étape 4" />
            <h3>Étape 4 : Remboursement</h3>
            <p>Une fois le produit reçu et vérifié, vous serez remboursé.</p>
          </div>
        </div>
      </section>

      <section id="return-form">
        <h2>Êtes-vous prêts ??</h2>
        <form action="/submit-return.php" method="POST">
          <label htmlFor="order-number">Numéro de commande :</label>
          <input
            type="text"
            id="order-number"
            name="order-number"
            placeholder="Exemple : 0145"
            required
          />

          <label htmlFor="reason">Raison du retour :</label>
          <select id="reason" name="reason" required>
            <option value="">Sélectionnez une raison</option>
            <option value="defective">Produit défectueux</option>
            <option value="wrong-item">Produit incorrect</option>
            <option value="no-longer-needed">Produit non désiré</option>
            <option value="other">Autre</option>
          </select>

          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Expliquez en détail la raison de votre retour..."
            required
          ></textarea>

          <label htmlFor="refund-method">Méthode de remboursement :</label>
          <select id="refund-method" name="refund-method" required>
            <option value="">Sélectionnez une méthode</option>
            <option value="mobile-money">Mobile Money</option>
            <option value="credit-card">Carte Bancaire</option>
            <option value="credit-card">Carte de crédit</option>
            <option value="paypal">PayPal</option>
            <option value="store-credit">Crédit en magasin</option>
          </select>

          <button type="submit" className="btn1">
            Soumettre
          </button>
        </form>
      </section>

      <Footer3 />
    </>
  );
}