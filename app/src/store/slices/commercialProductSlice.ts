// slices/commercialProductSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCommercialProducts,
  fetchCommercialProductDetails,
  createCommercialProduct,
  updateCommercialProduct,
  deleteCommercialProduct,
  fetchCommercialCategories,
  createCommercialCategory,
  updateCommercialCategory,
  deleteCommercialCategory,
  fetchCommercialSubCategories,
  fetchCommercialSubCategoryDetails,
  createCommercialSubCategory,
  updateCommercialSubCategory,
  deleteCommercialSubCategory,
} from "@/api/commercialProductApi";
import {
  CommercialProduct,
  CommercialCategory,
  CommercialSubCategory,
  CreateCommercialProductPayload,
  UpdateCommercialProductPayload,
  CreateCommercialSubCategoryPayload,
  UpdateCommercialSubCategoryPayload,
} from "@/types/commercial_products";

interface CommercialProductState {
  products: CommercialProduct[];
  selectedProduct: CommercialProduct | null;
  categories: CommercialCategory[];
  subCategories: CommercialSubCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: CommercialProductState = {
  products: [],
  selectedProduct: null,
  categories: [],
  subCategories: [],
  loading: false,
  error: null,
};

// Thunks existants
export const getCommercialProducts = createAsyncThunk(
  "commercialProduct/getCommercialProducts",
  async (params: {
    q?: string;
    category?: string;
    is_tech?: boolean;
    prix_normal_min?: number;
    prix_normal_max?: number;
    prix_reduit_min?: number;
    prix_reduit_max?: number;
    stock?: number;
    couleur?: string;
    taille?: string;
    caracteristiques?: string;
    ordering?: "name" | "-name" | "prix_normal" | "-prix_normal" | "prix_reduit" | "-prix_reduit" | "stock" | "-stock" | "created_at" | "-created_at";
    limit?: number;
    offset?: number;
  }) => {
    const response = await fetchCommercialProducts(params);
    return response.results;
  }
);

export const getCommercialProductDetails = createAsyncThunk(
  "commercialProduct/getCommercialProductDetails",
  async (productId: string) => {
    const response = await fetchCommercialProductDetails(productId);
    return response;
  }
);

export const addCommercialProduct = createAsyncThunk(
  "commercialProduct/addCommercialProduct",
  async (data: CreateCommercialProductPayload) => {
    const response = await createCommercialProduct(data);
    return response;
  }
);

export const editCommercialProduct = createAsyncThunk(
  "commercialProduct/editCommercialProduct",
  async ({ productId, data }: { productId: string; data: UpdateCommercialProductPayload }) => {
    const response = await updateCommercialProduct(productId, data);
    return response;
  }
);

export const removeCommercialProduct = createAsyncThunk(
  "commercialProduct/removeCommercialProduct",
  async (productId: string) => {
    await deleteCommercialProduct(productId);
    return productId;
  }
);

export const getCommercialCategories = createAsyncThunk(
  "commercialProduct/getCommercialCategories",
  async () => {
    const response = await fetchCommercialCategories();
    return response;
  }
);

export const addCommercialCategory = createAsyncThunk(
  "commercialProduct/addCommercialCategory",
  async (data: { name: string; description: string; is_tech: boolean; image: string; icon: string }) => {
    const response = await createCommercialCategory(data);
    return response;
  }
);

export const editCommercialCategory = createAsyncThunk(
  "commercialProduct/editCommercialCategory",
  async ({ categoryId, data }: { categoryId: string; data: Partial<{ name: string; description: string; is_tech: boolean; image: string; icon: string }> }) => {
    const response = await updateCommercialCategory(categoryId, data);
    return response;
  }
);

export const removeCommercialCategory = createAsyncThunk(
  "commercialProduct/removeCommercialCategory",
  async (categoryId: string) => {
    await deleteCommercialCategory(categoryId);
    return categoryId;
  }
);

// Nouveaux thunks pour les sous-catégories
export const getCommercialSubCategories = createAsyncThunk(
  "commercialProduct/getCommercialSubCategories",
  async () => {
    const response = await fetchCommercialSubCategories();
    return response;
  }
);

export const getCommercialSubCategoryDetails = createAsyncThunk(
  "commercialProduct/getCommercialSubCategoryDetails",
  async (subCategoryId: string) => {
    const response = await fetchCommercialSubCategoryDetails(subCategoryId);
    return response;
  }
);

export const addCommercialSubCategory = createAsyncThunk(
  "commercialProduct/addCommercialSubCategory",
  async (data: CreateCommercialSubCategoryPayload) => {
    const response = await createCommercialSubCategory(data);
    return response;
  }
);

export const editCommercialSubCategory = createAsyncThunk(
  "commercialProduct/editCommercialSubCategory",
  async ({ subCategoryId, data }: { subCategoryId: string; data: UpdateCommercialSubCategoryPayload }) => {
    const response = await updateCommercialSubCategory(subCategoryId, data);
    return response;
  }
);

export const removeCommercialSubCategory = createAsyncThunk(
  "commercialProduct/removeCommercialSubCategory",
  async (subCategoryId: string) => {
    await deleteCommercialSubCategory(subCategoryId);
    return subCategoryId;
  }
);

const commercialProductSlice = createSlice({
  name: "commercialProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommercialProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommercialProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getCommercialProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des produits commerciaux";
      })
      .addCase(getCommercialProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommercialProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getCommercialProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des détails du produit";
      })
      .addCase(addCommercialProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCommercialProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addCommercialProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout du produit";
      })
      .addCase(editCommercialProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCommercialProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((product) => (product.id === action.payload.id ? action.payload : product));
        if (state.selectedProduct?.id === action.payload.id) state.selectedProduct = action.payload;
      })
      .addCase(editCommercialProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification du produit";
      })
      .addCase(removeCommercialProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCommercialProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product.id !== action.payload);
        if (state.selectedProduct?.id === action.payload) state.selectedProduct = null;
      })
      .addCase(removeCommercialProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression du produit";
      })
      .addCase(getCommercialCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommercialCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCommercialCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des catégories";
      })
      .addCase(addCommercialCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCommercialCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCommercialCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout de la catégorie";
      })
      .addCase(editCommercialCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCommercialCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((cat) => (cat.id === action.payload.id ? action.payload : cat));
      })
      .addCase(editCommercialCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification de la catégorie";
      })
      .addCase(removeCommercialCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCommercialCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      })
      .addCase(removeCommercialCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression de la catégorie";
      })
      // Nouveaux cas pour les sous-catégories
      .addCase(getCommercialSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommercialSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })
      .addCase(getCommercialSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des sous-catégories";
      })
      .addCase(getCommercialSubCategoryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommercialSubCategoryDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Pas de selectedSubCategory dans l’état pour l’instant, juste une mise à jour si besoin
        state.subCategories = state.subCategories.map((sub) => (sub.id === action.payload.id ? action.payload : sub));
      })
      .addCase(getCommercialSubCategoryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des détails de la sous-catégorie";
      })
      .addCase(addCommercialSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCommercialSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories.push(action.payload);
      })
      .addCase(addCommercialSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout de la sous-catégorie";
      })
      .addCase(editCommercialSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCommercialSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = state.subCategories.map((sub) => (sub.id === action.payload.id ? action.payload : sub));
      })
      .addCase(editCommercialSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification de la sous-catégorie";
      })
      .addCase(removeCommercialSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCommercialSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = state.subCategories.filter((sub) => sub.id !== action.payload);
      })
      .addCase(removeCommercialSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression de la sous-catégorie";
      });
  },
});

export default commercialProductSlice.reducer;