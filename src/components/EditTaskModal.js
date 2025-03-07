import React, { useState } from "react";
import "../styles/modal.css";

const EditTaskModal = ({ task, onClose, onSave }) => {
    const [updatedTask, setUpdatedTask] = useState({ title: task.title, description: task.description });
    const [error, setError] = useState(""); // Estado para el mensaje de error

    const handleChange = (e) => {
        setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!updatedTask.title.trim() || !updatedTask.description.trim()) {
            setError("Por favor, completa todos los campos.");
            setTimeout(() => setError(""), 4000); // Ocultar error después de 4 segundos
            return;
        }

        onSave(task._id, updatedTask);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Tarea</h2>
                {error && <p className="error-message">{error}</p>} {/* Mensaje de error dentro del modal */}
                <input type="text" name="title" placeholder="Título" value={updatedTask.title} onChange={handleChange} />
                <textarea name="description" placeholder="Descripción" value={updatedTask.description} onChange={handleChange}></textarea>
                <div className="modal-buttons">
                    <button onClick={handleSubmit}>Guardar Cambios</button>
                    <button className="cancel-btn" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;
