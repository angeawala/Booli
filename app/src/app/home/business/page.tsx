import Image from 'next/image';
import Link from 'next/link';
import TopHeader from '@/components/layout/listing/TopHeader';
import '@/styles/css/filtre.css'
import Header from '@/components/layout/listing/Header';
import Footer from '@/components/Footer';

const BusinessPage = () => {
  return (
    <>
          <TopHeader/>
          <Header/>
    <div className="body_boutique">

      {/* Hero Section */}
      <section className="hero">
        <div className="text-container20" id="textContainer">
          <div className="text20" id="text" style={{fontSize: '2rem', fontWeight: 'bold'}}>BOOLi-STORE - CODE!</div>
        </div>
        <h1>Créer un compte (ENtreprise ou Boutique)</h1>
        <p >Connectez-vous à un large public !</p>
        <Link href="/creation_de_boutique">
          <button >
            Créer un compte
          </button>
        </Link>
      </section>

      {/* Features Section 1 */}
      <section className="features1">
        <h4 >Qui peut avoir un compte Business à BOOLi-STORE ?</h4>
      </section>

      {/* Features Section 2 */}
      <section className="features">
        <div className="feature-card">
          <img src="/Photo/location1.jpg" alt="Service 3"  />
          <h3 className="text-xl font-bold mt-2">Entreprises</h3>
          <p>Attirer une masse de consommateur en mettant vos services et produits en ligne.</p>
        </div>
        <div className="feature-card">
          <img src="/Photo/visibité.jpg" alt="Service 2" />
          <h3 className="text-xl font-bold mt-2">Boutiques</h3>
          <p>Vendez + dans un environnement en forte croissance.</p>
        </div>
        <div className="feature-card">
          <img src="/Photo/agriculture.jpg" alt="Service 1"  />
          <h3 className="text-xl font-bold mt-2">Agriculteurs</h3>
          <p>Faites découvrir vos produits frais ou non aux mondes entier.</p>
        </div>
      </section>

      {/* Features Section 3 */}
      <section className="features">
        <div className="feature-card ">
          <img src="/Photo/EA.jpg" alt="Service 3" />
          <h3 className="text-xl font-bold mt-2">Spécialistes</h3>
          <p>Faites vous connaitres en mettant en ligne vos compétences.</p>
        </div>
        <div className="feature-card ">
          <img src="/Photo/industrie.jpg" alt="Service 2"  />
          <h3 className="text-xl font-bold mt-2">Centres Industriels</h3>
          <p>Fabrications, Transformations, ....trouver un réseau de professionnel.</p>
        </div>
        <div className="feature-card ">
          <img src="/Photo/colis.jpg" alt="Service 1" />
          <h3 className="text-xl font-bold mt-2">Revendeurs</h3>
          <p>Si vous souhaitez gagner de l'argent c'est maintenant.</p>
        </div>
      </section>

      {/* Features Section 4 */}
      <section className="features1">
        <h4 >Qu'est ce qu'on gagne en vendant à BOOLi-STORE ?</h4>
      </section>

      {/* Features Section 5 */}
      <section className="features">
        <div className="feature-card">
          <img src="/Photo/visible.jpg" alt="Service 3"  />
          <h3 className="text-xl font-bold mt-2">Visibilité accrue en Afrique</h3>
          <p>Accès à une large audience et augmentation des ventes.</p>
        </div>
        <div className="feature-card ">
          <img src="/Photo/logistique.jpg" alt="Service 2"  />
          <h3 className="text-xl font-bold mt-2">Support logistique et service client</h3>
          <p>Accès à des services de: (livraison, assistance, services...)</p>
        </div>
        <div className="feature-card ">
          <img src="/Photo/2b2.webp" alt="Service 1" />
          <h3 className="text-xl font-bold mt-2">Opportunités B2B</h3>
          <p>Possibilité de collaborer avec d’autres professionnels, fournisseurs et revendeurs.</p>
        </div>
      </section>

      {/* Process Section 1 */}
      <section >
        <div className="process ">
          <h2 >Processus de Création de Compte à BOOLi-STORE</h2>
          <div className="steps mt-4 ">
            <div className="step">
              <i className="fas fa-user text-3xl mb-2"></i>
              <p>Informations Personnelles</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">1</span>
            </div>
            <div className="step ">
              <i className="fas fa-building text-3xl mb-2"></i>
              <p>Informations de l'Entreprise</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
            </div>
            <div className="step ">
              <i className="fas fa-cogs text-3xl mb-2"></i>
              <p>Choisir Services/Produits</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">3</span>
            </div>
            <div className="step ">
              <i className="fas fa-credit-card text-3xl mb-2"></i>
              <p>Moyen de Paiement</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">4</span>
            </div>
            <div className="step ">
              <i className="fas fa-cogs text-3xl mb-2"></i>
              <p>Choisir Plan d'Abonnement</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">6</span>
            </div>
            <div className="step ">
              <i className="fas fa-check-circle text-3xl mb-2"></i>
              <p>Confirmation</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section 2 */}
      <section >
        <div className="process ">
          <h2 >Traitement des informations et activation du compte</h2>
          <div className="steps mt-4">
            <div className="step f">
              <i className="fas fa-file-alt text-3xl mb-2"></i>
              <p>Documents Commerciaux</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">1</span>
            </div>
            <div className="step ">
              <i className="fas fa-check-circle text-3xl mb-2"></i>
              <p>Validation de l'Éligibilité</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
            </div>
            <div className="step ">
              <i className="fas fa-truck text-3xl mb-2"></i>
              <p>Vérification d'Expédition</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">3</span>
            </div>
            <div className="step ">
              <i className="fas fa-store text-3xl mb-2"></i>
              <p>Profil de Vendeur</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">4</span>
            </div>
            <div className="step ">
              <i className="fas fa-credit-card text-3xl mb-2"></i>
              <p>Méthodes de Paiement</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">5</span>
            </div>
            <div className="step ">
              <i className="fas fa-file-invoice text-3xl mb-2"></i>
              <p>Informations Fiscales</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">6</span>
            </div>
            <div className="step ">
              <i className="fas fa-gavel text-3xl mb-2"></i>
              <p>Conditions Générales</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">7</span>
            </div>
            <div className="step ">
              <i className="fas fa-chalkboard-teacher text-3xl mb-2"></i>
              <p>Formation</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">8</span>
            </div>
            <div className="step ">
              <i className="fas fa-star text-3xl mb-2"></i>
              <p>Partenariat</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">9</span>
            </div>
            <div className="step ">
              <i className="fas fa-store text-3xl mb-2"></i>
              <p>Activation du Compte</p>
              <span className="mt-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">10</span>
            </div>
          </div>
        </div>
      </section>

    
    </div>
    <Footer/>
    </>
  );
};

export default BusinessPage;