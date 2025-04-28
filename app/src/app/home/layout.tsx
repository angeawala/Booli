"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import Head from "next/head";
import CookieConsent from "@/components/CookieConsent";
import GoogleTranslateLoader from "@/components/GoogleTranslateLoader";
import { Akaya_Kanadaka, Poppins, Orbitron, Montserrat } from "next/font/google";
import { CartProvider } from "@/context/cartContext";
import "@/styles/css/market.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import '@/styles/index.css';
import '@/styles/style_mobile.css';



const akayaKanadaka = Akaya_Kanadaka({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["300", "400"],
  subsets: ["latin"],
  display: "swap",
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <Head>
        <link rel="icon" href="/logo/booliorang.jpg" type="image/jpg" />
      </Head>
      <body className={`${akayaKanadaka.className} ${poppins.className} ${orbitron.className} ${montserrat.className}`}>
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
