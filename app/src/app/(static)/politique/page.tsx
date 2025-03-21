import '@/styles/css/market.css';
import '@/styles/css/style2.css';
import Footer3 from '@/components/Footer3';
import Header from '@/components/layout/listing/Header';

export default function OffresOpportunitePage() {

  return (
    <>
      <Header/> {/* Masque la barre de recherche et le panier */}

      <div className="entete1">
        <h1>Politique de Confidentialité</h1>
      </div>

      <div className="section">
        <h2 className="center">Introduction</h2>
        <p>
          La présente Politique de Confidentialité décrit comment nous collectons, utilisons, et
          protégeons vos données personnelles lorsque vous accédez à notre plateforme. Nous
          attachons une grande importance à la protection de votre vie privée et nous nous
          engageons à traiter vos informations personnelles de manière responsable.
        </p>
        <p>
          En utilisant notre site, vous acceptez la collecte et l’utilisation de vos informations
          conformément à cette Politique de Confidentialité. Nous vous encourageons à lire
          attentivement cette politique afin de bien comprendre comment nous protégeons vos
          données et votre vie privée. Si vous avez des questions, n’hésitez pas à nous contacter.
        </p>
      </div>

      <div className="section">
        <h2>Collecte des Informations Personnelles</h2>
        <p>
          Nous collectons plusieurs types d’informations afin de vous offrir une meilleure
          expérience sur notre site et de fournir des services personnalisés. Ces informations
          incluent :
        </p>
        <ul>
          <li>
            Informations d’identification personnelles : votre nom, adresse e-mail, numéro de
            téléphone, adresse postale, etc.
          </li>
          <li>Informations de connexion : nom d’utilisateur, mot de passe, données de session</li>
          <li>
            Autres Informations : Nous recueillons ces informations dans le cadre d’améliorer et
            adapté le contenu de publicité selon votre profil renseigné et pour d’autres fins tel
            que la génération des actes, attestations, appel d’offres etc... sur le site web.
          </li>
          <li>
            Informations de paiement : lorsque vous effectuez des achats, nous recueillons vos
            informations de carte bancaire ou de compte PayPal
          </li>
          <li>
            Informations techniques : adresse IP, type de navigateur, système d’exploitation,
            pages visitées, et durée de la visite
          </li>
          <li>
            Données collectées via des cookies : pour analyser votre navigation et améliorer nos
            services
          </li>
        </ul>
        <p>
          La collecte de ces informations est essentielle pour le bon fonctionnement de notre
          site et pour personnaliser votre expérience utilisateur.
        </p>
      </div>

      <div className="section">
        <h2>Utilisation des Informations Personnelles</h2>
        <p>Les informations que nous collectons sont utilisées dans le but de :</p>
        <ul>
          <li>Fournir et améliorer nos services</li>
          <li>Personnaliser votre expérience utilisateur</li>
          <li>Gérer votre compte et sécuriser vos informations personnelles</li>
          <li>Traiter vos commandes et paiements</li>
          <li>
            Vous informer sur nos produits, services, offres spéciales et mises à jour importantes
          </li>
          <li>Analyser les tendances et améliorer la performance de notre site</li>
        </ul>
        <p>
          Vos informations ne seront jamais vendues ou partagées avec des tiers sans votre
          consentement, à moins que cela soit requis par la loi ou nécessaire pour protéger nos
          droits et notre sécurité.
        </p>
      </div>

      <div className="section">
        <h2>Cookies et Technologies de Suivi</h2>
        <p>
          Notre site utilise des cookies et d’autres technologies de suivi pour améliorer votre
          expérience de navigation. Les cookies sont de petits fichiers stockés sur votre appareil
          qui nous permettent de collecter des informations sur vos interactions avec notre site.
        </p>
        <p>Les types de cookies que nous utilisons incluent :</p>
        <ul>
          <li>
            <strong>Cookies fonctionnels</strong> : nécessaires pour le bon fonctionnement de
            notre site (ex : gestion de votre panier d’achats, connexion à votre compte)
          </li>
          <li>
            <strong>Cookies analytiques</strong> : nous aident à analyser l’utilisation de notre
            site afin d’en améliorer la performance (ex : Google Analytics)
          </li>
          <li>
            <strong>Cookies de personnalisation</strong> : utilisés pour personnaliser votre
            expérience sur notre site, comme la langue ou les préférences d’affichage
          </li>
        </ul>
        <p>
          Vous pouvez configurer votre navigateur pour refuser les cookies ou vous alerter
          lorsqu’un cookie est envoyé. Cependant, certaines fonctionnalités de notre site peuvent
          ne pas fonctionner correctement sans cookies.
        </p>
      </div>

      <div className="section">
        <h2>Partage des Informations Personnelles</h2>
        <p>
          Nous ne vendons, ne louons, ni ne partageons vos informations personnelles avec des
          tiers à des fins commerciales. Cependant, il peut être nécessaire de partager vos
          informations dans certaines situations :
        </p>
        <ul>
          <li>
            Avec des prestataires de services tiers qui nous aident à exploiter notre site ou à
            fournir nos services (ex : traitement des paiements, livraison)
          </li>
          <li>
            Si requis par la loi, dans le cadre d’une enquête légale, ou pour protéger nos droits
            ou ceux de nos utilisateurs
          </li>
          <li>
            En cas de fusion, acquisition, ou vente de nos actifs, vos informations peuvent être
            transférées à une autre entité
          </li>
        </ul>
        <p>
          Nous nous assurons que tout partage de données avec des tiers se fait en toute sécurité
          et uniquement dans le cadre des services nécessaires.
        </p>
      </div>

      <div className="section">
        <h2>Sécurité des Données Personnelles</h2>
        <p>
          Nous prenons très au sérieux la sécurité de vos données personnelles et avons mis en
          place des mesures de protection techniques et organisationnelles afin de prévenir
          l’accès non autorisé, l’altération, ou la perte de vos informations. Ces mesures
          incluent :
        </p>
        <ul>
          <li>Utilisation de protocoles de chiffrement (SSL) pour sécuriser les transactions</li>
          <li>
            Accès restreint aux informations sensibles, réservé uniquement aux employés autorisés
          </li>
          <li>
            Surveillance régulière de nos systèmes pour détecter les vulnérabilités et les
            attaques potentielles
          </li>
        </ul>
        <p>
          Bien que nous nous efforcions de protéger vos informations, il est important de noter
          qu’aucune méthode de transmission ou de stockage de données n’est totalement sécurisée.
          Par conséquent, nous ne pouvons pas garantir une sécurité absolue.
        </p>
      </div>

      <div className="section">
        <h2>Conservation des Données</h2>
        <p>
          Nous conservons vos informations personnelles uniquement le temps nécessaire pour
          remplir les objectifs décrits dans cette politique, sauf si la loi exige une période de
          conservation plus longue. Une fois ces objectifs atteints ou cette période expirée, vos
          données seront soit supprimées, soit anonymisées.
        </p>
        <p>
          Vous avez le droit de demander la suppression de vos données à tout moment, sous réserve
          des obligations légales ou contractuelles qui pourraient nous empêcher de le faire.
        </p>
      </div>

      <div className="section">
        <h2>Vos Droits en Matière de Protection des Données</h2>
        <p>
          Conformément aux lois applicables en matière de protection des données, vous disposez
          de plusieurs droits concernant vos informations personnelles, notamment :
        </p>
        <ul>
          <li>
            <strong>Droit d’accès</strong> : vous pouvez demander une copie des informations que
            nous détenons à votre sujet
          </li>
          <li>
            <strong>Droit de rectification</strong> : vous avez le droit de demander la correction
            de toute information inexacte ou incomplète
          </li>
          <li>
            <strong>Droit à l’effacement</strong> : vous pouvez demander la suppression de vos
            données personnelles dans certaines circonstances
          </li>
          <li>
            <strong>Droit à la portabilité</strong> : vous pouvez demander que vos données
            personnelles soient transférées à une autre entité
          </li>
        </ul>
        <p>
          Pour exercer vos droits ou poser des questions sur vos informations personnelles,
          veuillez nous contacter aux coordonnées ci-dessous.
        </p>
      </div>

      <div className="section">
        <h2>Nous Contacter</h2>
        <p>
          Si vous avez des questions sur cette Politique de Confidentialité ou si vous souhaitez
          exercer vos droits, veuillez nous contacter à l’adresse suivante :
        </p>
        <p className="link1">
          Joignez-vous : <a href="/contact.html">booli@aide.com</a>
        </p>
        <p>Contact : (+229 96 78 07 62).</p>
      </div>

      <Footer3 />
    </>
  );
}