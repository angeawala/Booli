// store/slices/agencySlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Agency, Category } from "@/types/agency";
import { fetchAgencies, fetchAgencyCategories, createCategory, updateCategory, deleteCategory } from "@/api/agencyApi";

interface AgencyState {
  agencies: Agency[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: AgencyState = {
  agencies: [],
  categories: [],
  loading: false,
  error: null,
};

export const getAgencies = createAsyncThunk("agency/getAgencies", async (categoryId?: string) => {
  const response = await fetchAgencies({ categoryId });
  return response.results;
});

export const getCategories = createAsyncThunk("agency/getCategories", async () => {
  const response = await fetchAgencyCategories();
  return response;
});

export const addCategory = createAsyncThunk("agency/addCategory", async (data: {
  name: string;
  type: "Entreprise" | "Agence" | "ONG";
  domain: "Voyage" | "Marketing" | "Événementiel" | "Autre";
  image: string;
}) => {
  const response = await createCategory(data);
  return response;
});

export const editCategory = createAsyncThunk("agency/editCategory", async ({ categoryId, data }: {
  categoryId: string;
  data: Partial<{
    name: string;
    type: "Entreprise" | "Agence" | "ONG";
    domain: "Voyage" | "Marketing" | "Événementiel" | "Autre";
    image: string;
  }>;
}) => {
  const response = await updateCategory(categoryId, data);
  return response;
});

export const removeCategory = createAsyncThunk("agency/removeCategory", async (categoryId: string) => {
  await deleteCategory(categoryId);
  return categoryId;
});

const agencySlice = createSlice({
  name: "agency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAgencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgencies.fulfilled, (state, action) => {
        state.loading = false;
        state.agencies = action.payload;
      })
      .addCase(getAgencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des agences";
      })
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des catégories";
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout de la catégorie";
      })
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        );
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification de la catégorie";
      })
      .addCase(removeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression de la catégorie";
      });
  },
});

export default agencySlice.reducer;