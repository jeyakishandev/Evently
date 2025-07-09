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
      setMessage("Connexion réussie ✅ Vous pouvez créer des événements.");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setMessage("Erreur de connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-4">
      <h2 className="text-xl font-bold mb-4">Se connecter</h2>
      {message && <p className="mb-2 text-center text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
