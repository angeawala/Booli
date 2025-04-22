// app/data.ts
export interface City {
    id: string;
    name: string;
    country: string;
  }
  
  export interface Bus {
    id: string;
    company: string;
    totalSeats: number;
    features: string[];
  }
  
  export interface Itinerary {
    id: string;
    busId: string;
    stops: { city: string; time: string }[];
    duration: string;
    price: number;
    availableSeats: number;
    image: string;
  }
  
  export const countries = ['Benin', 'Togo', 'Nigeria'];
  
  export const cities: City[] = [
    { id: "1", name: "Cotonou", country: "Benin" },
    { id: "2", name: "Porto-Novo", country: "Benin" },
    { id: "3", name: "Parakou", country: "Benin" },
    { id: "4", name: "Natitingou", country: "Benin" },
    { id: "5", name: "Dassa", country: "Benin" },
    { id: "6", name: "Abomey", country: "Benin" },
    { id: "7", name: "Bohicon", country: "Benin" },
    { id: "8", name: "Kandi", country: "Benin" },
    { id: "9", name: "Malanville", country: "Benin" },
    { id: "10", name: "Djougou", country: "Benin" },
    { id: "11", name: "Ouidah", country: "Benin" },
    { id: "12", name: "Lokossa", country: "Benin" },
    { id: "13", name: "Savé", country: "Benin" },
    { id: "14", name: "Allada", country: "Benin" },
    { id: "15", name: "Pobè", country: "Benin" },
    { id: "16", name: "Sakété", country: "Benin" },
    { id: "17", name: "Comè", country: "Benin" },
    { id: "18", name: "Bembèrèkè", country: "Benin" },
    { id: "19", name: "Bassila", country: "Benin" },
    { id: "20", name: "Tanguiéta", country: "Benin" },
  ];
  
  const companies = [
    "BAOBAB-EXPRESS",
    "ATT-EXPRESS",
    "ZEM-TRANSPORT",
    "SOFIA-VOYAGES",
    "EAGLE-LINES",
  ];
  
  const possibleFeatures = [
    "WiFi intégré",
    "Jusqu'à deux sacs de colis gratuits",
    "Télévision intégrée",
    "Climatisé",
  ];
  
  const generateRandomFeatures = () => {
    const features: string[] = [];
    possibleFeatures.forEach((feature) => {
      if (Math.random() > 0.3) features.push(feature);
    });
    return features.length > 0 ? features : [possibleFeatures[0]];
  };
  
  export const buses: Bus[] = companies.flatMap((company, index) =>
    Array.from({ length: 10 }, (_, i) => ({
      id: `${index + 1}-${i + 1}`,
      company,
      totalSeats: Math.floor(Math.random() * 21) + 40,
      features: generateRandomFeatures(),
    }))
  );
  
  export const itineraries: Itinerary[] = companies.flatMap((company, companyIndex) => {
    const companyBuses = buses.filter((b) => b.company === company);
    const getRandomCities = (count: number): string[] => {
      const shuffled = [...cities].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count).map((c) => c.name);
    };
    const generateTime = (startHour: number, index: number): string => {
      const hours = startHour + Math.floor(index * 1.5);
      const minutes = (index * 90) % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };
    return Array.from({ length: 200 }, (_, i) => {
      const stops = getRandomCities(7);
      const startHour = 6 + Math.floor(Math.random() * 6);
      const busIndex = Math.floor(Math.random() * companyBuses.length);
      const numStops = stops.length - 1;
      const basePrice = 1000 * numStops + Math.floor(Math.random() * 1000 - 500);
      const durationHours = 6 + Math.floor(Math.random() * 3);
      return {
        id: `${companyIndex + 1}-${i + 1}`,
        busId: companyBuses[busIndex].id,
        stops: stops.map((city, j) => ({ city, time: generateTime(startHour, j) })),
        duration: `${durationHours}h ${Math.floor(Math.random() * 60)}min`,
        price: basePrice,
        availableSeats: Math.floor(companyBuses[busIndex].totalSeats * (0.5 + Math.random() * 0.4)),
        image: Math.random() > 0.5 ? "/Photo/v2.jpg" : "/Photo/bus.jpg",
      };
    });
  });