"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resendActivation } from "@/features/auth/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/auth.css";

export default function ResendActivationPage() {
  const [email, setEmail] = useState(localStorage.getItem("lastEmail") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !email) {
      toast.error("Veuillez entrer un email.");
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    try {
      await resendActivation(email);
      toast.success("Email d’activation envoyé ! Redirection...");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Erreur lors de l’envoi, réessayez.");
      console.log('Error de lors de activate-resend:', error)    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-3 x-auth-container">
      {isLoading && (
        <div className="x-auth-loading">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="container">
          <h1 className="text-center mb-4 fw-bold text-white">BOOLi-STORE.world</h1>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-5 bg-white rounded-5 p-4 shadow x-auth-form">
              <h2 className="text-center mb-4 fw-semibold text-primary">Renvoyer l’activation</h2>
              <p className="text-center mb-4 text-muted">Entrez votre email pour un nouveau lien.</p>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="email"
                      name="email"
                      className="form-control x-auth-input"
                      placeholder="Adresse email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label="Adresse email"
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg x-auth-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi..." : "Renvoyer"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}