"use client";

import React from "react";
import Link from "next/link";

// Interface pour un produit en promotion
interface Promotion {
  id: string;
  product: {
    id: string;
    name: string;
    image: string;
  };
  oldPrice: string;
  newPrice: string;
  discountPercentage: number;
  dataTime: number | null; // Pour les minuteries
}

const promotions: Promotion[] = [
  {
    id: "promo1",
    product: { id: "montres_aluu", name: "Montres aluu.", image: "/Photo/hyy.jpg" },
    oldPrice: "8000 CFA",
    newPrice: "6000 CFA",
    discountPercentage: 85,
    dataTime: null,
  },
  {
    id: "promo2",
    product: { id: "montres_dd", name: "Montres dd.", image: "/Photo/hyy1.jpg" },
    oldPrice: "25000 CFA",
    newPrice: "15000 CFA",
    discountPercentage: 85,
    dataTime: null,
  },
  {
    id: "promo3",
    product: { id: "montres_cd", name: "Montres cd.", image: "/Photo/hyy2.jpg" },
    oldPrice: "24000 CFA",
    newPrice: "22000 CFA",
    discountPercentage: 85,
    dataTime: null,
  },
  {
    id: "promo4",
    product: { id: "vestes_pcrp", name: "Vestes - PCRP", image: "/Photo/hy.jpg" },
    oldPrice: "32000 CFA",
    newPrice: "29000 CFA",
    discountPercentage: 85,
    dataTime: null,
  },
  {
    id: "promo5",
    product: { id: "montres_pxd", name: "Montres - PXD", image: "/Photo/hoo.jpg" },
    oldPrice: "40000 CFA",
    newPrice: "42000 CFA",
    discountPercentage: 85,
    dataTime: 7200, // Après le 5e produit
  },
  {
    id: "promo6",
    product: { id: "cuisiniere_gaz", name: "Cuisinière à Gaz", image: "/Photo/cuisiniere1.jpeg" },
    oldPrice: "350000 CFA",
    newPrice: "342000 CFA",
    discountPercentage: 85,
    dataTime: null,
  },
  {
    id: "promo7",
    product: { id: "bague", name: "Bague", image: "/Photo/bague2.jpeg" },
    oldPrice: "98325 CFA", // €150.00 * 655
    newPrice: "78660 CFA", // €120.00 * 655
    discountPercentage: 85,
    dataTime: null,
  },
  {
    id: "promo8",
    product: { id: "thermos", name: "Thermos", image: "/Photo/thermose.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 85,
    dataTime: null,
  },
  {
    id: "promo9",
    product: { id: "pagne", name: "Pagne", image: "/Photo/pagne1.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 85,
    dataTime: null,
  },
  {
    id: "promo10",
    product: { id: "matelas", name: "Matelas", image: "/Photo/matela1.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 85,
    dataTime: 14400, // Après le 10e produit
  },
  {
    id: "promo11",
    product: { id: "mode", name: "Mode", image: "/Photo/moede1.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 45,
    dataTime: null,
  },
  {
    id: "promo12",
    product: { id: "fournitures", name: "Fournitures", image: "/Photo/fourniture1.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 45,
    dataTime: null,
  },
  {
    id: "promo13",
    product: { id: "voiture", name: "Voiture", image: "/Photo/voiture.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 45,
    dataTime: null,
  },
  {
    id: "promo14",
    product: { id: "casque", name: "Casque Audio", image: "/Photo/casque_oreil.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 45,
    dataTime: null,
  },
  {
    id: "promo15",
    product: { id: "ssd", name: "SSD", image: "/Photo/ssd.png" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 45,
    dataTime: 21600, // Après le 15e produit
  },
  {
    id: "promo16",
    product: { id: "perruque", name: "Perruque", image: "/Photo/perruque.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 25,
    dataTime: null,
  },
  {
    id: "promo17",
    product: { id: "kit_solaire", name: "Kit Solaire", image: "/Photo/kit_solaire.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 25,
    dataTime: null,
  },
  {
    id: "promo18",
    product: { id: "chaise_electrique", name: "Chaise Électrique", image: "/Photo/chaise_electrique.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 25,
    dataTime: null,
  },
  {
    id: "promo19",
    product: { id: "casseroles", name: "Casseroles", image: "/Photo/casserol.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 25,
    dataTime: null,
  },
  {
    id: "promo20",
    product: { id: "meuble", name: "Meuble", image: "/Photo/meuble.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 25,
    dataTime: 28800, // Après le 20e produit
  },
  {
    id: "promo21",
    product: { id: "camera", name: "Caméra", image: "/Photo/camera.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 20,
    dataTime: null,
  },
  {
    id: "promo22",
    product: { id: "wifi", name: "Routeur WiFi", image: "/Photo/wifi.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 20,
    dataTime: null,
  },
  {
    id: "promo23",
    product: { id: "tenue_electricien", name: "Tenue d'Électricien", image: "/Photo/tenu_electricien.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 20,
    dataTime: null,
  },
  {
    id: "promo24",
    product: { id: "couches_bebe", name: "Couches Bébé", image: "/Photo/couche_bébé.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 20,
    dataTime: null,
  },
  {
    id: "promo25",
    product: { id: "chaussures", name: "Chaussures", image: "/Photo/choose.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 20,
    dataTime: 30200, // Après le 25e produit
  },
  {
    id: "promo26",
    product: { id: "peinture", name: "Peinture", image: "/Photo/peinture.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 20,
    dataTime: null,
  },
  {
    id: "promo27",
    product: { id: "bibliotheque", name: "Bibliothèque", image: "/Photo/biblio.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 20,
    dataTime: null,
  },
  {
    id: "promo28",
    product: { id: "matiere_premiere", name: "Matière Première", image: "/Photo/matiere_premiere.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 20,
    dataTime: null,
  },
  {
    id: "promo29",
    product: { id: "robe_mariage", name: "Robe de Mariage", image: "/Photo/mariage_robe.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 20,
    dataTime: null,
  },
  {
    id: "promo30",
    product: { id: "ecouteurs", name: "Écouteurs", image: "/Photo/ecouteur.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 20,
    dataTime: 43200, // Après le 30e produit
  },
  {
    id: "promo31",
    product: { id: "mallette", name: "Mallette", image: "/Photo/maalette.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 30,
    dataTime: null,
  },
  {
    id: "promo32",
    product: { id: "sac_a_dos", name: "Sac à Dos", image: "/Photo/sac_a_dos.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 30,
    dataTime: null,
  },
  {
    id: "promo33",
    product: { id: "sac_a_main", name: "Sac à Main", image: "/Photo/sac_a_main.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 30,
    dataTime: null,
  },
  {
    id: "promo34",
    product: { id: "usb", name: "Clé USB", image: "/Photo/usb.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 30,
    dataTime: null,
  },
  {
    id: "promo35",
    product: { id: "souris", name: "Souris", image: "/Photo/souris.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 30,
    dataTime: null, // Minuterie implicite après le 35e produit
  },
  {
    id: "promo36",
    product: { id: "montres_nova", name: "Montres Nova", image: "/Photo/hyy.jpg" },
    oldPrice: "20000 CFA",
    newPrice: "18000 CFA",
    discountPercentage: 30,
    dataTime: null,
  },
  {
    id: "promo37",
    product: { id: "vestes_luxe", name: "Vestes Luxe", image: "/Photo/hy.jpg" },
    oldPrice: "35000 CFA",
    newPrice: "32000 CFA",
    discountPercentage: 30,
    dataTime: null,
  },
  {
    id: "promo38",
    product: { id: "bague_diamant", name: "Bague Diamant", image: "/Photo/bague2.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 30,
    dataTime: null,
  },
  {
    id: "promo39",
    product: { id: "casque_pro", name: "Casque Pro", image: "/Photo/casque_oreil.jpeg" },
    oldPrice: "98325 CFA",
    newPrice: "78660 CFA",
    discountPercentage: 30,
    dataTime: null,
  },
];

const PromotionSection: React.FC = () => {
  return (
    <section className="produ-grid col-12 px-4" id="Publicite">
      <div className="col-12 text-center">
        <h3 className="hddi hddi-responsive hddi-responsive-p">Profitez de nos meilleures offres</h3>
      </div>

      {promotions.map((promo, index) => (
        <React.Fragment key={promo.id}>
          {promo.dataTime && (
            <div className="barre-decompte">
              <p>Temps restant : Profitez-en !</p>
              <div className="minuteur" data-time={promo.dataTime}>
                01:00:00
              </div>
            </div>
          )}
          <div className="produ-iteme">
            <div className="image-contai">
              <div className="new-badge">-{promo.discountPercentage}% Profiter</div>
              <Link href={`/store/product/${promo.product.id}`} className="price-link">
                <img
                  className="produ-image"
                  id={`product-${promo.product.id}`}
                  src={promo.product.image}
                  alt={promo.product.name}
                />
              </Link>
            </div>
            <span className="old-price">{promo.oldPrice}</span>
            <span className="new-price">{promo.newPrice}</span>
            <br />
            <span className="lien">{promo.product.name}</span>
            <Link href={`/store/product/${promo.product.id}`} className="details">
              <i className="fas fa-info-circle"></i> Détails
            </Link>
            <button className="add-to-cart-btn">
              <i className="fas fa-cart-plus"></i> Ajouter au panier
            </button>
            <Link href="/store/filter" id="page_plus">
              Voir plus
            </Link>
          </div>
        </React.Fragment>
      ))}

      <div style={{ textAlign: "center" }}>
        <Link href="/store/promotions" className="View_more">
          Voir plus
        </Link>
      </div>
    </section>
  );
};

export default PromotionSection;