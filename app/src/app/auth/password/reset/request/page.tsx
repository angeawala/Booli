"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { passwordResetRequest } from "@/features/auth/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/auth.css";
import Link from "next/link";


export default function PasswordResetRequestPage() {
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
      await passwordResetRequest(email);
      toast.success("Un lien de réinitialisation a été envoyé à votre email !");
      router.push("/auth/login");
    } catch (e) {
      console.log("Password reset request failed:", e);
      toast.error("Erreur lors de l’envoi, réessayez.");
    } finally {
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
          <h1 className="text-center mb-4 fw-bold">BOOLi-STORE.world</h1>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 bg-white rounded-5 p-4 shadow x-auth-form">
              <h2 className="text-center mb-4 fw-semibold text-primary">Réinitialisation du mot de passe</h2>
              <p className="text-center mb-4 text-muted">
                Entrez votre email pour recevoir un lien de réinitialisation
              </p>
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
                  <div className="col-12 d-flex flex-column gap-3 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg x-auth-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi..." : "Envoyer"}
                    </button>
                    <Link href="/auth/login" className="btn btn-link x-auth-link text-center">
                      Retour à la connexion
                    </Link>
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