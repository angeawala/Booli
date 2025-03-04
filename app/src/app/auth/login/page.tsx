"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setTokens } from "@/store/authSlice";
import { login, checkUser, generate2FAToken, verify2FA } from "@/api/authApi";
import { RootState } from "@/store/store";
import { checkAuth } from "@/utils/authUtils";
import { validateRedirect } from "@/utils/redirectUtils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessModal from "@/components/modals/SuccessModal";
import ErrorModal from "@/components/modals/ErrorModal";
import TwoFAModal from "@/components/modals/TwoFAModal";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFAExpiresAt, setTwoFAExpiresAt] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuth = await checkAuth();
      if (isAuth) {
        setSuccessMessage("Vous êtes déjà connecté ! Redirection en cours...");
        const next = validateRedirect(searchParams.get("next")) || "/";
        setTimeout(() => router.push(next), 2000);
      }
      setIsLoading(false);
    };
    verifyAuth();
  }, [router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const checkResponse = await checkUser(formData.email, formData.password);
      console.log("Check user response:", checkResponse);

      if (!checkResponse.exists) {
        toast.error("Échec de la connexion. Vérifiez vos identifiants ou essayez à nouveau.");
      } else if (!checkResponse.is_active) {
        setErrorMessage("Échec de la connexion. Vérifiez vos identifiants ou activez votre compte.");
        setTimeout(() => router.push("/auth/activate/resend"), 2000);
      } else if (checkResponse.is_2fa_enabled) {
        const twoFAResponse = await generate2FAToken(formData.email);
        console.log("2FA token response:", twoFAResponse);
        setTwoFAExpiresAt(twoFAResponse.expires_at);
        setShow2FAModal(true);
      } else {
        const tokenResponse = await login(formData.email, formData.password);
        console.log("Login response:", tokenResponse);
        dispatch(setTokens({ access: tokenResponse.access, refresh: tokenResponse.refresh }));
        toast.success("Connexion réussie !");
        const next = validateRedirect(searchParams.get("next")) || "/";
        router.push(next);
      }
    } catch (error: any) {
      console.error("Erreur lors de la connexion:", error);
      toast.error("Échec de la connexion. Vérifiez vos identifiants ou essayez à nouveau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (code: string) => {
    setIsLoading(true);
    try {
      const response = await verify2FA(formData.email, code, formData.password);
      console.log("2FA verify response:", response);
      dispatch(setTokens({ access: response.access, refresh: response.refresh }));
      toast.success("Connexion réussie !");
      setShow2FAModal(false);
      const next = validateRedirect(searchParams.get("next")) || "/";
      router.push(next);
    } catch (error: any) {
      console.error("Erreur lors de la vérification 2FA:", error);
      toast.error("Code invalide ou expiré.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend2FA = async () => {
    setIsLoading(true);
    try {
      const response = await generate2FAToken(formData.email);
      console.log("2FA resend response:", response);
      setTwoFAExpiresAt(response.expires_at);
      toast.success("Nouveau code envoyé !");
    } catch (error: any) {
      console.error("Erreur lors du renvoi 2FA:", error);
      toast.error("Une erreur s’est produite. Réessayez plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => setPasswordVisible(!passwordVisible);

  const closeSuccessModal = () => {
    setSuccessMessage(null);
    const next = validateRedirect(searchParams.get("next")) || "/";
    router.push(next);
  };

  const closeErrorModal = () => {
    setErrorMessage(null);
    if (errorMessage?.includes("activez votre compte")) {
      router.push("/auth/activate/resend");
    }
  };

  return (
    <div className="img-connexion">
      {isLoading && (
        <div className="loading-container" id="loading">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
      {!isLoading && (
        <>
          <h1 className="Logo">BOOLi-STORE.world</h1>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-6 bg-white rounded-5 px-3 cadre">
                <h2 className="mx-0 mt-3 mb-3 connex1">Connectez-vous</h2>
                <h2 className="ami">Amis, Bonjour !</h2>
                <p className="text-center mt-3 entete">
                  Nous vous souhaitons la Bienvenue à{" "}
                  <Link href="/about">
                    <span className="siteName">BOOLi-STORE.world</span>
                  </Link>
                </p>
                <p className="text-center mb-3 entete2">
                  Entrez vos identifiants pour ne plus manquer nos prochaines annonces
                </p>
                {isAuthenticated ? (
                  <SuccessModal message={successMessage} onClose={closeSuccessModal} />
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-4">
                      <input
                        type="text"
                        name="email"
                        className="form-control border-2 shadow-none custom-input"
                        placeholder="Entrez votre adresse email ou contact"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group mb-2">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        className="form-control border-2 shadow-none custom-input"
                        placeholder="Entrez votre mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <span className="toggle-password" onClick={togglePassword}>
                        <i className={passwordVisible ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                      </span>
                    </div>
                    <div>
                      <Link href="/auth/password/reset/request" className="forget">
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <div className="d-block text-center mb-4">
                      <button
                        type="submit"
                        className="btn btn-lg text-white connex"
                        disabled={isLoading}
                      >
                        {isLoading ? "Connexion..." : "Se connecter"}
                      </button>
                      <Link href="/auth/register" className="haveaccount btn">
                        Créer un compte
                      </Link>
                    </div>
                  </form>
                )}
                <ErrorModal message={errorMessage} onClose={closeErrorModal} />
                <TwoFAModal
                  isOpen={show2FAModal}
                  onClose={() => setShow2FAModal(false)}
                  onSubmit={handle2FASubmit}
                  onResend={handleResend2FA}
                  email={formData.email}
                  expiresAt={twoFAExpiresAt}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}