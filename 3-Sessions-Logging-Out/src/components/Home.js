import React from "react";
import { useNavigate } from "react-router-dom";
import miImagen from "../assets/carpeta.png"; // Ajusta la ruta según dónde esté tu imagen
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  // Funciones para manejar los clics en los botones
  const goToSignup = () => {
    navigate("/signup");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="welcome-container">
      {/* Imagen local cargada */}
      <img
        src={miImagen}
        alt="Mi carpeta ciudadana"
        className="welcome-image"
      />

      <h1>Bienvenido a mi carpeta ciudadana NSYNC</h1>
      <p>¿Qué deseas realizar?</p>

      <div className="button-container">
        <button className="action-button" onClick={goToSignup}>
          Registro de usuarios
        </button>
        <button className="action-button" onClick={goToLogin}>
          Login de usuarios
        </button>
      </div>
    </div>
  );
};

export default Home;
