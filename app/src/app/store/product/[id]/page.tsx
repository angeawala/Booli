
import CommercialProductDetails from './CommercialProductDetails';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/layout/listing/Header';
import TopHeader from '@/components/layout/listing/TopHeader';
import CategoryCatalog from '@/components/modals/CategoryCatalog';
import AgencySection from '@/components/layout/section/commercial/AgencySection';
import Footer from '@/components/layout/listing/Footer';
export default function TestPage() {
  return (
    <div>
        <TopHeader/>
      <Header/>
      <CategoryCatalog/>
      <CommercialProductDetails />
      <ToastContainer position="top-right" autoClose={3000} />
      <AgencySection/>
      <Footer/>
    </div>
  );
}
