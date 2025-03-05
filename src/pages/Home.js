import React from "react";
import Layout from "../components/Layout";
import "../styles/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Layout>
      <div className="home-container">
        {/* 🔹 Sección Hero */}
        <section className="hero">
          <h1>Organiza tus Tareas de Forma Eficiente</h1>
          <p>Con TaskManager, aumenta tu productividad y nunca olvides una tarea importante.</p>
          <Link to="/register" className="cta-button">¡Comienza Ahora!</Link>
        </section>

        {/* 🔹 Características */}
        <section className="features">
          <div className="feature-card">
            <h2>📅 Planificación</h2>
            <p>Organiza tus tareas diarias con una interfaz intuitiva y moderna.</p>
          </div>
          <div className="feature-card">
            <h2>🔔 Recordatorios</h2>
            <p>Recibe notificaciones para no olvidar ninguna tarea importante.</p>
          </div>
          <div className="feature-card">
            <h2>🔐 Seguridad</h2>
            <p>Tus datos están protegidos con autenticación segura.</p>
          </div>
        </section>

        {/* 🔹 Espaciador para evitar que el Footer se solape */}
        <div className="spacer"></div>
      </div>
    </Layout>
  );
};

export default Home;
