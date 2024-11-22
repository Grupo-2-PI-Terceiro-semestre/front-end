import React, { useState, useEffect } from 'react';
import './ModalAddAgend.css';
import { findServicos, findClientes, createAgendamento } from '../../services/agendaServices';
import SearchableDropdown from '../autocomplete/SearchableDropdown';
import DateTimePickerOpenTo from '../input-horas/DateTimePickerOpenTo';
import Button from '../../../../components/button/Button';
import HeadeModal from "../../../../components/header-modal/HeaderModal";
import dayjs from 'dayjs';
import { ToastContainer } from 'react-toastify';
import { successToast, errorToast } from '../../../../utils/Toats'
import 'react-toastify/dist/ReactToastify.css';
import { converterGMTParaBrasilia } from '../../../../utils/FormatDate';
import CircularSize from '../../../../components/circulo-load/CircularSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalClienteAgend from '../modal-add-cliente/ModalClienteAgend';
import Tooltip from '@mui/material/Tooltip';

function ModalAddAgend({ onClose, idEmpresa, funcionarios, dateDefault, refreshDate }) {

    const [servicos, setServicos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState('');
    const [clienteSelecionado, setClienteSelecionado] = useState('');
    const [profissionalSelecionado, setProfissionalSelecionado] = useState('');
    const [dataHoraAgendamento, setDataHoraAgendamento] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalOpenAddCliente, setIsModalOpen] = useState(false);

    const clientesSessao = localStorage.getItem('clientes') ? JSON.parse(localStorage.getItem('clientes')) : null;
    const servicosSessao = localStorage.getItem('servicos') ? JSON.parse(localStorage.getItem('servicos')) : null;

    useEffect(() => {
        if (clientesSessao == null || servicosSessao == null) {
            buscarServicos(idEmpresa);
            buscarClientes(idEmpresa)
        } else {
            setClientes(clientesSessao);
            setServicos(servicosSessao);
        }
        setIsVisible(true);
        setDataHoraAgendamento(dateDefault);
    }, [idEmpresa]);

    const handleServicoChange = (servico) => {
        setServicoSelecionado(servico.idServico);
    };

    const handleFuncionarioChange = (funcionario) => {
        setProfissionalSelecionado(funcionario.id);
    };

    const handleClientesChange = (cliente) => {
        setClienteSelecionado(cliente.idCliente);
    };

    const buscarServicos = async (idEmpresa) => {
        try {
            const response = await findServicos(idEmpresa);
            localStorage.setItem('servicos', JSON.stringify(response.data));
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar os serviços:', error);
        }
    };

    const buscarClientes = async (idEmpresa) => {
        try {
            const response = await findClientes(idEmpresa);
            localStorage.setItem('clientes', JSON.stringify(response.data));
            setClientes(response.data)
        } catch (error) {

        }
    }

    const criarAgendamento = async (agendamento) => {
        setLoading(true);
        try {
            await createAgendamento(agendamento);
            successToast('Agendamento criado com sucesso!');
            refreshDate(new Date(dataHoraAgendamento));

            setLoading(false);

            setTimeout(() => {
                onClose();
            }, 3000);

        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            setLoading(false);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 400);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const agora = dayjs();
        const agendamento = dayjs(dataHoraAgendamento);


        if (dataHoraAgendamento != undefined || dataHoraAgendamento != null) {
            if (agendamento.isBefore(agora)) {
                errorToast('Data e hora do agendamento não pode ser menor que a data e hora atual');
                return;
            }

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const agendamentoData = {
                idCliente: clienteSelecionado,
                idServico: servicoSelecionado,
                idAgenda: profissionalSelecionado,
                dataAgendamento: converterGMTParaBrasilia(dataHoraAgendamento),
                statusAgendamento: 'PENDENTE'
            }

            criarAgendamento(agendamentoData);
        } else {
            errorToast('Selecione uma data e hora para o agendamento');
        }
    };

    const openModalAddCliente = () => {
        setIsModalOpen(true);
    };

    const closeModalAddCliente = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`modal-agendamento ${isVisible ? 'modal-aberto' : 'modal-fechado'}`}>
            <div className="container-modal">
                <HeadeModal title="Agendar Serviço" handleClose={handleClose} />
                <form className="form-modal" onSubmit={handleSubmit} noValidate>
                    <div className="form-agendamento">
                        <div className='inputLabel'>
                            <label>Cliente: </label>
                            <div className="cliente-plus">
                                <div className="input-cliente-plus">
                                    <SearchableDropdown className="input-cliente"
                                        options={clientes}
                                        required={true}
                                        onSelectOption={handleClientesChange}
                                        displayField={(option) => option.nomePessoa}
                                        uniqueKey={(option) => option.idCliente}
                                    />
                                </div>

                                <Tooltip title="Adicionar Cliente" arrow>
                                    <FontAwesomeIcon icon={faPlus} onClick={openModalAddCliente} className="icon-plus" />
                                </Tooltip>
                            </div>
                        </div>
                    </div>

                    <div className="form-agendamento">
                        <div className='inputLabel'>
                            <label>Serviço:</label>
                            <SearchableDropdown
                                options={servicos}
                                required={true}
                                placeholder={"Selecione um serviço"}
                                onSelectOption={handleServicoChange}
                                displayField={(option) => option.nomeServico}
                                uniqueKey={(option) => option.idServico}
                            />
                        </div>
                    </div>

                    <div className="form-agendamento">
                        <div className='inputLabel'>
                            <label>Profissional:</label>
                            <SearchableDropdown
                                options={funcionarios}
                                required={true}
                                placeholder={"Selecione um profissional"}
                                onSelectOption={handleFuncionarioChange}
                                displayField={(option) => option.title}
                                uniqueKey={(option) => option.id}
                            />
                        </div>
                    </div>

                    <div className="form-agendamento">
                        <div className='inputLabel'>
                            <label htmlFor="categoria">Data e Hora do Agendamento:</label>
                            <DateTimePickerOpenTo
                                required={true}
                                onChange={(newValue) => setDataHoraAgendamento(newValue)}
                            />
                        </div>
                    </div>

                    <div className="button-agendar">
                        <Button
                            type="submit"
                            content="Agendar"
                            backgroundColor='#2196f3'
                            fontSize='15px'
                            size='47%'
                        />
                    </div>
                </form>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
                {loading ? (
                    <CircularSize width="100%" height="100%" />
                ) : null}
            </div>

            {isModalOpenAddCliente && (
                <ModalClienteAgend onClose={closeModalAddCliente} />
            )}
        </div>

    )
}

export default ModalAddAgend;