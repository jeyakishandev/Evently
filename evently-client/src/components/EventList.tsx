import { useEffect, useState } from "react";
import api from "../api/axios";
import EventCard from "./EventCard";

type Event = {
  id: number;
  title: string;
  desc: string;
  place: string;
  date: string;
  image: string;
};

const EventList = () => {
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
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};

export default EventList;
