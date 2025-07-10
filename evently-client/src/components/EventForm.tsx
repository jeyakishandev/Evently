import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const EventForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Veuillez vous connecter.");
        navigate("/login");
        return;
      }
      await api.post(
        "/events",
        { title, desc, place, date, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Événement créé avec succès !");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création de l'événement.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-3">
      <h2 className="text-2xl font-bold text-center">Créer un événement</h2>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Lieu"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="URL de l'image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Créer
      </button>
    </form>
  );
};

export default EventForm;
