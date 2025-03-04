"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout as logoutAction } from "@/store/authSlice"; // Action Redux
import { logout as logoutApi } from "@/api/authApi"; // Appel API
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SignInOrLogoutProps {
  className?: string; // Prop optionnelle pour le style
}

const SignInOrLogout: React.FC<SignInOrLogoutProps> = ({ className }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Empêche la navigation par défaut
    try {
      await logoutApi(); // Appelle l’API /auth/logout/
      dispatch(logoutAction()); // Met à jour Redux
      router.push("/"); // Redirige vers l’accueil
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <a href="#" onClick={handleLogout} className={className || "sign-link"}>
          Se déconnecter
        </a>
      ) : (
        <Link href="/auth/login" className={className || "sign-link"}>
          Se connecter
        </Link>
      )}
    </>
  );
};

export default SignInOrLogout;