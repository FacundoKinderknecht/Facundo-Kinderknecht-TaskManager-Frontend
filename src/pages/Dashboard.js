import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import Layout from "../components/Layout";
import { getTasks, createTask, updateTask, deleteTask } from "../services/tasks";
import EditTaskModal from "../components/EditTaskModal";
import AddTaskModal from "../components/AddTaskModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal"; // Importamos el modal de confirmación

const Dashboard = () => {
    // Estado para almacenar las tareas
    const [tasks, setTasks] = useState([]);

    // Estado para manejar errores
    const [error, setError] = useState("");

    // Estado para manejar el modal de edición
    const [selectedTask, setSelectedTask] = useState(null);

    // Estado para manejar el modal de agregar tarea
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    // Estado para manejar el modal de confirmación de eliminación
    const [taskToDelete, setTaskToDelete] = useState(null);

    // Obtener el token del usuario logueado
    const token = localStorage.getItem("token");

    // Cargar las tareas cuando el componente se monta
    useEffect(() => {
        if (token) {
            loadTasks();
        }
    }); // Se ejecuta solo una vez al montar el componente

    // Función para cargar las tareas desde el backend
    const loadTasks = async () => {
        try {
            const data = await getTasks(token);
            setTasks(data);
        } catch (err) {
            setError(err.message || "Error al cargar tareas.");
        }
    };

    // Agregar una nueva tarea desde el modal (esperando la respuesta del backend)
    const handleAddTask = async (taskData) => {
        setError("");

        // Validar que los campos no estén vacíos
        if (!taskData.title.trim() || !taskData.description.trim()) {
            setError("Por favor, completa todos los campos.");
            setTimeout(() => setError(""), 4000);
            return;
        }

        try {
            await createTask(taskData, token);
            loadTasks(); // Recargar la lista solo cuando el backend confirme la creación
        } catch (err) {
            setError(err.message || "Error al crear tarea.");
            setTimeout(() => setError(""), 4000);
        }
    };

    // Marcar una tarea como completada o pendiente
    const handleCompleteTask = async (taskId, completed) => {
        try {
            await updateTask(taskId, { completed: !completed }, token);
            loadTasks();
        } catch (err) {
            setError(err.message || "Error al actualizar tarea.");
        }
    };

    // Eliminar una tarea después de confirmar
    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId, token);
            setTaskToDelete(null); // Ahora el modal se cierra después de eliminar
            loadTasks(); // Recargar la lista de tareas después de confirmar eliminación
        } catch (err) {
            setError(err.message || "Error al eliminar tarea.");
        }
    };

    // Guardar cambios de edición desde el modal (esperando la respuesta del backend)
    const handleSaveTask = async (taskId, updatedTask) => {
        setError("");

        // Validar que los campos no estén vacíos
        if (!updatedTask.title.trim() || !updatedTask.description.trim()) {
            setError("Por favor, completa todos los campos.");
            setTimeout(() => setError(""), 4000);
            return;
        }

        try {
            await updateTask(taskId, updatedTask, token);
            loadTasks(); // Recargar la lista solo cuando el backend confirme la actualización
            setSelectedTask(null); // Cierra el modal después de recibir la respuesta
        } catch (err) {
            setError(err.message || "Error al actualizar tarea.");
            setTimeout(() => setError(""), 4000);
        }
    };

    return (
        <Layout>
            <div className="dashboard-container">
                <h2>Mis Tareas</h2>

                {/* Botón para abrir el modal de agregar tarea */}
                <button className="add-task-btn" onClick={() => setIsAddTaskModalOpen(true)}>+ Nueva Tarea</button>

                {/* Mensaje de error si ocurre un problema */}
                {error && <p className="error-message">{error}</p>}

                {/* Lista de tareas */}
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

                {/* Modal de edición, solo se muestra si hay una tarea seleccionada */}
                {selectedTask && (
                    <EditTaskModal 
                        task={selectedTask} 
                        onClose={() => setSelectedTask(null)} 
                        onSave={handleSaveTask} 
                    />
                )}

                {/* Modal para agregar una nueva tarea */}
                {isAddTaskModalOpen && (
                    <AddTaskModal 
                        onClose={() => setIsAddTaskModalOpen(false)} 
                        onSave={handleAddTask} 
                    />
                )}

                {/* Modal de confirmación de eliminación */}
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
