'use client';

import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/styles/css/product-details.css';

// Interfaces
interface ProductVariant {
  size: string;
  price: number;
  weight: string;
  colors: Array<{ color: string; stock: number }>;
  promotion?: {
    discountPercentage: number;
    startDate: string;
    endDate: string;
  };
  bulkPricing?: Array<{ minQuantity: number; pricePerUnit: number }>;
}

interface Review {
  name: string;
  comment: string;
  rating: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  images: [string, string, string, string];
  galleryImages: [string, string, string];
  video?: string;
  variants: ProductVariant[];
  customFields: Array<{ name: string; value: string }>;
  reviews: Review[];
  ratings: Array<{ rating: number; percentage: number; count: number }>;
}

// Liste des couleurs avec styles inline
const COLOR_OPTIONS = [
  { value: 'gray', label: 'Choisissez une couleur', style: { backgroundColor: '#fff', color: '#000' } },
  { value: 'white', label: 'Blanc', style: { backgroundColor: 'rgba(255, 255, 255, 0.555)', color: '#000' } },
  { value: 'black', label: 'Noire', style: { backgroundColor: 'rgba(255, 255, 255, 0.555)', color: '#fff' } },
  { value: 'red', label: 'Rouge', style: { backgroundColor: 'red', color: '#fff' } },
  { value: 'green', label: 'Vert', style: { backgroundColor: 'green', color: '#fff' } },
  { value: 'blue', label: 'Bleu', style: { backgroundColor: 'blue', color: '#fff' } },
  { value: 'yellow', label: 'Jaune', style: { backgroundColor: 'yellow', color: '#000' } },
  { value: 'purple', label: 'Violet', style: { backgroundColor: 'purple', color: '#fff' } },
  { value: 'orange', label: 'Orange', style: { backgroundColor: 'orange', color: '#000' } },
  { value: 'pink', label: 'Rose', style: { backgroundColor: 'pink', color: '#000' } },
];

// Produit de test
const sampleProduct: Product = {
  id: 12345,
  name: 'Chaussure Fermée Confort',
  description: 'Couleur blanche, certification verified ...',
  category: 'Vêtements',
  subcategory: 'Chaussures',
  images: [
    '/Photo/ch2.jpeg',
    '/Photo/ch12.jpg',
    '/Photo/ch4.jpeg',
    '/Photo/ch6.jpg',
  ],
  galleryImages: [
    '/Photo/chaussure1.jpg',
    '/Photo/chaussure2.jpg',
    '/Photo/chaussure.jpg',
  ],
  video: '/demo/chaussure.mp4',
  variants: [
    {
      size: 'S',
      price: 9000,
      weight: '0.7',
      colors: [
        { color: 'white', stock: 50 },
        { color: 'black', stock: 30 },
        { color: 'red', stock: 20 },
        { color: 'blue', stock: 25 },
        { color: 'green', stock: 15 },
      ],
      promotion: {
        discountPercentage: 50,
        startDate: '2025-05-01',
        endDate: '2025-05-10',
      },
      bulkPricing: [
        { minQuantity: 10, pricePerUnit: 4000 },
        { minQuantity: 20, pricePerUnit: 3500 },
      ],
    },
    {
      size: 'M',
      price: 9500,
      weight: '0.8',
      colors: [
        { color: 'white', stock: 40 },
        { color: 'black', stock: 35 },
        { color: 'red', stock: 15 },
        { color: 'blue', stock: 20 },
        { color: 'green', stock: 10 },
      ],
      bulkPricing: [
        { minQuantity: 10, pricePerUnit: 4500 },
      ],
    },
    {
      size: 'L',
      price: 10000,
      weight: '0.9',
      colors: [
        { color: 'white', stock: 30 },
        { color: 'black', stock: 25 },
        { color: 'red', stock: 10 },
        { color: 'blue', stock: 15 },
        { color: 'green', stock: 5 },
      ],
    },
  ],
  customFields: [
    { name: 'Matériau', value: 'Cuir véritable' },
    { name: 'Type de semelle', value: 'Antidérapbesoin de coder: Antidérapante' },
    { name: 'Origine', value: 'Fabriqué en Italie' },
    { name: 'Fermeture', value: 'Lacets' },
    { name: 'Hauteur de talon', value: '3 cm' },
    { name: 'Imperméabilité', value: 'Oui' },
    { name: 'Couleur dominante', value: 'Multicolore' },
    { name: 'Usage', value: 'Quotidien, Cérémonie' },
    { name: 'Entretien', value: 'Cirage régulier' },
    { name: 'Garantie', value: '2 ans' },
  ],
  reviews: [
    {
      name: "Koffi N'TCHA",
      comment: "Super chaussure ! La qualité du cuir est incroyable et très confortable.",
      rating: 4,
    },
    {
      name: "Ozias KOUAGOU",
      comment: "Excellent rapport qualité-prix, parfait pour un usage quotidien.",
      rating: 5,
    },
  ],
  ratings: [
    { rating: 5, percentage: 80, count: 120 },
    { rating: 4, percentage: 60, count: 90 },
    { rating: 3, percentage: 40, count: 50 },
    { rating: 2, percentage: 20, count: 20 },
    { rating: 1, percentage: 10, count: 10 },
  ],
};

