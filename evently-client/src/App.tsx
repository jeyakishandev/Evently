import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <LoginForm />
      <EventForm />
      <EventList />
      
    </div>
  );
}

export default App;


