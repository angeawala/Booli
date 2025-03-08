"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MessageBox from "@/components/ui/MessageBox";
import ChatModal from "@/components/modals/ChatModal";
import Image from "next/image";
import Footer from "@/components/layout/static/Footer";
import Header from "@/components/layout/static/Header";
import SignInOrLogout from "@/components/links/SignInOrLogout";
import Helmet from "@/components/seo/Helmet";


export default function Home() {
  const [isLoadingScreenVisible, setIsLoadingScreenVisible] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [announcement, setAnnouncement] = useState("Patienter...");
  const [countdown, setCountdown] = useState(100);
  const [currentLang, setCurrentLang] = useState('fr');

  const announcements = [
    "BOOLi 🌍 AFRICAIN",
    "Consulter notre Bibliothèque",
    "Offre d'opportinuté et satge",
    "Explorez nos sites touristiques",
    "Devenez expert ",
    "Découvrez des :",
    "Formations",
    "Services",
    "Et Autres...",
    "Acheter tous en un clic !",
    "Découvrez des experts",
    "Devenez partenaire",
    "Nous vous assistons",
  ];

  useEffect(() => {
    // Loading screen
    const loadingTimeout = setTimeout(() => {
      setIsLoadingScreenVisible(false);
      setIsContentVisible(true);
    }, 900);

    // Loader
    const loaderTimeout = setTimeout(() => {
      setIsLoaderVisible(false);
    }, 1500);

    // Announcement rotation
    let rotate = 0;
    const interval = setInterval(() => {
      setAnnouncement(announcements[rotate]);
      rotate = (rotate + 1) % announcements.length;
    }, 2500);

    // Countdown for "Suivant" button
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(loaderTimeout);
      clearInterval(interval);
      clearInterval(countdownInterval);
    };
  }, [announcements]);

  const handleNextClick = () => {
    window.location.href = "/";
  };
  const handleTranslateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    setCurrentLang(lang);
    document.cookie = `googtrans=/fr/${lang}; path=/`;
    window.location.reload();
  };
  return (
    <>
          <Helmet>
          <title>Accueil - BOOLi-STORE | BIGAFRIKA</title>
          <meta
            name="description"
            content="Découvrez la page d’accueil de BOOLi-STORE : réservations, opportunités, et plus encore."
          />
        </Helmet>
      <section>
        {isLoadingScreenVisible && (
          <div id="loading-screen">
            <Image
          src="/logo/booli.blanc.jpg" // Chemin absolu depuis public/
          alt="Logo BOOLi"
          width={100}
          height={100}
          className="logo22"
          priority
        />
        <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </div>
        )}
      </section>

      <section>
        {isContentVisible && isLoaderVisible && (
          <div id="content22">
            <div className="loader">
              <div className="spinner"></div>
              <p>Verification of compatibility...</p>
            </div>
          </div>
        )}
      </section>

      <Header/>
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
                <i className="fas fa-globe transparent-globe" style={{ color: '#2bf', fontSize: '19px' }}></i>
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
              <Link href="/about" target="_blank">
                <i className="fas fa-question-circle" style={{ color: "#ffffffc9" }}></i>
                <span className="h6"> En savoir plus sur </span>
                <br />
                <span className="h5 ml-6">BOOLi-Store.world</span>
                <br />
              </Link>
              <p className="DEVISE mt-3">
                Plateforme de mise en relation B2B, pour la commercialisation et <br /> l&apos; Innovation
              </p>
            </div>

            <div className="services col-4 mt-5">
              <Link href="/pharmacopee" className="load-link" target="_blank">
                <i className="fa-solid fa-newspaper"></i> Pharmacopée & Tourisme
              </Link>
              <br />
              <br />
              <Link href="/librairie" target="_blank">
                <i className="fa-solid fa-book-open"></i> Bibliothèque [Documents]
              </Link>
              <br />
              <br />
              <Link href="/opportunites" target="_blank">
                <i className="fas fa-briefcase" id="conu"></i> Découvrir des Opportunitées
              </Link>
            </div>

            <div className="ad col-4" id="conteneur">
              <div id="">
                <div className="new-badge">
                  <span className="pubf">
                    <div className="minuteur" data-time="28800">12:20:10</div>
                  </span>
                </div>
                <a href="#">
                  <img src="/image/pub.jpg" alt="Pub1" id="img" />
                </a>
                <a href="#">
                  <img src="/image/work7.jpg" alt="Pub2" id="img1" />
                </a>
                <a href="#">
                  <img src="/image/surprise1.jpg" alt="Pub3" id="img2" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="section_next row col-12">
            <div className="loader-container">
              <div className="chargement"></div>
              <div className="announcement" id="announcement">{announcement || "ok"}</div>
            </div>

            <div className="lova mt-4">
              <div className="cercle-pulsant"></div>
              <button id="next" onClick={handleNextClick}>
                Suivant...({countdown})
              </button>
            </div>
            <section>
            <ChatModal />
            </section>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
