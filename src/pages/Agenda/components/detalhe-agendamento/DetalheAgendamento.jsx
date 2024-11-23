import React, { useState, useEffect, useRef } from 'react';
import './DetalheAgendamento.css'; // Estilizações
import Button from '../../../../components/button/Button';
import { findServicos, findClientes, atualizarStatus, AtualizarEvento } from '../../services/agendaServices';
import DateTimePickerOpenTo from '../input-horas/DateTimePickerOpenTo';
import SearchableDropdown from '../autocomplete/SearchableDropdown';
import CircularSize from '../../../../components/circulo-load/CircularSize';
import Swal from 'sweetalert2';
import { Pilha } from "../../../../utils/Pilha";
import { ToastContainer } from 'react-toastify';
import { successToast, errorToast } from '../../../../utils/Toats';
import { converterGMTParaBrasilia } from '../../../../utils/FormatDate';
import dayjs from 'dayjs';





const DetalheAgendamento = ({ event, detalhes, idEmpresa, funcionarios, onClose, refreshDate, paraConfirmar, realizado }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [horarioInicio, setHorarioInicio] = useState(event.start);
    const [servicos, setServicos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState('');
    const [clienteSelecionado, setClienteSelecionado] = useState('');
    const [profissionalSelecionado, setProfissionalSelecionado] = useState('');
    const [loading, setLoading] = useState(false);

    const dropdownRef = useRef(null);
    const pilhaSessao = localStorage.getItem('pilha') ? JSON.parse(localStorage.getItem('pilha')) : null;


    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        buscarServicos(idEmpresa);
        buscarClientes(idEmpresa)
    }, [idEmpresa, event.title]);

    const buscarServicos = async (idEmpresa) => {
        try {
            const response = await findServicos(idEmpresa);
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar os serviços:', error);
        }
    };

    const buscarClientes = async (idEmpresa) => {
        try {
            const response = await findClientes(idEmpresa);
            setClientes(response.data)
        } catch (error) {
            console.error('Erro ao buscar os clientes:', error);
        }
    }

    const updateStatus = async (idAgendamento, status) => {
        try {
            let resutado = true;
            if (status == 'CANCELADO') {

                const result = await Swal.fire({
                    title: "Atenção!",
                    text: "Você tem certeza que deseja cancelar esse agendamento?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sim",
                });
                resutado = result.isConfirmed;
            }

            if (resutado) {
                if (pilhaSessao == null) {
                    let pilha = new Pilha();
                    const objAcao = {
                        idAgendamento: idAgendamento,
                        horaAgendamento: null,
                        idAgenda: null,
                    }
                    pilha.push(objAcao);
                    localStorage.setItem('pilha', JSON.stringify(pilha));
                } else {
                    let pilha = new Pilha();
                    pilha.pilha = pilhaSessao.pilha;
                    pilha.topo = pilhaSessao.topo;
                    const objAcao = {
                        idAgendamento: idAgendamento,
                        horaAgendamento: null,
                        idAgenda: null,
                    }
                    pilha.push(objAcao);
                    localStorage.setItem('pilha', JSON.stringify(pilha));
                }

                setLoading(true);
                try {
                    await atualizarStatus(idAgendamento, status);
                    onClose();
                    refreshDate(event.start)
                } catch (error) {
                    await Swal.fire({
                        title: "Erro!",
                        text: "Erro ao cancelar o agendamento!",
                        icon: "error",
                    });
                    console.error("Erro ao cancelar agendamento:", error);
                }
            }
        } catch (error) {
            throw new Error("Erro ao deletar o agendamento");
        }
    };


    const handleEdit = () => {

        const agora = dayjs();
        const agendamento = dayjs(horarioInicio);

        if (clienteSelecionado === '' || profissionalSelecionado === '' || servicoSelecionado === '' || horarioInicio === '') {
            errorToast('Por favor, preencha todos os campos!');
            return;
        }

        if (agendamento.isBefore(agora)) {
            errorToast('Não é possível agendar para uma data/hora anterior a atual');
            return;
        }

        const eventoAtualizado = {
            idAgendamento: event.id,
            idCliente: clienteSelecionado,
            idServico: servicoSelecionado,
            idAgenda: profissionalSelecionado,
            dataAgendamento: converterGMTParaBrasilia(horarioInicio),
        }

        atualizarEvento(eventoAtualizado)

    };

    const atualizarEvento = async (eventoAtualizado) => {
        try {
            setLoading(true);
            await AtualizarEvento("agendamentos", eventoAtualizado);
            successToast('Agendamento atualizado com sucesso!');
            onClose();
            setLoading(false);
            refreshDate(new Date(horarioInicio));
        } catch (error) {
            console.error('Erro ao atualizar o agendamento:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleServicoChange = (servico) => {
        setServicoSelecionado(servico.idServico);
    };

    const handleFuncionarioChange = (funcionario) => {
        setProfissionalSelecionado(funcionario.id);
    };

    const handleClientesChange = (cliente) => {
        setClienteSelecionado(cliente.idCliente);
    };

    return (
        <div className="detalhe-agendamento">
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
            <span className='botao-fechar' onClick={onClose}>X</span>
            <h3>Detalhes do Agendamento</h3>

            <div className='inputCliente'>
                <div className="detalhe-campo">
                    <label>Cliente:</label>
                    {isEditing ? (
                        <div ref={dropdownRef}>
                            <SearchableDropdown
                                options={clientes}
                                onSelectOption={handleClientesChange}
                                placeholder={event.nomeCliente}
                                value={''}
                                displayField={(option) => option.nomePessoa} // Exibe o campo `nomeServico`
                                uniqueKey={(option) => option.idCliente} // Usa `idServico` como chave única
                            />
                        </div>
                    ) : (
                        <p>{event.nomeCliente}</p>
                    )}
                </div>

                <div className="detalhe-campo">
                    <label>Telefone do Cliente</label>
                    <p>{event.cliente.numeroTelefone}</p>
                </div>
            </div>

            <div className='inputServicoFunc'>
                <div className="detalhe-campo">
                    <label>Serviço:</label>
                    {isEditing ? (
                        <div ref={dropdownRef}>
                            <SearchableDropdown
                                options={servicos} // Lista de serviços
                                onSelectOption={handleServicoChange}
                                placeholder={event.title}
                                value={''}
                                displayField={(option) => option.nomeServico} // Exibe o campo `nomeServico`
                                uniqueKey={(option) => option.idServico} // Usa `idServico` como chave única
                            />
                        </div>
                    ) : (
                        <p>{event.title}</p>
                    )}
                </div>

                <div className="detalhe-campo">
                    <label>Profissional:</label>
                    {isEditing ? (
                        <div ref={dropdownRef}>
                            <SearchableDropdown
                                options={funcionarios} // Lista de funcionários
                                onSelectOption={handleFuncionarioChange}
                                placeholder={event.nomeFuncionario}
                                value={''}
                                displayField={(option) => option.title}
                                uniqueKey={(option) => option.id}
                            />
                        </div>
                    ) : (
                        <p>{event.nomeFuncionario}</p>
                    )}
                </div>
            </div>

            <div className="detalhe-campo">
                <label>Data e Hora Do Agendamento</label>
                {isEditing ? (
                    <DateTimePickerOpenTo
                        valordefault={horarioInicio}
                        value={horarioInicio}
                        onChange={(newValue) => setHorarioInicio(newValue)}
                    />
                ) : (
                    <p>{new Date(horarioInicio).toLocaleString()}</p>
                )}
            </div>

            <div className="detalhe-campo">
                <label>Descrição do Serviço</label>
                <textarea
                    value={event.descricaoServico}
                    disabled={!isEditing}
                />
            </div>

            <div className="detalhe-actions">
                {!realizado ? (
                    <>
                        {paraConfirmar ? (
                            <Button
                                size="100%"
                                fontSize="15px"
                                fontWeight="bold"
                                content="Confirmar Agendamento"
                                backgroundColor="#4E9F65" /* Verde escuro */
                                onClick={() => updateStatus(event.id, "AGENDADO")}
                            />
                        ) : (
                            <Button
                                size="100%"
                                content="Finalizar"
                                fontWeight="bold"
                                fontSize="15px"
                                backgroundColor="#4A90E2" /* Azul suave */
                                onClick={() => updateStatus(event.id, "REALIZADO")}
                            />
                        )}
                        <Button
                            type="submit"
                            content="Cancelar Agendamento"
                            backgroundColor="#D32F2F" /* Vermelho escuro */
                            fontWeight="bold"
                            fontSize="15px"
                            size="100%"
                            onClick={() => updateStatus(event.id, "CANCELADO")}
                        />
                    </>
                ) : null}

                {/* Botões de Editar e Salvar só aparecem quando o serviço está "REALIZADO" */}
                {!realizado && isEditing ? (
                    <Button
                        size="100%"
                        fontSize="15px"
                        fontWeight="bold"
                        content="Salvar"
                        backgroundColor="#388E3C" /* Verde escuro */
                        onClick={handleEdit}
                    />
                ) : !realizado ? (
                    <Button
                        size="100%"
                        content="Editar"
                        fontWeight="bold"
                        fontSize="15px"
                        backgroundColor="#F9A825" /* Amarelo escuro */
                        onClick={toggleEditing}
                    />
                ) : null}




                {loading ? (
                    <CircularSize width="100%" height="100%" />
                ) : null}
            </div>
        </div>
    );
};

export default DetalheAgendamento;
