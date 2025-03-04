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
    const verifyResponse = await verifyToken(accessToken);
    if (verifyResponse.valid) {
      return true;
    }
  } catch (error) {
    // Token invalide ou expiré, tenter refresh
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshResponse = await refreshToken();
        store.dispatch(setTokens({ access: refreshResponse.access }));
        isRefreshing = false;
        return true;
      } catch (refreshError) {
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