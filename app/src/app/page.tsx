"use client";

import { useState, useEffect } from "react";
import MessageBox from "@/components/ui/MessageBox";
import ChatModal from "@/components/modals/ChatModal";
import Footer from "@/components/layout/static/Footer";
import Header from "@/components/layout/static/Header";
import SignInOrLogout from "@/components/links/SignInOrLogout";
import Helmet from "@/components/seo/Helmet";
import LoadingScreen from "@/components/animations/LoadingScreen";
import CompatibilityCheck from "@/components/animations/CompatibilityCheck";

const announcements = [
  "BOOLi 🌍",
  "STORE ",
  "Opportinuté",
  "Tourisme",
  "Formations",
  "Services",
  "Autres...",
  "CBAAAA !",
  "Surprise",
  "Partenaire",
  "Assistanc",
];

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [announcement, setAnnouncement] = useState("Patienter...");
  const [countdown, setCountdown] = useState(100);
  const [currentLang, setCurrentLang] = useState("fr");

  // Gestion du chargement initial et des annonces
  useEffect(() => {
    if (!sessionStorage.getItem("hasLoaded")) {
      console.log("Chargement initial");
      setTimeout(() => {
        console.log("Fin loading, début compatibility");
        setShowLoading(false);
        setShowCompatibility(true);
        setTimeout(() => {
          console.log("Fin compatibility, début contenu");
          setShowCompatibility(false);
          setShowContent(true);
          sessionStorage.setItem("hasLoaded", "true");
        }, 1500);
      }, 900);
    } else {
      console.log("Chargement sauté, contenu direct");
      setShowLoading(false);
      setShowCompatibility(false);
      setShowContent(true);
    }

    let rotate = 0;
    const interval = setInterval(() => {
      setAnnouncement(announcements[rotate]);
      rotate = (rotate + 1) % announcements.length;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Gestion du compte à rebours
  useEffect(() => {
    if (!showContent) return; // Ne démarre que quand le contenu est visible

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        console.log("Countdown:", prev); // Pour déboguer
        if (prev <= 1) {
          clearInterval(countdownInterval);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [showContent]);

  const handleNextClick = () => {
    window.location.href = "/";
  };

  const handleTranslateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    setCurrentLang(lang);
    document.cookie = `googtrans=/fr/${lang}; path=/`;
    window.location.reload();
  };

  if (showLoading) {
    console.log("Affichage LoadingScreen");
    return <LoadingScreen />;
  }

  if (showCompatibility) {
    console.log("Affichage CompatibilityCheck");
    return <CompatibilityCheck />;
  }

  if (showContent) {
    console.log("Affichage contenu principal");
    return (
      <>
        <Helmet>
          <title>Accueil - BOOLi-STORE | BIGAFRIKA</title>
          <meta
            name="description"
            content="Découvrez la page d’accueil de BOOLi-STORE : réservations, opportunités, et plus encore."
          />
        </Helmet>
        <Header />
        <section>
          <MessageBox />
        </section>
        <section>
          <div className="row col-12 pt-2 menu">
            <div className="col-4 text-left ml-4 px-4">
              <SignInOrLogout className="btn btn-primary m-2" />
            </div>
            <div className="col-4 text-center welcome">Bienvenu</div>
            <div className="col-4 mt-2 text-center lang">
              <div className="translate-container">
                <i
                  className="fas fa-globe transparent-globe"
                  style={{ color: "#2bf", fontSize: "19px" }}
                ></i>
                <select
                  id="google_translate_select"
                  onChange={handleTranslateChange}
                  value={currentLang}
                  className="notranslate"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="zh-CN">中文</option>
                  <option value="ar">عربى</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                  <option value="hi">हिन्दी</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="img-container">
          <div className="background">
            <div className="row col-12 img-text">
              <div className="info col-4">
                <a href="/about" target="_blank">
                  <i
                    className="fas fa-question-circle"
                    style={{ color: "#ffffffc9" }}
                  ></i>
                  <span className="h6"> En savoir plus sur </span>
                  <br />
                  <span className="h5 ml-6">BOOLi-Store.world</span>
                  <br />
                </a>
                <p className="DEVISE mt-3">
                  Plateforme de mise en relation B2B, pour la commercialisation
                  et <br /> l&apos; Innovation
                </p>
              </div>

              <div className="services col-4 mt-5">
                <a href="/pharmacopee" className="load-link" target="_blank">
                  <i className="fa-solid fa-newspaper"></i> Pharmacopée &
                  Tourisme
                </a>
                <br />
                <br />
                <a href="/librairie" target="_blank">
                  <i className="fa-solid fa-book-open"></i> Bibliothèque
                  [Documents]
                </a>
                <br />
                <br />
                <a href="/opportunites" target="_blank">
                  <i className="fas fa-briefcase" id="conu"></i> Découvrir des
                  Opportunitées
                </a>
              </div>

              <div className="ad col-4" id="conteneur">
                <div id="">
                  <div className="new-badge">
                    <span className="pubf">
                      <div className="minuteur" data-time="28800">
                        12:20:10
                      </div>
                    </span>
                  </div>
                  <a href="#">
                    <img src="/image/pub.jpg" alt="Pub1" id="img" />
                  </a>
                  <a href="#">
                    <img src="/image/work7.jpg" alt="Pub2" id="img1" />
                  </a>
                  <a href="#">
                    <img src="/image/surprise1jpj.jpg" alt="Pub3" id="img2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section_next row col-12">
          <div className="loader-container">
            <div className="chargement"></div>
            <div className="announcement" id="announcement">
              {announcement || "ok"}
            </div>
          </div>
          <section className="lova">
            <div>
              <div className="cercle-pulsant"></div>
              <button id="next" onClick={handleNextClick}>
                Suivant...({countdown})
              </button>
            </div>
          </section>
          <section>
            <ChatModal />
          </section>
        </div>

        <Footer />
      </>
    );
  }

  console.log("Rien à afficher");
  return null;
}