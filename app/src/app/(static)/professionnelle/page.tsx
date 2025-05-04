import '@/styles/css/market.css';
import '@/styles/css/style2.css';
import Footer3 from '@/components/Footer3';
import Header from '@/components/layout/listing/Header';
import TopHeader from '@/components/layout/listing/TopHeader';

export default function CarrierePage() {

  return (
    <>
    <TopHeader/>
      <Header/>

      <section className="career">
        <h1>Rejoignez BOOLi-STORE</h1>
        <p>
        &quot;Le développement est en vous, levez-vous pour opérer ! Voici des opportunités pour vous,
          démarrez votre carrière chez BOOLi-STORE&quot;.
        </p>
        <a href="/Opportinuité_acceuil2.html" className="cta-button">
          Voir les Opportunités
        </a>
      </section>

      <section className="jabout-us">
        <h2>Pourquoi Nous Rejoindre ?</h2>
        <p>
          Chez BOOLi-STORE, nous croyons en l’innovation, la collaboration, et le développement du
          continent Africain. Rejoignez une équipe dynamique, créative, et passionnée pour faire la
          différence dans un environnement qui vous permet de prospérer.
        </p>
        <div className="jabout-cards">
          <div className="jabout-card">
            <h3>Culture d’Entreprise</h3>
            <p>
              Nous offrons un environnement de travail où chacun peut exprimer ses idées et
              contribuer à l’innovation.
            </p>
          </div>
          <div className="jabout-card">
            <h3>Avantages et Bénéfices</h3>
            <p>
              Des avantages compétitifs, un équilibre entre vie professionnelle et personnelle, et
              des opportunités de développement.
            </p>
          </div>
          <div className="jabout-card">
            <h3>Formations et Développement</h3>
            <p>
              Des formations continues et des plans de carrière pour aider nos employés à grandir
              et se perfectionner.
            </p>
          </div>
        </div>
      </section>

      <section id="opportunites" className="opportunities-section">
        <h2>Opportunités de Carrière</h2>
        <p>Explorez les postes disponibles et postulez dès maintenant.</p>
        <div className="job-listings">
          <div className="job-card">
            <h3>Développeur Web</h3>
            <p>--- BOOLi-STORE ---</p>
            <p>
              Description : Nous recherchons des développeurs web passionnés pour rejoindre notre
              équipe et participer au développement de projets innovants.
            </p>
            <a href="/postule_acceuil.html" className="apply-button">
              Postuler Maintenant
            </a>
          </div>
          <div className="job-card">
            <h3>Marketing</h3>
            <p>--- BOOLi-STORE ---</p>
            <p>
              Description : Si vous avez une passion pour la stratégie marketing et les campagnes
              innovantes, nous avons une place pour vous.
            </p>
            <a href="/postule_acceuil.html" className="apply-button">
              Postuler Maintenant
            </a>
          </div>
          <div className="job-card">
            <h3>Chef de Projet IT</h3>
            <p>--- BOOLi-STORE ---</p>
            <p>
              Description : Rejoignez notre équipe IT pour piloter des projets technologiques dans
              un environnement dynamique et en pleine croissance.
            </p>
            <a href="/postule_acceuil.html" className="apply-button">
              Postuler Maintenant
            </a>
          </div>
        </div>

        <div className="job-listings">
          <div className="job-card">
            <h3>Livreur de Produit</h3>
            <p>--- BOOLi-STORE ---</p>
            <p>
              Description : Nous recherchons des agents livreurs de Produit à domicile. Faites
              partie de la communauté BOOLi en livrant des commandes aux clients.
            </p>
            <a href="/postule_acceuil.html" className="apply-button">
              Postuler Maintenant
            </a>
          </div>
          <div className="job-card">
            <h3>Sensibilisateur</h3>
            <p>--- BOOLi-STORE ---</p>
            <p>
              Description : Si vous avez l’art de la mobilisation ou si vous êtes passionné, nous
              recherchons des agents de sensibilisation dans chaque pays en Afrique.
            </p>
            <a href="/postule_acceuil.html" className="apply-button">
              Postuler Maintenant
            </a>
          </div>
          <div className="job-card">
            <h3>Graphiste</h3>
            <p>--- BOOLi-STORE ---</p>
            <p>
              Description : Nous recherchons des passionnés en graphisme pour des projets
              d’Innovations et pour la réalisation de grandes œuvres de conception.
            </p>
            <a href="/postule_acceuil.html" className="apply-button">
              Postuler Maintenant
            </a>
          </div>
        </div>
      </section>

      <section className="testimonialse">
        <h2>Ce Que Nos Employés Disent (TÉMOIGNAGE)</h2>
        <div className="testimoniale-cards">
          <div className="testimoniale-card">
            <p>
            &quot;Travailler ici est une expérience enrichissante. Les opportunités de croissance et
              l’environnement de travail sont exceptionnels.&quot;
            </p>
            <p className="author">- Carlos, Développeur Front-End</p>
          </div>
          <div className="testimoniale-card">
            <p>
            &quot;Je me sens soutenu dans mon développement professionnel. Les formations et
              l’encadrement sont de grande qualité.&quot;
            </p>
            <p className="author">- Damien, Chef de Projet</p>
          </div>
        </div>
      </section>

      <Footer3 />
    </>
  );
}