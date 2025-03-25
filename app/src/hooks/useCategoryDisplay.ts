"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommercialCategories, getCommercialProducts } from "@/store/slices/commercialProductSlice";
import { RootState, AppDispatch } from "@/store/store";
import { CommercialCategory, CommercialProduct } from "@/types/commercial_products";

export const useCategoryDisplay = (productLimit: number = 8) => {
  const dispatch = useDispatch<AppDispatch>();

  const { categories, products, loading, error } = useSelector(
    (state: RootState) => state.commercialProducts
  );

  // Charger les catégories au montage
  useEffect(() => {
    dispatch(getCommercialCategories());
  }, [dispatch]);

  // Charger les produits récents quand les catégories sont prêtes
  useEffect(() => {
    if (categories.length > 0 && !loading && !error) {
      console.log("Fetching recent commercial products for categories:", categories);
      dispatch(
        getCommercialProducts({
          limit: productLimit * 4, // Assez pour 4 catégories
          ordering: "-created_at", // Produits récents
          category: categories.map((cat) => cat.id).join(","), // Toutes les catégories
        })
      );
    }
  }, [dispatch, categories, loading, error, productLimit]);

  // Limiter à 4 catégories
  const recentCommercialCategories = useMemo<CommercialCategory[]>(() => {
    return categories.slice(0, 4);
  }, [categories]);

  // Regrouper les produits par catégorie
  const productsByCategory = useMemo<{ [categoryId: string]: CommercialProduct[] }>(() => {
    const grouped: { [categoryId: string]: CommercialProduct[] } = {};
    products.forEach((product) => {
      const categoryId = product.category; // Utilise product.category
      if (!grouped[categoryId]) {
        grouped[categoryId] = [];
      }
      grouped[categoryId].push(product);
    });
    // Limiter à 8 produits par catégorie
    Object.keys(grouped).forEach((categoryId) => {
      grouped[categoryId] = grouped[categoryId].slice(0, 8);
    });
    return grouped;
  }, [products]);

  // Produits récents globaux (optionnel)
  const recentProducts = useMemo<CommercialProduct[]>(() => {
    return products.slice(0, productLimit);
  }, [products, productLimit]);

  return {
    categories: recentCommercialCategories,
    productsByCategory,
    products: recentProducts,
    loading,
    error,
  };
};