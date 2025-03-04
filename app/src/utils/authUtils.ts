import { store } from "@/store/store";
import { setTokens, logout } from "@/store/authSlice";
import { verifyToken, refreshToken } from "@/api/authApi";

let isRefreshing = false;

export const checkAuth = async (): Promise<boolean> => {
  const { accessToken } = store.getState().auth;

  if (!accessToken) {
    return false;
  }

  try {
    const verifyResponse = (await verifyToken(accessToken)) as { valid: boolean };
    if (verifyResponse.valid) {
      return true;
    }
  } catch (error: unknown) {
    // Vérifier si c'est une erreur et afficher un message
    if (error instanceof Error) {
      console.error("Erreur de vérification du token :", error.message);
    }

    // Token invalide ou expiré, tenter un refresh
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshResponse = (await refreshToken()) as { access: string };
        store.dispatch(setTokens({ access: refreshResponse.access }));
        isRefreshing = false;
        return true;
      } catch (refreshError: unknown) {
        if (refreshError instanceof Error) {
          console.error("Erreur de rafraîchissement du token :", refreshError.message);
        }
        store.dispatch(logout());
        isRefreshing = false;
        return false;
      }
    } else {
      // Attendre la fin du refresh en cours
      while (isRefreshing) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return store.getState().auth.isAuthenticated;
    }
  }

  return false; // Par défaut, si erreur inattendue
};
