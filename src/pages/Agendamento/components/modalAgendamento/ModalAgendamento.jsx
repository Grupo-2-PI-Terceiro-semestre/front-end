import React, { useState } from "react";
import { formatDuration } from '../../../../utils/FormatDate';
import "./ModalAgendamento.css";

function ModalAgendamento({ onClose, servico, equipe }) {

    if (!servico || !equipe) return null;

    const [selectedProfissional, setSelectedProfissional] = useState("");

    const handleChange = (e) => {
        setSelectedProfissional(e.target.value);
    };

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
                            <select
                                id="profissional"
                                className="dropdown"
                                value={selectedProfissional}
                                onChange={handleChange}
                            >
                                {!selectedProfissional && <option value="" disabled>Profissional</option>}
                                {equipe && equipe.length > 0 ? (
                                    equipe.map((profissional, index) => (
                                        <option key={index} value={profissional.idUsuario}>
                                            {profissional.nomePessoa}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Nenhum profissional disponível</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="time-options">
                        <button className="time-button">{formatDuration('10:00:00')}</button>
                        <button className="time-button">{formatDuration('11:00:00')}</button>
                        <button className="time-button">{formatDuration('12:00:00')}</button>
                    </div>

                </div>
                <div className="modal-summary">
                    <div>
                        <p className="total">
                            Total: R$ <strong>{servico.precoServico}</strong>
                        </p>
                        <p className="duration">{formatDuration(servico.duracaoServico)}</p>
                    </div>
                </div>
                <button className="confirm-button">Confirmar</button>
            </div>
        </div>
    );
}

export default ModalAgendamento;
