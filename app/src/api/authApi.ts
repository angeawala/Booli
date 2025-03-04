import axios from "axios";
import { AUTH_ENDPOINTS } from "@/api/config";
import { store } from "@/store/store";

const api = axios.create({
  baseURL: AUTH_ENDPOINTS.LOGIN.split("/auth/")[0],
  withCredentials: true,
});

export const login = async (email: string, password: string) => {
  const response = await api.post(AUTH_ENDPOINTS.LOGIN, { email, password });
  return response.data;
};

export const registerUser = async (data: {
  email: string;
  contact: string;
  password: string;
  first_name: string;
  last_name: string;
  country: string;
  city: string;
  birth_date: string;
  profession: string;
  gender: string;
}) => {
  const response = await api.post("/auth/register/", data);
  return response.data;
};

export const refreshToken = async () => {
  const refresh = store.getState().auth.refreshToken;
  if (!refresh) throw new Error("No refresh token available");
  const response = await api.post(AUTH_ENDPOINTS.REFRESH, { refresh });
  return response.data;
};

export const verifyToken = async (token: string) => {
  const response = await api.post(AUTH_ENDPOINTS.VERIFY, { access: token });
  return response.data;
};

export const logout = async () => {
  await api.post(AUTH_ENDPOINTS.LOGOUT);
  return { message: "Déconnexion réussie" };
};

export const checkUser = async (email: string, password: string) => {
  const response = await api.post("/auth/check-user/", { email, password });
  return response.data;
};

export const generate2FAToken = async (email: string) => {
  const response = await api.post("/auth/generate-2fa-token/", { email });
  return response.data;
};

export const verify2FA = async (email: string, code: string, password: string) => {
  const response = await api.post("/auth/verify-2fa/", { email, code, password });
  return response.data;
};

export const activateAccount = async (token: string) => {
  const response = await api.post("/auth/activate/", { token });
  return response.data;
};

export const resendActivation = async (email: string) => {
  const response = await api.post("/auth/activate/resend/", { email });
  return response.data;
};

export const passwordResetRequest = async (email: string) => {
  const response = await api.post("/auth/password/reset/request/", { email });
  return response.data;
};

export const resetPasswordConfirm = async (token: string, newPassword: string, confirmPassword: string) => {
  const response = await api.post("/auth/password/reset/", {
    token,
    new_password: newPassword,
    confirm_password: confirmPassword,
  });
  return response.data;
};
