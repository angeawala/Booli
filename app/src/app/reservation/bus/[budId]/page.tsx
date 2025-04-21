// app/reservation/bus/[busId]/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { itineraries, buses, Itinerary } from '../../../data';
import Link from 'next/link';

export default function SeatSelection({ params }: { params: { busId: string } }) {
  const router = useRouter();
  const itinerary = itineraries.find((it) => it.id === params.busId);
  const bus = itinerary ? buses.find((b) => b.id === itinerary.busId) : null;

  if (!itinerary || !bus) {
    console.error(`Itinerary not found for ID: ${params.busId}`);
    console.log('Available Itinerary IDs:', itineraries.map((it) => it.id));
    return <div className="alert alert-danger text-center m-3">Itinéraire ou bus non trouvé</div>;
  }

  const totalSeats = bus.totalSeats;
  const availableSeats = itinerary.availableSeats;
  const unavailableSeats = totalSeats - availableSeats;

  const seats = Array.from({ length: totalSeats }, (_, index) => ({
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
      localStorage.setItem(
        'reservation',
        JSON.stringify({
          itineraryId: itinerary.id,
          seatId: selectedSeat,
          departure: itinerary.stops[0].city,
          destination: itinerary.stops[itinerary.stops.length - 1].city,
          price: itinerary.price,
          company: bus.company,
        })
      );
      router.push('/reservation/payment');
    }
  };

  const currentTime = new Date('2025-04-21T12:00:00');
  const departureTime = new Date(`2025-04-21T${itinerary.stops[0].time}:00`);
  const hasStarted = currentTime >= departureTime;

  const stopsWithStatus = itinerary.stops.map((stop, index) => {
    const stopTime = new Date(`2025-04-21T${stop.time}:00`);
    return {
      ...stop,
      isFuture: stopTime > currentTime,
    };
  });

  return (
    <div className="container my-4">
      <link rel="stylesheet" href="/Page_touristique/style3.css" />
      <h2 className="mb-4">Sélectionnez votre siège</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{bus.company}</h5>
          <p className="card-text">
            <i className="fas fa-route me-2"></i>
            Itinéraire: {itinerary.stops[0].city} → {itinerary.stops[itinerary.stops.length - 1].city}
          </p>
          <p className="card-text">
            <i className="fas fa-money-bill-wave me-2"></i>
            Prix: {itinerary.price} FCFA
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
}