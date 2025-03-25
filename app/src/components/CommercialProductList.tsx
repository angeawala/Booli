"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommercialProducts, removeCommercialProduct } from "@/store/slices/commercialProductSlice";
import { RootState, AppDispatch } from "@/store/store";
import Link from "next/link";
import GenericModal from "./GenericModal";
import { CommercialProduct } from "@/types/commercial_products";
import "@/styles/listing.css"

const CommercialProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.commercialProducts);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CommercialProduct | null>(null);

  useEffect(() => {
    dispatch(getCommercialProducts({}));
  }, [dispatch]);

  const handleDelete = (productId: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      dispatch(removeCommercialProduct(productId));
    }
  };

  const openEditModal = (product: CommercialProduct) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="product-list">
      <button onClick={() => setIsCreateModalOpen(true)} className="create-btn">
        Créer un produit
      </button>

      <GenericModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <GenericModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />

      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <span>{product.name}</span>
            <div className="actions">
              <Link href={`/store/product/${product.id}`}>
                <i className="fas fa-eye" title="Visualiser"></i>
              </Link>
              <i
                className="fas fa-edit"
                title="Modifier"
                onClick={() => openEditModal(product)}
                style={{ cursor: "pointer" }}
              ></i>
              <i
                className="fas fa-trash"
                title="Supprimer"
                onClick={() => handleDelete(product.id)}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommercialProductList;