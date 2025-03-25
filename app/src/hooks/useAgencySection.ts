// hooks/useAgencySection.ts
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getCategories } from "@/store/slices/agencySlice";

export const useAgencySection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector((state: RootState) => state.agency);
  const maxCategories = 12;

  useEffect(() => {
    if (categories.length === 0) { // Charger uniquement si vide
      dispatch(getCategories());
    }
  }, [dispatch, categories.length]);

  const limitedCategories = categories.slice(0, maxCategories); // Limiter à 12

  return { categories: limitedCategories, loading, error };
};