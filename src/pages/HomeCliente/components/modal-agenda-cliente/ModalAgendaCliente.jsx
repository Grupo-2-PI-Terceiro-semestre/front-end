import React, { useState, useEffect } from "react";
import { buscarAgendamentos } from '../../../../services/homeClienteServices'
import Cookies from "js-cookie";
import "./ModalAgendaCliente.css";

function ModalAgendaCliente({ onClose }) {
    debugger

    const user = Cookies.get('cliente') ? JSON.parse(Cookies.get('cliente')) : null;

    useEffect(() => {
        if (user) {
            findAgendamentos(user.idPessoa);
        }
    }, []);

    const [agendamentos, setAgendamentos] = useState([]);

    const findAgendamentos = async (idCliente) => {
        try {
            const response = await buscarAgendamentos(idCliente);
            setAgendamentos(response);
        } catch (error) {
            console.error("Erro ao buscar agendamentos", error);
        }
    }

    const handleCancel = (id) => {
        const confirmCancel = window.confirm("Tem certeza que deseja cancelar este agendamento?");
        if (confirmCancel) {
            setAgendamentos((prev) => prev.filter((agendamento) => agendamento.id !== id));
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>
                    x
                </button>
                <h2>Seus Agendamentos</h2>
                {agendamentos.length === 0 ? (
                    <p className="no-agendamentos">Você não tem agendamentos no momento.</p>
                ) : (
                    <ul className="agendamentos-list">
                        {agendamentos.map((agendamento) => (
                            <li key={agendamento.id} className="agendamento-item">
                                <h3>{agendamento.servico}</h3>
                                <p><strong>Profissional:</strong> {agendamento.profissional}</p>
                                <p><strong>Data:</strong> {agendamento.data}</p>
                                <p><strong>Hora:</strong> {agendamento.hora}</p>
                                <button
                                    className="cancel-button"
                                    onClick={() => handleCancel(agendamento.id)}
                                >
                                    Cancelar
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ModalAgendaCliente;
