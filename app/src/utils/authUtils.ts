import { store } from "@/store/store";
import { setTokens, logout } from "@/store/slices/authSlice";
import { getAccessToken } from "@/api/api";
import { verifyToken } from "@/api/authApi";
import { VerifyTokenResponse } from "@/types/auth";

// Pas besoin de gérer isRefreshing ici, car api.ts s'en charge
export const checkAuth = async (): Promise<boolean> => {
  const accessToken = getAccessToken(); // Lire depuis le cookie

  if (!accessToken) {
    store.dispatch(logout()); // S'assurer que Redux est synchronisé
    return false;
  }

  try {
    const verifyResponse: VerifyTokenResponse = await verifyToken(accessToken);
    if (verifyResponse.valid) {
      // Synchroniser Redux si nécessaire
      if (store.getState().auth.accessToken !== accessToken) {
        store.dispatch(setTokens({ access: accessToken }));
      }
      return true;
    }
    // Si le token n'est pas valide, tenter une requête protégée déclenchera l'intercepteur
    return false;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erreur de vérification du token :", error.message);
    }
    // L'intercepteur de api.ts gère déjà le rafraîchissement sur 401
    // Si ça échoue, on déconnecte
    store.dispatch(logout());
    return false;
  }
};