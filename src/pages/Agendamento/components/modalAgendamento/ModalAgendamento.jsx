import React, { useState, useEffect } from "react";
import { formatDuration } from '../../../../utils/FormatDate';
import { useParams } from "react-router-dom";
import { formaterDate } from '../../../../utils/FormatDate';
import IconDemo from '../../../../components/agenda/Agenda';
import "./ModalAgendamento.css";
import LoadingDots from "../../../HomeCliente/components/loading/LoadingDots";
import { buscarHorariosDisponiveis } from '../../services/perfilEmpresa'

function ModalAgendamento({ onClose, servico, equipe }) {

    if (!servico || !equipe) return null;

    const [selectedProfissional, setSelectedProfissional] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [horarios, setHorarios] = useState([]);
    const [horarioSelecionado, setHorarioSelecionado] = useState(null);
    const [date, setDate] = useState(null);
    const { idEmpresa } = useParams();

    useEffect(() => {
        if (selectedProfissional && date) {
            const formattedDate = formaterDate(date);
            buscarHorarios(idEmpresa, formattedDate, selectedProfissional);
        }
    }, [date, selectedProfissional]);
    

    useEffect(() => {
        document.body.style.overflow = "hidden"; 
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    const buscarHorarios = async (idEmpresa, formattedDate, idProfissional) => {

        setIsLoaded(true);
        try {
            const horarios = await buscarHorariosDisponiveis(idEmpresa, idProfissional, formattedDate);
            setHorarios(horarios);
        } catch (error) {
            console.error("Erro ao buscar horários disponíveis", error);
        } finally {
            setIsLoaded(false);
        }
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleChange = (e) => {
        setSelectedProfissional(e.target.value);
    };

    const handleHorarioSelecionado = (horario) => {
        setHorarioSelecionado(horario);
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>X</button>
                <h3 className="modal-title">Serviço: {servico.nomeServico}</h3>
                <div className="modal-calendar">
                    <IconDemo content={date} onDateChange={handleDateChange} isFixed={true} />
                </div>

                <div className="modal-times">
                    <div className="display-info">

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
                        <p>Horários Disponíveis</p>
                    </div>

                    <div className="time-options">
                        {isLoaded ? <LoadingDots size={10} /> : (
                            horarios.length > 0 ? (
                                horarios.map((horario, index) => {
                                    const horarioFormatado = horario.split(":").slice(0, 2).join(":");
                                    return (
                                        <button
                                            className={`time-button ${horarioSelecionado === horario ? "selected" : ""}`}
                                            key={index}
                                            onClick={() => handleHorarioSelecionado(horario)}
                                        >
                                            {horarioFormatado}
                                        </button>
                                    );
                                })
                            ) : (
                                <p>Selecione uma data e um profissional para visualizar os horários disponíveis.</p>
                            )
                        )}
                    </div>
                </div>

                <div className="modal-summary">
                    <div>
                        <p className="total">
                            Valor: R$ <strong>{servico.precoServico}</strong>
                        </p>
                        <p className="duration">Tempo: {formatDuration(servico.duracaoServico)}</p>
                    </div>
                </div>
                <button className="confirm-button">Confirmar</button>
            </div>
        </div>
    );
}

export default ModalAgendamento;
