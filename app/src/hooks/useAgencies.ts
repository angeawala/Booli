// hooks/useAgencies.ts
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { getAgencies, getCategories } from "@/store/slices/agencySlice";

export const useAgencies = (categoryId?: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { agencies, categories, loading, error } = useSelector((state: RootState) => state.agency);

  useEffect(() => {
    dispatch(getAgencies(categoryId));
    if (!categories.length) {
      dispatch(getCategories());
    }
  }, [dispatch, categoryId, categories.length]);

  return { agencies, categories, loading, error };
};