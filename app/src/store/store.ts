import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Garde si existant, sinon à supprimer
import baseProductReducer from "./slices/baseProductSlice";
import bookReducer from "./slices/bookSlice";
import commercialProductReducer from "./slices/commercialProductSlice";
import pharmacyProductReducer from "./slices/pharmacyProductSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import pdfReducer from "./slices/pdfSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import dashboardReducer from "./slices/dashboardSlice";
import customerReducer from "./slices/customerSlice";
import promotionReducer from "./slices/promotionSlice";
import agencyReducer from "./slices/agencySlice";
import engrosReducer from "./slices/engrosSlice";
import shopReducer from './slices/shopSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // Garde si existant, sinon commente ou supprime
    baseProduct: baseProductReducer,
    books: bookReducer,
    commercialProducts: commercialProductReducer,
    pharmacyProducts: pharmacyProductReducer,
    cart: cartReducer,
    orders: orderReducer,
    pdf: pdfReducer,
    subscription: subscriptionReducer,
    dashboard: dashboardReducer,
    customers: customerReducer,
    promotion: promotionReducer,
    agency: agencyReducer,
    engros: engrosReducer,
    shop: shopReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;