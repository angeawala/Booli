// app/store/panier/page.tsx
"use client";

import React from "react";
import CartManager from "@/components/CartManager";
import Header from "@/components/layout/listing/Header";
import Footer3 from "@/components/Footer3";

const CartPage = () => {
  return (
    <>
    <Header/>
    <section className="cart-page">
      <h1>Mon Panier</h1>
      <CartManager />
    </section>
    <Footer3/>
    </>
  );
};

export default CartPage;