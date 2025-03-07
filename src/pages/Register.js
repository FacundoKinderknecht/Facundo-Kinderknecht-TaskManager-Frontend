import React, { useState } from "react";
import "../styles/auth.css";
import Layout from "../components/Layout";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ nombre: "", apellido: "", email: "", telefono: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await registerUser(formData);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Error en el registro.");
            setTimeout(() => setError(""), 4000); // Ocultar error después de 4 segundos
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="auth-container">
                <div className="auth-box">
                    <h2>Crear una Cuenta</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                        <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
                        <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
                        <button type="submit" disabled={loading}>{loading ? "Procesando..." : "Registrarse"}</button>
                    </form>
                    <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
