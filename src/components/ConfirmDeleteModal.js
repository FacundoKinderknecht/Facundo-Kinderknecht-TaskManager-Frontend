import React from "react";
import "../styles/modal.css";

const ConfirmDeleteModal = ({ task, onClose, onConfirm }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>¿Eliminar esta tarea?</h2>
                <p>Estás a punto de eliminar <strong>{task.title}</strong>. Esta acción no se puede deshacer.</p>
                <div className="modal-buttons">
                    <button className="delete-btn" onClick={() => onConfirm(task._id)}>Eliminar</button>
                    <button className="cancel-btn" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
