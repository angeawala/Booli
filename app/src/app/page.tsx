"use client";

import SignInOrLogout from "@/components/links/SignInOrLogout";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenue sur BOOLi-STORE.world</h1>
      <p>Explorez notre boutique en ligne !</p>
      <SignInOrLogout className="auth-link" />
    </div>
  );
}