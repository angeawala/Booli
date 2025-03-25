import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPharmacyProducts, fetchPharmacyProductDetails, createPharmacyProduct, updatePharmacyProduct, deletePharmacyProduct, fetchPharmacyCategories, createPharmacyCategory, updatePharmacyCategory, deletePharmacyCategory } from "@/api/pharmacyProductApi";
import { PharmacyProduct, PharmacyCategory, CreatePharmacyProductPayload, UpdatePharmacyProductPayload } from "@/types/pharmacy_products";

interface PharmacyProductState {
  products: PharmacyProduct[];
  selectedProduct: PharmacyProduct | null;
  categories: PharmacyCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: PharmacyProductState = {
  products: [],
  selectedProduct: null,
  categories: [],
  loading: false,
  error: null,
};

// Thunks
export const getPharmacyProducts = createAsyncThunk("pharmacyProduct/getPharmacyProducts", async (params: {
  q?: string;
  category?: string;
  prix_normal_min?: number;
  prix_normal_max?: number;
  prix_reduit_min?: number;
  prix_reduit_max?: number;
  stock?: number;
  expiration_date_min?: string;
  expiration_date_max?: string;
  ordering?: "name" | "-name" | "prix_normal" | "-prix_normal" | "prix_reduit" | "-prix_reduit" | "expiration_date" | "-expiration_date" | "created_at" | "-created_at";
  limit?: number;
  offset?: number;
}) => {
  const response = await fetchPharmacyProducts(params);
  return response.results;
});

export const getPharmacyProductDetails = createAsyncThunk("pharmacyProduct/getPharmacyProductDetails", async (productId: string) => {
  const response = await fetchPharmacyProductDetails(productId);
  return response;
});

export const addPharmacyProduct = createAsyncThunk("pharmacyProduct/addPharmacyProduct", async (data: CreatePharmacyProductPayload) => {
  const response = await createPharmacyProduct(data);
  return response;
});

export const editPharmacyProduct = createAsyncThunk("pharmacyProduct/editPharmacyProduct", async ({ productId, data }: { productId: string; data: UpdatePharmacyProductPayload }) => {
  const response = await updatePharmacyProduct(productId, data);
  return response;
});

export const removePharmacyProduct = createAsyncThunk("pharmacyProduct/removePharmacyProduct", async (productId: string) => {
  await deletePharmacyProduct(productId);
  return productId;
});

export const getPharmacyCategories = createAsyncThunk("pharmacyProduct/getPharmacyCategories", async () => {
  const response = await fetchPharmacyCategories();
  return response;
});

export const addPharmacyCategory = createAsyncThunk("pharmacyProduct/addPharmacyCategory", async (data: { name: string; description: string }) => {
  const response = await createPharmacyCategory(data);
  return response;
});

export const editPharmacyCategory = createAsyncThunk("pharmacyProduct/editPharmacyCategory", async ({ categoryId, data }: { categoryId: string; data: { name?: string; description?: string } }) => {
  const response = await updatePharmacyCategory(categoryId, data);
  return response;
});

export const removePharmacyCategory = createAsyncThunk("pharmacyProduct/removePharmacyCategory", async (categoryId: string) => {
  await deletePharmacyCategory(categoryId);
  return categoryId;
});

const pharmacyProductSlice = createSlice({
  name: "pharmacyProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPharmacyProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPharmacyProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getPharmacyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des produits pharmacie";
      })
      .addCase(getPharmacyProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPharmacyProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getPharmacyProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des détails du produit";
      })
      .addCase(addPharmacyProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPharmacyProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addPharmacyProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout du produit";
      })
      .addCase(editPharmacyProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPharmacyProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((product) => (product.id === action.payload.id ? action.payload : product));
        if (state.selectedProduct?.id === action.payload.id) state.selectedProduct = action.payload;
      })
      .addCase(editPharmacyProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification du produit";
      })
      .addCase(removePharmacyProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePharmacyProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product.id !== action.payload);
        if (state.selectedProduct?.id === action.payload) state.selectedProduct = null;
      })
      .addCase(removePharmacyProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression du produit";
      })
      .addCase(getPharmacyCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPharmacyCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getPharmacyCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des catégories";
      })
      .addCase(addPharmacyCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPharmacyCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addPharmacyCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout de la catégorie";
      })
      .addCase(editPharmacyCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPharmacyCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((cat) => (cat.id === action.payload.id ? action.payload : cat));
      })
      .addCase(editPharmacyCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification de la catégorie";
      })
      .addCase(removePharmacyCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePharmacyCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      })
      .addCase(removePharmacyCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression de la catégorie";
      });
  },
});

export default pharmacyProductSlice.reducer;