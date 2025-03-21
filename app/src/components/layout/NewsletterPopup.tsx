import React, { useState, useEffect } from "react";

const NewsletterPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 1000);
    const hideTimer = setTimeout(() => setIsVisible(false), 30000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <section>
      <div id="newsletterPopup" className="newsletter-popup">
        <div className="newsletter-popup-content">
          <p>Souhaitez-vous inscrire <br /> à notre newsletter ?</p>
          <button className="button12" onClick={() => (window.location.href = "/newsletter")}>
            Oui, je veux m&apos;inscrire
          </button>
          <button className="button12" onClick={() => setIsVisible(false)}>
            C’est Bon
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterPopup;