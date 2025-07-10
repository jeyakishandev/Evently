import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, PlusIcon, LoginIcon, LogoutIcon } from "@heroicons/react/outline";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-3 sticky top-0 shadow z-50 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <HomeIcon className="h-6 w-6" />
          Evently
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/create" className="flex items-center gap-1 hover:text-gray-200 transition">
            <PlusIcon className="h-5 w-5" />
            Créer
          </Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="flex items-center gap-1 hover:text-gray-200 transition">
              <LogoutIcon className="h-5 w-5" />
              Déconnexion
            </button>
          ) : (
            <Link to="/login" className="flex items-center gap-1 hover:text-gray-200 transition">
              <LoginIcon className="h-5 w-5" />
              Connexion
            </Link>
          )}
        </nav>
      </header>
      <main className="flex-grow bg-gray-50">{children}</main>
      <footer className="text-center p-3 text-sm text-gray-600">© 2025 Evently</footer>
    </div>
  );
};

export default MainLayout;
