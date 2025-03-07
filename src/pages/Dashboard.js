import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importamos navegación
import "../styles/dashboard.css";
import Layout from "../components/Layout";
import { getTasks, createTask, updateTask, deleteTask } from "../services/tasks";
import EditTaskModal from "../components/EditTaskModal";
import AddTaskModal from "../components/AddTaskModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal"; // Importamos el modal de confirmación
import { useCallback } from "react";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const [selectedTask, setSelectedTask] = useState(null);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const navigate = useNavigate(); // Inicializamos la navegación
    const token = localStorage.getItem("token");

    // Si no hay token, redirigir al login con un mensaje
    useEffect(() => {
        if (!token) {
            alert("Debes iniciar sesión para acceder al Dashboard.");
            navigate("/login");
        }
    }, [token, navigate]);

    // Función para cargar las tareas
    const loadTasks = useCallback(async () => {
        try {
            const data = await getTasks(token);
            setTasks(data);
        } catch (err) {
            setError(err.message || "Error al cargar tareas.");
        }
    }, [token]); // Se ejecuta solo si `token` cambia

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    const handleAddTask = async (taskData) => {
        setError("");

        if (!taskData.title.trim() || !taskData.description.trim()) {
            setError("Por favor, completa todos los campos.");
            setTimeout(() => setError(""), 4000);
            return;
        }

        try {
            await createTask(taskData, token);
            loadTasks();
        } catch (err) {
            setError(err.message || "Error al crear tarea.");
            setTimeout(() => setError(""), 4000);
        }
    };

    const handleCompleteTask = async (taskId, completed) => {
        try {
            await updateTask(taskId, { completed: !completed }, token);
            loadTasks();
        } catch (err) {
            setError(err.message || "Error al actualizar tarea.");
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId, token);
            setTaskToDelete(null); // Ahora el modal se cierra después de eliminar
            loadTasks();
        } catch (err) {
            setError(err.message || "Error al eliminar tarea.");
        }
    };

    const handleSaveTask = async (taskId, updatedTask) => {
        setError("");

        if (!updatedTask.title.trim() || !updatedTask.description.trim()) {
            setError("Por favor, completa todos los campos.");
            setTimeout(() => setError(""), 4000);
            return;
        }

        try {
            await updateTask(taskId, updatedTask, token);
            loadTasks();
            setSelectedTask(null);
        } catch (err) {
            setError(err.message || "Error al actualizar tarea.");
            setTimeout(() => setError(""), 4000);
        }
    };

    return (
        <Layout>
            <div className="dashboard-container">
                <h2>Mis Tareas</h2>

                <button className="add-task-btn" onClick={() => setIsAddTaskModalOpen(true)}>+ Nueva Tarea</button>

                {error && <p className="error-message">{error}</p>}

                <div className="task-list">
                    {tasks.length === 0 ? (
                        <p className="no-tasks">No tienes tareas aún.</p>
                    ) : (
                        tasks.map((task) => (
                            <div key={task._id} className={`task-item ${task.completed ? "completed" : ""}`}>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <div className="task-actions">
                                    <button onClick={() => handleCompleteTask(task._id, task.completed)}>
                                        {task.completed ? "✅ Completada" : "⬜ Marcar como completada"}
                                    </button>
                                    <button className="edit-btn" onClick={() => setSelectedTask(task)}>✏️ Editar</button>
                                    <button className="delete-btn" onClick={() => setTaskToDelete(task)}>🗑 Eliminar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {selectedTask && (
                    <EditTaskModal 
                        task={selectedTask} 
                        onClose={() => setSelectedTask(null)} 
                        onSave={handleSaveTask} 
                    />
                )}

                {isAddTaskModalOpen && (
                    <AddTaskModal 
                        onClose={() => setIsAddTaskModalOpen(false)} 
                        onSave={handleAddTask} 
                    />
                )}

                {taskToDelete && (
                    <ConfirmDeleteModal 
                        task={taskToDelete} 
                        onClose={() => setTaskToDelete(null)} 
                        onConfirm={handleDeleteTask} 
                    />
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
