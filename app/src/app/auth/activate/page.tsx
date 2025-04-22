"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { activateAccount } from "@/api/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { AxiosError } from "axios";


function ActivateContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Lien invalide : token manquant.");
      setStatus("error");
      setIsLoading(false);
      return;
    }

    const activate = async () => {
      try {
        await activateAccount(token); // Suppression de 'response' inutilisé
        toast.success("Compte activé avec succès ! Redirection vers la connexion...");
        setStatus("success");
        setTimeout(() => router.push("/auth/login"), 2000);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.detail || "Erreur lors de l’activation du compte.";
          toast.error(errorMsg);
        } else {
          toast.error("Une erreur inattendue est survenue.");
        }
        setStatus("error");
      } finally {
        setIsLoading(false);
      }
    };

    activate();
  }, [token, router]);

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
                <h2 className="mx-0 mt-3 mb-4 text-center text-primary fw-semibold">Confirmation d’email</h2>
                {status === "success" && (
                  <div className="alert alert-success text-center" role="alert">
                    <p className="mb-0 fw-medium">
                      Votre compte a été activé avec succès ! Redirection vers la connexion...
                    </p>
                  </div>
                )}
                {status === "error" && (
                  <>
                    <div className="alert alert-danger text-center" role="alert">
                      <p className="mb-0 fw-medium">
                        Échec de l’activation. Le lien peut être invalide ou expiré.
                      </p>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                      <Link
                        href="/auth/activate/resend"
                        className="btn btn-primary btn-lg text-white px-4 py-2 w-100 w-md-auto"
                      >
                        Renvoyer un email d’activation
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function ActivatePage() {
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
      <ActivateContent />
    </Suspense>
  );
}