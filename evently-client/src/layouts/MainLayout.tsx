import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div>
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">Evently</Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Accueil</Link>
          {isAuthenticated ? (
            <>
              <Link to="/create" className="hover:underline">Créer</Link>
              <button
                onClick={handleLogout}
                className="hover:underline"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Connexion</Link>
              <Link to="/register" className="hover:underline">Inscription</Link>
            </>
          )}
        </nav>
      </header>
      <main className="max-w-3xl mx-auto p-4">{children}</main>
    </div>
  );
};

export default MainLayout;
