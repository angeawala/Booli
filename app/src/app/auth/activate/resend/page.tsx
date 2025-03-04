"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resendActivation } from "@/api/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      console.log("Resend activation response:", response);
      const msg = response.message || "Un nouvel email d’activation a été envoyé !";
      toast.success(msg);
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Erreur lors du renvoi:", error);
      const errorMsg = error.response?.data?.error || "Erreur lors de l’envoi de l’email.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="img-inscription">
      {isLoading && (
        <div className="loading-container" id="loading">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
      {!isLoading && (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-6 bg-white rounded-5 cadre">
              <h1 className="Logo">BOOLi-STORE.world</h1>
              <h2 className="mx-0 mt-3 mb-3 connex1">Renvoyer l’email d’activation</h2>
              <p className="text-center mb-5 entete2">
                Entrez votre email pour recevoir un nouveau lien d’activation.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control border-2 shadow-none custom-input"
                    placeholder="Entrez votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="d-block text-center mb-2">
                  <button
                    type="submit"
                    className="btn btn-lg text-white connex"
                    disabled={isLoading}
                  >
                    {isLoading ? "Envoi en cours..." : "Renvoyer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}