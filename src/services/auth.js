import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"; 

// Configurar un timeout para evitar que la petición quede bloqueada
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000, // 10 segundos máximo por petición
});

// 📌 **Registro de usuario optimizado**
export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "No se pudo registrar. Intenta de nuevo.");
    }
};

// 📌 **Login optimizado**
export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post("/auth/login", userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "No se pudo iniciar sesión. Intenta de nuevo.");
    }
};
