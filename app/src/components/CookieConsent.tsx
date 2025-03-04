'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/cookie-consent.module.css'; // Importer le module CSS

const CookieConsent = () => {
  // État pour savoir si le popup doit être affiché
  const [showPopup, setShowPopup] = useState<boolean>(false);
  
  // Vérifier si l'utilisateur a déjà accepté ou refusé les cookies
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (cookieConsent === null) {
      // Si aucun consentement n'est trouvé dans localStorage, afficher le popup
      setShowPopup(true);
    } else {
      // Si consentement trouvé, mettre à jour le state
      setShowPopup(false);
    }
  }, []);
  
  // Fonction pour accepter les cookies
  const handleAcceptCookies = () => {
    // Enregistrer l'acceptation dans localStorage
    localStorage.setItem('cookieConsent', 'accepted');
    // Fermer le popup
    setShowPopup(false);
    // Logique pour activer les cookies (par exemple, Google Analytics)
    activateCookies();
  };
  
  // Fonction pour refuser les cookies
  const handleRejectCookies = () => {
    // Enregistrer le refus dans localStorage
    localStorage.setItem('cookieConsent', 'rejected');
    // Fermer le popup
    setShowPopup(false);
    // Logique pour désactiver les cookies (ne pas charger les cookies tiers)
    deactivateCookies();
  };
  
  // Fonction pour activer les cookies (exemple avec Google Analytics)
  const activateCookies = () => {
    // Charger Google Analytics ou d'autres services tiers ici
    console.log("Cookies activés !");
  };
  
  // Fonction pour désactiver les cookies
  const deactivateCookies = () => {
    // Désactiver tout service tiers ou empêcher le stockage de cookies
    console.log("Cookies désactivés.");
  };

  return (
    <>
      {showPopup && (
        <div className={styles.popup} id="popup-annonce">
          <div className={styles.popupContent}>
            <h2><strong>LES COOKIES CHEZ E-BOOLi</strong></h2>
            <p>
              Notre plateforme utilise des cookies et d'autres technologies de suivi pour améliorer votre expérience de navigation.
              En cliquant sur "Accepter", vous consentez à l'utilisation de cookies. Vous devez avoir plus de <strong>16 ans</strong> pour accepter.
            </p>
            <label>
              <input className={styles.radioInput} type="radio" id="ageCheck" /> Je certifie avoir plus de 16 ans.
            </label>
            <p>
              Savoir plus sur les cookies : <a href="/politique-confidentialité">Politique & Confidentialité</a>.
            </p>
            <button className={styles.popupCloseBtn} onClick={handleRejectCookies}>
              Refuser les Cookies
            </button>
            <button className={styles.popupAcceptBtn} onClick={handleAcceptCookies}>
              Accepter les Cookies
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
