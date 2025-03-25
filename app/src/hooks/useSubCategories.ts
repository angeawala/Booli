// hooks/useSubCategories.ts
"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getCommercialSubCategories } from "@/store/slices/commercialProductSlice";

export const useSubCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { subCategories, loading, error } = useSelector((state: RootState) => state.commercialProducts);

  useEffect(() => {
    // Charge toutes les sous-catégories sans limite ni tri
    dispatch(getCommercialSubCategories());
  }, [dispatch]);

  // Applique la limite de 20 et le tri localement
  const limitedAndSortedSubCategories = useMemo(() => {
    return [...subCategories] // Crée une copie pour ne pas muter l'état
      .sort((a, b) => a.name.localeCompare(b.name)) // Tri par nom croissant
      .slice(0, 20); // Limite à 20
  }, [subCategories]);

  return {
    subCategories: limitedAndSortedSubCategories,
    loading,
    error,
  };
};