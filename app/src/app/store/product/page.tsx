"use client";

import Header from "@/components/layout/listing/Header"
import Footer from "@/components/layout/listing/Footer";
import CategoryCatalog from "@/components/modals/CategoryCatalog";
import Navbar from "@/components/layout/section/commercial/Navbar";
import CategoryDisplay from "@/components/layout/section/commercial/CategoryDisplay";
import AdBanner from "@/components/layout/section/commercial/Adbanner";
import CategoryIconScroll from "@/components/layout/section/commercial/CategoryIconScoll";
import NonTechCategories from "@/components/layout/section/commercial/NonTechCategories";
import AdPopup from "@/components/layout/section/commercial/AdPopup";
import ShopSection from "@/components/layout/section/commercial/ShopSection";
import PromotionSection from "@/components/layout/section/commercial/PromotionSections";
import EngrosSection from "@/components/layout/section/commercial/EnGrosSection";
import AgencySection from "@/components/layout/section/commercial/AgencySection";

export default function ProductPage() {


  return (
    <>
        <Header/>
        <CategoryCatalog />
        <section className="menuu row col-12 store-menu">
        <Navbar/>
        <CategoryDisplay/>
        </section>
        <AdBanner/>
        <CategoryIconScroll/>
        <EngrosSection/>
    <NonTechCategories/>
    <PromotionSection/>
    <ShopSection/>
    <AgencySection/>
    <AdPopup/>
      <Footer/>
    </>
  );
}