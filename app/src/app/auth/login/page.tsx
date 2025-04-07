"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setTokens } from "@/features/auth/authSlice";
import { login, checkUser, generate2FAToken, verify2FA } from "@/features/auth/authApi";
import { RootState } from "@/store";
import { checkAuth } from "@/utils/authUtils";
import { validateRedirect } from "@/utils/redirectUtils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/auth.css";
import TwoFAModal from "@/components/modals/TwoFAModal";
import { getAccessToken } from "@/services/api";

interface FormData {
  email: string;
  password: string;
}

function LoginContent() {
  const [formData, setFormData] = useState<FormData>(() => {
    const savedEmail = localStorage.getItem("lastEmail") || "";
    return { email: savedEmail, password: "" };
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFAExpiresAt, setTwoFAExpiresAt] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = getAccessToken();
      if (token && isAuthenticated) {
        toast.success("Vous êtes déjà connecté ! Redirection...");
        const next = validateRedirect(searchParams.get("next")) || "/";
        router.push(next);
      } else {
        const isAuth = await checkAuth();
        if (isAuth) {
          toast.success("Vous êtes déjà connecté ! Redirection...");
          const next = validateRedirect(searchParams.get("next")) || "/";
          router.push(next);
        }
      }
      setIsLoading(false);
    };
    verifyAuth();
  }, [router, searchParams, isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setIsLoading(true);

    try {
      const checkResponse = await checkUser(formData.email, formData.password);
      if (!checkResponse.exists) {
        toast.error("Identifiants incorrects, réessayez.");
        return;
      }
      if (!checkResponse.is_active) {
        toast.error("Compte non activé, vérifiez votre email.");
        router.push("/auth/activate/resend");
        return;
      }
      if (checkResponse.is_2fa_enabled) {
        const twoFAResponse = await generate2FAToken(formData.email);
        setTwoFAExpiresAt(twoFAResponse.expires_at);
        setShow2FAModal(true);
      } else {
        const tokenResponse = await login(formData.email, formData.password);
        dispatch(setTokens({ access: tokenResponse.access }));
        localStorage.setItem("lastEmail", formData.email);
        toast.success("Connexion réussie !");
        const next = validateRedirect(searchParams.get("next")) || "/";
        router.push(next);
      }
    } catch (e) {
      console.log("Login failed:", e);
      toast.error("Erreur de connexion, réessayez.");
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const handle2FASubmit = async (code: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setIsLoading(true);
    try {
      const response = await verify2FA(formData.email, code, formData.password);
      dispatch(setTokens({ access: response.access }));
      localStorage.setItem("lastEmail", formData.email);
      toast.success("Connexion réussie !");
      setShow2FAModal(false);
      const next = validateRedirect(searchParams.get("next")) || "/";
      router.push(next);
    } catch (e) {
      console.log("2FA verification failed:", e);
      toast.error("Code invalide, réessayez.");
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleResend2FA = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setIsLoading(true);
    try {
      const response = await generate2FAToken(formData.email);
      setTwoFAExpiresAt(response.expires_at);
      toast.success("Nouveau code envoyé !");
    } catch (e) {
      console.log("2FA resend failed:", e);
      toast.error("Erreur lors du renvoi, réessayez.");
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
              <h2 className="text-center mb-4 fw-semibold text-primary">Connectez-vous</h2>
              <p className="text-center mb-4 text-muted">
                Entrez vos identifiants pour accéder à votre compte
              </p>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="text"
                      name="email"
                      className="form-control x-auth-input"
                      placeholder="Email ou contact"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-label="Email ou contact"
                    />
                  </div>
                  <div className="col-12 position-relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      className="form-control x-auth-input"
                      placeholder="Mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      aria-label="Mot de passe"
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer"
                      onClick={() => setPasswordVisible((prev) => !prev)}
                      aria-label="Afficher/masquer le mot de passe"
                    >
                      <i className={passwordVisible ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                    </span>
                  </div>
                  <div className="col-12 text-end">
                    <Link href="/auth/password/reset/request" className="x-auth-link">
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <div className="col-12 d-flex flex-column gap-3 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg x-auth-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Connexion..." : "Se connecter"}
                    </button>
                    <Link href="/auth/register" className="btn btn-link x-auth-link text-center">
                      Créer un compte
                    </Link>
                  </div>
                </div>
              </form>
              <TwoFAModal
                isOpen={show2FAModal}
                onClose={() => setShow2FAModal(false)}
                onSubmit={handle2FASubmit}
                onResend={handleResend2FA}
                email={formData.email}
                expiresAt={twoFAExpiresAt}
                isLoading={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
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
      <LoginContent />
    </Suspense>
  );
}