"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordConfirm } from "@/api/authApi"; // À ajouter
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
    if (!token) {
      toast.error("Token manquant");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPasswordConfirm(token, formData.newPassword, formData.confirmPassword);
      console.log("Reset password response:", response);
      toast.success("Mot de passe réinitialisé avec succès ! Vous pouvez maintenant vous connecter.");
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Erreur lors de la réinitialisation:", error);
      const errorMsg = error.response?.data?.error || "Erreur lors de la réinitialisation";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword1 = () => setPasswordVisible1((prev) => !prev);
  const togglePassword2 = () => setPasswordVisible2((prev) => !prev);

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
              <h2 className="mx-0 mt-3 mb-3 connex1">Réinitialisation du mot de passe</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group password-container mb-4">
                  <input
                    type={passwordVisible1 ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    className="form-control border-2 shadow-none custom-input"
                    placeholder="Nouveau mot de passe"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                  <span className="toggle-password" onClick={togglePassword1}>
                    <i className={passwordVisible1 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                  </span>
                </div>
                <div className="input-group password-container mb-4">
                  <input
                    type={passwordVisible2 ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-control border-2 shadow-none custom-input"
                    placeholder="Confirmez le mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span className="toggle-password" onClick={togglePassword2}>
                    <i className={passwordVisible2 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                  </span>
                </div>
                <div className="d-block text-center mb-2">
                  <button
                    type="submit"
                    className="btn btn-lg text-white connex"
                    disabled={isLoading}
                  >
                    Réinitialiser
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