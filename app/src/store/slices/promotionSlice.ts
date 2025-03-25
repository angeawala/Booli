import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPromotions, createPromotion, updatePromotion, deletePromotion } from "@/api/promotionsApi";
import { Promotion } from "@/types/promotions";

interface PromotionState {
  promotions: Promotion[];
  loading: boolean;
  error: string | null;
}

const initialState: PromotionState = {
  promotions: [],
  loading: false,
  error: null,
};

// Thunks
export const getPromotions = createAsyncThunk("promotion/getPromotions", async (params?: {
  limit?: number;
  offset?: number;
}) => {
  const response = await fetchPromotions({ limit: 30, ...params }); // Limite à 30 comme ton HTML
  return response.results;
});

export const addPromotion = createAsyncThunk("promotion/addPromotion", async (data: {
  product: string;
  discountPercentage: number;
  oldPrice: number;
  newPrice: number;
  endTime: string;
}) => {
  const response = await createPromotion(data);
  return response;
});

export const editPromotion = createAsyncThunk("promotion/editPromotion", async ({ promotionId, data }: {
  promotionId: string;
  data: Partial<{
    product: string;
    discountPercentage: number;
    oldPrice: number;
    newPrice: number;
    endTime: string;
  }>;
}) => {
  const response = await updatePromotion(promotionId, data);
  return response;
});

export const removePromotion = createAsyncThunk("promotion/removePromotion", async (promotionId: string) => {
  await deletePromotion(promotionId);
  return promotionId;
});

const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPromotions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPromotions.fulfilled, (state, action) => {
        state.loading = false;
        state.promotions = action.payload;
      })
      .addCase(getPromotions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des promotions";
      })
      .addCase(addPromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.promotions.push(action.payload);
      })
      .addCase(addPromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout de la promotion";
      })
      .addCase(editPromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.promotions = state.promotions.map((promo) =>
          promo.id === action.payload.id ? action.payload : promo
        );
      })
      .addCase(editPromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification de la promotion";
      })
      .addCase(removePromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePromotion.fulfilled, (state, action) => {
        state.loading = false;
        state.promotions = state.promotions.filter((promo) => promo.id !== action.payload);
      })
      .addCase(removePromotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression de la promotion";
      });
  },
});

export default promotionSlice.reducer;