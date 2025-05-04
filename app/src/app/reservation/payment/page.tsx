// app/reservation/payment/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Payment() {
  const router = useRouter();
  const [reservation, setReservation] = useState<any>(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [policyAccepted, setPolicyAccepted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('reservation');
    if (stored) {
      setReservation(JSON.parse(stored));
    } else {
      router.push('/reservation/bus');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (policyAccepted) {
      setTimeout(() => {
        localStorage.removeItem('reservation');
        router.push('/reservation/bus?success=true');
      }, 1000);
    }
  };

  if (!reservation) return <div className="loading-container" id="loading"><div className="bar"></div><div className="bar"></div><div className="bar"></div></div>;

  return (
    <div className="img-connexion">
      <link rel="stylesheet" href="/css/style.css" />
      <h1 className="Logo">BOOLi-STORE.world</h1>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-6 bg-white rounded-5 cadre">
            <h2 className="mx-0 mt-3 mb-3 connex1">*** RESERVATION-EXPRESS ***</h2>
            <p className="text-center mb-5 entete2">Vivez pleines d'opportunités !</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control border-2 shadow-none custom-input"
                  placeholder="Entrez votre nom et prénom"
                  required
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  value={reservation.departure}
                  disabled
                  className="form-control border-2 shadow-none custom-input"
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  value={reservation.destination}
                  disabled
                  className="form-control border-2 shadow-none custom-input"
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="form-control border-2 shadow-none custom-input"
                  placeholder="Entrez votre contact"
                  required
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="checkbox"
                  id="policy"
                  checked={policyAccepted}
                  onChange={(e) => setPolicyAccepted(e.target.checked)}
                />
                <label htmlFor="policy" id="policy">
                  J'accepte la <a href="#">Confidence</a>
                </label>
              </div>
              <div className="d-block text-center mb-2">
                <button
                  type="submit"
                  className="btn btn-lg text-white connex"
                  disabled={!policyAccepted}
                >
                  PAYER {reservation.price} FCFA
                </button>
              </div>
              <div className="d-block text-center">
                <Link href="/reservation/bus">
                  <button type="button" className="btn btn-lg text-white connex">
                    Annuler
                  </button>
                </Link>
              </div>
              <div className="d-block text-center">
                <button className="btn">
                  <i className="fas fa-phone-alt"></i> Appeler directement l'entreprise
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}