"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { activateAccount } from "@/api/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function ActivatePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Token manquant");
      setStatus("error");
      setIsLoading(false);
      return;
    }

    const activate = async () => {
      try {
        const response = await activateAccount(token);
        console.log("Activation response:", response);
        toast.success("Compte activé avec succès ! Vous pouvez maintenant vous connecter.");
        setStatus("success");
        setTimeout(() => router.push("/auth/login"), 2000);
      } catch (error: any) {
        console.error("Erreur lors de l’activation:", error);
        const errorMsg = error.response?.data?.error || "Erreur lors de l’activation";
        toast.error(errorMsg);
        setStatus("error");
      } finally {
        setIsLoading(false);
      }
    };

    activate();
  }, [token, router]);

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
              <h2 className="mx-0 mt-3 mb-3 connex1">Confirmation d’email</h2>
              {status === "success" && (
                <p className="text-center mb-5 entete2 text-success">
                  Votre compte a été activé avec succès ! Redirection vers la connexion...
                </p>
              )}
              {status === "error" && (
                <>
                  <p className="text-center mb-5 entete2 text-danger">
                    Échec de l’activation. Le lien peut être invalide ou expiré.
                  </p>
                  <div className="d-block text-center mb-2">
                    <Link href="/auth/activate/resend" className="btn btn-lg text-white connex">
                      Renvoyer un email d’activation
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}