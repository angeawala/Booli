'use client';
import Link from 'next/link';

interface Agency {
  id: number;
  name: string;
  description: string;
  image: string;
  services: string;
  address: string;
  phone: string;
  hours: string;
  email: string;
  website: string;
}

const agencies: Agency[] = [
  {
    id: 1,
    name: 'Agence BSSD',
    description: 'Une agence spécialisée dans les voyages sur mesure.',
    image: '/Photo/bssd.png',
    services: 'Voyages personnalisés, circuits culturels, réservations',
    address: 'Rue Hubert MANGA de Parakou, Bénin',
    phone: '+229 01 00 00 00 00',
    hours: 'Lun-Sam : 8h-18h, Sam : 10h-19h',
    email: 'supportbssd@gmail.bj',
    website: 'https://example.com/horizon'
  },
  {
    id: 2,
    name: 'Agence HOPA',
    description: 'Experts en marketing digital et création de contenu.',
    image: '/Photo/hoopa.png',
    services: 'SEO, publicités, design graphique',
    address: 'Avenue Cathédrale Nati, Bénin',
    phone: '+229 01 00 00 00 00',
    hours: 'Lun-Sam : 8h30-17h30',
    email: 'supportjoopa@gmail.bj',
    website: 'https://example.com/nova'
  },
  {
    id: 3,
    name: 'Agence BESTY',
    description: 'Organisation d’événements mémorables.',
    image: '/Photo/besty.png',
    services: 'Mariages, séminaires, soirées privées',
    address: 'HOTEL KABA Nati, Bénin',
    phone: '+229 00 00 00 00',
    hours: 'Lun-Sam : 10h-19h',
    email: 'infobesty@gmail.bj',
    website: 'https://example.com/eclat'
  },
  {
    id: 4,
    name: 'Agence Horizon',
    description: 'Une agence spécialisée dans les voyages sur mesure.',
    image: 'https://via.placeholder.com/300x160',
    services: 'Voyages personnalisés, circuits culturels, réservations',
    address: '12 Rue des Étoiles, 75001 Paris',
    phone: '+33 1 23 45 67 89',
    hours: 'Lun-Ven : 9h-18h, Sam : 10h-14h',
    email: 'contact@agencehorizon.fr',
    website: 'https://example.com/horizon'
  },
  {
    id: 5,
    name: 'Agence Nova',
    description: 'Experts en marketing digital et création de contenu.',
    image: 'https://via.placeholder.com/300x160',
    services: 'SEO, publicités, design graphique',
    address: '45 Avenue Lumière, 69003 Lyon',
    phone: '+33 4 56 78 90 12',
    hours: 'Lun-Ven : 8h30-17h30',
    email: 'hello@agencenova.fr',
    website: 'https://example.com/nova'
  },
  {
    id: 6,
    name: 'Agence Éclat',
    description: 'Organisation d’événements mémorables.',
    image: 'https://via.placeholder.com/300x160',
    services: 'Mariages, séminaires, soirées privées',
    address: '8 Boulevard des Rêves, 33000 Bordeaux',
    phone: '+33 5 67 89 01 23',
    hours: 'Lun-Sam : 10h-19h',
    email: 'info@agenceeclat.fr',
    website: 'https://example.com/eclat'
  }
];

