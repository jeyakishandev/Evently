import { useState } from "react";
import { login } from "../api/authService";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      setMessage("✅ Connexion réussie ! Vous pouvez créer des événements.");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur de connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Se connecter</h2>
      {message && <p className={`mb-3 text-center ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
