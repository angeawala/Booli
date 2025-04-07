"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordConfirm } from "@/features/auth/authApi"; // Correction du nom
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/auth.css";


function ResetPasswordContent() {
  const [formData, setFormData] = useState({
    password: "",
    rePassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
    match: true,
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Lien invalide, demandez un nouveau lien de réinitialisation.");
      router.push("/auth/password/reset/request");
    }
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      if (name === "password") {
        setPasswordRules({
          length: value.length >= 8,
          uppercase: /[A-Z]/.test(value),
          number: /[0-9]/.test(value),
          special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
          match: value === updatedData.rePassword,
        });
      }
      if (name === "rePassword") {
        setPasswordRules((prevRules) => ({
          ...prevRules,
          match: value === updatedData.password,
        }));
      }
      return updatedData;
    });
  };

  const validateForm = () => {
    if (!Object.values(passwordRules).every(Boolean)) {
      toast.error("Le mot de passe ne respecte pas les critères.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !token || !validateForm()) return;

    setIsSubmitting(true);
    setIsLoading(true);
    try {
      await resetPasswordConfirm(token, formData.password, formData.rePassword); // Utilisation de resetPasswordConfirm
      toast.success("Mot de passe réinitialisé avec succès ! Redirection...");
      router.push("/auth/login");
    } catch (e) {
      console.log("Password reset failed:", e);
      toast.error("Erreur lors de la réinitialisation, lien invalide ou expiré.");
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
      {!isLoading && token && (
        <div className="container">
          <h1 className="text-center mb-4 fw-bold">BOOLi-STORE.world</h1>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 bg-white rounded-5 p-4 shadow x-auth-form">
              <h2 className="text-center mb-4 fw-semibold text-primary">Réinitialiser le mot de passe</h2>
              <p className="text-center mb-4 text-muted">Entrez votre nouveau mot de passe</p>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 position-relative">
                    <input
                      type={passwordVisible1 ? "text" : "password"}
                      name="password"
                      className="form-control x-auth-input"
                      placeholder="Nouveau mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      required
                      aria-label="Nouveau mot de passe"
                      aria-describedby="password-rules"
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer"
                      onClick={() => setPasswordVisible1((prev) => !prev)}
                      aria-label="Afficher/masquer le mot de passe"
                    >
                      <i className={passwordVisible1 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                    </span>
                  </div>
                  <div className="col-12 position-relative">
                    <input
                      type={passwordVisible2 ? "text" : "password"}
                      name="rePassword"
                      className="form-control x-auth-input"
                      placeholder="Confirmez le mot de passe"
                      value={formData.rePassword}
                      onChange={handleChange}
                      required
                      aria-label="Confirmation du mot de passe"
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer"
                      onClick={() => setPasswordVisible2((prev) => !prev)}
                      aria-label="Afficher/masquer la confirmation"
                    >
                      <i className={passwordVisible2 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                    </span>
                  </div>
                  {isPasswordFocused && (
                    <div className="col-12" id="password-rules">
                      <ul className="list-unstyled x-auth-password-rule">
                        <li className={passwordRules.length ? "text-success" : "text-danger"}>
                          <i className={passwordRules.length ? "fa fa-check" : "fa fa-times"}></i> 8 caractères min
                        </li>
                        <li className={passwordRules.uppercase ? "text-success" : "text-danger"}>
                          <i className={passwordRules.uppercase ? "fa fa-check" : "fa fa-times"}></i> Une majuscule
                        </li>
                        <li className={passwordRules.number ? "text-success" : "text-danger"}>
                          <i className={passwordRules.number ? "fa fa-check" : "fa fa-times"}></i> Un chiffre
                        </li>
                        <li className={passwordRules.special ? "text-success" : "text-danger"}>
                          <i className={passwordRules.special ? "fa fa-check" : "fa fa-times"}></i> Un caractère spécial
                        </li>
                        <li className={passwordRules.match ? "text-success" : "text-danger"}>
                          <i className={passwordRules.match ? "fa fa-check" : "fa fa-times"}></i> Mots de passe identiques
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className="col-12 d-flex justify-content-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg x-auth-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Réinitialisation..." : "Réinitialiser"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-vh-100 d-flex align-items-center justify-content-center x-auth-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}