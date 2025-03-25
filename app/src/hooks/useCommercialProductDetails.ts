"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommercialProductDetails } from "@/store/slices/commercialProductSlice";
import { getReviews } from "@/store/slices/baseProductSlice";
import { RootState, AppDispatch } from "@/store/store";
import { CommercialProduct } from "@/types/commercial_products";

export const useCommercialProductDetails = (productId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedProduct, loading: productLoading, error: productError } = useSelector(
    (state: RootState) => state.commercialProducts
  );
  const { reviews, loading: reviewsLoading, error: reviewsError } = useSelector(
    (state: RootState) => state.baseProduct
  );

  useEffect(() => {
    if (productId) {
      dispatch(getCommercialProductDetails(productId));
      dispatch(getReviews(productId));
    }
  }, [dispatch, productId]);

  return {
    product: selectedProduct,
    reviews: reviews[productId] || [],
    loading: productLoading || reviewsLoading,
    error: productError || reviewsError,
  } as {
    product: CommercialProduct | null;
    reviews: CommercialProduct["reviews"];
    loading: boolean;
    error: string | null;
  };
};