import Link from 'next/link';

interface Doctor {
  id: number;
  specialty: string;
  description: string;
  linkText: string;
}

const initialDoctors: Doctor[] = [
  { id: 1, specialty: "Cosmétiques", description: "Pharmacies Cosmétiques disponibles des produits d'ygiènes corporelle.", linkText: "Dr Spécialiste" },
  { id: 2, specialty: "Vitamines", description: "Vitamines à base des plantes naturels très éfficace.", linkText: "Dr Spécialiste" },
  { id: 3, specialty: "Fatigue Générale", description: "Nous vous offrons des produits à base des plantes très éfficace", linkText: "Dr Spécialiste" },
  { id: 4, specialty: "Règle Douleureuse", description: "Suivez des spécialistes pour taire votre mal depuis votre pays", linkText: "Dr Spécialiste" }
];

// Simulate more data
const doctors: Doctor[] = [];
initialDoctors.forEach((doctor) => {
  doctors.push(doctor);
  });
;

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  return (
    <div className="pharmacy">
      <h3>{doctor.specialty}</h3>
      <p>{doctor.description}</p>
      <Link href="/contact">
        {doctor.linkText}
      </Link>
    </div>
  );
};

const DoctorsSection: React.FC = () => {
  return (
    <section id="pharmacies">
      <h4 className="h4-text text-center">Pharmacies des spécialistes</h4>
      <div className="pharmacy-grid">
        {doctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </section>
  );
};

export default DoctorsSection;