import '@/styles/css/market.css';
import '@/styles/css/style2.css';
import Footer3 from '@/components/Footer3';
import Header from '@/components/layout/listing/Header';
import TopHeader from '@/components/layout/listing/TopHeader';

export default function VenteMiseEnServicePage() {

  return (
    <>
    <TopHeader/>
      <Header/> {/* Masque la barre de recherche et le panier */}

      <div className="header_entete">
        <h1>Vente et Mise en Service</h1>
      </div>

      <div className="sectionne">
        <h2>Vente</h2>
        <p>
          Notre service de vente vous permet de découvrir et d’acheter une large gamme de produits
          de qualité. Que vous recherchiez les dernières technologies, des équipements pour la
          maison, ou des produits spécialisés, nous avons ce qu’il vous faut. Voici comment nous
          facilitons le processus d’achat :
        </p>
        <ul>
          <li>
            <strong>Large choix de produits</strong> : Nous proposons une vaste sélection de
            produits dans différentes catégories, allant des appareils électroniques aux articles
            de maison.
          </li>
          <li>
            <strong>Facilité de navigation</strong> : Notre site est conçu pour rendre la
            navigation simple et intuitive. Vous pouvez facilement filtrer les produits par
            catégorie, marque, prix, et plus encore.
          </li>
          <li>
            <strong>Descriptions détaillées</strong> : Chaque produit est accompagné d’une
            description détaillée, de spécifications techniques, et d’avis de clients pour vous
            aider à faire le meilleur choix.
          </li>
          <li>
            <strong>Options de paiement sécurisées</strong> : Nous offrons plusieurs méthodes de
            paiement sécurisées pour que vous puissiez payer en toute confiance.
          </li>
        </ul>
        <div className="image-container">
          <img src="/Photo/facture1.jpg" alt="Vente" />
        </div>
      </div>

      <div className="section">
        <h2>Mise en Service</h2>
        <p>
          Après l’achat, nous offrons des services de mise en service pour garantir que vos
          nouveaux produits fonctionnent correctement dès leur arrivée. Notre équipe de
          professionnels est là pour vous aider à chaque étape du processus. Voici ce que nous
          proposons :
        </p>
        <ul>
          <li>
            <strong>Installation professionnelle</strong> : Nous proposons des services
            d’installation pour de nombreux types de produits, y compris les équipements
            électroniques, les appareils ménagers, et les systèmes de sécurité.
          </li>
          <li>
            <strong>Configuration et tests</strong> : Notre équipe assure la configuration
            correcte et les tests de vos produits pour vérifier leur bon fonctionnement avant
            votre première utilisation.
          </li>
          <li>
            <strong>Formation et support</strong> : Nous offrons des sessions de formation pour
            vous familiariser avec les fonctionnalités de vos nouveaux produits. En cas de
            problème, notre service client est disponible pour vous assister.
          </li>
          <li>
            <strong>Entretien et assistance</strong> : Nous proposons également des services
            d’entretien et de réparation pour assurer la longévité et le bon état de vos produits.
          </li>
        </ul>
        <div className="image-container">
          <img src="/Photo/maintenance.jpg" alt="Vente" />
        </div>
      </div>

      <div className="section">
        <h2>Conclusion</h2>
        <p>
          Nous nous engageons à fournir une expérience d’achat exceptionnelle et un service
          après-vente de haute qualité. Si vous avez des questions sur nos services de vente ou de
          mise en service, n’hésitez pas à contacter notre équipe. Nous sommes là pour vous aider
          et veiller à ce que vous soyez entièrement satisfait de votre achat.
        </p>
      </div>

      <Footer3 />
    </>
  );
}