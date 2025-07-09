import { useEffect, useState } from "react";
import { fetchEvents } from "../api/eventService";

interface Event {
  id: number;
  title: string;
  desc?: string;
  place?: string;
  date: string;
  image?: string;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements", error);
      }
    };
    getEvents();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Événements à venir</h1>
      {events.length === 0 ? (
        <p className="text-gray-600 text-center">Aucun événement pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col">
              {event.image && (
                <img src={event.image} alt={event.title} className="rounded mb-3 h-40 object-cover" />
              )}
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{event.title}</h2>
              <p className="text-gray-700 flex-1">{event.desc || "Pas de description."}</p>
              <div className="mt-2 text-sm text-gray-500">
                {event.place && <p>📍 {event.place}</p>}
                <p>🗓️ {new Date(event.date).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
