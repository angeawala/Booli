'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/dashboard/Loader';
import ProductList from '@/components/dashboard/produits/ProductList';
import AddProductForm from '@/components/dashboard/produits/AddProductForm';
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

const getSubcategories = () => {
  const subcategories = localStorage.getItem('subcategories');
  return subcategories ? JSON.parse(subcategories) : [];
};

const MesProduitsPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Simulated logged-in user
  const userEmail = 'user@example.com'; // Replace with actual user authentication logic

  // Load data on mount
  useEffect(() => {
    const allProducts = getProducts();
    // Filter products for the logged-in user
    const userProducts = allProducts.filter(
      (product: any) => product.ownership === 'client' && product.clientEmail === userEmail
    );
    setProducts(userProducts);
    setCategories(getCategories());
    setSubcategories(getSubcategories());
  }, []);

  const handleAddProduct = (formData: any) => {
    setLoading(true);
    setTimeout(() => {
      const newProduct = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        sold: 0,
      };
      const updatedProducts = [...products, newProduct];
      const allProducts = getProducts();
      const newAllProducts = [...allProducts, newProduct];
      saveProducts(newAllProducts);
      setProducts(updatedProducts);
      setShowAddProduct(false);
      toast.success('Produit ajouté avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleDelete = (id: number) => {
    const updatedUserProducts = products.filter((p: any) => p.id !== id);
    const allProducts = getProducts();
    const updatedAllProducts = allProducts.filter((p: any) => p.id !== id);
    setProducts(updatedUserProducts);
    saveProducts(updatedAllProducts);
    toast.success('Produit supprimé');
  };

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const handleSaveChanges = (updatedProduct: any) => {
    setLoading(true);
    setTimeout(() => {
      const updatedUserProducts = products.map((p: any) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      const allProducts = getProducts();
      const updatedAllProducts = allProducts.map((p: any) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      setProducts(updatedUserProducts);
      saveProducts(updatedAllProducts);
      setShowDetailsModal(false);
      setSelectedProduct(null);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="x-products-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Loader loading={loading} />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="x-products-title">Mes Produits</h2>
        <div>
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
          isClientPage={true}
          userEmail={userEmail}
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
    </div>
  );
};

export default MesProduitsPage;