import EventList from "../components/EventList";

const HomePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Événements</h1>
      <EventList />
    </div>
  );
};

export default HomePage;
