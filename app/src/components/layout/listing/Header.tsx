"use client";

import Link from "next/link";
import Panier from "@/components/ui/button/Panier";
import SearchBar from "./SearchBar";
import HelpMenu from "./HelpMenu";
import AccountMenu from "./AccountMenu";
import TopHeader from "./TopHeader";
import { useState, useEffect, useRef } from "react";
import '@/styles/index.css'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const moteurRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const moteur = moteurRef.current;
    if (!moteur) return;

    const offsetTop = moteur.offsetTop;

    const handleScroll = () => {
      if (window.scrollY > offsetTop) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <TopHeader isScrolled={isScrolled} />

      <section className="tout row col-12 pt-2 x-header-store">
        <section
          className="moteur"
          id="moteur"
          ref={moteurRef}
          style={{
            position: isScrolled ? "fixed" : "relative",
            top: isScrolled ? "0" : undefined,
            boxShadow: isScrolled ? "0 2px 5px rgba(0, 0, 0, 0.2)" : "none",
          }}
        >
          <div className="row col-12" id="mtn">
            <div className="log col-2 mt-3">
              <Link href="/index">
                <img src="/Photo/booli.png" id="coni" alt="Logo" />
              </Link>
            </div>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <AccountMenu />
            <div className="col-sm-2 text-center ml-4" id="Bye">
              <Panier />
            </div>
            <HelpMenu />
          </div>
        </section>
      </section>
    </>
  );
}