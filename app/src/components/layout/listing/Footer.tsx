// components/layout/static/Footer.tsx
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="best">
      <div className="index-footer row col-12">
        <div className="about col-sm-2 mt-2 text-left">
          <h5>Qui sommes-nous</h5>
          <Link href="about.html" target="_blank">
            A propos de nous
          </Link>
          <br />
          <br />
          <Link href="carriere professionnelle.html" target="_blank">
            Carrière chez BOOLi-Store
          </Link>
          <br />
          <br />
          <Link href="condition et termes.html" target="_blank">
            Conditions d&apos; utilisation
          </Link>
          <br />
          <br />
          <Link href="politique-confidentialité1.html" target="_blank">
            Politique de Confidence
          </Link>
          <br />
        </div>

        <div className="link-1 col-sm-10 mt-2">
          <h5 className="p">Suivez nous :</h5>
          <Link href="https://www.facebook.com" target="_blank">
            <i className="fab fa-facebook-f"></i> Facebook
          </Link>{" "}
          <Link href="https://www.instagram.com" target="_blank">
            <i className="fab fa-instagram"></i> Instagram
          </Link>{" "}
          <Link href="https://www.tiktok.com" target="_blank">
            <i className="fab fa-tiktok"></i> Tiktok
          </Link>{" "}
          <Link href="https://www.twitter.com" target="_blank">
            <i className="fab fa-twitter"></i> Twitter
          </Link>{" "}
          <Link href="https://www.linkedin.com" target="_blank">
            <i className="fab fa-linkedin-in"></i> LInkedin
          </Link>{" "}
          <Link href="mailto:example@example.com" target="_blank">
            <i className="fas fa-envelope"></i> Email
          </Link>{" "}
          <Link href="https://www.youtube.com" target="_blank">
            <i className="fab fa-youtube"></i> Youtube
          </Link>
          <br />
          <p className="cober">
            PLATE-FORME DE COMMERCIALISATION AFRICAINE
            <br />
            <Link href="partenariat aceuil.html" target="_blank" id="call">
              <i className="fas fa-handshake"></i> Devenir Partenaire
            </Link>
          </p>
        </div>
      </div>

      <div className="index-footer row col-12">
        <div className="about col-sm-4 mt-2">
          <h5>AIDE_Assistance</h5>
          <Link href="helph_market.html" target="_blank">
            Centre d&apos; Assistance
          </Link>
          <br />
          <br />
          <Link href="contact.html" target="_blank">
            Contacter le support client
          </Link>
          <br />
          <br />
          <Link href="suivi_de_commande.html" target="_blank">
            Suivre votre commande
          </Link>
          <br />
          <br />
          <Link href="command_annul.html" target="_blank">
            Annuler une commande
          </Link>
          <br />
          <br />
          <Link href="contact.html" target="_blank">
            Signaler un problème
          </Link>
          <br />
          <br />
          <Link href="Process_paid.html" target="_blank">
            <i className="fa fa-hand-holding-usd">Comment Paier</i>
          </Link>
        </div>

        <div className="about col-sm-4 mt-2">
          <h5>Vendre sur BOOLi-STORE</h5>
          <Link href="acceuil_boutique.html" target="_blank">
            Commencer à vendeur
          </Link>
          <br />
          <br />
          <Link href="Fournisseur.html" target="_blank">
            Devenir Fournisseur
          </Link>
          <br />
          <br />
          <Link href="newslatter.html" target="_blank">
            Newslatteur
          </Link>
          <br />
          <br />
          <Link href="service client.html" target="_blank">
            Service Client
          </Link>
          <br />
          <br />
          <Link href="comment.html" target="_blank">
            Suggestion
          </Link>
          <br />
          <br />
          <Link href="#" target="_parent">
            <span className="fa">RETOUR A L&apos; ACCEUIL</span>
          </Link>
        </div>

        <div className="about col-sm-2 mt-2">
          <h5>Assurance</h5>
          <Link href="#">Paiement sécuriser</Link>
          <br />
          <br />
          <Link href="garantie du site.html" target="_blank">
            Nos garanties
          </Link>
          <br />
          <br />
          <Link href="retour au remboussement.html" target="_blank">
            Retour-Rembourssement
          </Link>
          <br />
          <br />
          <Link href="vente_mise_en_service.html" target="_blank">
            Vente et mise en service
          </Link>
          <br />
          <br />
          <Link href="#" target="_blank">
            <i className="fab fa-cc-visa"></i> Visa
          </Link>
          <br />
          <br />
          <Link href="moyen_de_paie.html" target="_blank">
            <i className="fas fa-money-bill-wave payment-icon"></i> 1000 moyens
            de paie
          </Link>
          <br />
        </div>

        <div className="about col-sm-2 mt-2">
          <h5>Application</h5>
          <Link href="#" target="_blank">
            <i className="fab fa-google-play"></i> Télécharger BLS
          </Link>
        </div>

        <p className="Copyright text-center mt-2">
          Copyright © 2024 <br />
          BOOLi-Sore. Tout droit réservé.
        </p>
        <p className="text-center">
          L&apos; Afrique au centre du commerce mondial &copy;
          <i className="fab fa-whatsapp"></i> 96 78 07 62 Joignez-nous sur
          whatsapt pour discuter.
        </p>
      </div>
    </footer>
  );
};

export default Footer;