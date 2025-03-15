import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllShops } from "@/store/marketSlice";
import { RootState, AppDispatch } from "@/store/store";
import { Shop } from "@/types/market";

export const useShops = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { entities, loading, error } = useSelector((state: RootState) => state.market);

  useEffect(() => {
    dispatch(fetchAllShops());
  }, [dispatch]);

  const shops: Shop[] = Object.values(entities)
    .filter(
      (entity): entity is Shop =>
        "id" in entity && typeof entity.id === "string" && entity.id.startsWith("shops/")
    )
    .map((entity: Shop) => ({
      id: entity.id.split("/")[1],
      image: entity.image,
      email: entity.email,
      description: entity.description,
      contact: entity.contact,
      address: entity.address,
      average_rating: entity.average_rating,
      rating_count: entity.rating_count,
      categories: entity.categories,
      subcategories: entity.subcategories,
      created_by: entity.created_by,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    }));

  return { shops, loading, error };
};