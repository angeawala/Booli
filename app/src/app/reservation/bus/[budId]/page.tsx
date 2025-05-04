'use client';
import BusReservation from './BusReservation';

export default async function BusReservationPage({ params }: { params: Promise<{ busId: string }> }) {
  const { busId } = await params; // Await the params Promise
  return (
    <div className="container mx-auto p-4">
      <BusReservation busId={busId} />
    </div>
  );
}