"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store"; // Nouveau store Redux
import CookieConsent from "@/components/CookieConsent";
import GoogleTranslateLoader from "@/components/GoogleTranslateLoader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; object-src 'none'; base-uri 'self'; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;"
        /> */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/Photo/booli.orang.jpg" type="image/jpg" />
        <link href="https://fonts.googleapis.com/css?family=Akaya+Kanadaka" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome@6.0.0-beta3/css/all.min.css"
        />
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        <Provider store={store}>
          <GoogleTranslateLoader />
          <CookieConsent />
          {children}
        </Provider>
      </body>
    </html>
  );
}