const CommercialProductDetails: React.FC = () => {
  const [product] = useState<Product>(sampleProduct);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      size: '',
      price: 0,
      weight: '',
      colors: [],
    }
  );
  const [selectedColor, setSelectedColor] = useState<string>(() => {
    return product.variants[0]?.colors[0]?.color || COLOR_OPTIONS[0].value;
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState<string>(product.images[0] || '');
  const [thumbnailImages, setThumbnailImages] = useState<string[]>(
    product.images.slice(1) || []
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  // Guard clause for empty variants
  if (!product.variants.length) {
    return <div>Erreur : Aucune variante disponible pour ce produit.</div>;
  }

  // Changer l'image principale
  const changeMainImage = (newMainImage: string) => {
    const currentMainImage = mainImage;
    setMainImage(newMainImage);
    setThumbnailImages((prev) =>
      prev
        .map((img) => (img === newMainImage ? currentMainImage : img))
        .filter((img) => img !== currentMainImage)
        .concat(currentMainImage)
    );
  };

  // Gérer le changement de taille
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    const variant = product.variants.find((v) => v.size === size);
    if (variant) {
      setSelectedVariant(variant);
      setSelectedColor(variant.colors[0]?.color || COLOR_OPTIONS[0].value);
      setQuantity(1);
    }
  };

  // Gérer le changement de couleur
  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    setQuantity(1);
    updateColorPoint(newColor);
  };

  // Fonction updateColorPoint
  const updateColorPoint = (color: string) => {
    console.log(`Couleur sélectionnée : ${color}`);
  };

  // Ajouter au panier
  const handleAddToCart = () => {
    const stock = selectedVariant.colors.find((c) => c.color === selectedColor)?.stock || 0;
    if (selectedColor === 'gray') {
      toast.error('Veuillez sélectionner une couleur valide.');
      return;
    }
    if (quantity > stock) {
      toast.error('Quantité demandée supérieure au stock.');
      return;
    }
    toast.success(`${quantity} ${product.name} (${selectedVariant.size}, ${selectedColor}) ajouté au panier.`);
  };

  // Calculer le prix unitaire
  const getUnitPrice = (variant: ProductVariant): number => {
    const basePrice = variant.price;
    if (variant.promotion) {
      const today = new Date(); // Use current date
      const startDate = new Date(variant.promotion.startDate);
      const endDate = new Date(variant.promotion.endDate);
      if (today >= startDate && today <= endDate) {
        return basePrice * (1 - variant.promotion.discountPercentage / 100);
      }
    }
    return basePrice;
  };

  // Calculer le prix total
  const getTotalPrice = (): number => {
    let unitPrice = getUnitPrice(selectedVariant);
    if (selectedVariant.bulkPricing) {
      const applicableBulk = selectedVariant.bulkPricing
        .filter((bp) => quantity >= bp.minQuantity)
        .sort((a, b) => b.minQuantity - a.minQuantity)[0];
      if (applicableBulk) {
        unitPrice = applicableBulk.pricePerUnit;
      }
    }
    return unitPrice * quantity;
  };

  // Obtenir le stock maximum
  const getMaxStock = (): number => {
    const color = selectedVariant.colors.find((c) => c.color === selectedColor);
    return color ? color.stock : 0;
  };

  // Gérer play/pause de la vidéo
  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Rendu des étoiles
  const renderStars = (rating: number) => {
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    return <span style={{ color: 'orange' }}>{stars}</span>;
  };

  return (
    <div className="produ-grid row col-sm-12">
      <main>
        <div className="cadre">
          {/* Images */}
          <div className="cadres-images">
            <img
              id="mainImage"
              src={mainImage}
              alt={product.name}
              className="img-fluid"
            />
            <div className="thumbnail-images">
              {thumbnailImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Miniature ${index + 1}`}
                  className="img-fluid"
                  onClick={() => changeMainImage(image)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>

            {/* Garantie */}
            <div className="warranty-options">
              <h3>Ajouter une garantie :</h3>
              <label>
                <input type="radio" name="warranty" value="none" defaultChecked />
                Pas de garantie supplémentaire
              </label>
              <label>
                <input type="radio" name="warranty" value="1-year" />
                Garantie 1 an (+ 2000 FCFA)
              </label>
              <label>
                <input type="radio" name="warranty" value="2-years" />
                Garantie 2 ans (+ 8000 FCFA)
              </label>
            </div>

            {/* Histogramme des avis */}
            <div className="histogram">
              {product.ratings.map((rating) => (
                <div className="bar1" key={rating.rating}>
                  <span className="bar1-label">{rating.rating.toFixed(2)}</span>
                  <div className="bar1-fill" style={{ width: `${rating.percentage}%` }}>
                    {rating.percentage}%
                  </div>
                  <span className="bar1-count">({rating.count} avis)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Détails du produit */}
          <div className="product-details">
            <div className="decale">
              <h4 className="tich">{product.name}</h4>
              <p className="short-description">{product.description}</p>
              <div className="price">
                {selectedVariant.promotion && (
                  <span className="original-price">{selectedVariant.price} FCF</span>
                )}
                <span className="current-price">{getUnitPrice(selectedVariant)} FCF</span>
                {selectedVariant.bulkPricing && (
                  <span className="bulk-pricing">
                    {selectedVariant.bulkPricing.map((bp, index) => (
                      <span key={index}>
                        {' '}
                        ({bp.pricePerUnit} FCF pour {bp.minQuantity}+)
                      </span>
                    ))}
                  </span>
                )}
              </div>
              <div className="rating">
                <span>{renderStars(4)}</span>
                <span>(123 Avis)</span>
              </div>
              <p className="availability">
                {selectedColor !== 'gray'
                  ? getMaxStock() > 0
                    ? `En Stock (${getMaxStock()} disponibles)`
                    : 'Rupture de stock'
                  : 'Sélectionnez une couleur'}
              </p>

              {/* Sélecteur de taille */}
              <div className="variant-selection">
                <label htmlFor="size" className="x-products-label">
                  Taille :
                </label>
                <select
                  id="size"
                  className="select"
                  value={selectedVariant.size}
                  onChange={handleSizeChange}
                  aria-label="Sélectionner une taille"
                >
                  {product.variants.map((variant) => (
                    <option key={variant.size} value={variant.size}>
                      {variant.size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sélecteur de couleur */}
              <div className="variant-selection">
                <label htmlFor="colorDropdown" className="x-products-label">
                  Couleur :
                </label>
                <select
                  id="colorDropdown"
                  value={selectedColor}
                  onChange={handleColorChange}
                  className="select"
                  style={{ margin: '20px 0' }}
                  aria-label="Sélectionner une couleur"
                >
                  {COLOR_OPTIONS.filter(
                    (option) =>
                      option.value === 'gray' ||
                      selectedVariant.colors.some(
                        (c) => c.color.toLowerCase() === option.value.toLowerCase()
                      )
                  ).map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      style={option.style}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantité */}
              <div className="quantity-selector">
                <label htmlFor="quantity" className="x-products-label">
                  Quantité :
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Math.min(getMaxStock(), parseInt(e.target.value) || 1)))
                  }
                  min="1"
                  max={getMaxStock()}
                  className="form-control"
                  aria-label="Sélectionner la quantité"
                  disabled={selectedColor === 'gray'}
                />
              </div>

              {/* Total */}
              <div className="cart-summary" style={{ marginBottom: '10px' }}>
                <strong>Total :</strong> {getTotalPrice()} FCF
                <a href="/Panier" className="view-cart-btn">
                  Voir mon panier
                </a>
              </div>

              {/* Boutons */}
              <div className="buttons">
                <button
                  className="add-to-cart btn btn-primary"
                  onClick={handleAddToCart}
                  aria-label="Ajouter au panier"
                  disabled={selectedColor === 'gray'}
                >
                  <i className="fas fa-cart-plus" id="fas"></i> Ajouter au panier
                </button>
                <button
                  className="buy-now btn btn-success"
                  onClick={() => toast.info('Redirection vers le paiement...')}
                  aria-label="Acheter maintenant"
                  disabled={selectedColor === 'gray'}
                >
                  <i className="fas fa-cart-plus" id="fas"></i> Acheter maintenant
                </button>
              </div>

              {/* Livraison */}
              <div className="delivery-options">
                <h4 className="tich">Options de Livraison</h4>
                <label>
                  <input type="radio" name="delivery" value="standard" defaultChecked />
                  Livraison Standard (1-3 jours) - Gratuit
                </label>
                <label>
                  <input type="radio" name="delivery" value="express" />
                  Livraison Express (1-2 jours) - 2000 FCF
                </label>
                <label>
                  <input type="radio" name="delivery" value="same-day" />
                  Livraison le Jour Même - 1000 FCF
                </label>
              </div>

              {/* Estimation des frais */}
              <div className="shipping-estimate">
                <label htmlFor="postalCode">Estimer les frais de livraison :</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder="Code Postal"
                  className="form-control"
                />
                <button
                  id="estimateBtn"
                  className="btn btn-secondary"
                  onClick={() => toast.info('Estimation non implémentée')}
                >
                  Estimer
                </button>
              </div>
              <div id="estimatedCost"></div>

              {/* Liens additionnels */}
              <div className="additional-links">
                <a href="/connexion_client">
                  <i className="fas fa-heart" style={{ color: 'rgba(255, 166, 0, 0.959)' }}></i>{' '}
                  Ajouter à la Liste de Souhaits
                </a>
                <br />
                <a href="/retour">
                  <i className="fas fa-check-circle" style={{ color: 'rgba(255, 166, 0, 0.959)' }}></i>{' '}
                  Retour
                </a>
                <br />
                <a
                  href="/livraison"
                  style={{
                    border: '1px solid rgb(161, 0, 0)',
                    borderRadius: '25px',
                    padding: '3px',
                  }}
                >
                  <i className="fas fa-truck" style={{ color: 'rgba(255, 166, 0, 0.959)' }}></i>{' '}
                  Service de livraison
                </a>
                <br />
                <a href="#fiche-technique1">
                  <i className="fas fa-file-alt" style={{ color: 'rgba(255, 166, 0, 0.959)' }}></i>{' '}
                  Fiche Technique
                </a>
              </div>

              {/* Partage */}
              <div className="share">
                <span>Partager :</span>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-tiktok"></i> TikTok
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fiche technique */}
      <div className="fiche-technique">
        <h4
          id="fiche-technique1"
          style={{
            color: '#e67e22',
            textAlign: 'center',
            borderTop: '4px double #bb9f00',
            borderRadius: '25px',
          }}
        >
          *** Détails ***
        </h4>
        <div className="header1">
          <h3>{product.name}</h3>
          <p className="reference">Référence : XYZ-{product.id}</p>
          <p className="disponibilité">
            Disponibilité :{' '}
            <span className="en-stock">
              {selectedColor !== 'gray'
                ? getMaxStock() > 0
                  ? `En Stock (${getMaxStock()} disponibles)`
                  : 'Rupture de stock'
                : 'Sélectionnez une couleur'}
            </span>
          </p>
        </div>

        {/* Galerie d'images et vidéo */}
        <section className="media-produit">
          <div className="image-galerie">
            {product.galleryImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Vue ${index + 1} de ${product.name}`}
                className="img-fluid"
              />
            ))}
          </div>
          {product.video && (
            <div className="video-produit">
              <video
                ref={videoRef}
                id="myVideo"
                autoPlay
                loop
                muted
                className="hidden-controls"
                onClick={toggleVideo}
                style={{ width: '100%' }}
              >
                <source src={product.video} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéo.
              </video>
            </div>
          )}
        </section>

        {/* Détails */}
        <section className="details-produit">
          <h2>Description</h2>
          <p>{product.description}</p>

          <h3>Caractéristiques</h3>
          <ul>
            {product.customFields.map((field, index) => (
              <li key={`custom-${index}`}>
                <strong>{field.name} :</strong> {field.value}
              </li>
            ))}
            <li>
              <strong>Poids :</strong> {selectedVariant.weight} kg
            </li>
          </ul>

          <h3>Certifications</h3>
          <ul>
            <li>
              <strong>Conformité CE :</strong> Certifié CE pour la sécurité et la compatibilité
            </li>
            <li>
              <strong>RoHS :</strong> Conforme aux normes RoHS
            </li>
            <li>
              <strong>ISO 9001 :</strong> Produit dans une installation certifiée ISO 9001
            </li>
          </ul>

          <h3>Comparaison</h3>
          <table className="tableau-comparatif">
            <thead>
              <tr>
                <th>Caractéristiques</th>
                <th>{product.name}</th>
                <th>Modèle Concurrent 1</th>
                <th>Modèle Concurrent 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Matériau</td>
                <td>Cuir véritable</td>
                <td>Synthétique</td>
                <td>Cuir recyclé</td>
              </tr>
              <tr>
                <td>Semelle</td>
                <td>Antidérapante</td>
                <td>Standard</td>
                <td>Renforcée</td>
              </tr>
              <tr>
                <td>Poids</td>
                <td>{selectedVariant.weight} kg</td>
                <td>0.8 kg</td>
                <td>0.9 kg</td>
              </tr>
              <tr>
                <td>Prix</td>
                <td>{getUnitPrice(selectedVariant)} FCF</td>
                <td>8000 FCF</td>
                <td>8500 FCF</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Avis clients */}
        <section className="avis-clients">
          <h2>Avis Clients</h2>
          {product.reviews.map((review, index) => (
            <div className="avis" key={index}>
              <p>
                <strong>{review.name} :</strong> "{review.comment}"
              </p>
              <p style={{ color: 'orange' }}>
                <strong>Note :</strong> {renderStars(review.rating)}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CommercialProductDetails;