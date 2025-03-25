// store/slices/shopSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Shop } from "@/types/shop";
import { fetchAllShops as apiFetchAllShops, createShop, updateShop, deleteShop } from "@/api/shopApi"; // Renommé l'import

interface ShopState {
  shops: Shop[];
  loading: boolean;
  error: string | null;
}

const initialState: ShopState = {
  shops: [],
  loading: false,
  error: null,
};

// Utilise apiFetchAllShops dans le thunk
export const fetchAllShops = createAsyncThunk("shop/fetchAllShops", async () => {
  const response = await apiFetchAllShops();
  return response;
});

export const addShop = createAsyncThunk("shop/addShop", async (data: {
  image: string;
  email: string;
  description: string;
  contact: string;
  address: string;
  categories: string[];
  subcategories: string[];
  created_by: string;
}) => {
  const response = await createShop(data);
  return response;
});

export const editShop = createAsyncThunk("shop/editShop", async ({ shopId, data }: {
  shopId: string;
  data: Partial<{
    image: string;
    email: string;
    description: string;
    contact: string;
    address: string;
    categories: string[];
    subcategories: string[];
  }>;
}) => {
  const response = await updateShop(shopId, data);
  return response;
});

export const removeShop = createAsyncThunk("shop/removeShop", async (shopId: string) => {
  await deleteShop(shopId);
  return shopId;
});

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllShops.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = action.payload;
      })
      .addCase(fetchAllShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des boutiques";
      })
      .addCase(addShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shops.push(action.payload);
      })
      .addCase(addShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout de la boutique";
      })
      .addCase(editShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = state.shops.map((shop) =>
          shop.id === action.payload.id ? action.payload : shop
        );
      })
      .addCase(editShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification de la boutique";
      })
      .addCase(removeShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = state.shops.filter((shop) => shop.id !== action.payload);
      })
      .addCase(removeShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression de la boutique";
      });
  },
});

export default shopSlice.reducer;