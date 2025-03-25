// page.tsx

import React from 'react';
import CommercialProduitDetail from '@/components/CommercialProductDetails';
import Header from '@/components/layout/listing/Header';
import Footer from '@/components/layout/static/Footer';
// Ce composant est une page vide pour éviter l'erreur "No module"
const Page = () => {
  return (
    <>
    <Header/>
      <CommercialProduitDetail/>
    <Footer/>
    </>
  );
};

export default Page;