const AgencyPage: React.FC = () => {
  return (
    <section className="agencyprince pt-4">
      <style>
        {`
          .agencyprince {
            font-family: 'Verdana', sans-serif;
            background: linear-gradient(45deg, #2d132c 0%, #801336 100%);
            padding-bottom: 2rem;
          }
          .agence {
            max-width: 1300px;
            margin: 0 auto;
            text-align: center;
            padding: 0 1rem;
          }
          .agence h1 {
            font-size: 2.8em;
            color: #f9c74f;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 0 15px rgba(249, 199, 79, 0.7);
            margin-bottom: 10px;
          }
          .agency-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
          }
          .agency-card {
            position: relative;
            background: #1a1a2e;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
            overflow: hidden;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
          }
          .agency-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 24px rgba(249, 199, 79, 0.3);
          }
          .agency-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(120deg, transparent, rgba(249, 199, 79, 0.2), transparent);
            animation: shine 3s infinite;
            pointer-events: none;
          }
          @keyframes shine {
            0% { transform: translateX(-100%); }
            20% { transform: translateX(100%); }
            100% { transform: translateX(100%); }
          }
          .agency-card img {
            width: 100%;
            height: 160px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 2px solid #f9c74f;
          }
          .agency-card h2 {
            font-size: 1.7em;
            color: #90e0ef;
            margin-bottom: 15px;
            text-shadow: 0 0 5px #90e0ef;
          }
          .agency-card .description {
            font-size: 0.95em;
            color: #d8d8d8;
            margin-bottom: 20px;
          }
          .agency-card .detail {
            font-size: 0.9em;
            color: #f4f4f4;
            text-align: left;
            margin-bottom: 20px;
            line-height: 1.5;
          }
          .agency-card .detail strong {
            color: #f9c74f;
          }
          .agency-card .btn {
            display: inline-block;
            padding: 10px 20px;
            background: linear-gradient(90deg, #90e0ef, #f9c74f);
            color: #1a1a2e;
            text-decoration: none;
            border-radius: 20px;
            font-weight: bold;
            transition: all 0.3s ease;
          }
          .agency-card .btn:hover {
            background: linear-gradient(90deg, #f9c74f, #90e0ef);
            transform: scale(1.05);
            box-shadow: 0 5px 10px rgba(144, 224, 239, 0.5);
          }
          .more-link {
            float: right;
            font-size: 14px;
            color: #fffcfc;
            font-weight: 600;
            text-decoration: none;
            position: absolute;
            z-index: 2;
            display: flex;
            text-align: right;
            border: 2px solid #fff;
            border-radius: 5px;
            box-shadow: 0px 10px 8px #1a1a2e80;
            padding: 6px;
            background-color: #2d132c;
            right: 1rem;
            top: 1rem;
          }
          .more-link:hover {
            text-decoration: none;
            background-color: #f9c74f;
            color: #ec5700;
          }
        `}
      </style>
      <div className="agence pt-2">
        <h1>Experts (Entreprises, Agences, ONG...)</h1>
        <Link href="#" className="more-link">
          Afficher plus d'entreprise →
        </Link>
        <div className="agency-grid">
          {agencies.slice(0, 3).map((agency) => (
            <div key={agency.id} className="agency-card">
              <img src={agency.image} alt={agency.name} />
              <h2>{agency.name}</h2>
              <p className="description">{agency.description}</p>
              <div className="detail">
                <p><strong>Services :</strong> {agency.services}</p>
                <p><strong>Adresse :</strong> {agency.address}</p>
                <p><strong>Téléphone :</strong> {agency.phone}</p>
                <p><strong>Horaires :</strong> {agency.hours}</p>
                <p><strong>Email :</strong> {agency.email}</p>
              </div>
              <Link href={agency.website} className="btn">
                Visiter le Site
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="agence mt-4 mb-2">
        <div className="agency-grid">
          {agencies.slice(3).map((agency) => (
            <div key={agency.id} className="agency-card">
              <img src={agency.image} alt={agency.name} />
              <h2>{agency.name}</h2>
              <p className="description">{agency.description}</p>
              <div className="detail">
                <p><strong>Services :</strong> {agency.services}</p>
                <p><strong>Adresse :</strong> {agency.address}</p>
                <p><strong>Téléphone :</strong> {agency.phone}</p>
                <p><strong>Horaires :</strong> {agency.hours}</p>
                <p><strong>Email :</strong> {agency.email}</p>
              </div>
              <Link href={agency.website} className="btn">
                Visiter le Site
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgencyPage;