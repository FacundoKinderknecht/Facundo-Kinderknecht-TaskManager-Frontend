import React from "react";
import "../styles/register.css";

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear una Cuenta</h2>
        <form>
          <input type="text" placeholder="Nombre" />
          <input type="text" placeholder="Apellido" />
          <input type="email" placeholder="Correo Electrónico" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Registrarse</button>
        </form>
        <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
      </div>
    </div>
  );
};

export default Register;
