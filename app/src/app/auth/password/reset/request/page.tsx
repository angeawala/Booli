"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { passwordResetRequest } from "@/api/authApi"; // À ajouter
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PasswordResetRequestPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await passwordResetRequest(email);
      console.log("Password reset request response:", response);
      toast.success("Un email de réinitialisation a été envoyé !");
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Erreur lors de la demande:", error);
      const errorMsg = error.response?.data?.error || "Erreur lors de l’envoi de l’email.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInfo = () => setShowInfo(!showInfo);

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
        <div className="container px-1">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 col-lg-6 bg-white rounded-5 px-3 cadre">
              <h1 className="Logo">BOOLi-STORE.world</h1>
              <h2 className="text-center mt-3">Mot de passe oublié</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-1 mt-5">
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
                <div className="d-block text-center mb-4">
                  <button
                    type="submit"
                    className="btn btn-lg text-white connex"
                    disabled={isLoading}
                  >
                    {isLoading ? "Envoi en cours..." : "Envoyer"}
                  </button>
                </div>
                <div className="more-info">
                  <img
                    src="/media/icone.png"
                    className="toggle-icon"
                    alt="Help icon"
                    onClick={toggleInfo}
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
      )}
    </div>
  );
}