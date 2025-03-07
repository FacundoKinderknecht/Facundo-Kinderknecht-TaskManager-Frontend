import React, { useState } from "react";
import "../styles/modal.css";

const EditTaskModal = ({ task, onClose, onSave }) => {
    const [editedTask, setEditedTask] = useState({
        title: task.title,
        description: task.description
    });

    const handleChange = (e) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(task._id, editedTask);
        onClose(); // Cerrar el modal después de guardar
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Tarea</h2>
                <input type="text" name="title" value={editedTask.title} onChange={handleChange} />
                <textarea name="description" value={editedTask.description} onChange={handleChange}></textarea>
                <div className="modal-buttons">
                    <button onClick={handleSubmit}>Guardar cambios</button>
                    <button className="cancel-btn" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;
