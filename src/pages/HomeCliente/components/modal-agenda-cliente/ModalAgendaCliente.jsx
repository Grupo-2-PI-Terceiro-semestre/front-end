import React, { useState, useEffect } from "react";
import { buscarAgendamentos, cancelaAgendamento } from '../../../../services/homeClienteServices';
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { formatDateTimeForDisplay } from '../../../../utils/FormatDate';
import "./ModalAgendaCliente.css";

function ModalAgendaCliente({ onClose }) {
    const user = Cookies.get('cliente') ? JSON.parse(Cookies.get('cliente')) : null;
    const [agendamentos, setAgendamentos] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        if (user) {
            findAgendamentos(user.idPessoa);
        }
    }, [user]);

    const findAgendamentos = async (idCliente) => {
        try {
            const response = await buscarAgendamentos(idCliente);
            const validAgendamentos = response.filter(
                (agendamento) => agendamento && agendamento.status
            );
            setAgendamentos(validAgendamentos);
        } catch (error) {
            console.error("Erro ao buscar agendamentos", error);
        }
    };

    const handleCancel = (idAgendamento) => {
        Swal.fire({
            title: 'Tem certeza que deseja cancelar o agendamento?',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await cancelaAgendamento(idAgendamento);
                    Swal.fire('Cancelado!', 'Seu agendamento foi cancelado.', 'success');
                    setAgendamentos((prev) =>
                        prev.filter((agendamento) => agendamento.idAgendamento !== idAgendamento)
                    );
                } catch (error) {
                    console.error("Erro ao cancelar agendamento", error);
                    Swal.fire('Erro!', 'Ocorreu um erro ao cancelar o agendamento.', 'error');
                }
            }
        });
    };

    const capitalizeFirstLetter = (string = '') => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const filteredAgendamentos = agendamentos.filter(
        (agendamento) => statusFilter === "" || agendamento.status === statusFilter
    );

    return (
        <div
            className="modal-overlay-cliente"
            onClick={(e) => e.target.classList.contains("modal-overlay-cliente") && onClose()}
        >
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>
                    x
                </button>
                <h2>Meus Agendamentos</h2>
                <div className="filter-container">
                    <label htmlFor="statusFilter">Filtrar por status:</label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="PENDENTE">Pendente</option>
                        <option value="REALIZADO">Realizado</option>
                        <option value="CANCELADO">Cancelado</option>
                    </select>
                </div>
                {filteredAgendamentos.length === 0 ? (
                    <p className="no-agendamentos">Você não tem agendamentos no momento.</p>
                ) : (
                    <ul className="agendamentos-list">
                        {filteredAgendamentos.map((agendamento) => (
                            <li key={agendamento.idAgendamento} className="agendamento-item">
                                <h3>{agendamento.servico}</h3>
                                <p><strong>Empresa:</strong> {agendamento.nomeEmpresa || 'Não informado'}</p>
                                <p><strong>Servico:</strong> {agendamento.nomeServico || 'Não informado'}</p>
                                <p><strong>Data:</strong> {formatDateTimeForDisplay(agendamento.dataHora)}</p>
                                <p><strong>Atendente:</strong> {agendamento.atendente || 'Não informado'}</p>
                                <p><strong>Status:</strong> {capitalizeFirstLetter(agendamento.status)}</p>
                                {agendamento.status !== "REALIZADO" && agendamento.status !== "CANCELADO" && (
                                    <button
                                        className="cancel-button"
                                        onClick={() => handleCancel(agendamento.idAgendamento)}
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ModalAgendaCliente;
