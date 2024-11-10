import React, { useState, useEffect, useRef } from 'react';
import './DetalheAgendamento.css'; // Estilizações
import Button from '../../../../components/button/Button';
import { findServicos, findClientes, CancelarAgendamento } from '../../services/agendaServices';
import DateTimePickerOpenTo from '../input-horas/DateTimePickerOpenTo';
import SearchableDropdown from '../autocomplete/SearchableDropdown';
import CircularSize from '../../../../components/circulo-load/CircularSize';
import Swal from 'sweetalert2';
import { Pilha } from "../../../../utils/Pilha";



const DetalheAgendamento = ({ event, detalhes, idEmpresa, funcionarios, onClose, refreshDate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profissional, setProfissional] = useState(event.title);
    const [horarioInicio, setHorarioInicio] = useState(event.start);
    const [horarioFim, setHorarioFim] = useState(event.end);
    const [descricaoServico, setDescricaoServico] = useState(detalhes.descricaoServico);
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
        setServicoSelecionado(event.title);
        setProfissionalSelecionado(event.nomeFuncionario);
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

    const cancelarAgendamento = async (idAgendamento) => {
        try {
            const result = await Swal.fire({
                title: "Atenção!",
                text: "Você tem certeza que deseja cancelar esse agendamento?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim",
            });

            if (result.isConfirmed) {
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
                    await CancelarAgendamento(idAgendamento, "CANCELADO");
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


    const handleSave = () => {
        console.log('Dados salvos:', { profissional, horarioInicio, horarioFim, descricaoServico, servicoSelecionado });
        setIsEditing(false);
    };

    const handleServicoChange = (servico) => {
        setServicoSelecionado(servico.nomeServico);
    };

    const handleFuncionarioChange = (funcionario) => {
        setServicoSelecionado(funcionario.title);
    };

    const handleClientesChange = (cliente) => {
        setClienteSelecionado(cliente.nomePessoa);
    };

    return (
        <div className="detalhe-agendamento">
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
                                displayField={(option) => option.nomePessoa} // Exibe o campo `nomeServico`
                                uniqueKey={(option) => option.idCliente} // Usa `idServico` como chave única
                            />
                        </div>
                    ) : (
                        <p>{clienteSelecionado || event.nomeCliente}</p>
                    )}
                </div>

                <div className="detalhe-campo">
                    <label>Telefone do Cliente</label>
                    <p>{event.telefoneCliente}</p>
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
                                displayField={(option) => option.nomeServico} // Exibe o campo `nomeServico`
                                uniqueKey={(option) => option.idServico} // Usa `idServico` como chave única
                            />
                        </div>
                    ) : (
                        <p>{servicoSelecionado || event.title}</p>
                    )}
                </div>

                <div className="detalhe-campo">
                    <label>Profissional:</label>
                    {isEditing ? (
                        <div ref={dropdownRef}>
                            <SearchableDropdown
                                options={funcionarios} // Lista de funcionários
                                onSelectOption={handleFuncionarioChange}
                                placeholder={profissionalSelecionado}
                                displayField={(option) => option.title}
                                uniqueKey={(option) => option.id}
                            />
                        </div>
                    ) : (
                        <p>{profissionalSelecionado || funcionarios.title}</p>
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
                    onChange={(e) => setDescricaoServico(e.target.value)}
                    disabled={!isEditing}
                />
            </div>

            <div className="detalhe-actions">
                <Button
                    type="submit"
                    content="Cancelar Agendamento"
                    backgroundColor='#F0242D'
                    fontWeight='bold'
                    fontSize='15px'
                    size='47%'
                    onClick={() => cancelarAgendamento(event.id)}
                />
                {isEditing ? (
                    <Button
                        size='47%'
                        fontSize='15px'
                        fontWeight='bold'
                        content="Salvar"
                        backgroundColor='#28A745'
                        onClick={handleSave}
                    />
                ) : (
                    <Button
                        size='47%'
                        content="Editar"
                        fontWeight='bold'
                        fontSize='15px'
                        backgroundColor='#F9A220'
                        onClick={toggleEditing}
                    />
                )}
                {loading ? (
                    <CircularSize width="100%" height="100%" />
                ) : null}
            </div>
        </div>
    );
};

export default DetalheAgendamento;
