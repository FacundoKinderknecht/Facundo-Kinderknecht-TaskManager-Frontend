import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">TaskManager</Link>
      </div>
      <nav className="nav-links">
        <Link to="/login">🔑 Iniciar sesión</Link>
        <Link to="/register">📝 Registrarse</Link>
      </nav>
    </header>
  );
};

export default Header;
