import Header from '@/components/layout/listing/Header';
import Footer3 from '@/components/Footer3';
import "@/styles/css/market.css";
import '@/styles/css/style2.css';


// Composant principal de la page Conditions d'utilisation
export default function ConditionsPage() {

  return (
    <>
    <Header/>
        {/* Bannière principale */}
        <div className="entete1">
          <h1>Conditions d&apos; Utilisation BOOLi-STORE</h1>
        </div>

        {/* Introduction */}
        <div className="section">
          <h2>Introduction</h2>
          <p>
            <span className="span"> L</span>es présentes Conditions d&apos; Utilisation décrivent les
            règles et règlements régissant l&apos; utilisation de la présente plateforme BOOLi.com. En
            accédant à ce site et en utilisant nos services, vous acceptez de vous conformer à ces
            conditions. Il est important que vous lisiez attentivement ces conditions avant de
            naviguer ou d&apos; effectuer une quelconque action sur notre site. Si vous n&apos; êtes pas
            d&apos; accord avec l&apos; une des dispositions des présentes Conditions d&apos; Utilisation, nous vous
            prions à cesser immédiatement l&apos; utilisation de notre site.
          </p>
          <p>
            Ces conditions sont mises à jour régulièrement. Nous nous réservons le droit de les
            modifier à tout moment. Toute modification prendra effet dès sa publication sur cette
            page. Nous vous encourageons donc à consulter régulièrement cette page afin de rester
            informé des mises à jour. Votre utilisation continue de notre site après la
            modification des Conditions d&apos; Utilisation vaut acceptation des nouvelles conditions.
          </p>
        </div>

        {/* Utilisation de la Plateforme */}
        <div className="section">
          <h2>Utilisation de la Plateforme</h2>
          <p>
            En utilisant notre plateforme, vous acceptez de respecter toutes les lois applicables
            ainsi que les présentes Conditions d&apos; Utilisation. Vous vous engagez à ne pas utiliser
            notre plateforme de manière à porter atteinte aux droits des autres utilisateurs, à
            nuire à notre service ou à enfreindre les lois en vigueur. En particulier, vous
            acceptez de ne pas :
          </p>
          <ul>
            <li>
              Publier ou transmettre tout contenu illégal, nuisible, diffamatoire, offensant, ou
              frauduleux
            </li>
            <li>
              Usurper l&apos; identité d&apos; une autre personne ou entité, ou fournir de fausses informations
              lors de la création de votre compte
            </li>
            <li>
              Utiliser la plateforme pour mener des activités illégales ou non autorisées, telles
              que des attaques informatiques, des piratages, ou des fraudes
            </li>
            <li>
              Accéder sans autorisation à des parties restreintes du site ou perturber son bon
              fonctionnement
            </li>
            <li>
              Envoyer des spams, ou collecter des informations sur d&apos; autres utilisateurs sans leur
              consentement
            </li>
          </ul>
          <p>
            Toute utilisation abusive de notre plateforme pourra entraîner des mesures
            correctives, y compris la suspension ou la résiliation de votre compte et des
            poursuites judiciaires si nécessaire.
          </p>
        </div>

        {/* Création de Compte */}
        <div className="section">
          <h2>Création de Compte</h2>
          <p>
            Pour accéder à certaines fonctionnalités de notre site, vous devez créer un compte.
            Lors de l&apos; inscription, vous devez fournir des informations exactes, complètes et à
            jour. Vous êtes entièrement responsable de la sécurité de votre compte, y compris la
            confidentialité de votre mot de passe. Vous ne devez en aucun cas partager vos
            identifiants avec des tiers. Si vous suspectez une utilisation non autorisée de votre
            compte, vous devez nous en informer immédiatement.
          </p>
          <p>
            Nous nous réservons le droit de suspendre ou de fermer votre compte si nous détectons
            des activités suspectes, si vous enfreignez les présentes Conditions d&apos; Utilisation, ou
            si les informations que vous avez fournies sont fausses ou trompeuses.
          </p>
        </div>

        {/* Propriété Intellectuelle */}
        <div className="section">
          <h2>Propriété Intellectuelle</h2>
          <p>
            Le contenu de ce site, y compris les textes, images, graphiques, logos, vidéos, et
            autres éléments multimédias, est protégé par les lois sur la propriété intellectuelle.
            Nous sommes propriétaires ou détenteurs des licences sur ces éléments, et vous n&apos; êtes
            pas autorisé à les utiliser sans notre consentement préalable.
          </p>
          <p>
            Il est strictement interdit de reproduire, distribuer, modifier, ou exploiter tout
            élément de notre site à des fins commerciales ou publiques sans autorisation écrite.
            Toute violation de ces droits peut entraîner des poursuites judiciaires.
          </p>
        </div>

        {/* Achats et Paiements */}
        <div className="section">
          <h2>Achats et Paiements</h2>
          <p>
            En passant une commande sur notre site, vous acceptez de fournir des informations de
            paiement valides et complètes. Tous les prix affichés incluent les taxes applicables,
            sauf indication contraire. Nous nous réservons le droit de modifier les prix des
            produits ou services à tout moment, mais ces changements n&apos; affecteront pas les
            commandes déjà confirmées.
          </p>
          <p>
            Les paiements sont effectués via des passerelles sécurisées pour garantir la protection
            de vos données financières. Nous déclinons toute responsabilité en cas d&apos; erreur ou de
            défaillance liée aux systèmes de paiement externes.
          </p>
        </div>

        {/* Politique de Retour et Remboursement */}
        <div className="section">
          <h2>Politique de Retour et Remboursement</h2>
          <p>
            Nous nous efforçons de garantir la satisfaction de nos clients. Si vous n&apos; êtes pas
            satisfait de votre achat, vous pouvez demander un retour ou un échange dans un délai de
            [Nombre de jours] jours suivant la réception de votre commande, à condition que le
            produit soit retourné dans son état d&apos; origine, avec son emballage intact.
          </p>
          <p>
            Pour initier une demande de retour, veuillez contacter notre service client en
            fournissant les détails de votre commande et les raisons du retour. Les frais de
            retour peuvent être à votre charge, sauf indication contraire. Une fois que nous
            aurons reçu le produit retourné et vérifié son état, nous traiterons votre
            remboursement ou échange selon les modalités convenues.
          </p>
        </div>

        {/* Limitation de Responsabilité */}
        <div className="section">
          <h2>Limitation de Responsabilité</h2>
          <p>
            Nous faisons de notre mieux pour garantir que notre plateforme soit accessible et
            fonctionnelle en tout temps. Cependant, nous ne pouvons pas garantir qu&apos; il n&apos; y aura
            pas d&apos; interruptions ou de dysfonctionnements. Nous ne serons pas responsables des
            pertes ou dommages subis suite à l&apos; utilisation de notre site, y compris les
            interruptions de service, les erreurs techniques, ou les attaques informatiques.
          </p>
          <p>
            Notre responsabilité sera limitée au montant que vous avez payé pour les produits ou
            services concernés, et en aucun cas nous ne serons responsables des pertes indirectes,
            consécutives, ou punitives.
          </p>
        </div>

        {/* Confidentialité et Sécurité */}
        <div className="section">
          <h2>Confidentialité et Sécurité</h2>
          <p>
            Nous respectons la confidentialité de vos informations personnelles. Nous collectons,
            utilisons et protégeons vos données conformément à notre{' '}
            <a href="/politique-confidentialité1.html">Politique de Confidentialité</a>. Nous nous
            engageons à ne jamais vendre, partager ou divulguer vos informations personnelles à
            des tiers sans votre consentement, sauf si la loi l&apos; exige.
          </p>
          <p>
            Nous utilisons des mesures de sécurité appropriées pour protéger vos données contre
            l&apos; accès non autorisé, l&apos; altération, ou la perte. Cependant, aucune transmission de
            données sur Internet ne peut être entièrement sécurisée, et nous ne pouvons pas
            garantir la sécurité absolue de vos informations.
          </p>
        </div>

        {/* Contact */}
        <div className="section">
          <h2>Nous Contacter</h2>
          <p>
            Si vous avez des questions concernant ces Conditions d&apos; Utilisation, ou si vous
            souhaitez nous contacter pour toute autre raison, vous pouvez nous écrire à l&apos;adresse
            suivante :
          </p>
          <p className="link1">
            Joignez-vous : <a href="/contact.html">booli@aide.com</a>
          </p>
          <p>Contact : (+229 96 78 07 62).</p>
        </div>
        <Footer3/>
    </>
  );
}