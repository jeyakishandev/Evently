import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "../src/pages/HomePage";
import LoginPage from "../src/pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateEventPage from "../src/pages/CreateEventPage";
import NotFoundPage from "../src/pages/NotFoundPage";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<CreateEventPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
);
}

export default App;


