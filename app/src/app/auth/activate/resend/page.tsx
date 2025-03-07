"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resendActivation } from "@/api/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ErrorResponse {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export default function ResendActivationPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Veuillez entrer un email.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await resendActivation(email);
      const msg = response.message || "Un nouvel email d’activation a été envoyé !";
      toast.success(msg);
      setTimeout(() => router.push("/auth/login"), 2000); // Ajout d'un délai pour voir le succès
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      const errorMsg = typedError.response?.data?.error || "Erreur lors de l’envoi de l’email.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="img-inscription min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      {isLoading && (
        <div className="loading-container position-absolute top-50 start-50 translate-middle">
          <div className="bar bg-primary"></div>
          <div className="bar bg-primary"></div>
          <div className="bar bg-primary"></div>
        </div>
      )}
      {!isLoading && (
        <>
          <h1 className="Logo mb-4 text-center text-white fw-bold">BOOLi-STORE.world</h1>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-5 bg-white rounded-5 shadow-lg p-4 cadre">
                <h2 className="mt-3 mb-4 text-center text-primary fw-semibold">Renvoyer l’email d’activation</h2>
                <p className="text-center mb-4 text-muted">
                  Entrez votre email pour recevoir un nouveau lien d’activation.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="email"
                      name="email"
                      className="form-control border-2 shadow-none custom-input py-2"
                      placeholder="Entrez votre adresse email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg text-white px-4 py-2 w-100 w-md-auto"
                      disabled={isLoading}
                    >
                      {isLoading ? "Envoi en cours..." : "Renvoyer"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}