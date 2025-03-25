// hooks/useEngrosSection.ts
"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getEngrosProducts } from "@/store/slices/engrosSlice";


export const useEngrosSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { engrosProducts, loading, error } = useSelector((state: RootState) => state.engros);
  const itemsPerSection = 3;
  const maxSections = 3;
  const totalItems = itemsPerSection * maxSections; // 9 produits max

  useEffect(() => {
    dispatch(getEngrosProducts({ limit: totalItems }));
  }, [dispatch, totalItems]);

  // Calcul des étoiles et prixEngros max
  const productsWithDetails = useMemo(() => {
    return engrosProducts.map((product) => {
      const avgRating =
        product.reviews.length > 0
          ? product.reviews.reduce((sum, review) => sum + review.note, 0) / product.reviews.length
          : 0;
      const maxMinQuantityTier = product.pricingTiers.reduce((max, tier) =>
        tier.minQuantity > max.minQuantity ? tier : max
      , product.pricingTiers[0] || { minQuantity: 0, prixEngros: product.prix_normal });
      return {
        ...product,
        avgRating: Math.round(avgRating),
        bestPrixEngros: maxMinQuantityTier.prixEngros,
      };
    });
  }, [engrosProducts]);

  // Diviser en 3 sections de 3
  const sections = useMemo(() => {
    const result = [];
    const limitedProducts = productsWithDetails.slice(0, totalItems); // Limiter à 9
    for (let i = 0; i < limitedProducts.length; i += itemsPerSection) {
      result.push(limitedProducts.slice(i, i + itemsPerSection));
    }
    return result.slice(0, maxSections); // Limiter à 3 sections
  }, [productsWithDetails, totalItems, itemsPerSection, maxSections]);

  return { sections, loading, error };
};