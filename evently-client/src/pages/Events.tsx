import { useEffect, useState } from "react";
import api from "../api/axios";

type Event = {
  id: number;
  title: string;
  desc: string;
  place: string;
  date: string;
  image: string;
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Événements</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="border rounded p-4 shadow">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p className="text-sm text-gray-600">
              {event.place} - {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="mt-2 text-sm">{event.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
