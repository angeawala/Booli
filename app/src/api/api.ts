import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/api/config";

// Instance Axios centralisée
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Nécessaire pour envoyer/recevoir les cookies
});

// Types pour l'intercepteur
interface QueueItem {
  resolve: (value: { access: string }) => void;
  reject: (reason?: unknown) => void;
}

// Fonctions utilitaires pour gérer l'access_token via cookies
const ACCESS_TOKEN_COOKIE = "access_token";
const ACCESS_TOKEN_MAX_AGE = 5 * 60; // 5 minutes en secondes

const setAccessToken = (token: string): void => {
  document.cookie = `${ACCESS_TOKEN_COOKIE}=${token}; max-age=${ACCESS_TOKEN_MAX_AGE}; path=/; SameSite=Lax`;
};

const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') { // Vérifie si nous sommes dans un environnement client
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const accessCookie = cookies.find((cookie) => cookie.startsWith(`${ACCESS_TOKEN_COOKIE}=`));
    return accessCookie ? accessCookie.split("=")[1] : null;
  }
  return null;
};


const clearAccessToken = (): void => {
  document.cookie = `${ACCESS_TOKEN_COOKIE}=; max-age=0; path=/; SameSite=Lax`;
};

// Intercepteur de requête (ajout du token Bearer)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Intercepteur de réponse (gestion des erreurs 401 et rafraîchissement)
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve({ access: token });
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshResponse = await axios.post(
            AUTH_ENDPOINTS.REFRESH,
            {},
            { baseURL: API_BASE_URL, withCredentials: true }
          );
          const newAccessToken: string = refreshResponse.data.access;
          setAccessToken(newAccessToken);
          processQueue(null, newAccessToken);
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
          isRefreshing = false;
          return api(originalRequest);
        } catch (refreshError: unknown) {
          clearAccessToken();
          processQueue(refreshError);
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      } else {
        return new Promise<{ access: string }>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.set("Authorization", `Bearer ${token.access}`);
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
    }
    return Promise.reject(error);
  }
);

// Export de l'instance API et utilitaires
export default api;
export { setAccessToken, getAccessToken, clearAccessToken };