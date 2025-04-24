'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/dashboard/Loader';
import ProductList from '@/components/dashboard/produits/ProductList';
import AddProductForm from '@/components/dashboard/produits/AddProductForm';
import CategoryManager from '@/components/dashboard/produits/CategoryManager';
import SubcategoryManager from '@/components/dashboard/produits/SubcategoryManager';
import ViewDetailsModal from '@/components/dashboard/produits/ViewDetailsModal';
import '@/styles/dashboard/produits.css';

// Simulated database using localStorage
const getProducts = () => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

const saveProducts = (products: any[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};

const getCategories = () => {
  const categories = localStorage.getItem('categories');
  return categories ? JSON.parse(categories) : [];
};

const saveCategories = (categories: any[]) => {
  localStorage.setItem('categories', JSON.stringify(categories));
};

const getSubcategories = () => {
  const subcategories = localStorage.getItem('subcategories');
  return subcategories ? JSON.parse(subcategories) : [];
};

const saveSubcategories = (subcategories: any[]) => {
  localStorage.setItem('subcategories', JSON.stringify(subcategories));
};

const GestionProduitsPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Load data on mount
  useEffect(() => {
    setProducts(getProducts());
    setCategories(getCategories());
    setSubcategories(getSubcategories());
  }, []);

  const handleAddProduct = (formData: any) => {
    setLoading(true);
    setTimeout(() => {
      const newProduct = { ...formData, id: Date.now(), createdAt: new Date().toISOString(), sold: 0 };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      saveProducts(updatedProducts);
      setShowAddProduct(false);
      toast.success('Produit ajouté avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((p: any) => p.id !== id);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    toast.success('Produit supprimé');
  };

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const handleSaveChanges = (updatedProduct: any) => {
    setLoading(true);
    setTimeout(() => {
      const updatedProducts = products.map((p: any) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      setProducts(updatedProducts);
      saveProducts(updatedProducts);
      setShowDetailsModal(false);
      setSelectedProduct(null);
      toast.success('Modifications enregistrées');
      setLoading(false);
    }, 1000);
  };

  const handleAddCategory = (newCategory: any) => {
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
    setShowCategoryModal(false);
  };

  const handleUpdateCategory = (updatedCategory: any) => {
    const updatedCategories = categories.map((cat: any) =>
      cat.id === updatedCategory.id ? updatedCategory : cat
    );
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
  };

  const handleDeleteCategory = (id: number) => {
    const updatedCategories = categories.filter((cat: any) => cat.id !== id);
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
    // Optionally, remove subcategories associated with this category
    const updatedSubcategories = subcategories.filter((sub: any) => sub.categoryId !== id);
    setSubcategories(updatedSubcategories);
    saveSubcategories(updatedSubcategories);
  };

  const handleAddSubcategory = (newSubcategory: any) => {
    const updatedSubcategories = [...subcategories, newSubcategory];
    setSubcategories(updatedSubcategories);
    saveSubcategories(updatedSubcategories);
    setShowSubcategoryModal(false);
  };

  const handleUpdateSubcategory = (updatedSubcategory: any) => {
    const updatedSubcategories = subcategories.map((sub: any) =>
      sub.id === updatedSubcategory.id ? updatedSubcategory : sub
    );
    setSubcategories(updatedSubcategories);
    saveSubcategories(updatedSubcategories);
  };

  const handleDeleteSubcategory = (id: number) => {
    const updatedSubcategories = subcategories.filter((sub: any) => sub.id !== id);
    setSubcategories(updatedSubcategories);
    saveSubcategories(updatedSubcategories);
  };

  return (
    <div className="x-products-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Loader loading={loading} />
      <div className="d-flex justify-content-between align-items-center mb-4 x-header-container">
        <h2 className="x-products-title">Gestion des Produits</h2>
        <div className="x-button-group">
          <button className="btn x-add-btn me-2" onClick={() => setShowCategoryModal(true)}>
            <i className="fas fa-plus me-2"></i> Gérer Catégories
          </button>
          <button className="btn x-add-btn me-2" onClick={() => setShowSubcategoryModal(true)}>
            <i className="fas fa-plus me-2"></i> Gérer Sous-catégories
          </button>
          <button className="btn x-add-btn" onClick={() => setShowAddProduct(true)}>
            <i className="fas fa-plus me-2"></i> Ajouter un Produit
          </button>
        </div>
      </div>

      {/* Product Listing */}
      <ProductList
        products={products}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
      />

      {/* Add Product Modal */}
      {showAddProduct && (
        <AddProductForm
          categories={categories}
          subcategories={subcategories}
          onSubmit={handleAddProduct}
          onClose={() => setShowAddProduct(false)}
        />
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedProduct && (
        <ViewDetailsModal
          product={selectedProduct}
          categories={categories}
          subcategories={subcategories}
          onSave={handleSaveChanges}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {/* Category Management Modal */}
      {showCategoryModal && (
        <CategoryManager
          categories={categories}
          onAddCategory={handleAddCategory}
          onUpdateCategory={handleUpdateCategory}
          onDeleteCategory={handleDeleteCategory}
          onClose={() => setShowCategoryModal(false)}
        />
      )}

      {/* Subcategory Management Modal */}
      {showSubcategoryModal && (
        <SubcategoryManager
          categories={categories}
          subcategories={subcategories}
          onAddSubcategory={handleAddSubcategory}
          onUpdateSubcategory={handleUpdateSubcategory}
          onDeleteSubcategory={handleDeleteSubcategory}
          onClose={() => setShowSubcategoryModal(false)}
        />
      )}
    </div>
  );
};

export default GestionProduitsPage;