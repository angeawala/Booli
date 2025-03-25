import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrders, fetchOrderDetails, createOrder, updateOrder, deleteOrder } from "@/api/orderApi";
import { Order } from "@/types/orders";

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

// Thunks
export const getOrders = createAsyncThunk("order/getOrders", async (params: {
  status?: "pending" | "shipped" | "delivered" | "cancelled";
  total_min?: number;
  total_max?: number;
  created_at_min?: string;
  created_at_max?: string;
  ordering?: "total" | "-total" | "created_at" | "-created_at" | "status" | "-status";
}) => {
  const response = await fetchOrders(params);
  return response;
});

export const getOrderDetails = createAsyncThunk("order/getOrderDetails", async (orderId: string) => {
  const response = await fetchOrderDetails(orderId);
  return response;
});

export const addOrder = createAsyncThunk("order/addOrder", async () => {
  const response = await createOrder();
  return response;
});

export const editOrder = createAsyncThunk("order/editOrder", async ({ orderId, data }: { orderId: string; data: { status?: "pending" | "shipped" | "delivered" | "cancelled" } }) => {
  const response = await updateOrder(orderId, data);
  return response;
});

export const removeOrder = createAsyncThunk("order/removeOrder", async (orderId: string) => {
  await deleteOrder(orderId);
  return orderId;
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des commandes";
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des détails de la commande";
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la création de la commande";
      })
      .addCase(editOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) => (order.id === action.payload.id ? action.payload : order));
        if (state.selectedOrder?.id === action.payload.id) state.selectedOrder = action.payload;
      })
      .addCase(editOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification de la commande";
      })
      .addCase(removeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order.id !== action.payload);
        if (state.selectedOrder?.id === action.payload) state.selectedOrder = null;
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression de la commande";
      });
  },
});

export default orderSlice.reducer;