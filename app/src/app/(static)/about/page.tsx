import Header from '@/components/layout/listing/Header';
import Footer3 from '@/components/Footer3';
import "@/styles/css/market.css";
import '@/styles/css/style2.css';


// Composant principal de la page About
export default function AboutPage() {


  return (
<>
<Header/>
          <section className="heroo">
            <h1>À PROPOS DE BOOLi-STORE</h1>
            <p>
              Nous connectons les secteurs, les talents et les opportunités pour simplifier votre
              quotidien et façonner l’avenir, où que vous soyez.
            </p>
          </section>

          <section className="journey">
            <div className="ditor" id="ditor1">
              <span className="ditor-number">01</span>
              <i className="fas fa-globe ditor-icon"></i>
              <div className="ditor-content">
                <h3>Tout en un (STORE)</h3>
                <p>BOOLi-STORE est votre guichet unique pour chaque secteur imaginable :</p>
                <ul>
                  <li>Bibliothèque : livres, romans, epreuves...accessible gratuitement.</li>
                  <li>Services : artisans, consultants, spécialistes en tout genre.</li>
                  <li>Formation 100% pratique: cours, tutoriels, certifications accessibles.</li>
                  <li>E-commerce : produits du quotidien, agricoles, aux innovations high-tech.</li>
                  <li>Opportunité : stages, emploies, bourse, challenge, business, affilliation.</li>
                  <li>Pharmacopée : produits bio de tout genre, spécialistes du secteur.</li>
                  <li>Technologie : outils numériques pour entreprises et particuliers.</li>
                </ul>
              </div>
              <div className="ditor-image" style={{ backgroundImage: "url('/Photo/team.jpg')" }}></div>
            </div>

            <div className="ditor" id="ditor2">
              <span className="ditor-number">02</span>
              <i className="fas fa-users ditor-icon"></i>
              <div className="ditor-content">
                <h3>Des solutions pour tous</h3>
                <p>Nous servons chaque profil avec des ressources sur mesure :</p>
                <ul>
                  <li>Education : étudiez chez vous avec une connexion internet.</li>
                  <li>Entrepreneurs : lancez votre projet avec nos experts.</li>
                  <li>Étudiants : apprenez des compétences recherchées.</li>
                  <li>Professionnels : trouvez des collaborateurs ou clients.</li>
                  <li>Particuliers : simplifiez vos besoins quotidiens.</li>
                  <li>Vendeurs : toucher un large publique.</li>
                </ul>
              </div>
              <div className="ditor-image" style={{ backgroundImage: "url('/Photo/tous.jg')" }}></div>
            </div>

            <div className="ditor" id="ditor3">
              <span className="ditor-number">03</span>
              <i className="fas fa-cogs ditor-icon"></i>
              <div className="ditor-content">
                <h3>Technologie au service de tous</h3>
                <p>Nos innovations rendent tout plus simple :</p>
                <ul>
                  <li>Automatisation : commandes et services en un clic.</li>
                  <li>Accessibilité : interface intuitive sur tous les appareils.</li>
                  <li>Fiabilité : support client 24/7 et systèmes sécurisés.</li>
                  <li>Évolutivité : des solutions qui grandissent avec vous.</li>
                </ul>
              </div>
              <div className="ditor-image" style={{ backgroundImage: "url('/Photo/techno.jpg')" }}></div>
            </div>

            <div className="ditor" id="ditor4">
              <span className="ditor-number">04</span>
              <i className="fas fa-rocket ditor-icon"></i>
              <div className="ditor-content">
                <h3>Un impact mondial</h3>
                <p>BOOLi-STORE va au-delà des frontières :</p>
                <ul>
                  <li>Présence : connecte des utilisateurs dans en Afrique et dans le monde.</li>
                  <li>Économie : soutient les PME et les grandes entreprises.</li>
                  <li>Communauté : réunit des millions de personnes et talents.</li>
                  <li>Vision : un monde plus ouvert, connecté et prospère.</li>
                </ul>
              </div>
              <div className="ditor-image" style={{ backgroundImage: "url('/Photo/impact.jpg')" }}></div>
            </div>
          </section>

          <section className="stats-section">
            <div className="stats-overlay">
              <div className="stats-container">
                <div className="stat-item">
                  <h3>1M+</h3>
                  <p>Utilisateurs actifs</p>
                </div>
                <div className="stat-item">
                  <h3>50+</h3>
                  <p>Secteurs couverts</p>
                </div>
                <div className="stat-item">
                  <h3>100K+</h3>
                  <p>Services réalisés</p>
                </div>
                <div className="stat-item">
                  <h3>80+</h3>
                  <p>Pays connectés</p>
                </div>
              </div>
            </div>
          </section>

          <section className="history-section">
            <h2>Histoires</h2>
            <div className="history-image"></div>
            <div className="history-content">
              <p>
                Fondé en 2024 par une équipe visionnaire, BOOLi-STORE est né d’un rêve : digitaliser
                l’accès aux opportunités dans un monde fragmenté. Ce qui a débuté comme une petite
                plateforme locale reliant artisans et clients s’est rapidement transformé en un
                écosystème mondial. Aujourd’hui, BOOLi-STORE est une force d’innovation, connectant
                des millions de personnes à travers des secteurs variés – du commerce à la
                technologie, en passant par l’éducation et les services – avec une mission claire :
                simplifier la vie et ouvrir des portes, partout.
              </p>
              <div className="history-milestones">
                <div className="milestone">
                  <i className="fas fa-seedling"></i>
                  <h4>2024 : Les débuts</h4>
                  <p>
                    Lancement de BOOLi-STORE avec une poignée d’artisans locaux et une vision
                    ambitieuse.
                  </p>
                </div>
                <div className="milestone">
                  <i className="fas fa-expand-arrows-alt"></i>
                  <h4>2025 : L’expansion</h4>
                  <p>Introduction de nouvelles catégories : e-commerce, formations, outils numériques.</p>
                </div>
                <div className="milestone">
                  <i className="fas fa-globe-americas"></i>
                  <h4>2025 : Le saut mondial</h4>
                  <p>Présence dans plus de 50 pays, avec une communauté de 500 000 utilisateurs.</p>
                </div>
                <div className="milestone">
                  <i className="fas fa-star"></i>
                  <h4>Aujourd’hui</h4>
                  <p>Un million d’utilisateurs, des innovations constantes et un impact global.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="values-section">
            <h2>Nos valeurs</h2>
            <div className="values-container">
              <div className="value-ditor">
                <i className="fas fa-handshake"></i>
                <h3>Confiance</h3>
                <p>
                  Nous bâtissons des relations solides avec nos utilisateurs grâce à une transparence
                  totale et des services fiables.
                </p>
              </div>
              <div className="value-ditor">
                <i className="fas fa-lightbulb"></i>
                <h3>Innovation</h3>
                <p>
                  Repousser les limites de la technologie pour offrir des solutions modernes et
                  accessibles à tous.
                </p>
              </div>
              <div className="value-ditor">
                <i className="fas fa-users-cog"></i>
                <h3>Inclusion</h3>
                <p>
                  Créer une plateforme où chaque individu, quel que soit son parcours, trouve sa
                  place et ses opportunités.
                </p>
              </div>
              <div className="value-ditor">
                <i className="fas fa-globe"></i>
                <h3>Globalité</h3>
                <p>Connecter le monde entier pour un impact positif, sans frontières ni barrières.</p>
              </div>
            </div>
          </section>
          <Footer3/>

</>
  );
}