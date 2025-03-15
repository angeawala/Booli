import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/categorySlice";
import { RootState, AppDispatch } from "@/store/store";

export const useNonTechCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { commercialCategories, loading, error } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchCategories()); // Charge tout et remplit commercialCategories automatiquement
  }, [dispatch]);

  // Filtrer les catégories non-tech parmi les commerciales et prendre les 9 plus récentes
  const nonTechCategories = commercialCategories
    .filter((cat) => cat.is_non_tech)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 9);

  return { nonTechCategories, loading, error };
};