import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Category, SubCategory } from "@/types/category";
import { getCategories } from "@/api/categoryApi";

interface CategoryState {
  categories: Category[];
  subCategories: SubCategory[];
  commercialCategories: Category[];
  bookCategories: Category[];
  pharmacyCategories: Category[];
  subCategoriesByCategory: { [categoryId: string]: SubCategory[] };
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  subCategories: [],
  commercialCategories: [],
  bookCategories: [],
  pharmacyCategories: [],
  subCategoriesByCategory: {},
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const categories = await getCategories();
    return categories;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    filterCommercialCategories(state) {
      state.commercialCategories = state.categories.filter((cat) => cat.category_type === "commercial");
    },
    filterBookCategories(state) {
      state.bookCategories = state.categories.filter((cat) => cat.category_type === "book");
    },
    filterPharmacyCategories(state) {
      state.pharmacyCategories = state.categories.filter((cat) => cat.category_type === "pharmacy");
    },
    extractAllSubCategories(state) {
      state.subCategories = state.categories.flatMap((cat) => cat.subcategories);
    },
    extractSubCategoriesByCategory(state, action: PayloadAction<string>) {
      const categoryId = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        state.subCategoriesByCategory[categoryId] = category.subcategories;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
        state.subCategories = action.payload.flatMap((cat) => cat.subcategories);
        state.commercialCategories = action.payload.filter((cat) => cat.category_type === "commercial");
        state.bookCategories = action.payload.filter((cat) => cat.category_type === "book");
        state.pharmacyCategories = action.payload.filter((cat) => cat.category_type === "pharmacy");
        action.payload.forEach((cat) => {
          state.subCategoriesByCategory[cat.id] = cat.subcategories;
        });
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des catégories";
      });
  },
});

export const {
  filterCommercialCategories,
  filterBookCategories,
  filterPharmacyCategories,
  extractAllSubCategories,
  extractSubCategoriesByCategory,
} = categorySlice.actions;

export default categorySlice.reducer;