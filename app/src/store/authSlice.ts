import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types/auth"; // Import corrigé avec @

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null, // Pas stocké ici, juste pour référence
  isAuthenticated: false,
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
      // refresh_token est dans un cookie, pas besoin de le stocker ici
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setTokens, logout } = authSlice.actions;
export default authSlice.reducer;