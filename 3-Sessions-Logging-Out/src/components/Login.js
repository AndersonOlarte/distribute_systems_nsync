import React, { useState, useContext } from "react";
import { AccountContext } from "./Account";
import { useNavigate } from "react-router-dom";
import miImagen from "../assets/carpeta.png"; // Importa la imagen local
import "./Login.css"; // Agrega estilos personalizados si es necesario

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { authenticate } = useContext(AccountContext);
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log("Logged in!", data);

        // Capturar el token de acceso y guardarlo en localStorage
        const accessToken = data.getAccessToken().getJwtToken();
        localStorage.setItem("token", accessToken);

        // Redirigir al usuario al sitio principal
        navigate("/dashboard"); // Ajusta esta ruta según tu app
      })
      .catch((err) => {
        console.error("Failed to login", err);
        setError("Error al iniciar sesión. Por favor, verifica tus credenciales.");
      });
  };

  // Función para regresar al home
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      {/* Imagen de la carpeta ciudadana */}
      <img src={miImagen} alt="Mi carpeta ciudadana" className="login-image" />

      <h1>Inicio de Sesión</h1>
      <form onSubmit={onSubmit}>
        {/* Email */}
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
        />

        {/* Contraseña */}
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Login</button>
      </form>

      {/* Botón para regresar al home */}
      <button onClick={goToHome} className="back-home-button">
        Volver al Home
      </button>
    </div>
  );
};

export default Login;
