// hooks/useShops.ts
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllShops } from "@/store/slices/shopSlice"; // Changé de marketSlice à shopSlice
import { RootState, AppDispatch } from "@/store/store";


export const useShops = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { shops, loading, error } = useSelector((state: RootState) => state.shop); // Changé de market à shop

  useEffect(() => {
    if (shops.length === 0) { // Charger uniquement si vide
      dispatch(fetchAllShops());
    }
  }, [dispatch, shops.length]);

  return { shops, loading, error };
};