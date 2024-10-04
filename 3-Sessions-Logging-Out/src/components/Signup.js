import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { useNavigate } from "react-router-dom"; // Para redireccionar al Home
import miImagen from "../assets/carpeta.png"; // Imagen local para el registro
import "./Signup.css"; // Estilos personalizados

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [identification, setIdentification] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState(""); // Nuevo estado para "address"
  const [confirmationCode, setConfirmationCode] = useState(""); // Para almacenar el código de confirmación
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isConfirmationStep, setIsConfirmationStep] = useState(false); // Controla si estamos en el paso de confirmación

  const navigate = useNavigate(); // Para redirigir al Home

  // Función para validar identificación (debe tener mínimo 10 caracteres numéricos)
  const validateIdentification = (id) => {
    const regex = /^[0-9]{10,}$/; // Solo números con al menos 10 caracteres
    return regex.test(id);
  };

  // Función para enviar datos adicionales al backend
  const registerAdditionalData = (userId) => {
    const createdDate = new Date().toISOString();
    const updatedDate = new Date().toISOString();
    const isActived = true;
  
    const bodyToSend = {
      identification: identification,
      name: name,
      age: age,
      email: email,
      address: address,
      createdDate: createdDate,
      updatedDate: updatedDate, 
      isActived: isActived,
    };
  
    // Mostrar el body en la consola del navegador
    console.log("Body que se envía al backend:", bodyToSend);
  
    fetch("http://localhost:5000/api/send-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to register additional data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Additional data registered:", data);
      })
      .catch((error) => {
        console.error("Error registering additional data:", error);
      });
  };

  // Función para validar la edad (debe ser >= 18 años)
  const validateAge = (age) => {
    return age >= 18;
  };

  // Función para confirmar al usuario con el código
  const confirmUser = () => {
    const userData = {
      Username: email,
      Pool: UserPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        setError("Error al confirmar: " + err.message);
        console.error("Error confirming user:", err);
        return;
      }
      setSuccessMessage("¡Usuario confirmado exitosamente!");
      console.log("User confirmed successfully:", result);
      setIsConfirmationStep(false);
    });
  };

  // Función para enviar los datos a Cognito
  const onSubmit = (event) => {
    event.preventDefault();

    // Validar identificación
    if (!validateIdentification(identification)) {
      setError("La identificación debe tener al menos 10 caracteres numéricos.");
      return;
    }

    // Validar edad
    if (!validateAge(age)) {
      setError("Debes ser mayor a 18 años.");
      return;
    }

    // Registro en Cognito solo con correo y contraseña
    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        setError("Error en el registro: " + err.message);
        console.error("Error en Cognito:", err);
      } else {
        console.log("Usuario registrado en Cognito:", data);

        const userId = data.userSub;
        registerAdditionalData(userId);

        setSuccessMessage("¡Usuario registrado exitosamente! Verifica tu correo para el código de confirmación.");
        setIsConfirmationStep(true); // Pasar al paso de confirmación
        setError("");
      }
    });
  };

  // Función para regresar al Home
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="signup-container">
      {/* Imagen de la carpeta ciudadana */}
      <img src={miImagen} alt="Mi carpeta ciudadana" className="signup-image" />

      <h1>Registro mi carpeta ciudadana</h1>

      {isConfirmationStep ? (
        <>
          <p>Se ha enviado un código de confirmación a tu correo electrónico. Por favor, introdúcelo a continuación:</p>
          <label htmlFor="confirmationCode">Código de confirmación</label>
          <input
            id="confirmationCode"
            value={confirmationCode}
            onChange={(event) => setConfirmationCode(event.target.value)}
            type="text"
          />
          <button type="button" onClick={confirmUser}>Confirmar usuario</button>
        </>
      ) : (
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
          />

          <label htmlFor="identification">Identificación</label>
          <input
            id="identification"
            value={identification}
            onChange={(event) => setIdentification(event.target.value)}
            type="text"
          />

          <label htmlFor="age">Edad</label>
          <input
            id="age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            type="number"
          />

          <label htmlFor="address">Dirección</label>
          <input
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)} // Actualiza el estado address
            type="text"
          />

          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

          <button type="submit">Registrar</button>
        </form>
      )}

      {/* Botón para regresar al home */}
      <button onClick={goToHome} className="back-home-button">
        Volver al Home
      </button>
    </div>
  );
};

export default Signup;
