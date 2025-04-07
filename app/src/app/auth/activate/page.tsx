"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { activateAccount } from "@/features/auth/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/auth.css";
import Link from "next/link";


function ActivateContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Lien invalide, réessayez.");
      setStatus("error");
      setIsLoading(false);
      return;
    }

    const activate = async () => {
      try {
        await activateAccount(token);
        toast.success("Compte activé ! Redirection...");
        setStatus("success");
        router.push("/auth/login");
      } catch (error) {
        toast.error("Erreur d’activation, lien invalide ou expiré.");
        setStatus("error");
        console.log("Erreur dors de activation de compte ", error)
        setIsLoading(false);
      }
    };
    activate();
  }, [token, router]);

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
          <h1 className="text-center mb-4 fw-bold text-white">BOOLi-STORE.world</h1>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-5 bg-white rounded-5 p-4 shadow x-auth-form">
              <h2 className="text-center mb-4 fw-semibold text-primary">Confirmation d’email</h2>
              {status === "success" && (
                <p className="text-center text-success">Compte activé, redirection en cours...</p>
              )}
              {status === "error" && (
                <div className="text-center">
                  <p className="text-danger mb-4">Échec de l’activation.</p>
                  <Link href="/auth/activate/resend" className="btn btn-primary btn-lg x-auth-button">
                    Renvoyer un email
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ActivatePage() {
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
      <ActivateContent />
    </Suspense>
  );
}