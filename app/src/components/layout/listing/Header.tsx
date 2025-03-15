// @/components/layout/listing/Header.tsx
"use client";

import Link from "next/link";
import Panier from "@/components/ui/Panier";
import SignInOrLogout from "@/components/links/SignInOrLogout";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [currentLang, setCurrentLang] = useState<string>("fr");
  const countrySelectRef = useRef<HTMLSelectElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // État pour la recherche
  const [suggestions, setSuggestions] = useState<string[]>([]); // État pour les suggestions

  // Liste des produits et services
  const items = [
    "Accessoires", "Appareils photo", "Bijoux", "Chaussures",
    "Électronique", "Formation", "Jouets", "Livres", "Documents",
    "Meubles", "Ordinateurs", "Téléphones", "Vêtements"
  ];

  // Gestion des suggestions
  const showSuggestions = (query: string) => {
    if (query) {
      const filteredItems = items
        .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
        .sort()
        .slice(0, 6);
      setSuggestions(filteredItems);
    } else {
      setSuggestions([]);
    }
  };

  // Sélection d'une suggestion
  const selectSuggestion = (value: string) => {
    setSearchQuery(value);
    setSuggestions([]);
  };

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

  // Mise à jour des suggestions lors de la saisie
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    showSuggestions(query);
  };

  return (
    <>
      <header className="header" id="header">
        <div className="head">
          <Link href="/index_acceuil2">
            <span className="new">
              -- BOOLi-STORE -- CENTER GLOBAL OF THE OPPORTUNITIES IN AFRICA
            </span>
          </Link>
        </div>
      </header>

      {/* Section de traduction */}
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

      {/* Section avec images de fond */}
      <section className="sous col-12 px-2 ml-4 px-4" id="sous">
        <div
          className="backgroundf"
          style={{ backgroundImage: "url('/image/vente.jpg')" }}
        ></div>
        <div
          className="backgroundf"
          style={{ backgroundImage: "url('/image/EA.jpg')" }}
        ></div>
        <div
          className="backgroundf"
          style={{ backgroundImage: "url('/image/livraison.jpg')" }}
        ></div>
        <div className="row col-12 px-2 content-wrapper">
          <div className="connect col-sm-4 mt-3 text-left px-4">
            <button onClick={() => (window.location.href = "/acceuil_boutique")}>
              <img src="/image/user_market.jpeg" id="m1" alt="Démarrer un Business" /> Démarrer un
              Business
            </button>
          </div>
          <div className="affi col-sm-5">
            <img src="/image/Eco.jpg" alt="Produit" className="image" />
            <p>
              BOOLi-STORE ECONOMISEZ <i className="fas fa-plus" id="accru"></i>
            </p>
          </div>
          <div className="expédition col-sm-2">
            <form action="#" method="post">
              <label htmlFor="country-select">
                <strong>Expédiez à :</strong>
              </label>
              <select
                id="country-select"
                name="country"
                ref={countrySelectRef}
              >
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

      {/* Section moteur de recherche */}
      <section className="tout row col-12 pt-2">
        <section className="moteur" id="moteur">
          <div className="row col-12" id="mtn">
            <div className="log col-2 mt-3">
              <Link href="/index">
                <img src="/logo/booli.png" id="coni" alt="Logo" />
              </Link>
            </div>
            <div className="search-container col-4 ml-2">
              <input
                type="text"
                className="search-input"
                id="search-input"
                placeholder="Recherchez un produit, service, autres solutions..."
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <button id="search-button">
                <i className="fas fa-search"> Rechercher</i>
              </button>
              <i className="fa fa-camera camera-icon" id="camera-icon"></i>
              <div className="suggestions" id="suggestionslist">
                {suggestions.length > 0 ? (
                  suggestions.map((item) => (
                    <div
                      key={item}
                      className="suggestionslist"
                      onClick={() => selectSuggestion(item)}
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="suggestion-item">Agriculture, Mode Africaine</div>
                    <div className="suggestion-item">HITECH, Réservation</div>
                  </>
                )}
              </div>
              <input
                type="file"
                id="camera-input"
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
            <div
              className="connex2 col-sm-2 text-center mt-3 ml-4"
              style={{ display: "block", position: "relative" }}
            >
              <a href="#" id="connect1-btn">
                <img src="/image/user2.png" id="con" /> Mon Compte
              </a>
              <div className="dropdown1-menu">
                <SignInOrLogout />
                <a href="/Users-Agent/page_not_found" target="_blank">Tableau de Bord</a>
                <a href="/connexion_client" target="_blank">Vos Commandes</a>
                <a href="/connexion_client" target="_blank">Vos Souhaits</a>
              </div>
            </div>
            <div className="col-sm-2 text-center ml-4" id="Bye">
              <Panier />
            </div>
            <div className="helf col-sm-1 text-center">
              <Link href="#" id="connect1-btn">
                <i className="fas fa-question-circle" id="conu"></i> Aide
              </Link>
              <div className="dropdown1-menu">
                <Link href="/helph_market">
                  <i className="fas fa-question-circle"></i> FAQs
                </Link>
                <Link href="/contact_number">
                  <i className="fas fa-shopping-cart"></i> Commander
                </Link>
                <Link href="/command_annul">
                  <i className="fas fa-times-circle"></i> Annulation
                </Link>
                <Link href="/service client">
                  <i className="fas fa-truck"></i> Service Client
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}