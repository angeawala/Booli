import api, { setAccessToken, clearAccessToken } from "@/api/api";
import { AUTH_ENDPOINTS } from "@/api/config";
import {
  LoginResponse,
  RegisterData,
  RefreshResponse,
  VerifyTokenResponse,
  CheckUserResponse,
  Generate2FAResponse,
  Verify2FAResponse,
  SuccessResponse,
} from "@/types/auth";

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post(AUTH_ENDPOINTS.LOGIN, { email, password });
  const { access } = response.data;
  setAccessToken(access); // Stocker l'access_token dans le cookie
  return response.data; // Retourne { access, refresh }
};

export const registerUser = async (data: RegisterData): Promise<SuccessResponse> => {
  const response = await api.post(AUTH_ENDPOINTS.REGISTER, data);
  return response.data;
};

export const refreshToken = async (): Promise<RefreshResponse> => {
  const response = await api.post(AUTH_ENDPOINTS.REFRESH, {});
  const { access } = response.data;
  setAccessToken(access); // Mettre à jour le cookie access_token
  return response.data; // { access }
};

export const verifyToken = async (token: string): Promise<VerifyTokenResponse> => {
  const response = await api.post(AUTH_ENDPOINTS.VERIFY, { access: token });
  return response.data; // { valid: true }
};

export const logout = async (): Promise<SuccessResponse> => {
  const response = await api.post(AUTH_ENDPOINTS.LOGOUT);
  clearAccessToken(); // Supprimer le cookie access_token
  return response.data; // { message: "Déconnexion réussie" }
};

export const checkUser = async (email: string, password: string): Promise<CheckUserResponse> => {
  const response = await api.post(AUTH_ENDPOINTS.CHECK_USER, { email, password });
  return response.data; // { exists, is_active, is_2fa_enabled }
};

export const generate2FAToken = async (email: string): Promise<Generate2FAResponse> => {
  const response = await api.post(AUTH_ENDPOINTS.GENERATE_2FA, { email });
  return response.data; // { message, expires_at }
};

export const verify2FA = async (
  email: string,
  code: string,
  password: string
): Promise<Verify2FAResponse> => {
  const response = await api.post(AUTH_ENDPOINTS.VERIFY_2FA, { email, code, password });
  const { access } = response.data;
  setAccessToken(access); // Stocker l'access_token après 2FA
  return response.data; // { access, refresh }
};

export const activateAccount = async (token: string): Promise<SuccessResponse> => {
  const response = await api.post(AUTH_ENDPOINTS.ACTIVATE, { token });
  return response.data; // { message: "Compte activé avec succès" }
};

export const resendActivation = async (email: string): Promise<SuccessResponse> => {
  const response = await api.post(AUTH_ENDPOINTS.RESEND_ACTIVATION, { email });
  return response.data; // { message: "Email d’activation renvoyé" }
};

export const passwordResetRequest = async (email: string): Promise<SuccessResponse> => {
  const response = await api.post(AUTH_ENDPOINTS.PASSWORD_RESET_REQUEST, { email });
  return response.data; // { message: "Email de réinitialisation envoyé" }
};

export const resetPasswordConfirm = async (
  token: string,
  newPassword: string,
  confirmPassword: string
): Promise<SuccessResponse> => {
  const response = await api.post(AUTH_ENDPOINTS.PASSWORD_RESET_CONFIRM, {
    token,
    new_password: newPassword,
    confirm_password: confirmPassword,
  });
  return response.data; // { message: "Mot de passe réinitialisé avec succès" }
};