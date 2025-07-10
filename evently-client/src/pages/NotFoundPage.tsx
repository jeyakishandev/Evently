import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4">404 - Page non trouvée</h1>
      <Link to="/" className="text-blue-600 underline">Retour à l'accueil</Link>
    </div>
  );
};

export default NotFoundPage;
