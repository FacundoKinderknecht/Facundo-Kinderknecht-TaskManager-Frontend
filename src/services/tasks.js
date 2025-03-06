import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/tasks";

// 📌 **Obtener todas las tareas**
export const getTasks = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/tasks`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Error al obtener las tareas." };
    }
};

// 📌 **Crear una nueva tarea**
export const createTask = async (taskData, token) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, taskData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Error al crear la tarea." };
    }
};

// 📌 **Actualizar una tarea**
export const updateTask = async (taskId, updatedData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${taskId}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Error al actualizar la tarea." };
    }
};

// 📌 **Eliminar una tarea**
export const deleteTask = async (taskId, token) => {
    try {
        await axios.delete(`${API_URL}/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return { message: "Tarea eliminada correctamente." };
    } catch (error) {
        throw error.response ? error.response.data : { message: "Error al eliminar la tarea." };
    }
};
