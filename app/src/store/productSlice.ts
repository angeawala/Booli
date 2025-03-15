import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BaseProduct } from "@/types/product";
import { getCategoryProducts } from "@/api/categoryApi";

interface ProductState {
  productsBySubCategory: { [subCategoryId: string]: BaseProduct[] };
  productsByCategory: { [categoryId: string]: BaseProduct[] };
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  productsBySubCategory: {},
  productsByCategory: {},
  loading: false,
  error: null,
};

// Typage sécurisé pour les erreurs
interface FetchError {
  message?: string;
}

// Récupère les produits d'une sous-catégorie spécifique
export const fetchProductsBySubCategory = createAsyncThunk(
  "product/fetchProductsBySubCategory",
  async (subCategoryId: string, { rejectWithValue }) => {
    try {
      const products = await getCategoryProducts(subCategoryId);
      return { subCategoryId, products };
    } catch (error) {
      const err = error as FetchError; // Assertion de type
      console.error(`Error fetching products for subCategory ${subCategoryId}:`, err);
      return rejectWithValue(err.message || "Erreur lors du chargement des produits par sous-catégorie");
    }
  }
);

// Récupère TOUS les produits des catégories commerciales (pas de limite)
export const fetchRecentCommercialProducts = createAsyncThunk(
  "product/fetchRecentCommercialProducts",
  async ({ categories }: { categories: { id: string; created_at?: string }[] }, { rejectWithValue }) => {
    try {
      const selectedCategories = categories.slice(0, 4); // 4 premières catégories
      const productsByCategory: { [categoryId: string]: BaseProduct[] } = {};
      const allProductsPromises = selectedCategories.map(async (cat) => {
        try {
          const products = await getCategoryProducts(cat.id);
          console.log(`Products for category ${cat.id}:`, products);
          productsByCategory[cat.id] = products || [];
        } catch (error) {
          const err = error as FetchError; // Assertion de type
          console.error(`Error fetching products for category ${cat.id}:`, err);
          productsByCategory[cat.id] = [];
        }
      });

      await Promise.all(allProductsPromises);
      return productsByCategory;
    } catch (error) {
      const err = error as FetchError; // Assertion de type
      console.error("fetchRecentCommercialProducts failed:", err);
      return rejectWithValue(err.message || "Erreur lors du chargement des produits commerciaux");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProductsBySubCategory
      .addCase(fetchProductsBySubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsBySubCategory.fulfilled, (state, action: PayloadAction<{ subCategoryId: string; products: BaseProduct[] }>) => {
        state.loading = false;
        state.productsBySubCategory[action.payload.subCategoryId] = action.payload.products;
      })
      .addCase(fetchProductsBySubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || "Erreur lors du chargement des produits par sous-catégorie";
      })
      // fetchRecentCommercialProducts
      .addCase(fetchRecentCommercialProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentCommercialProducts.fulfilled, (state, action: PayloadAction<{ [categoryId: string]: BaseProduct[] }>) => {
        state.loading = false;
        state.productsByCategory = action.payload;
      })
      .addCase(fetchRecentCommercialProducts.rejected, (state, action) => {
        state.loading = false;
        console.log("fetchRecentCommercialProducts rejected:", action.payload, action.error);
        state.error = action.payload as string || action.error.message || "Erreur lors du chargement des produits commerciaux";
      });
  },
});

export default productSlice.reducer;