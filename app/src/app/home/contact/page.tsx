"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true); // État pour gérer l'affichage du loading

  // Faire disparaître le loading après 2 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2000 ms = 2 secondes

    return () => clearTimeout(timer); // Nettoyage du timer
  }, []);

  return (
    <>
      {/* Conteneur de l'animation, affiché seulement si isLoading est true */}
      {isLoading && (
        <div className="loading-container" id="loading">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}

      <h1 className="Logo">BOOLi-STORE.world&quot;&quot;</h1>

      <div className="container mt-4 px-1">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-6 bg-white rounded-5 cadre">
            <h5 className="text-center mb-4">Voudriez-nous joindres ?</h5>
            <form action="#" method="post">
              <div className="input-group mb-1 mt-5">
                <input
                  type="text"
                  name="Nom"
                  className="form-control border-2 shadow-none custom-input e-recover"
                  placeholder="Entrez votre nom complet"
                />
              </div>

              <div className="input-group mb-1 mt-2">
                <input
                  type="text"
                  name="Sujet"
                  className="form-control border-2 shadow-none custom-input e-recover"
                  placeholder="Objet"
                />
              </div>

              <div className="d-block text-center mb-4 mt-2">
                <textarea
                  id="description_produit"
                  name="description_produit"
                  required
                  className="form-control border-2 shadow-none custom-input e-recover"
                  placeholder="Entrez votre message ici...."
                ></textarea>
              </div>

              <div className="mb-1 mt-2 text-center">
                <Link href="/contact_number" className="btn">
                  <i className="fas fa-phone-alt"></i> Appeler
                </Link>
                <button type="button" className="btn">
                  <i className="fas fa-envelope"></i> Mail
                </button>
              </div>

              <div className="d-block text-center mb-4">
                <button type="submit" className="btn btn-lg text-white connex">
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}