import { useState } from "react";
import api from "../api/axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { name, email, password });
      console.log(res.data);
      alert("Inscription réussie, tu peux te connecter.");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
        <h1 className="text-2xl font-bold text-center">Inscription</h1>
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          Créer mon compte
        </button>
      </form>
    </div>
  );
};

export default Register;
