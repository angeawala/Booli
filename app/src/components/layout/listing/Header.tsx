"use client";

import Link from "next/link";
import Panier from "@/components/ui/button/Panier";
import SignInOrLogout from "@/components/links/SignInOrLogout";
import { useState, useEffect, useRef } from "react";


export default function Header() {


  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
   // State for mobile menu

  const moteurRef = useRef<HTMLElement>(null);

  const items = [
    "Accessoires", "Appareils photo", "Bijoux", "Chaussures",
    "Électronique", "Formation", "Jouets", "Livres", "Documents",
    "Meubles", "Ordinateurs", "Téléphones", "Vêtements"
  ];


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

  const selectSuggestion = (value: string) => {
    setSearchQuery(value);
    setSuggestions([]);
  };





  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    showSuggestions(query);
  };


  useEffect(() => {
    const moteur = moteurRef.current;
    if (!moteur) return;

    const offsetTop = moteur.offsetTop;

    const handleScroll = () => {
      if (window.scrollY > offsetTop) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCameraClick = () => {
    const cameraInput = document.getElementById("camera-input") as HTMLInputElement;
    if (cameraInput) cameraInput.click();
  };

  const handleCameraInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result;
        console.log("Image Data:", imageData);
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <>
        <section
          className="moteur"
          id="moteur"
          ref={moteurRef}
          style={{
            position: isScrolled ? "fixed" : "relative",
            top: isScrolled ? "0" : undefined,
            boxShadow: isScrolled ? "0 2px 5px rgba(0, 0, 0, 0.2)" : "none",
          }}
        >
          <div className="row col-12" id="mtn">
            <div className="log col-2 mt-3">
              <Link href="/">
                <img src="/Photo/booli.png" id="coni" alt="Logo" />
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
              <i className="fa fa-camera camera-icon" id="camera-icon" onClick={handleCameraClick}></i>
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
                onChange={handleCameraInputChange}
              />
            </div>
            <div
              className="connex2 col-sm-2 text-center mt-3 ml-4"
              style={{ display: "block", position: "relative" }}
            >
              <a href="#" id="connect1-btn">
                <img src="/media/user2.png" id="con" alt="Mon Compte" /> Mon Compte
              </a>
              <div className="dropdown1-menu ">
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
                <Link href="/help">
                  <i className="fas fa-question-circle"></i> FAQs
                </Link>
                <Link href="/contact">
                  <i className="fas fa-shopping-cart"></i> Commander
                </Link>
                <Link href="/command_annul">
                  <i className="fas fa-times-circle"></i> Annulation
                </Link>
                <Link href="/service_client">
                  <i className="fas fa-truck"></i> Service Client
                </Link>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}