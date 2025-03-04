export interface User {
    email: string;
    first_name?: string;
    last_name?: string;
    country?: string;
    city?: string;
    birth_date?: string;
    is_staff?: boolean;
    is_superuser?: boolean;
  }
  
  export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null; // Optionnel, car géré par cookie
    isAuthenticated: boolean;
    user: User | null;
  }