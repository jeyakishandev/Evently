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
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Événements à venir</h1>
      {events.length === 0 ? (
        <p className="text-gray-600">Aucun événement pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-700">{event.desc}</p>
              <p className="text-gray-500">{event.place}</p>
              <p className="text-gray-500">{new Date(event.date).toLocaleString()}</p>
              {event.image && <img src={event.image} alt={event.title} className="mt-2 rounded" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
