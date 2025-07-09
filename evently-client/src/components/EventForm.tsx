import { useState } from "react";
import { createEvent } from "../api/eventService";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    place: "",
    date: "",
    image: "",
    categoryId: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const dataToSend = {
        ...formData,
        categoryId: formData.categoryId ? Number(formData.categoryId) : null,
        date: new Date(formData.date).toISOString(),
      };

      await createEvent(dataToSend, token!);
      setMessage("✅ Événement créé avec succès !");
      setFormData({
        title: "",
        desc: "",
        place: "",
        date: "",
        image: "",
        categoryId: ""
      });
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur lors de la création de l'événement.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Créer un événement</h2>
      {message && <p className="mb-3 text-center text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Titre de l'événement"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="place"
          placeholder="Lieu"
          value={formData.place}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="datetime-local"
          name="date"
          placeholder="Date et heure"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL de l'image"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="categoryId"
          placeholder="ID de la catégorie (optionnel)"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Créer l'événement
        </button>
      </form>
    </div>
  );
};

export default EventForm;
