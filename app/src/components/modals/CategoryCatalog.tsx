import React, { useState } from "react";
import { useSubCategories } from "@/hooks/useSubCategories";

const CategoryCatalog: React.FC = () => {
  const { subCategories, loading, error } = useSubCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <section className="cathalogues">
      <div className="catha row col-12">
        <div className="arti col-sm-4">
          <div className="catalog-icon" onClick={toggleModal}>
            <i className="fas fa-bars" style={{ fontSize: "2em", marginTop: "10px", color: "#004353" }}></i>
            <span className="catalog-text animate4">Catalogues</span>
          </div>

          {isModalOpen && (
            <div className="modal" style={{ display: "block" }}>
              <div className="modal-content">
                <span className="close-button" onClick={toggleModal}>×</span>
                <h2>CATALOGUES</h2>
                {loading ? (
                  <p>Chargement...</p>
                ) : error ? (
                  <p>Erreur : {error}</p>
                ) : (
                  <ul className="catalog-list">
                    {subCategories.map((subCat) => (
                      <li key={subCat.id}>
                        <a href={`/product/filter?subcategory_id=${subCat.id}`} target="_blank">
                          <img src={subCat.image || "/Photo/default.jpg"} alt={subCat.name} />
                          <span>{subCat.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="plus col-sm-6">
          <div className="most-searched-products">
            <h5>Rechercher(+):</h5>
            <div className="product col-sm-1">
              <a href="services.html" target="_blank">Services</a>
            </div>
            <div className="product col-sm-1">
              <a href="filtre.html" target="_blank">Vêtements</a>
            </div>
            <div className="product col-sm-1">
              <a href="filtre.html" target="_blank">TIC</a>
            </div>
          </div>
        </div>

        <div className="download col-sm-2 mt-3">
          <a href="#" target="_blank">
            <i className="fas fa-download"></i> Télécharger l’Application
          </a>
        </div>
      </div>
    </section>
  );
};

export default CategoryCatalog;