"use client";

import React, { useState } from "react";
import { useCommercialProductDetails } from "@/hooks/useCommercialProductDetails";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CommercialProduct } from "@/types/commercial_products";
import AjoutPanier from "@/components/ui/button/AjoutPanier"; // Importation du composant

const CommercialProduitDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { product, reviews, loading, error } = useCommercialProductDetails(productId);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("gray");

  const changeImage = (src: string) => {
    const mainImage = document.getElementById("mainImage") as HTMLImageElement;
    if (mainImage) mainImage.src = src;
  };

  const updateColorPoint = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e.target.value);
    setSelectedVariant(null); // Réinitialise la variante quand la couleur change
  };

  const getRatingStats = (reviews: CommercialProduct["reviews"]) => {
    const totalReviews = reviews.length;
    if (totalReviews === 0) return { average: 0, histogram: [0, 0, 0, 0, 0] };

    const counts = [0, 0, 0, 0, 0]; // 1 à 5 étoiles
    reviews.forEach((review) => {
      if (review.note >= 1 && review.note <= 5) counts[review.note - 1]++;
    });
    const histogram = counts.map((count) => (count / totalReviews) * 100);
    const average = reviews.reduce((sum, r) => sum + r.note, 0) / totalReviews;
    return { average: Number(average.toFixed(1)), histogram };
  };

  if (loading) return <div className="loading-spinner">Chargement...</div>;
  if (error) return <p>Erreur : {error}</p>;
  if (!product) return <p>Produit non trouvé</p>;

  const { average, histogram } = getRatingStats(reviews);

  // Filtrer les variantes en fonction de la couleur sélectionnée
  const filteredVariants = selectedColor === "gray"
    ? product.variants
    : product.variants.filter((v) => v.couleur === selectedColor);

  return (
    <>
      <main>
        <div className="cadre">
          <div className="cadres-images">
            <img
              id="mainImage"
              src={product.media?.images[0] || product.image || "/Photo/ch2.jpeg"}
              alt={product.name}
            />
            <div className="thumbnail-images">
              {product.media?.images.slice(1, 4).map((img) => (
                <img
                  key={img} // Utilisation de l'URL comme clé unique
                  src={img || "/Photo/default.jpg"}
                  alt="Produit miniature"
                  onClick={() => changeImage(img || "/Photo/default.jpg")}
                />
              ))}
            </div>
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
            <div className="histogram">
              {[5, 4, 3, 2, 1].map((star) => (
                <div className="bar1" key={star}>
                  <span className="bar1-label">{star}.00</span>
                  <div className="bar1-fill" style={{ width: `${histogram[star - 1]}%` }}>
                    {histogram[star - 1].toFixed(0)}%
                  </div>
                  <span className="bar1-count">({reviews.filter((r) => r.note === star).length} avis)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="product-details">
            <div className="decale">
              <h4 className="tich">{product.name}</h4>
              <p className="short-description">{product.description}</p>
              <div className="price">
                <span className="original-price">{product.prix_normal} FCF</span>
                {product.prix_reduit && (
                  <span className="current-price">{product.prix_reduit} FCF</span>
                )}
              </div>
              <div className="rating">
                <span>{Array(Math.round(average)).fill("★").join("")}{Array(5 - Math.round(average)).fill("☆").join("")}</span>
                <span>({reviews.length} Avis)</span>
              </div>
              <p className="availability">{product.stock > 0 ? "En Stock" : "Rupture"}</p>
              <div className="variant-selection">
                <label htmlFor="size">Taille :</label>
                <select
                  id="size"
                  className="select"
                  value={selectedVariant || ""}
                  onChange={(e) =>
                    setSelectedVariant(
                      filteredVariants.find((v) => v.taille === e.target.value)?.id || null
                    )
                  }
                >
                  <option value="">Choisir une taille</option>
                  {filteredVariants.map((variant) => (
                    <option key={variant.id} value={variant.taille}>
                      {variant.taille}
                    </option>
                  ))}
                </select>
              </div>
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantité :</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="color-selector">
                <label htmlFor="colorDropdown">Couleur :</label>
                <select id="colorDropdown" value={selectedColor} onChange={updateColorPoint} style={{ margin: "20px 0" }}>
                  <option value="gray">Choisir une couleur</option>
                  {product.variants
                    .map((v) => v.couleur)
                    .filter((c, i, arr) => arr.indexOf(c) === i)
                    .map((color) => (
                      <option key={color} value={color} style={{ backgroundColor: color }}>
                        {color}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="cart-summary" style={{ marginBottom: "10px" }}>
              <Link href="/panier" className="view-cart-btn">
                Voir mon panier
              </Link>
            </div>
            <div id="description" className="tab-content">
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
                <br />
                <Link href="/connexion_client">
                  <i className="fas fa-heart" style={{ color: "rgba(255, 166, 0, 0.959)", margin: "3px" }}></i>{" "}
                  Ajouter à la Liste de Souhaits
                </Link>
                <br />
                <Link href="/retour-remboursement">
                  <i className="fas fa-check-circle" style={{ color: "rgba(255, 166, 0, 0.959)", margin: "3px" }}></i>{" "}
                  Retour***
                </Link>
                <br />
                <Link
                  href="/livraison"
                  style={{ border: "1px solid rgb(161, 0, 0)", borderRadius: "25px", padding: "3px" }}
                >
                  <i className="fas fa-truck" style={{ color: "rgba(255, 166, 0, 0.959)" }}></i> Service de livraison
                </Link>
                <br />
                <Link href="#fiche-technique1">
                  <i className="fas fa-file-alt" style={{ color: "rgba(255, 166, 0, 0.959)" }}></i> Fiche Technique
                </Link>
              </div>
              <div className="shipping-estimate">
                <label htmlFor="postalCode">Estimer les frais de livraison :</label>
                <input type="text" id="postalCode" name="postalCode" placeholder="Code Postal" />
                <button id="estimateBtn">Estimer</button>
              </div>
              <div id="estimatedCost"></div>
            </div>
            <div className="buttons">
              <AjoutPanier
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.prix_reduit || product.prix_normal,
                  variant: selectedVariant || product.variants[0]?.id,
                }}
              />
              <button className="buy-now">
                <i className="fas fa-cart-plus" id="fas"></i> Acheter maintenant
              </button>
            </div>
            <div className="share">
              <span>Partager :</span>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-tiktok"></i> Tiktok
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </div>
          </div>
        </div>
      </main>

      <div style={{ border: "2px solid #999", width: "100%" }}></div>

      <div className="fiche-technique">
        <h4 id="fiche-technique1" style={{ color: "#e67e22", textAlign: "center", borderTop: "4px double #bb9f00", borderRadius: "25px" }}>
          *** Détails ***
        </h4>
        <div className="header1">
          <h3>{product.name}</h3>
          <p className="reference">Référence : {product.id}</p>
          <p className="disponibilite">
            Disponibilité : <span className="en-stock">{product.stock > 0 ? "En Stock" : "Rupture"}</span>
          </p>
        </div>

        <section className="media-produit">
          <div className="image-galerie">
            {product.media?.images.slice(0, 3).map((img) => (
              <img key={img} src={img || "/Photo/default.jpg"} alt={`Vue ${img}`} />
            ))}
          </div>
          <div className="video-produit">
            {product.media?.video && (
              <video autoPlay loop muted className="hidden-controls">
                <source src={product.media.video} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéo.
              </video>
            )}
          </div>
        </section>

        <section className="details-produit">
          <h2>Description</h2>
          <p>{product.description}</p>
          <h3>Caractéristiques</h3>
          <ul>
            {Object.entries(product.caracteristiques).map(([key, value]) => (
              <li key={key}>
                <strong>{key} :</strong> {value}
              </li>
            ))}
          </ul>
          <h3>Certifications</h3>
          <ul>
            <li><strong>Conformité CE :</strong> Certifié CE</li>
            <li><strong>RoHS :</strong> Conforme aux normes RoHS</li>
            <li><strong>ISO 9001 :</strong> Certifié ISO 9001</li>
          </ul>
          <h3>Options et Prix</h3>
          <p>
            <strong>Prix :</strong> <span className="prix-original">{product.prix_normal} FCF</span>{" "}
            {product.prix_reduit && <span className="prix-reduit">{product.prix_reduit} FCF</span>}
          </p>
          <p>
            <strong>Couleurs disponibles :</strong>{" "}
            {product.variants.map((v) => v.couleur).join(", ")}
          </p>
        </section>

        <section className="avis-clients">
          <h2>Avis Clients</h2>
          {reviews.slice(0, 2).map((review) => (
            <div className="avis" key={review.id}>
              <p><strong>{review.user} :</strong>&quot;&quot;{review.commentaire}&quot;&quot;</p>
              <p style={{ color: "orange" }}>
                <strong>Note :</strong> {Array(review.note).fill("★").join("")}{Array(5 - review.note).fill("☆").join("")}
              </p>
            </div>
          ))}
          {reviews.length === 0 && <p>Aucun avis pour ce produit.</p>}
        </section>

        <footer className="contact">
          <p>Pour plus d&quot; informations : Professionnel-BOOLi.com</p>
        </footer>
      </div>

      <section className="produ-grid col-12 px-4" id="greatmarket">
        <div className="col-12 text-center">
          <h3>Fournisseurs</h3>
        </div>
        <div className="boutiques">{/* Ajout de boutique */}</div>
        <Link href="#" className="View_more">
          Voir plus
        </Link>
      </section>
    </>
  );
};

export default CommercialProduitDetail;