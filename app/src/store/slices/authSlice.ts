import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types/auth";
import { getAccessToken, setAccessToken, clearAccessToken } from "@/api/api";

const initialState: AuthState = {
  accessToken: getAccessToken(), // Charger depuis le cookie au démarrage
  refreshToken: null, // Pas stocké, géré par cookie HTTP-only
  isAuthenticated: !!getAccessToken(), // Vrai si le cookie existe
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ access: string; refresh?: string; user?: User }>
    ) => {
      state.accessToken = action.payload.access;
      state.isAuthenticated = true;
      state.user = action.payload.user || null;
      setAccessToken(action.payload.access); // Synchroniser avec le cookie
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      clearAccessToken(); // Supprimer le cookie access_token
    },
  },
});

export const { setTokens, logout } = authSlice.actions;
export default authSlice.reducer;