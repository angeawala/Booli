import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCart, addToCart, updateCartItem, deleteCartItem, clearCart } from "@/api/cartApi";
import { Cart } from "@/types/cart";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

// Thunks
export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await fetchCart();
  return response;
});

export const addCartItem = createAsyncThunk("cart/addCartItem", async (data: {
  productId: string;
  variant?: string; // Aligné avec CartItem
  quantity: number;
}) => {
  const response = await addToCart(data);
  return response;
});

export const editCartItem = createAsyncThunk("cart/editCartItem", async ({ itemId, data }: { itemId: string; data: { quantity: number } }) => {
  const response = await updateCartItem(itemId, data);
  return response;
});

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (itemId: string) => {
  await deleteCartItem(itemId);
  return itemId;
});

export const clearCartItems = createAsyncThunk("cart/clearCartItems", async () => {
  await clearCart();
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement du panier";
      })
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’ajout au panier";
      })
      .addCase(editCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification de l’item";
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression de l’item";
      })
      .addCase(clearCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartItems.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(clearCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du vidage du panier";
      });
  },
});

export default cartSlice.reducer;