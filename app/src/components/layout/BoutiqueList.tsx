'use client';

import Image from 'next/image';
import Link from 'next/link';

const BoutiqueSection = () => {
  return (
    <section className="produ-grid col-12 px-4 pixa" id="greatmarket1">
      <div className="col-12 text-center">
        <h3 className="hdde">Boutiques officielles</h3>
      </div>
      <div className="shopGrid">
        {shops.map((shop, index) => (
          <div className="shopCard" key={index}>
            <Image src={shop.image} alt={shop.alt} width={200} height={200} />
            <h3>{shop.title}</h3>
            <div className="detail1">
              {shop.details.map((detail, i) => (
                <p key={i}><strong>{detail.label} :</strong> {detail.value}</p>
              ))}
            </div>
            <span className="price">{shop.price}</span>
            <Link href="/boutique.html" className="shopButton">Visiter</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

const shops = [
  {
    image: '/Photo/fruit1',
    alt: 'Boutique fruit',
    title: 'Produits frais et naturel',
    details: [
      { label: 'Disponibilité', value: 'Sur commande / non conservale sur une longue période' },
      { label: 'Récolte', value: 'Varie selon le milieu' },
      { label: 'Avis', value: '4.8/5 (120 avis)' },
    ],
    price: 'Négociable',
  },
  {
    image: '/Photo/cereal1.jpg',
    alt: 'Boutique cereals',
    title: 'Céréales',
    details: [
      { label: 'Disponibilité', value: 'Sur commande / Conservale sur une longue période' },
      { label: 'Récolte', value: 'Varie selon le milieu' },
      { label: 'Avis', value: '4.8/4 (110 avis)' },
    ],
    price: 'Négociable',
  },
  {
    image: '/Photo/légume1.jpg',
    alt: 'Boutique Légumes',
    title: 'Légumes & épiceries',
    details: [
      { label: 'Disponibilité', value: 'Sur commande / non conservale sur une longue période' },
      { label: 'Récolte', value: 'Varie selon le milieu' },
      { label: 'Avis', value: '4.2/3 (130 avis)' },
    ],
    price: 'Négociable',
  },
  // Ajoute les autres boutiques ici...
];

export default BoutiqueSection;
