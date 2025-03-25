"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPromotions } from "@/store/slices/promotionSlice";
import { RootState, AppDispatch } from "@/store/store";
import { Promotion } from "@/types/promotions";

export const usePromotions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { promotions, loading, error } = useSelector((state: RootState) => state.promotion);

  useEffect(() => {
    dispatch(getPromotions({ limit: 30 })); // Limite à 30 comme ton HTML
  }, [dispatch]);

  return { promotions, loading, error } as {
    promotions: Promotion[];
    loading: boolean;
    error: string | null;
  };
};