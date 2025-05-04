
import { Suspense } from 'react';
import { Itinerary, cities, itineraries, buses, countries } from '../../data';
import ReservationContent from './ReservationContent';

export default function BusReservationPage() {
  return (
    <Suspense fallback={<div>Chargement des paramètres de recherche...</div>}>
      <ReservationContent />
    </Suspense>
  );
}
