"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import Head from "next/head";
//import Script from "next/script"; // Importation de next/script
import CookieConsent from "@/components/CookieConsent";
import GoogleTranslateLoader from "@/components/GoogleTranslateLoader";
import { Akaya_Kanadaka, Poppins } from "next/font/google";
import { CartProvider } from "@/context/CartContext"; // Ajout du CartProvider
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


// Charger les polices avec next/font
const akayaKanadaka = Akaya_Kanadaka({
  weight: "400",
  subsets: ["latin"],
  display: "optional",
});

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "optional",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <Head>
        <link rel="icon" href="/logo/booliorang.jpg" type="image/jpg" />
      </Head>
      <body className={`${akayaKanadaka.className} ${poppins.className}`}>
        <Provider store={store}>
          <CartProvider>
            <GoogleTranslateLoader />
            <CookieConsent />
            {children}
          </CartProvider>
        </Provider>
      </body>
    </html>
  );
}