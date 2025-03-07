import React, { useState } from "react";
import "../styles/modal.css";

const AddTaskModal = ({ onClose, onSave }) => {
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [error, setError] = useState(""); // Estado para el mensaje de error

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!newTask.title.trim() || !newTask.description.trim()) {
            setError("Por favor, completa todos los campos.");
            setTimeout(() => setError(""), 4000); // Ocultar error después de 4 segundos
            return;
        }

        onSave(newTask);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Agregar Nueva Tarea</h2>
                {error && <p className="error-message">{error}</p>} {/* Mensaje de error dentro del modal */}
                <input type="text" name="title" placeholder="Título" value={newTask.title} onChange={handleChange} />
                <textarea name="description" placeholder="Descripción" value={newTask.description} onChange={handleChange}></textarea>
                <div className="modal-buttons">
                    <button onClick={handleSubmit}>Guardar</button>
                    <button className="cancel-btn" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default AddTaskModal;
