import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/categorySlice";
import { fetchRecentCommercialProducts } from "@/store/productSlice";
import { RootState, AppDispatch } from "@/store/store";

export const useCategoryDisplay = (productLimit: number = 8) => {
  const dispatch = useDispatch<AppDispatch>();
  const { commercialCategories, loading: categoryLoading, error: categoryError } = useSelector(
    (state: RootState) => state.category
  );
  const { productsByCategory, loading: productLoading, error: productError } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (commercialCategories.length > 0 && !categoryLoading && !categoryError) {
      console.log("Fetching products for categories:", commercialCategories);
      dispatch(fetchRecentCommercialProducts({ categories: commercialCategories }));
    }
  }, [dispatch, commercialCategories, categoryLoading, categoryError]);

  const recentCommercialCategories = useMemo(() => {
    if (!commercialCategories || commercialCategories.length === 0) return [];
    return commercialCategories.slice(0, 4); // 4 catégories max
  }, [commercialCategories]);

  const products = useMemo(() => {
    if (!productsByCategory || Object.keys(productsByCategory).length === 0) return [];
    return Object.values(productsByCategory)
      .flat()
      .slice(0, productLimit); // 8 produits max au total
  }, [productsByCategory]);

  return {
    categories: recentCommercialCategories,
    productsByCategory, // Retourner tous les produits par catégorie
    products, // Produits limités à 8 pour affichage global
    loading: categoryLoading || productLoading,
    error: categoryError || productError,
  };
};