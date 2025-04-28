import Image from 'next/image';
import Link from 'next/link';
import '@/styles/css/filtre.css'

const BusinessPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="header_boutique bg-gray-800 text-white p-4">
        <div className="logo text-2xl font-bold">B2B-BOOLi-STORE</div>
        <nav className="navig flex space-x-4">
          <Link href="/store/product" className="hover:text-gray-300">BOOLi-STORE.world</Link>
          <Link href="/opportinuite" className="hover:text-gray-300">Opportinuité</Link>
          <Link href="/contact" className="hover:text-gray-300">Contacter l'entreprise</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero bg-gray-100 py-12 text-center">
        <div className="text-container20" id="textContainer">
          <div className="text20" id="text" style={{fontSize: '2rem', fontWeight: 'bold'}}>BOOLi-STORE - CODE!</div>
        </div>
        <h1 className="text-4xl font-bold mt-4">Créer un compte (ENtreprise ou Boutique)</h1>
        <p className="text-lg mt-2">Connectez-vous à un large public !</p>
        <Link href="/creation_de_boutique">
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Créer un compte
          </button>
        </Link>
      </section>

      {/* Features Section 1 */}
      <section className="features1 text-center py-8">
        <h4 className="text-2xl font-semibold">Qui peut avoir un compte Business à BOOLi-STORE ?</h4>
      </section>

      {/* Features Section 2 */}
      <section className="features grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div className="feature-card bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/Photo/location1.jpg" alt="Service 3" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold mt-2">Entreprises</h3>
          <p>Attirer une masse de consommateur en mettant vos services et produits en ligne.</p>
        </div>
        <div className="feature-card bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/Photo/visibité.jpg" alt="Service 2" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold mt-2">Boutiques</h3>
          <p>Vendez + dans un environnement en forte croissance.</p>
        </div>
        <div className="feature-card bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/Photo/agriculture.jpg" alt="Service 1" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold mt-2">Agriculteurs</h3>
          <p>Faites découvrir vos produits frais ou non aux mondes entier.</p>
        </div>
      </section>

      {/* Features Section 3 */}
      <section className="features grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mt-8">
        <div className="feature-card bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/Photo/EA.jpg" alt="Service 3" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold mt-2">Spécialistes</h3>
          <p>Faites vous connaitres en mettant en ligne vos compétences.</p>
        </div>
        <div className="feature-card bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/Photo/industrie.jpg" alt="Service 2" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold mt-2">Centres Industriels</h3>
          <p>Fabrications, Transformations, ....trouver un réseau de professionnel.</p>
        </div>
        <div className="feature-card bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/Photo/colis.jpg" alt="Service 1" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold mt-2">Revendeurs</h3>
          <p>Si vous souhaitez gagner de l'argent c'est maintenant.</p>
        </div>
      </section>

      {/* Features Section 4 */}
      <section className="features1 text-center py-8">
        <h4 className="text-2xl font-semibold">Qu'est ce qu'on gagne en vendant à BOOLi-STORE ?</h4>
      </section>

      {/* Features Section 5 */}
      <section className="features grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div className="feature-card bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/Photo/visible.jpg" alt="Service 3" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold mt-2">Visibilité accrue en Afrique</h3>
          <p>Accès à une large audience et augmentation des ventes.</p>
        </div>
        <div className="feature-card bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/Photo/logistique.jpg" alt="Service 2" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold mt-2">Support logistique et service client</h3>
          <p>Accès à des services de: (livraison, assistance, services...)</p>
        </div>
        <div className="feature-card bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/Photo/2b2.webp" alt="Service 1" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold mt-2">Opportunités B2B</h3>
          <p>Possibilité de collaborer avec d’autres professionnels, fournisseurs et revendeurs.</p>
        </div>
      </section>

      {/* Process Section 1 */}
      <section className="container mx-auto py-8">
        <div className="process text-center">
          <h2 className="text-3xl font-bold">Processus de Création de Compte à BOOLi-STORE</h2>
          <div className="steps mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="step flex flex-col items-center">
              <i className="fas fa-user text-3xl mb-2"></i>
              <p>Informations Personnelles</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">1</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-building text-3xl mb-2"></i>
              <p>Informations de l'Entreprise</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-cogs text-3xl mb-2"></i>
              <p>Choisir Services/Produits</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">3</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-credit-card text-3xl mb-2"></i>
              <p>Moyen de Paiement</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">4</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-cogs text-3xl mb-2"></i>
              <p>Choisir Plan d'Abonnement</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">6</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-check-circle text-3xl mb-2"></i>
              <p>Confirmation</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section 2 */}
      <section className="container mx-auto py-8">
        <div className="process text-center mt-4 mb-4">
          <h2 className="text-3xl font-bold">Traitement des informations et activation du compte</h2>
          <div className="steps grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
            <div className="step flex flex-col items-center">
              <i className="fas fa-file-alt text-3xl mb-2"></i>
              <p>Documents Commerciaux</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">1</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-check-circle text-3xl mb-2"></i>
              <p>Validation de l'Éligibilité</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-truck text-3xl mb-2"></i>
              <p>Vérification d'Expédition</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">3</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-store text-3xl mb-2"></i>
              <p>Profil de Vendeur</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">4</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-credit-card text-3xl mb-2"></i>
              <p>Méthodes de Paiement</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">5</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-file-invoice text-3xl mb-2"></i>
              <p>Informations Fiscales</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">6</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-gavel text-3xl mb-2"></i>
              <p>Conditions Générales</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">7</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-chalkboard-teacher text-3xl mb-2"></i>
              <p>Formation</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">8</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-star text-3xl mb-2"></i>
              <p>Partenariat</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">9</span>
            </div>
            <div className="step flex flex-col items-center">
              <i className="fas fa-store text-3xl mb-2"></i>
              <p>Activation du Compte</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">10</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="indx_footer bg-gray-800 text-white py-8 text-center">
        <div className="pied_de_page col-12 mt-4">
          <Link href="/index_2" className="block hover:text-gray-300">BOOLi-STORE.world</Link>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <Link href="/comment" className="hover:text-gray-300">Suggestion</Link> | 
            <Link href="/connexion_site" className="hover:text-gray-300">Se connecter</Link> | 
            <Link href="/partenariat" className="hover:text-gray-300">Partenaire</Link> | 
            <Link href="#" className="hover:text-gray-300">Politique et Confidentialité</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <Link href="/help" className="hover:text-gray-300">FAQ</Link> | 
            <Link href="/enterprise" className="hover:text-gray-300">Entreprise</Link> | 
            <Link href="/contact" className="hover:text-gray-300">Contact</Link> | 
            <Link href="/forum" className="hover:text-gray-300">Forum</Link> | 
            <Link href="#" className="hover:text-gray-300">Mieux nous comprendre</Link> | 
            <Link href="/library" className="hover:text-gray-300">Découvrir des arrivages</Link> | 
            <Link href="/help" className="hover:text-gray-300">Comment s'abonner ?</Link>
          </div>
          <div className="mt-2">
            <Link href="#" className="hover:text-gray-300">Condition d'utilisation</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BusinessPage;