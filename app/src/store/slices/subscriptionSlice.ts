import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSubscription, activateSubscription, updateSubscription, deleteSubscription } from "@/api/subscriptionApi";
import { Subscription } from "@/types/subscription";

export interface SubscriptionState {
  subscription: Subscription | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscription: null,
  loading: false,
  error: null,
};

// Thunks
export const getSubscription = createAsyncThunk("subscription/getSubscription", async () => {
  const response = await fetchSubscription();
  return response;
});

export const activateSub = createAsyncThunk("subscription/activateSub", async (data: {
  code: string;
  device_token: string;
}) => {
  const response = await activateSubscription(data);
  return response; // Retourne Subscription avec code_verification
});

export const editSubscription = createAsyncThunk("subscription/editSubscription", async ({ subscriptionId, data }: { subscriptionId: string; data: { is_active?: boolean; end_date?: string; device_token?: string } }) => {
  const response = await updateSubscription(subscriptionId, data);
  return response;
});

export const removeSubscription = createAsyncThunk("subscription/removeSubscription", async (subscriptionId: string) => {
  await deleteSubscription(subscriptionId);
  return subscriptionId;
});

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
      })
      .addCase(getSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement de l’abonnement";
      })
      .addCase(activateSub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateSub.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
      })
      .addCase(activateSub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’activation de l’abonnement";
      })
      .addCase(editSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
      })
      .addCase(editSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification de l’abonnement";
      })
      .addCase(removeSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeSubscription.fulfilled, (state) => {
        state.loading = false;
        state.subscription = null;
      })
      .addCase(removeSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression de l’abonnement";
      });
  },
});

export default subscriptionSlice.reducer;