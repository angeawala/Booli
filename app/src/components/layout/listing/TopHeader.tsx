'use client';
import { useEffect , useState, useRef} from "react";
import Link from "next/link";


export default function TopHeader(){

    const [slideIndex, setSlideIndex] = useState<number>(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const headerRef = useRef<HTMLElement>(null);
    const [currentLang, setCurrentLang] = useState<string>("fr");
    const sousRef = useRef<HTMLElement>(null);
    const countrySelectRef = useRef<HTMLSelectElement>(null);
    const carouselImages = [
        "/Photo/vente.jpg",
        "/Photo/EA.jpg",
        "/Photo/livraison.jpg",
      ];
      useEffect(() => {
        const interval = setInterval(() => {
          setSlideIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        }, 4500);
    
        return () => clearInterval(interval);
      }, [carouselImages.length]);
      
      // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleTranslateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    setCurrentLang(lang);
    document.cookie = `googtrans=/fr/${lang}; path=/`;
    window.location.reload();
  };
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
    return(
    <>
      {/* Mobile Menu Section */}
      <section className="tout row col-12">
        <section className="venom" id="venom">
          <div className={`slide-panel ${isMobileMenuOpen ? "active" : ""}`}>
            <button className="menu-toggle-btn" onClick={toggleMobileMenu}>☰ BLS</button>
            <div className="slide-panel-content">
              <button className="close-btn" onClick={toggleMobileMenu}>✕</button>
              <a href="#" id="mobile-search-btn">Rechercher</a>
              <a href="/Panier">Panier</a>
              <a href="/helph_market">Aide</a>
              <a href="/connexion_site" target="_blank">Se Connecter</a>
              <a href="/Users-Agent/page_not_found" target="_blank">Votre compte</a>
              <a href="/connexion_client" target="_blank">Vos Commandes</a>
              <a href="/cathalogue++">** Opportinutés et Et affaires</a>
            </div>
          </div>
          <div className="mobile-title">At Our Place !</div>
        </section>
      </section>

      {/* Header Section */}
      <header
        className="x-header"

        ref={headerRef}
        style={{ display: isScrolled ? "none" : "block" }}
      >
        <div className="head y-desktop-section text-center b-booli">
          <Link href="">
            <span className="new ">
              -- BOOLi-STORE -- CENTER GLOBAL OF THE OPPORTUNITIES IN AFRICA
            </span>
          </Link>
        </div>
      </header>


      {/* Translation Section */}
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

      {/* Carousel Section */}
      <section
        className="sous col-12 px-2 ml-4 px-4"
        id="sous"
        ref={sousRef}
        style={{ display: isScrolled ? "none" : "block" }}
      >
          {carouselImages.map((img, index) => (
            <div

              className="backgroundf"
              style={{
                backgroundImage: `url('${img}')`,
                display: slideIndex === index ? "block" : "none",
              }}
            ></div>
          ))}
        <div className="row col-12 px-2 content-wrapper">
          <div className="connect col-sm-3 mt-3 text-left px-4">
            <button onClick={() => (window.location.href = "/dashboard/")}>
              <img src="/media/user_market.jpeg" id="m1" alt="Démarrer un Business" /> Démarrer un
              Business
            </button>
          </div>
          <div className="affi col-sm-6">
            <img src="/Photo/Eco.jpg" alt="Produit" className="image" />
            <p>
              BOOLi-STORE ECONOMISEZ <i className="fas fa-plus" id="accru"></i>
            </p>
          </div>
          <div className="expédition col-sm-1 ">
            <form action="#" method="post" className="x-exp">
              <label htmlFor="country-select">
                <strong>Expédiez à :</strong>
              </label>
              <select className="x-store-expedion" id="country-select" name="country" ref={countrySelectRef}>
                <option value="bj" data-flag="bj">Benin</option>
                <option value="tg" data-flag="tg">Togo</option>
                <option value="ng" data-flag="ng">Nigeria</option>
                <option value="bf" data-flag="bf">Burkina-Faso</option>
                <option value="ne" data-flag="ne">Niger</option>
                <option value="sn" data-flag="sn">Sénégal</option>
                <option value="mc" data-flag="mc">Maroc</option>
                <option value="cd" data-flag="cd">Congo</option>
                <option value="ci" data-flag="ci">Cote D &apos; Ivoire</option>
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
 )};