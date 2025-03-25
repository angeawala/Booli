"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommercialCategories } from "@/store/slices/commercialProductSlice";
import { RootState, AppDispatch } from "@/store/store";
import { CommercialCategory } from "@/types/commercial_products";

export const useNonTechCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.commercialProducts
  );

  useEffect(() => {
    dispatch(getCommercialCategories()); // Charge toutes les catégories commerciales
  }, [dispatch]);

  // Filtrer les catégories non techniques (is_tech: false) et limiter à 9
  const nonTechCategories = categories
    .filter((cat) => !cat.is_tech) // Non technique = is_tech: false
    .slice(0, 9); // Prendre les 9 premières

  return { nonTechCategories, loading, error } as {
    nonTechCategories: CommercialCategory[];
    loading: boolean;
    error: string | null;
  };
};