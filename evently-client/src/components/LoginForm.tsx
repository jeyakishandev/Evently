import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Connexion réussie.");
      navigate("/"); // redirection automatique
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la connexion");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80 mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">Connexion</h1>
      <input
        className="border p-2 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 rounded"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-500 text-white p-2 rounded" type="submit">
        Se connecter
      </button>
    </form>
  );
};

export default LoginForm;
