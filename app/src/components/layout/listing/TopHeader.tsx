"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface TopHeaderProps {
  isScrolled: boolean;
}

export default function TopHeader({ isScrolled }: TopHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const sousRef = useRef<HTMLElement>(null);
  const countrySelectRef = useRef<HTMLSelectElement>(null);
  const [currentLang, setCurrentLang] = useState<string>("fr");
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const carouselImages = [
    "/Photo/vente.jpg",
    "/Photo/EA.jpg",
    "/Photo/livraison.jpg",
  ];

  // Gestion de la traduction
  const handleTranslateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    setCurrentLang(lang);
    document.cookie = `googtrans=/fr/${lang}; path=/`;
    window.location.reload();
  };

  // Gestion des drapeaux pour le <select> des pays
  useEffect(() => {
    const select = countrySelectRef.current;
    if (!select) return;

    const updateFlag = () => {
      const selectedOption = select.options[select.selectedIndex];
      const flagCode = selectedOption.getAttribute("data-flag");
      const flagUrl = flagCode
        ? `url('https://flagcdn.com/${flagCode}.svg')`
        : `url('https://flagcdn.com/unknown.svg')`;
      select.style.backgroundImage = flagUrl;
      select.style.backgroundRepeat = "no-repeat";
      select.style.backgroundPosition = "left 5px center";
      select.style.paddingLeft = "30px";
    };

    updateFlag();
    select.addEventListener("change", updateFlag);

    return () => {
      select.removeEventListener("change", updateFlag);
    };
  }, []);

  // Gestion du carrousel
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <>
      <header
        className="header"
        id="header"
        ref={headerRef}
        style={{ display: isScrolled ? "none" : "block" }}
      >
        <div className="head">
          <Link href="store/product">
            <span className="new">
              -- BOOLi-STORE -- CENTER GLOBAL OF THE OPPORTUNITIES IN AFRICA
            </span>
          </Link>
        </div>
      </header>

      <section className="ml-2">
        <div className="translate-container">
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
      </section>

      <section
        className="sous col-12 px-2 ml-4 px-4"
        id="sous"
        ref={sousRef}
        style={{ display: isScrolled ? "none" : "block" }}
      >
        <div className="carousel">
          {carouselImages.map((img, index) => (
            <div
              key={index}
              className="backgroundf"
              style={{
                backgroundImage: `url('${img}')`,
                display: slideIndex === index ? "block" : "none",
              }}
            ></div>
          ))}
        </div>
        <div className="row col-12 px-2 content-wrapper">
          <div className="connect col-sm-4 mt-3 text-left px-4">
            <button onClick={() => (window.location.href = "/acceuil_boutique")}>
              <img src="/media/user_market.jpeg" id="m1" alt="Démarrer un Business" /> Démarrer un
              Business
            </button>
          </div>
          <div className="affi col-sm-5">
            <img src="/Photo/Eco.jpg" alt="Produit" className="image" />
            <p>
              BOOLi-STORE ECONOMISEZ <i className="fas fa-plus" id="accru"></i>
            </p>
          </div>
          <div className="expédition col-sm-2">
            <form action="#" method="post">
              <label htmlFor="country-select">
                <strong>Expédiez à :</strong>
              </label>
              <select id="country-select" name="country" ref={countrySelectRef}>
                <option value="bj" data-flag="bj">Benin</option>
                <option value="tg" data-flag="tg">Togo</option>
                <option value="ng" data-flag="ng">Nigeria</option>
                <option value="bf" data-flag="bf">Burkina-Faso</option>
                <option value="ne" data-flag="ne">Niger</option>
                <option value="sn" data-flag="sn">Sénégal</option>
                <option value="mc" data-flag="mc">Maroc</option>
                <option value="eg" data-flag="eg">Egypte</option>
                <option value="cn" data-flag="cn">Chine</option>
                <option value="fr" data-flag="fr">France</option>
                <option value="us" data-flag="us">United States</option>
                <option value="ca" data-flag="ca">Canada</option>
                <option value="de" data-flag="de">Germany</option>
              </select>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}