"use client";

import Header from "@/components/layout/listing/Header"
import Footer from "@/components/layout/listing/Footer";
import CategoryCatalog from "@/features/ecommerce/components/modals/CategoryCatalog";
import Navbar from "@/components/layout/section/commercial/Navbar";
import CategoryDisplay from "@/features/ecommerce/components/section/CategoryDisplay";
import AdBanner from "@/components/layout/section/commercial/Adbanner";
import CategoryIconScroll from "@/features/ecommerce/components/section/CategoryIconScoll";
import NonTechCategories from "@/features/ecommerce/components/section/NonTechCategories";
import AdPopup from "@/components/layout/section/commercial/AdPopup";
import ShopSection from "@/features/ecommerce/components/section/ShopSection";
import PromotionSection from "@/features/ecommerce/components/section/PromotionSections";
import EngrosSection from "@/features/ecommerce/components/section/EnGrosSection";
import AgencySection from "@/features/ecommerce/components/section/AgencySection";

export default function ProductPage() {


  return (
    <>
        <Header/>
        <CategoryCatalog />
        <section className="menuu row col-12">
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