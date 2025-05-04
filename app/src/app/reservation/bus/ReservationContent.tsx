
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cities, itineraries, buses, countries, Itinerary } from '../../data';
import '@/styles/css/style3-2.css';
import '@/styles/css/abonné.css';
import '@/styles/css/library.css';

export default function ReservationContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const [country, setCountry] = useState('Benin');
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filteredItineraries, setFilteredItineraries] = useState<Itinerary[]>(itineraries);
  const [showSort, setShowSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const availableCities = cities.filter((city) => city.country === country);
  const destinationCities = availableCities.filter((city) => city.name !== departureCity);

  useEffect(() => {
    let result = [...itineraries];
    if (country !== 'Benin') {
      result = [];
    } else if (departureCity && destinationCity) {
      result = itineraries
        .map((itinerary) => {
          const stopNames = itinerary.stops.map((stop) => stop.city);
          const departureIndex = stopNames.indexOf(departureCity);
          const destinationIndex = stopNames.indexOf(destinationCity);
          if (
            departureIndex !== -1 &&
            destinationIndex !== -1 &&
            departureIndex < destinationIndex
          ) {
            const segmentStops = destinationIndex - departureIndex;
            const segmentPrice = itinerary.price * (segmentStops / (itinerary.stops.length - 1));
            return { ...itinerary, price: Math.round(segmentPrice / 100) * 100 };
          }
          return null;
        })
        .filter((it) => it !== null) as Itinerary[];
    }

    if (sortBy === 'price') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'duration') {
      result.sort((a, b) => {
        const [aHours, aMinutes] = a.duration.split('h ').map((s) => parseInt(s));
        const [bHours, bMinutes] = b.duration.split('h ').map((s) => parseInt(s));
        const aTotal = aHours * 60 + aMinutes;
        const bTotal = bHours * 60 + bMinutes;
        return aTotal - bTotal;
      });
    } else if (sortBy === 'seats') {
      result.sort((a, b) => b.availableSeats - a.availableSeats);
    }

    setFilteredItineraries(result);
    setCurrentPage(1);
    console.log('Filtered Itineraries:', result);
  }, [country, departureCity, destinationCity, sortBy]);

  const totalPages = Math.ceil(filteredItineraries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItineraries = filteredItineraries.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <link rel="stylesheet" href="/Page_touristique/style3.css" />
      {success && (
        <div className="alert alert-success text-center m-3" role="alert">
          Place réservée avec succès ! Vous recevrez une facture par email.
        </div>
      )}
      <section className="header">
        <div className="header-content">
          <h5 style={{ color: '#fff', fontSize: '3em', textShadow: '#fff' }}>
            CHOISSISSEZ UNE COMPAGNIE POUR RÉSERVER
          </h5>
          <p>Comparez les options de transport selon vos besoins : prix, service express, et disponibilité.</p>
        </div>
      </section>

      <section className="row col-sm-12 BUS" style={{ margin: '0 auto' }}>
        <div className="centered-div col-4 text-center mt-3">
          <div className="search-container" style={{ border: '#fff' }}>
            <select
              id="country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setDepartureCity('');
                setDestinationCity('');
              }}
              style={{ borderRadius: '50px', height: '48px' }}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="centered-div col-4 text-center mt-3">
          <div className="search-container" style={{ border: '#fff' }}>
            <select
              id="departure"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              style={{ borderRadius: '50px', height: '48px' }}
            >
              <option value="">Indiquez votre ville actuelle...</option>
              {availableCities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="centered-div col-4 text-center mt-3">
          <div className="search-container" style={{ border: '#fff' }}>
            <select
              id="destination"
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
              style={{ borderRadius: '50px', height: '48px' }}
            >
              <option value="">Indiquez votre destination...</option>
              {destinationCities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section>
        <button
          className="filtre-btn"
          onClick={() => setShowSort(!showSort)}
          style={{ width: '15em' }}
        >
          <i className="fas fa-space-shuttle icon"></i> Trier par
        </button>
        <div className={`filtre-box ${showSort ? 'show' : ''}`} id="filterBox">
          <span className="close-filtre" onClick={() => setShowSort(false)}>
            ✖
          </span>
          <h3>Trier par</h3>
          <label>
            <input
              type="radio"
              name="sort"
              checked={sortBy === 'price'}
              onChange={() => setSortBy('price')}
            />{' '}
            Prix (croissant)
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              checked={sortBy === 'duration'}
              onChange={() => setSortBy('duration')}
            />{' '}
            Durée (croissante)
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              checked={sortBy === 'seats'}
              onChange={() => setSortBy('seats')}
            />{' '}
            Places disponibles (décroissant)
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              checked={sortBy === ''}
              onChange={() => setSortBy('')}
            />{' '}
            Aucun
          </label>
        </div>
      </section>

      <section className="vg" style={{ background: 'linear-gradient(45deg, #2c0c00, #a12e00, #002a35)' }}>
        <Link href="/reservation/bus/guide">
          <button className="coter">
            Découvrez le Guide de réservation <i className="fa-solid fa-book-open"></i>
          </button>
        </Link>
      </section>

      <div className="text-center m-3">
        <h5>
          {filteredItineraries.length === 0
            ? 'Aucun itinéraire trouvé'
            : `${filteredItineraries.length} itinéraire${filteredItineraries.length > 1 ? 's' : ''} trouvé${filteredItineraries.length > 1 ? 's' : ''}`}
        </h5>
      </div>

      {currentItineraries.length === 0 && (
        <div className="alert alert-info text-center m-3" role="alert">
          Aucun itinéraire disponible pour ce pays ou cette combinaison de villes.
        </div>
      )}

      <div className="row g-4">
        {currentItineraries.map((itinerary) => {
          const bus = buses.find((b) => b.id === itinerary.busId);
          return (
            <div key={itinerary.id} className="col-md-3">
              <section className="games-section">
                <div className="game-card">
                  <div className="new-badge">{itinerary.duration}</div>
                  <img
                    src={itinerary.image || '/Photo/bus.jpg'}
                    alt={bus?.company || 'bus'}
                  />
                  <h5>{bus?.company || 'Unknown'}</h5>
                  <span className="location">
                    <i className="fas fa-map-marker-alt" style={{ color: '#6b0024' }}></i> Bénin
                  </span>
                  <span className="available">
                    <i className="fas fa-check-circle" style={{ color: '#007e69' }}></i> Disponible
                  </span>
                  <p>
                    Agence de voyage béninoise <br />
                    <strong className="ville">{departureCity || itinerary.stops[0].city}</strong> -{' '}
                    <strong style={{ color: 'tomato' }}>
                      {destinationCity || itinerary.stops[itinerary.stops.length - 1].city}
                    </strong>
                    <br />
                    <strong className="prix">{itinerary.price} FCFA</strong>
                    <strong className="passager">{itinerary.availableSeats} Places restantes</strong>
                    <br />
                    <strong>Caractéristiques:</strong> {bus?.features.join(', ') || 'Aucune'}
                  </p>
                  <Link href={`/reservation/bus/${itinerary.id}`}>
                    <button className="play-button">Réserver une place</button>
                  </Link>
                </div>
              </section>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                Précédent
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(page)}>
                  {page}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Suivant
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
