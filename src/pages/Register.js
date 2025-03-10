import React, { useState } from "react";
import "../styles/auth.css";
import Layout from "../components/Layout";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        password: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validación de número de teléfono (solo dígitos)
        if (name === "telefono" && !/^\d*$/.test(value)) return;

        // Límite de caracteres en cada campo
        const maxLengths = {
            nombre: 50,
            apellido: 50,
            email: 100,
            telefono: 15,
            password: 30
        };

        if (value.length > maxLengths[name]) return;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validaciones antes de enviar
        if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono || !formData.password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (formData.telefono.length < 8) {
            setError("El teléfono debe tener al menos 8 dígitos.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Correo electrónico no válido.");
            return;
        }

        if (formData.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        try {
            const data = await registerUser(formData);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Error en el registro.");
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
                        <button type="submit">Registrarse</button>
                    </form>
                    <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
