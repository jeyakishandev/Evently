import EventForm from "../components/EventForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateEventPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="p-4">
      <EventForm />
    </div>
  );
};

export default CreateEventPage;
