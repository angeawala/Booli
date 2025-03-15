import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/categorySlice";
import { RootState, AppDispatch } from "@/store/store";

export const useSubCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { subCategories, loading, error } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return { subCategories, loading, error };
};