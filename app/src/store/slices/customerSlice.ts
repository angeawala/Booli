import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCustomers, fetchCustomerDetails, updateCustomer, deleteCustomer, contactCustomer } from "@/api/customerApi";
import { Customer } from "@/types/customer";

interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

// Thunks
export const getCustomers = createAsyncThunk("customer/getCustomers", async (params: {
  orders_count_min?: number;
  orders_count_max?: number;
  created_at_min?: string;
  created_at_max?: string;
  ordering?: "orders_count" | "-orders_count" | "created_at" | "-created_at";
  limit?: number;
  offset?: number;
}) => {
  const response = await fetchCustomers(params);
  return response.results;
});

export const getCustomerDetails = createAsyncThunk("customer/getCustomerDetails", async (customerId: string) => {
  const response = await fetchCustomerDetails(customerId);
  return response;
});

export const editCustomer = createAsyncThunk("customer/editCustomer", async ({ customerId, data }: { customerId: string; data: { phone?: string; address?: string } }) => {
  const response = await updateCustomer(customerId, data);
  return response;
});

export const removeCustomer = createAsyncThunk("customer/removeCustomer", async (customerId: string) => {
  await deleteCustomer(customerId);
  return customerId;
});

export const contactCustomerAction = createAsyncThunk("customer/contactCustomer", async (data: { customerId: string; message: string }) => {
  await contactCustomer(data);
  return data.customerId;
});

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des clients";
      })
      .addCase(getCustomerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCustomer = action.payload;
      })
      .addCase(getCustomerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des détails du client";
      })
      .addCase(editCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.map((customer) => (customer.id === action.payload.id ? action.payload : customer));
        if (state.selectedCustomer?.id === action.payload.id) state.selectedCustomer = action.payload;
      })
      .addCase(editCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la modification du client";
      })
      .addCase(removeCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.filter((customer) => customer.id !== action.payload);
        if (state.selectedCustomer?.id === action.payload) state.selectedCustomer = null;
      })
      .addCase(removeCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression du client";
      })
      .addCase(contactCustomerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(contactCustomerAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(contactCustomerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de l’envoi du message au client";
      });
  },
});

export default customerSlice.reducer;