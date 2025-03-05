import React from "react";
import Layout from "../components/Layout";
import "../styles/home.css";

const Home = () => {
  return (
    <Layout>
      <div className="home-container">
        <h1>Bienvenido a TaskManager</h1>
        <p>Organiza tus tareas de forma eficiente.</p>
      </div>
    </Layout>
  );
};

export default Home;
