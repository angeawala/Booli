'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Itinerary, Bus } from '@/app/data';

interface Seat {
  id: string;
  available: boolean;
}

interface Reservation {
  itineraryId: string;
  seatId: string;
  departure: string;
  destination: string;
  price: number;
  company: string;
}

// Simulated backend data (subset for demonstration)
const itineraries: Itinerary[] = [
  {
    id: '1-1',
    busId: '1-1',
    stops: [
      { city: 'Cotonou', time: '08:00' },
      { city: 'Porto-Novo', time: '09:30' },
      { city: 'Parakou', time: '12:00' }
    ],
    duration: '4h 0min',
    price: 5000,
    availableSeats: 20,
    image: '/Photo/v2.jpg'
  },
  {
    id: '2-1',
    busId: '2-1',
    stops: [
      { city: 'Natitingou', time: '09:00' },
      { city: 'Djougou', time: '10:30' },
      { city: 'Bohicon', time: '13:00' }
    ],
    duration: '4h 0min',
    price: 4000,
    availableSeats: 15,
    image: '/Photo/bus.jpg'
  },
  // Invalid itinerary for testing
  {
    id: '3-1',
    busId: '3-1',
    stops: [
      { city: 'Ouidah', time: '10:00' },
      { city: 'Lokossa', time: '11:30' }
    ],
    duration: '1h 30min',
    price: 2000,
    availableSeats: 10,
    image: '/Photo/v2.jpg'
  }
];

const buses: Bus[] = [
  {
    id: '1-1',
    company: 'BAOBAB-EXPRESS',
    totalSeats: 30,
    features: ['WiFi intégré', 'Climatisé', 'Sièges inclinables']
  },
  {
    id: '2-1',
    company: 'ATT-EXPRESS',
    totalSeats: 25,
    features: ['Climatisé', 'Télévision intégrée']
  }
  // No bus for busId '3-1' to simulate verification failure
];

const BusReservation: React.FC<{ busId: string }> = ({ busId }) => {
  const router = useRouter();

  // Verification logic
  const itinerary = itineraries.find((it) => it.id === busId);
  const bus = itinerary ? buses.find((b) => b.id === itinerary.busId) : null;

  if (!itinerary || !bus) {
    console.error(`Itinerary or bus not found for ID: ${busId}`);
    console.log('Available Itinerary IDs:', itineraries.map((it) => it.id));
    console.log('Available Bus IDs:', buses.map((b) => b.id));
    return (
      <div className="alert alert-danger text-center m-3">
        Itinéraire ou bus non trouvé pour l'ID {busId}
      </div>
    );
  }

  const totalSeats = bus.totalSeats;
  const availableSeats = itinerary.availableSeats;
  const unavailableSeats = totalSeats - availableSeats;

  const seats: Seat[] = Array.from({ length: totalSeats }, (_, index) => ({
    id: `${index + 1}`,
    available: index >= unavailableSeats,
  }));

  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const handleSeatClick = (seatId: string, available: boolean) => {
    if (available) {
      setSelectedSeat(seatId);
    }
  };

  const handleProceed = () => {
    if (selectedSeat) {
      const reservation: Reservation = {
        itineraryId: itinerary.id,
        seatId: selectedSeat,
        departure: itinerary.stops[0].city,
        destination: itinerary.stops[itinerary.stops.length - 1].city,
        price: itinerary.price,
        company: bus.company,
      };
      localStorage.setItem('reservation', JSON.stringify(reservation));
      router.push('/reservation/payment');
    }
  };

  const currentTime = new Date('2025-04-21T12:00:00');
  const departureTime = new Date(`2025-04-21T${itinerary.stops[0].time}:00`);
  const hasStarted = currentTime >= departureTime;

  const stopsWithStatus = itinerary.stops.map((stop) => {
    const stopTime = new Date(`2025-04-21T${stop.time}:00`);
    return {
      ...stop,
      isFuture: stopTime > currentTime,
    };
  });

  return (
    <div className="container my-4">
      <h2 className="mb-4">Sélectionnez votre siège</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{bus.company}</h5>
          <img src={itinerary.image} alt={bus.company} className="w-full h-48 object-cover mb-3 rounded" />
          <p className="card-text">
            <i className="fas fa-route me-2"></i>
            Itinéraire: {itinerary.stops[0].city} → {itinerary.stops[itinerary.stops.length - 1].city}
          </p>
          <p className="card-text">
            <i className="fas fa-money-bill-wave me-2"></i>
            Prix: {itinerary.price} FCFA
          </p>
          <p className="card-text">
            <i className="fas fa-clock me-2"></i>
            Durée: {itinerary.duration}
          </p>
          <p className="card-text">
            <i className="fas fa-info-circle me-2"></i>
            Caractéristiques: {bus.features.join(', ')}
          </p>
          <p className="card-text">
            <i className="fas fa-chair me-2"></i>
            Places disponibles: {availableSeats}/{totalSeats}
          </p>
          <p className="card-text">
            <i className="fas fa-clock me-2"></i>
            Statut: {hasStarted ? 'Le bus a déjà démarré' : 'Le bus n’a pas encore démarré'}
          </p>
        </div>
      </div>

      <h4 className="mb-3">Itinéraire complet</h4>
      <ul className="list-group mb-4">
        {stopsWithStatus.map((stop, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              stop.isFuture ? 'list-group-item-success' : 'list-group-item-secondary'
            }`}
          >
            <span>
              <i className={`fas fa-map-marker-alt me-2 ${stop.isFuture ? 'text-success' : 'text-muted'}`}></i>
              {stop.city}
            </span>
            <span>{stop.time}</span>
          </li>
        ))}
      </ul>

      <h4 className="mb-3">Disposition des sièges</h4>
      <div className="row row-cols-4 g-3 mb-4">
        {seats.map((seat) => (
          <div key={seat.id} className="col">
            <button
              className={`btn w-100 ${seat.available ? 'btn-success' : 'btn-danger'} ${
                selectedSeat === seat.id ? 'border-primary border-3' : ''
              }`}
              disabled={!seat.available}
              onClick={() => handleSeatClick(seat.id, seat.available)}
            >
              <i className="fas fa-chair me-1"></i> {seat.id}
            </button>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button
          className="play-button btn btn-primary btn-lg"
          onClick={handleProceed}
          disabled={!selectedSeat}
        >
          <i className="fas fa-credit-card me-2"></i> Procéder au paiement
        </button>
        <Link href="/reservation/bus">
          <button className="play-button btn btn-danger btn-lg">
            <i className="fas fa-times me-2"></i> Annuler
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BusReservation;