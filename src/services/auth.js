import axios from "axios";

// 📌 **Función para registrar un usuario**
export const registerUser = async (userData) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/register", userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Error en la conexión con el servidor." };
    }
};

