// slices/engrosSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEngrosProducts, createEngrosProduct, updateEngrosProduct, deleteEngrosProduct } from "@/api/engrosApi";
import { EngrosProduct, UpdateEngrosProductPayload, CreateEngrosProductPayload } from "@/types/engros";

interface EngrosState {
  engrosProducts: EngrosProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: EngrosState = {
  engrosProducts: [],
  loading: false,
  error: null,
};

export const getEngrosProducts = createAsyncThunk("engros/getEngrosProducts", async (params?: {
  limit?: number;
  offset?: number;
}) => {
  const response = await fetchEngrosProducts(params || {});
  return response.results;
});

export const addEngrosProduct = createAsyncThunk("engros/addEngrosProduct", async (data: CreateEngrosProductPayload) => {
  const response = await createEngrosProduct(data);
  return response;
});

export const editEngrosProduct = createAsyncThunk("engros/editEngrosProduct", async ({ engrosProductId, data }: {
  engrosProductId: string;
  data: Partial<UpdateEngrosProductPayload>;
}) => {
  const response = await updateEngrosProduct(engrosProductId, data);
  return response;
});

export const removeEngrosProduct = createAsyncThunk("engros/removeEngrosProduct", async (engrosProductId: string) => {
  await deleteEngrosProduct(engrosProductId);
  return engrosProductId;
});

const engrosSlice = createSlice({
  name: "engros",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEngrosProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEngrosProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.engrosProducts = action.payload;
      })
      .addCase(getEngrosProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des produits en gros";
      })
      .addCase(addEngrosProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEngrosProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.engrosProducts.push(action.payload);
      })
      .addCase(addEngrosProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout du produit en gros";
      })
      .addCase(editEngrosProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editEngrosProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.engrosProducts = state.engrosProducts.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(editEngrosProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification du produit en gros";
      })
      .addCase(removeEngrosProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeEngrosProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.engrosProducts = state.engrosProducts.filter((product) => product.id !== action.payload);
      })
      .addCase(removeEngrosProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression du produit en gros";
      });
  },
});

export default engrosSlice.reducer;