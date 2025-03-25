import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClientDashboard, fetchSellerDashboard, fetchVisitorDashboard, fetchAdminDashboard } from "@/api/dashboardApi";
import { ClientDashboard, SellerDashboard, VisitorDashboard, AdminDashboard } from "@/types/dashboard";

interface DashboardState {
  clientDashboard: ClientDashboard | null;
  sellerDashboard: SellerDashboard | null;
  visitorDashboard: VisitorDashboard | null;
  adminDashboard: AdminDashboard | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  clientDashboard: null,
  sellerDashboard: null,
  visitorDashboard: null,
  adminDashboard: null,
  loading: false,
  error: null,
};

// Thunks
export const getClientDashboard = createAsyncThunk("dashboard/getClientDashboard", async () => {
  const response = await fetchClientDashboard();
  return response;
});

export const getSellerDashboard = createAsyncThunk("dashboard/getSellerDashboard", async () => {
  const response = await fetchSellerDashboard();
  return response;
});

export const getVisitorDashboard = createAsyncThunk("dashboard/getVisitorDashboard", async () => {
  const response = await fetchVisitorDashboard();
  return response;
});

export const getAdminDashboard = createAsyncThunk("dashboard/getAdminDashboard", async () => {
  const response = await fetchAdminDashboard();
  return response;
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClientDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.clientDashboard = action.payload;
      })
      .addCase(getClientDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement du tableau client";
      })
      .addCase(getSellerDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSellerDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerDashboard = action.payload;
      })
      .addCase(getSellerDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement du tableau vendeur";
      })
      .addCase(getVisitorDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVisitorDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.visitorDashboard = action.payload;
      })
      .addCase(getVisitorDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement du tableau visiteur";
      })
      .addCase(getAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.adminDashboard = action.payload;
      })
      .addCase(getAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement du tableau admin";
      });
  },
});

export default dashboardSlice.reducer;