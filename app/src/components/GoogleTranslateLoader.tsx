'use client';

import { useEffect } from 'react';

// 🔹 Déclaration globale pour éviter l'erreur TS2339
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: unknown;
            autoDisplay: boolean;
          },
          containerId: string
        ) => void;
        TranslateElementInit?: () => void;
        InlineLayout?: {
          SIMPLE: unknown;
        };
      };
    };
  }
}

const GoogleTranslateLoader = () => {
  useEffect(() => {
    const addScript = () => {
      const script = document.createElement('script');
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      // 🔹 Fonction d'initialisation de Google Translate
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'fr',
              includedLanguages: 'fr,en,zh-CN,ar,es,de,hi',
              layout: window.google.translate.InlineLayout?.SIMPLE ?? 0,
              autoDisplay: false,
            },
            'google_translate_element' // Élément fictif caché
          );
        }
      };
    };

    // 🔹 Vérifie si le script est déjà ajouté pour éviter les doublons
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    }

    return () => {
      const script = document.querySelector('script[src*="translate.google.com"]');
      if (script) document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []);

  return <div id="google_translate_element" style={{ display: 'none' }} />;
};

export default GoogleTranslateLoader;
