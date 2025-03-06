import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth";

// 📌 **Función para registrar un usuario**
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Error en la conexión con el servidor." };
    }
};

// 📌 **Función para iniciar sesión**
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Error en la conexión con el servidor." };
    }
};
