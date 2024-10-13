import React, { useState, useEffect, useRef } from 'react';
import './DetalheAgendamento.css'; // Estilizações
import Button from '../../../../components/button/Button';
import { findServicos, findClientes } from '../../services/agendaServices';
import DateTimePickerOpenTo from '../input-horas/DateTimePickerOpenTo';
import SearchableDropdown from '../autocomplete/SearchableDropdown';


const DetalheAgendamento = ({ event, detalhes, idEmpresa, funcionarios, onClose }) => {
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

    const dropdownRef = useRef(null); // Ref para o dropdown

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

        }
    }

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
                                options={clientes} // Lista de serviços
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
                    onClick={onClose}
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
            </div>
        </div>
    );
};

export default DetalheAgendamento;
