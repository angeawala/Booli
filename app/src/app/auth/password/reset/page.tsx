"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordConfirm } from "@/api/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";

function ResetPasswordContent() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Ajout pour débouncing
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Débouncing
    if (!token) {
      toast.error("Lien invalide : token manquant.");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    try {
      await resetPasswordConfirm(token, formData.newPassword, formData.confirmPassword);
      toast.success("Mot de passe réinitialisé avec succès ! Redirection vers la connexion...");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data?.detail || "Erreur lors de la réinitialisation du mot de passe.";
        toast.error(errorMsg);
      } else {
        toast.error("Une erreur inattendue est survenue.");
      }
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const togglePassword1 = () => setPasswordVisible1((prev) => !prev);
  const togglePassword2 = () => setPasswordVisible2((prev) => !prev);

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
                <h2 className="mt-3 mb-4 text-center text-primary fw-semibold">
                  Réinitialisation du mot de passe
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 position-relative">
                    <input
                      type={passwordVisible1 ? "text" : "password"}
                      name="newPassword"
                      id="newPassword"
                      className="form-control border-2 shadow-none custom-input py-2"
                      placeholder="Nouveau mot de passe"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer"
                      onClick={togglePassword1}
                    >
                      <i className={passwordVisible1 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                    </span>
                  </div>
                  <div className="mb-4 position-relative">
                    <input
                      type={passwordVisible2 ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      className="form-control border-2 shadow-none custom-input py-2"
                      placeholder="Confirmez le mot de passe"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer"
                      onClick={togglePassword2}
                    >
                      <i className={passwordVisible2 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                    </span>
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg text-white px-4 py-2 w-100 w-md-auto"
                      disabled={isSubmitting || isLoading}
                    >
                      {isLoading ? "Réinitialisation..." : "Réinitialiser"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="img-inscription min-vh-100 d-flex align-items-center justify-content-center">
          <div className="loading-container">
            <div className="bar bg-primary"></div>
            <div className="bar bg-primary"></div>
            <div className="bar bg-primary"></div>
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}