import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authService";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      setMessage("✅ Inscription réussie !");
      setTimeout(() => {
        navigate("/login"); // Redirection automatique
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Créer un compte</h2>
      {message && (
        <p className={`mb-3 text-center ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nom"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
