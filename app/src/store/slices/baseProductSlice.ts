import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchReviews, createReview, updateReview, deleteReview } from "@/api/baseProductApi";
import { Review } from "@/types/base_products";

interface BaseProductState {
  reviews: { [productId: string]: Review[] }; // Indexé par productId
  loading: boolean;
  error: string | null;
}

const initialState: BaseProductState = {
  reviews: {},
  loading: false,
  error: null,
};

// Thunks
export const getReviews = createAsyncThunk("baseProduct/getReviews", async (productId: string) => {
  const response = await fetchReviews(productId);
  return { productId, reviews: response };
});

export const addReview = createAsyncThunk("baseProduct/addReview", async (data: {
  productId: string;
  note: number;
  commentaire: string;
}) => {
  const response = await createReview(data);
  return { productId: data.productId, review: response };
});

export const editReview = createAsyncThunk("baseProduct/editReview", async ({ reviewId, data }: {
  reviewId: string;
  data: { note?: number; commentaire?: string };
}) => {
  const response = await updateReview(reviewId, data);
  return response;
});

export const removeReview = createAsyncThunk("baseProduct/removeReview", async (reviewId: string) => {
  await deleteReview(reviewId);
  return reviewId;
});

const baseProductSlice = createSlice({
  name: "baseProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews[action.payload.productId] = action.payload.reviews;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des avis";
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, review } = action.payload;
        if (!state.reviews[productId]) state.reviews[productId] = [];
        state.reviews[productId].push(review);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout de l’avis";
      })
      .addCase(editReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editReview.fulfilled, (state, action) => {
        state.loading = false;
        const updatedReview = action.payload;
        for (const productId in state.reviews) {
          state.reviews[productId] = state.reviews[productId].map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          );
        }
      })
      .addCase(editReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification de l’avis";
      })
      .addCase(removeReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeReview.fulfilled, (state, action) => {
        state.loading = false;
        const reviewId = action.payload;
        for (const productId in state.reviews) {
          state.reviews[productId] = state.reviews[productId].filter((review) => review.id !== reviewId);
        }
      })
      .addCase(removeReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression de l’avis";
      });
  },
});

export default baseProductSlice.reducer;