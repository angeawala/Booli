"use client";

import AjoutPanier from "@/components/ui/AjoutPanier";
import Header from "@/components/layout/listing/Header"
import Footer from "@/components/layout/listing/Footer";
import CategoryCatalog from "@/components/modals/CategoryCatalog";
import Navbar from "@/components/layout/section/Navbar";
import CategoryDisplay from "@/components/layout/section/CategoryDisplay";
import AdBanner from "@/components/layout/section/Adbanner";
import CategoryIconScroll from "@/components/layout/section/CategoryIconScoll";
import NonTechCategories from "@/components/layout/section/NonTechCategories";
import AdPopup from "@/components/AdPopup";
import ShopSection from "@/components/layout/section/ShopSection";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = {
    id: parseInt(params.id),
    name: "Exemple Produit",
    price: 29.99,
  };

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
      <h1>{product.name}</h1>
      <p>Prix : {product.price} €</p>
      <AjoutPanier product={product} />
    <NonTechCategories/>
    <ShopSection/>
    <AdPopup/>
      <Footer/>
    </>
  );
}