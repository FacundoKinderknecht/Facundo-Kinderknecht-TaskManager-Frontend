import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import Layout from "../components/Layout";
import { getTasks, createTask, updateTask, deleteTask } from "../services/tasks";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            loadTasks();
        }
    });

    const loadTasks = async () => {
        try {
            const data = await getTasks(token);
            setTasks(data);
        } catch (err) {
            setError(err.message || "Error al cargar tareas.");
        }
    };

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleAddTask = async () => {
        if (!newTask.title || !newTask.description) {
            setError("Todos los campos son obligatorios.");
            setTimeout(() => setError(""), 3000); // Error desaparece después de 3 segundos
            return;
        }
        try {
            await createTask(newTask, token);
            setNewTask({ title: "", description: "" });
            loadTasks();
        } catch (err) {
            setError(err.message || "Error al crear tarea.");
            setTimeout(() => setError(""), 3000); // Error desaparece después de 3 segundos
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
            loadTasks();
        } catch (err) {
            setError(err.message || "Error al eliminar tarea.");
        }
    };

    return (
        <Layout>
            <div className="dashboard-container">
                <h2>Mis Tareas</h2>

                {/* Formulario para agregar tareas */}
                <div className="add-task-form">
                    <input type="text" name="title" placeholder="Título" value={newTask.title} onChange={handleChange} />
                    <textarea type="text" name="description" placeholder="Descripción" value={newTask.description} onChange={handleChange} />
                    <button onClick={handleAddTask}>Agregar</button>
                </div>

                {/* Lista de tareas */}
                {error && <p className="error-message fade-out">{error}</p>}
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
                                    <button className="edit-btn">✏️ Editar</button>
                                    <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>🗑 Eliminar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
