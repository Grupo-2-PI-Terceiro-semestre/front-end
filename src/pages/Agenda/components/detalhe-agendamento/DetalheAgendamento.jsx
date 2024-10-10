import React, { useState, useEffect } from 'react';
import './DetalheAgendamento.css'; // Estilizações
import Button from '../../../../components/button/Button';
import { findServicos } from '../../services/agendaServices';
import { TimePicker } from '@hilla/react-components/TimePicker.js';


const DetalheAgendamento = ({ event, detalhes, idEmpresa, funcionarios, onClose }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profissional, setProfissional] = useState(event.title);
    const [horarioInicio, setHorarioInicio] = useState(event.start);
    const [horarioFim, setHorarioFim] = useState(event.end);
    const [descricaoServico, setDescricaoServico] = useState(detalhes.descricaoServico);
    const [nomeCliente, setNomeCliente] = useState(detalhes.nomeCliente);
    const [telefoneCliente, setTelefoneCliente] = useState(detalhes.telefoneCliente);
    const [servicos, setServicos] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState('');
    const [profissionalSelecionado, setProfissionalSelecionado] = useState('');


    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        buscarServicos(idEmpresa);
        setServicoSelecionado(event.title);
        setProfissionalSelecionado(event.nomeFuncionario)
        console.log('Detalhes:', event.descricaoServico);
    }, [idEmpresa, event.title]);

    const buscarServicos = async (idEmpresa) => {
        try {
            const response = await findServicos(idEmpresa);
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar os serviços:', error);
        }
    };

    const handleSave = () => {
        console.log('Dados salvos:', { profissional, horarioInicio, horarioFim, descricaoServico, servicoSelecionado });
        setIsEditing(false);
    };

    return (
        <div className="detalhe-agendamento">
            <h3>Detalhes do Agendamento</h3>

            <div className="detalhe-campo">
                <label>Nome do Cliente</label>
                <p>{event.nomeCliente}</p>

            </div>
            <div className="detalhe-campo">
                <label>Telefone do Cliente</label>
                <p>{event.telefoneCliente}</p>

            </div>
            <div className="detalhe-campo">
                <label>Serviço:</label>
                {isEditing ? (
                    <select
                        value={servicoSelecionado}
                        onChange={(e) => setServicoSelecionado(e.target.value)}
                    >
                        {servicos.map((servico) => (
                            <option key={servico.idServico} value={servico.nomeServico}>
                                {servico.nomeServico}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>{servicos.find(serv => serv.nomeServico === servicoSelecionado)?.nomeServico || event.title}</p>
                )}
            </div>

            <div className="detalhe-campo">
                <label>Profissional:</label>
                {isEditing ? (
                    <select
                        value={profissionalSelecionado} // Use o estado para armazenar o profissional selecionado
                        onChange={(e) => setProfissionalSelecionado(e.target.value)}
                    >
                        {funcionarios.map((profissional) => (
                            <option key={profissional.id} value={profissional.title}>
                                {profissional.title}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>{funcionarios.find(prof => prof.title === profissionalSelecionado)?.title || event.nomeFuncionario}</p>
                )}
            </div>
            <div className="detalhe-campo horarios-container">
                <div className="horario-item">
                    <label>Horário de Início</label>
                    {isEditing ? (
                        <TimePicker
                            value={"05:30"} // Usa o estado do horário de início
                            step={60 * 30} // Intervalo de 30 minutos
                            autoOpenDisabled
                        />
                    ) : (
                        <p>{"05:30"}</p> // Mostra o horário de início quando não está editando
                    )}
                </div>

                <div className="horario-item">
                    <label>Horário Final</label>
                    {isEditing ? (
                        <TimePicker
                            value={"05:30"} // Usa o estado do horário de fim
                            step={60 * 30} // Intervalo de 30 minutos
                            autoOpenDisabled
                        />
                    ) : (
                        <p>{"05:30"}</p> // Mostra o horário de fim quando não está editando
                    )}
                </div>
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
                    fontSize='15px'
                    size='47%'
                    onClick={onClose}
                />
                {isEditing ? (
                    <Button
                        size='47%'
                        fontSize='15px'
                        content="Salvar"
                        backgroundColor='#28A745'
                        onClick={handleSave}
                    />
                ) : (
                    <Button
                        size='47%'
                        content="Editar"
                        fontSize='12px'
                        backgroundColor='#F9A220'
                        onClick={toggleEditing}
                    />
                )}
            </div>
        </div>
    );
};

export default DetalheAgendamento;
