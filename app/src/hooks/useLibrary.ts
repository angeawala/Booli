// hooks/useLibrary.ts
"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getBooks } from "@/store/slices/bookSlice";
import { activateSub } from "@/store/slices/subscriptionSlice"; // Import uniquement activateSub
import { Subscription } from "@/types/subscription"; // Import Subscription ici
import { fetchPDFAccess } from "@/api/pdfApi";

export const useLibrary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading, error, totalCount, nextPage, previousPage } = useSelector((state: RootState) => state.books);
  const subscription = useSelector((state: RootState) => state.subscription.subscription);

  const getBooksHandler = (params: {
    q?: string;
    category?: string;
    genre?: string;
    editeur?: string;
    langue?: string;
    format?: string;
    prix_normal_min?: number;
    prix_normal_max?: number;
    prix_reduit_min?: number;
    prix_reduit_max?: number;
    stock?: number;
    has_pdf?: boolean;
    ordering?: "name" | "-name" | "prix_normal" | "-prix_normal" | "prix_reduit" | "-prix_reduit" | "parution" | "-parution" | "pages" | "-pages" | "created_at" | "-created_at";
    limit?: number;
    offset?: number;
  }) => {
    return dispatch(getBooks(params));
  };

  const createSubscriptionHandler = async (data: { plan_id: string; payment_confirmed: boolean }): Promise<Subscription> => {
    const action = await dispatch(activateSub({ code: data.plan_id, device_token: "default_device_token" })).unwrap();
    return action; // Retourne Subscription avec code_verification
  };

  const accessPDFHandler = async (bookId: string, subscriptionCode?: string): Promise<string> => {
    if (subscriptionCode && (!subscription || !subscription.is_active)) {
      throw new Error("Abonnement non actif");
    }
    return fetchPDFAccess(bookId, subscriptionCode);
  };

  return {
    loading,
    books,
    error,
    totalCount,
    nextPage,
    previousPage,
    getBooks: getBooksHandler,
    createSubscription: createSubscriptionHandler,
    accessPDF: accessPDFHandler,
  };
};