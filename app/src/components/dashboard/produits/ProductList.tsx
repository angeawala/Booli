'use client';

import { useState } from 'react';

interface ProductListProps {
  products: any[];
  onDelete: (id: number) => void;
  onViewDetails: (product: any) => void;
}

const ProductList = ({ products, onDelete, onViewDetails }: ProductListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterType, setFilterType] = useState('');
  const productsPerPage = 5;

  // Product listing logic
  const filteredProducts = products
    .filter((product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterType || product.type === filterType)
    )
    .sort((a: any, b: any) => (a[sortBy] > b[sortBy] ? 1 : -1));

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="mb-4">
      <div className="row x-filter-row">
        <div className="col-12 col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher par nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4 mb-3">
          <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">Filtrer par type</option>
            <option value="Livres">Livres</option>
            <option value="Pharmacopée">Pharmacopée</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <div className="col-12 col-md-4 mb-3">
          <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Trier par Nom</option>
            <option value="stock">Trier par Stock</option>
            <option value="sold">Trier par Ventes</option>
          </select>
        </div>
      </div>

      {/* Table for larger screens */}
      <div className="d-none d-md-block">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Stock</th>
              <th>Ventes</th>
              <th>Auteur</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product: any) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.stock || 0}</td>
                <td>{product.sold || 0}</td>
                <td>{product.author || 'N/A'}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2 x-action-btn" onClick={() => onViewDetails(product)}>
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="btn btn-danger btn-sm x-action-btn" onClick={() => onDelete(product.id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="d-md-none">
        {paginatedProducts.map((product: any) => (
          <div key={product.id} className="x-product-card mb-3">
            <div className="x-product-card-body">
              <h6 className="x-product-card-title">{product.name}</h6>
              <p className="x-product-card-text"><strong>Stock:</strong> {product.stock || 0}</p>
              <p className="x-product-card-text"><strong>Ventes:</strong> {product.sold || 0}</p>
              <p className="x-product-card-text"><strong>Auteur:</strong> {product.author || 'N/A'}</p>
              <div className="x-product-card-actions">
                <button className="btn btn-info btn-sm x-action-btn me-2" onClick={() => onViewDetails(product)}>
                  <i className="fas fa-eye"></i>
                </button>
                <button className="btn btn-danger btn-sm x-action-btn" onClick={() => onDelete(product.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductList;