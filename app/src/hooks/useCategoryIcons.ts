"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommercialCategories } from "@/store/slices/commercialProductSlice";
import { RootState, AppDispatch } from "@/store/store";
import { CommercialCategory } from "@/types/commercial_products";

export const useCategoryIcons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.commercialProducts
  );

  useEffect(() => {
    dispatch(getCommercialCategories());
  }, [dispatch]);

  return { categories, loading, error } as {
    categories: CommercialCategory[];
    loading: boolean;
    error: string | null;
  };
};