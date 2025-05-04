import { useState } from 'react';
import Link from 'next/link';
import DoctorsSection from './DoctorsSection';

interface Product {
  id: number;
  category: string;
  name: string;
  image: string;
  oldPrice: number;
  newPrice: number;
}

const initialProducts: Product[] = [
  { id: 1, category: "Aide mémoire et lutte contre les maux de tête", name: "Miel", image: "/Photo/miel.png", oldPrice: 2500, newPrice: 2000 },
  { id: 2, category: "Aide mémoire et lutte contre les maux de tête", name: "Plante Médicinale", image: "/media/plante.jpg", oldPrice: 2000, newPrice: 1200 },
  { id: 3, category: "Aide mémoire et lutte contre les maux de tête", name: "Fruit Exotique", image: "/Photo/fruit1", oldPrice: 2300, newPrice: 1600 },
  { id: 4, category: "Aide mémoire et lutte contre les maux de tête", name: "Herbe Naturelle", image: "/media/produit2.jpg", oldPrice: 2300, newPrice: 1600 },
  { id: 5, category: "Courbature et mauvaise haleine de la bouche", name: "Miel Pur", image: "/media/produit3.jpg", oldPrice: 2500, newPrice: 2000 },
  { id: 6, category: "Courbature et mauvaise haleine de la bouche", name: "Remède Plante", image: "/media/produit4.jpg", oldPrice: 2000, newPrice: 1200 },
  { id: 7, category: "Courbature et mauvaise haleine de la bouche", name: "Feuille Médicinale", image: "/media/plante.jpg", oldPrice: 2300, newPrice: 1600 },
  { id: 8, category: "Courbature et mauvaise haleine de la bouche", name: "Extrait Naturel", image: "/media/produit3.jpg", oldPrice: 2300, newPrice: 1600 },
  { id: 9, category: "Fatigue Générales et Douleurs", name: "Miel Énergisant", image: "/Pub1/produit.png", oldPrice: 2500, newPrice: 2000 },
  { id: 10, category: "Fatigue Générales et Douleurs", name: "Plante Tonique", image: "/product2.jpg", oldPrice: 2000, newPrice: 1200 },
  { id: 11, category: "Fatigue Générales et Douleurs", name: "Racine Vitale", image: "/product2.jpg", oldPrice: 2300, newPrice: 1600 },
  { id: 12, category: "Fatigue Générales et Douleurs", name: "Élixir Naturel", image: "/product2.jpg", oldPrice: 2300, newPrice: 1600 }
];

// Simulate more data
const products: Product[] = [];
initialProducts.forEach((product) => {
  products.push(product);
  products.push({
    ...product,
    id: product.id + 100,
    name: `${product.name} (Variante 1)`,
    newPrice: product.newPrice + 100
  });
  products.push({
    ...product,
    id: product.id + 200,
    name: `${product.name} (Variante 2)`,
    newPrice: product.newPrice - 100
  });
});

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="produit-phar">
      <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-2" />
      <p>{product.name}</p>
      <p>
        <span className="old-pricie">{product.oldPrice}F</span>{' '}
        <span className="new-pricie">{product.newPrice}F</span>
      </p>
      <Link href="/Affichage_des_produits">
        <button
          id="bton"
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1 mt-2"
        >
          <i className="fas fa-info-circle"></i> Détails
        </button>
      </Link>
      <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mt-2">
        Ajouter au panier
      </button>
    </div>
  );
};

const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;

  const categories = ['Toutes', ...new Set(products.map(p => p.category))];

  // Filter and sort products
  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'Toutes' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortOrder === 'price-asc') return a.newPrice - b.newPrice;
      if (sortOrder === 'price-desc') return b.newPrice - a.newPrice;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
    <section className='ph'>
      
      <div className="x-com row col-12">
      <div className='col-4 mt-4'>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className='centered-div col-4 text-center mt-3'>
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher un produit(cosmétique,...) naturel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">
            <i className="fas fa-search"></i>
          </button>
        </div>
        </div>
     
        <div className='col-4 mt-4 ml-4'>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="default">Trier par:</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>

      </div>

      </section>
      <DoctorsSection/>
      {/* Product Sections */}
      {categories.filter(cat => cat !== 'Toutes').map(category => {
        const categoryProducts = paginatedProducts.filter(p => p.category === category);
        if (categoryProducts.length === 0) return null;
        return (
          <section key={category} id="pharmacies" className="mb-8">
            <h4 className="entete">{category}</h4>
            <div className="produit-phar-grid">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Pagination */}
      <div className="flex text-center justify-center gap-2 mb-4 mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Précédent
        </button>
        <span className="px-4 py-2">Page {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Suivant
        </button>
      </div>
    </>
  );
};

export default ProductList;