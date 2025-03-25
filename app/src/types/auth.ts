// types/auth.ts

// Données d'un utilisateur (basé sur CustomUserSerializer)
export interface User {
  email: string;
  contact?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  city?: string;
  birth_date?: string;
  profession?: string;
  gender?: string;
  is_active?: boolean;
  date_joined?: string; // ISO string
  is_staff?: boolean;
  is_superuser?: boolean;
  is_2fa_enabled?: boolean;
}

// Données pour l'inscription (basé sur CustomUserCreateSerializer)
export interface RegisterData {
  email: string;
  contact?: string;
  password: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  city?: string;
  birth_date?: string;
  profession?: string;
  gender?: string;
}

// Réponse de login (basé sur CustomTokenObtainPairSerializer)
export interface LoginResponse {
  access: string;
  refresh: string; // Toujours renvoyé, même si en cookie en prod
}

// Réponse de refresh
export interface RefreshResponse {
  access: string;
}

// Réponse de vérification de token
export interface VerifyTokenResponse {
  valid: boolean;
}

// Réponse de checkUser
export interface CheckUserResponse {
  exists: boolean;
  is_active?: boolean;
  is_2fa_enabled?: boolean;
}

// Réponse de generate2FAToken
export interface Generate2FAResponse {
  message: string;
  expires_at: string; // ISO string
}

// Réponse de verify2FA
export interface Verify2FAResponse {
  access: string;
  refresh: string; // Renvoyé par la vue Verify2FAView
}

// Réponse générique pour succès
export interface SuccessResponse {
  message: string;
}

// État Redux pour l'authentification
export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null; // Optionnel, car géré par cookie en prod
  isAuthenticated: boolean;
  user: User | null;
}