import React, { useState } from "react";
import "../styles/auth.css";
import Layout from "../components/Layout";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(formData);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Error al iniciar sesión.");
        }
    };

    return (
        <Layout>
            <div className="auth-container">
                <div className="auth-box">
                    <h2>Iniciar Sesión</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
                        <button type="submit">Ingresar</button>
                    </form>
                    <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
