import React from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Account } from "./components/Account";
import Status from "./components/Status";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // Importar la nueva página de inicio

const App = () => {
  return (
    <Account>
      <Router>
        <Status />
        <Routes>
          {/* Definir la ruta para la página principal */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Account>
  );
};

export default App;
