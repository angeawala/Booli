"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { passwordResetRequest } from "@/api/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { AxiosError } from "axios";

export default function PasswordResetRequestPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Ajout pour débouncing
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Débouncing
    setIsSubmitting(true);
    setIsLoading(true);

    try {
      await passwordResetRequest(email);
      toast.success("Un email de réinitialisation a été envoyé ! Redirection...");
      setTimeout(() => router.push("/auth/login"), 2000); // Délai pour voir le message
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data?.detail || "Erreur lors de l’envoi de l’email.";
        toast.error(errorMsg);
      } else {
        toast.error("Une erreur inattendue est survenue.");
      }
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const toggleInfo = () => setShowInfo(!showInfo);

  return (
    <div className="img-inscription min-vh-100 d-flex flex-column align-items-center justify-content-center">
      {isLoading && (
        <div className="loading-container" id="loading">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
      {!isLoading && (
        <>
          <h1 className="Logo mb-4 text-center">BOOLi-STORE.world</h1>
          <div className="container px-1">
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-md-8 col-lg-6 bg-white rounded-5 px-3 py-4 cadre">
                <h2 className="text-center mt-3">Mot de passe oublié</h2>
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 mt-5">
                    <input
                      type="email"
                      name="email"
                      className="form-control border-2 shadow-none custom-input e-recover"
                      placeholder="Entrez votre adresse email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-center mb-4">
                    <button
                      type="submit"
                      className="btn-lg connex w-100 w-md-auto"
                      disabled={isSubmitting || isLoading}
                      style={{ display: "block" }}
                    >
                      {isLoading ? "Envoi en cours..." : "Envoyer"}
                    </button>
                  </div>
                  <div className="more-info text-center">
                    <Image
                      src="/image/icone.png"
                      className="toggle-icon mb-2"
                      alt="Help icon"
                      onClick={toggleInfo}
                      width={32}
                      height={32}
                    />
                    {showInfo && (
                      <p className="toggle-text text-center">
                        Entrez votre adresse email ci-dessus pour recevoir un lien de réinitialisation. Ce lien sera envoyé à l’email associé à votre compte.
                      </p>
                    )}
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