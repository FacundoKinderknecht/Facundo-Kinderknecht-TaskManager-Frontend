import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <header className="glass-header">
            <Link to="/" className="logo">TaskManager</Link>
            <nav>
                {!token ? (
                    <>
                        <Link to="/login">Iniciar Sesión</Link>
                        <Link to="/register" className="register-btn">Registrarse</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
