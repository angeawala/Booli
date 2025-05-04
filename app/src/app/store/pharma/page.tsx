'use client';
import ProductList from './ProductList';
import DoctorsSection from './DoctorsSection';
import TopHeader from '@/components/layout/listing/TopHeader';
import Footer from '@/components/Footer';
import '@/styles/css/library.css';

const PharmaPage: React.FC = () => {
  return (
    <>
    <TopHeader/>
      <ProductList />
    <Footer/>
    </>
  );
};

export default PharmaPage;