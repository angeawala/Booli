import React from "react";
import { useNonTechCategories } from "@/hooks/useNonTechCategories";

const NonTechCategories: React.FC = () => {
  const { nonTechCategories, loading, error } = useNonTechCategories();

  return (
    <section className="comm">
      <div className="titre col-12-mt-4 text-center">
        <h3 className="hddi">@---- Catégories ----@</h3>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>Erreur : {error}</p>
      ) : (
        <>
          {/* Section-categorie 1 */}
          <section className="dh col-12">
            <div className="produc-grid">
              {nonTechCategories.slice(0, 3).map((category) => (
                <div className="product-iteme" key={category.id}>
                  <div className="image-containe">
                    <a className="price-link" href={`/product/filtre?types=categoryid=${category.id}`} target="_blank">
                      <img
                        className="produc-image"
                        id={`product${nonTechCategories.indexOf(category) + 1}`}
                        src={category.image || "/Photo/default.jpg"}
                        alt={category.name}
                      />
                      <div className="overlay-text">{category.name}</div>
                    </a>
                  </div>
                  <span className="lien">{category.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section-categorie 2 */}
          <section className="dh col-12">
            <div className="produc-grid">
              {nonTechCategories.slice(3, 6).map((category) => (
                <div className="product-iteme" key={category.id}>
                  <div className="image-containe">
                    <a className="price-link" href={`/product/filtre?types=categoryid=${category.id}`} target="_blank">
                      <img
                        className="produc-image"
                        id={`product${nonTechCategories.indexOf(category) - 2}`}
                        src={category.image || "/Photo/default.jpg"}
                        alt={category.name}
                      />
                      <div className="overlay-text">{category.name}</div>
                    </a>
                  </div>
                  <span className="lien">{category.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section-categorie 3 */}
          <section className="dh col-12">
            <div className="produc-grid">
              {nonTechCategories.slice(6, 9).map((category) => (
                <div className="product-iteme" key={category.id}>
                  <div className="image-containe">
                    <a className="price-link" href={`/product/filtre?types=categoryid=${category.id}`} target="_blank">
                      <img
                        className="produc-image"
                        id={`product${nonTechCategories.indexOf(category) - 5}`}
                        src={category.image || "/Photo/default.jpg"}
                        alt={category.name}
                      />
                      <div className="overlay-text">{category.name}</div>
                    </a>
                  </div>
                  <span className="lien">{category.name}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </section>
  );
};

export default NonTechCategories;