import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice"; // Si existant
import productReducer from "./productSlice";
import marketReducer from "./marketSlice"; // Ajout
import libraryReducer from "./librarySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer, // Si existant
    product: productReducer,
    market: marketReducer, // Ajout
    library: libraryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;