import '@/styles/css/market.css';
import '@/styles/css/super_marcher_btique.css';
import Footer3 from '@/components/Footer3';
import Header from '@/components/layout/listing/Header';

export default function ServiceClientPage() {

  return (
    <>
      <Header/> {/* Masque la barre de recherche et le panier */}

      <div className="img_soussect">
        <div className="img_soussect-content">
          <h1>Service Client BOOLi-STORE</h1>
          <p>NOTRE ÉQUIPE EST ACTIF H/H POUR VOUS ASSISTER EN TOUT LIEU !</p>
        </div>
      </div>

      <div className="client€">
        <div className="contact-section">
          <div
            className="contact-form"
            style={{ animation: 'fadeInUp 1s ease 0.2s forwards', opacity: 0 }}
          >
            <h2>Envoyez-nous un message</h2>
            <form action="/support" method="POST">
              <div className="form-group">
                <input type="text" id="name" name="name" placeholder=" " required />
                <label htmlFor="name">Votre Nom Complet</label>
              </div>
              <div className="form-group">
                <input type="email" id="email" name="email" placeholder=" " required />
                <label htmlFor="email">Votre adresse Email</label>
              </div>
              <div className="form-group">
                <input type="text" id="subject" name="subject" placeholder=" " required />
                <label htmlFor="subject">Quel est le Sujet</label>
              </div>
              <div className="form-group">
                <textarea id="message" name="message" placeholder=" " required></textarea>
                <label htmlFor="message">Entrez ici votre Message</label>
              </div>
              <button type="submit" className="submit-btn">
                Soumettre le message
              </button>
            </form>
          </div>

          <div
            className="contact-info"
            style={{ animation: 'fadeInUp 1s ease 0.4s forwards', opacity: 0 }}
          >
            <h2>Nos coordonnées</h2>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <p>
                Contactez-nous au{' '}
                <a href="tel:+2290196780762">+229 01 96 78 07 62</a>
              </p>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <p>
                Envoyez un email à{' '}
                <a href="mailto:boolistore@gmail.com">boolistore@gmail.com</a>
              </p>
            </div>
            <div className="info-item">
              <i className="fas fa-clock"></i>
              <p>Disponible 7j/7, de 7h à 22h</p>
            </div>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>Siège : Natitingou, Bénin</p>
            </div>
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991625915809!2d2.352221615674693!3d48.85661407928722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee03d7470e!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1634567890123!5m2!1sfr!2sfr"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <Footer3 />
    </>
  );
}