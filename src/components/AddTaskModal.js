import React, { useState } from "react";
import "../styles/modal.css";

const AddTaskModal = ({ onClose, onSave }) => {
    const [newTask, setNewTask] = useState({ title: "", description: "" });

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!newTask.title || !newTask.description) {
            return; // Evita agregar tareas vacías
        }
        onSave(newTask);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Agregar Nueva Tarea</h2>
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
