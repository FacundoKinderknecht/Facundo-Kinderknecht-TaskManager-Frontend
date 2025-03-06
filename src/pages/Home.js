import React from "react";
import "../styles/home.css";
import Layout from "../components/Layout";

const Home = () => {
    return (
        <Layout>
            <div className="home-container">
                {/* 🔹 Sección Hero */}
                <section className="hero">
                    <div className="hero-content">
                        <h1>Gestión Inteligente de Tareas</h1>
                        <p>Un sistema minimalista, potente y diseñado para la productividad.</p>
                    </div>
                </section>

                {/* 🔹 Sección de Características */}
                <section className="features">
                    <div className="feature-card">
                        <h2>🚀 Rápido</h2>
                        <p>Sin distracciones, sin complicaciones. Solo productividad.</p>
                    </div>
                    <div className="feature-card">
                        <h2>🛠️ Personalizable</h2>
                        <p>Adapta la plataforma a tu flujo de trabajo con opciones flexibles.</p>
                    </div>
                    <div className="feature-card">
                        <h2>🔄 Sincronización</h2>
                        <p>Accede desde cualquier dispositivo sin perder nada.</p>
                    </div>
                </section>

                {/* 🔹 Nueva Sección: Experiencia del Usuario */}
                <section className="experience">
                    <h2>Flujo de Trabajo Optimizado</h2>
                    <p>Organiza tus tareas de forma eficiente con una interfaz moderna y fluida.</p>
                    <div className="experience-box">
                        <div className="step">
                            <h3>📝 Crea Tareas</h3>
                            <p>Registra tus tareas de manera rápida y sencilla.</p>
                        </div>
                        <div className="step">
                            <h3>✅ Márcalas como Completadas</h3>
                            <p>Haz un seguimiento claro de tu progreso diario.</p>
                        </div>
                        <div className="step">
                            <h3>📊 Analiza tu Productividad</h3>
                            <p>Obtén métricas sobre tu rendimiento y optimiza tu tiempo.</p>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Home;
