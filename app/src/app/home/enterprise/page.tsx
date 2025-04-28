import Image from 'next/image';
import Header from '@/components/layout/listing/Header';
import TopHeader from '@/components/layout/listing/TopHeader';
import Footer from '@/components/layout/listing/Footer';

const EnterprisePage = () => {
  return (
    <>
    <TopHeader/>
    <Header/>
    <section>
      <section id="heder" className="mt-4 text-center">
        <h4>
          *------- <strong className="bv">"BOOLi-STORE"</strong> TECHNOLOGIE D'INNOVATION AFRICAINE-----*
        </h4>
      </section>

      <section className="services1 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="service1 bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/Photo/booli.png" alt="Service 1" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold" style={{ color: 'tomato' }}>BOOLi-STORE.world</h3>
          <p>Entreprise de digitalisation, d'Innovation et de promotion des entreprises locaux.</p>
        </div>
        <div className="service1 bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/media/surprise1.jpg" alt="Service 2" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold" style={{ color: 'tomato' }}>Valeurs</h3>
          <p>Nous apportons une gamme sélectives d'opportinutées de croissances aux entreprises, marchands, ONG,...et aux personnes physiques.</p>
        </div>
        <div className="service1 bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/Photo/surprise3.jpg" alt="Service 3" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold" style={{ color: 'tomato' }}>Que proposons-nous ?</h3>
          <p>Nous apportons une multitude de solutions numérique en afrique dans le cadre éducatif, commercial, accompagnement des PME, Et bien d'autres secteurs.</p>
        </div>
      </section>

      <section className="services1 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="service1 bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/media/connexionR3.jpg" alt="Service 1" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold" style={{ color: 'tomato' }}>Caneaux</h3>
          <p>A travers nos sites web nous apportons des solutions inoventes dans de nombreux secteurs en Afrique.</p>
        </div>
        <div className="service1 bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/media/fournisseur.png" alt="Service 2" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold" style={{ color: 'tomato' }}>Qui sont nos partenaires ?</h3>
          <p>Découvrez nos partenaires en vous connectant au site.</p>
        </div>
        <div className="service1 bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/Photo/fond_quiz.jpg" alt="Service 3" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold" style={{ color: 'tomato' }}>Vision</h3>
          <p>Apporter des solutions numérique plus adaptés aux réalités Africaines.</p>
        </div>
      </section>

      <section className="services1 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="service1 bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/media/Fond1.png" alt="Service 1" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold" style={{ color: 'tomato' }}>--- Offres International ---</h3>
          <p>Des opportinutées exclusivements en afrique ! De la matiere première aux produits finaux.</p>
        </div>
        <div className="service1 bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/media/Bam.png" alt="Service 2" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold" style={{ color: 'tomato' }}>--- Services ---</h3>
          <p>Découvrez nos solutions uniques, le meilleur chez vous !.</p>
        </div>
        <div className="service1 bg-white shadow-lg rounded-lg p-4 text-center">
          <Image src="/media/aide.png" alt="Service 3" width={300} height={200} className="w-full h-auto" />
          <h3 className="text-xl font-bold" style={{ color: 'tomato' }}>Nos Urgences !</h3>
          <p>Fidélisation***Sécurité***Qualiter---Et nous vous laissons profiter.</p>
        </div>
      </section>
    </section>
    <Footer/>
    </>
  );
};

export default EnterprisePage;