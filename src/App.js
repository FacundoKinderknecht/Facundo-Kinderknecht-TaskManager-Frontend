import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<h2>Página de Login</h2>} />
          <Route path="/register" element={<h2>Página de Registro</h2>} />
          <Route path="/dashboard" element={<h2>Panel de Usuario</h2>} />
        </Routes>
    </Router>
  );
};

export default App;
