import React from "react";
import "./ModalAgendamento.css";

function ModalAgendamento({ onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>
                    X
                </button>
                <h3 className="modal-title">Corte Masculino</h3>


                <div className="modal-calendar">
                    <p>Calendário será adicionado aqui</p>
                </div>


                <div className="modal-times">
                    <div className="teste-99">
                    <h3>Horários Disponíveis</h3>

                    <div className="dropdown-profissional">
                        <select id="profissional" className="dropdown">
                            <option value="">Selecione um profissional</option>
                            <option value="prof1">João</option>
                            <option value="prof2">Maria</option>
                            <option value="prof3">Pedro</option>
                        </select>
                    </div>
                    </div>
                    <div className="time-options">
                        <button className="time-button">10:00</button>
                        <button className="time-button">11:00</button>
                        <button className="time-button">12:00</button>
                    </div>
                    
                </div>



                <div className="modal-summary">
                    <div>
                        <p className="total">
                            Total: <strong>R$ 45,00</strong>
                        </p>
                        <p className="duration">40min</p>
                    </div>
                </div>

                <button className="confirm-button">Confirmar</button>
            </div>
        </div>
    );
}

export default ModalAgendamento;
