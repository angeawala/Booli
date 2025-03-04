"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import CookieConsent from "@/components/CookieConsent";
import GoogleTranslateLoader from "@/components/GoogleTranslateLoader";
import { Akaya_Kanadaka, Poppins } from "next/font/google";
import "./globals.css";
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Photo/booli.orang.jpg" type="image/jpg" />
      </head>
      <body className={`${akayaKanadaka.className} ${poppins.className}`}>
        <Provider store={store}>
          <GoogleTranslateLoader />
          <CookieConsent />
          {children}
        </Provider>
      </body>
    </html>
  );
}