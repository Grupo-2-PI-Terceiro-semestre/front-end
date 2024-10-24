import React, { useState, useEffect, useRef } from "react";
import './ModalAdd.css';
import { findServicos, findClientes, createAgendamento } from '../../services/agendaServices';
import SearchableDropdown from '../autocomplete/SearchableDropdown';
import DateTimePickerOpenTo from '../input-horas/DateTimePickerOpenTo';
import Button from '../../../../components/button/Button';
import HeadeModal from "../../../../components/header-modal/HeaderModal";
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { converterGMTParaBrasilia } from '../../../../utils/FormatDate';
import CircularSize from '../../../../components/circulo-load/CircularSize';



function ModalAdd({ onClose, idEmpresa, funcionarios, dateDefault, refreshDate }) {

    const [servicos, setServicos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState('');
    const [clienteSelecionado, setClienteSelecionado] = useState('');
    const [profissionalSelecionado, setProfissionalSelecionado] = useState('');
    const [dataHoraAgendamento, setDataHoraAgendamento] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        buscarServicos(idEmpresa);
        buscarClientes(idEmpresa)
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
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar os serviços:', error);
        }
    };

    const criarAgendamento = async (agendamento) => {
        setLoading(true);
        try {
            await createAgendamento(agendamento);
            toast.success('Agendamento criado com sucesso!');
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


    const buscarClientes = async (idEmpresa) => {
        try {
            const response = await findClientes(idEmpresa);
            setClientes(response.data)
        } catch (error) {

        }
    }

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
                toast.error("Data Inválida, por favor selecione uma data futura!");
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
                dataAgendamento: converterGMTParaBrasilia(dataHoraAgendamento)
            }

            criarAgendamento(agendamentoData);
        } else {
            toast.error("Insira uma data e hora válida!");
        }
    };

    return (
        <div className={`modal-agendamento ${isVisible ? 'modal-aberto' : 'modal-fechado'}`}>
            <div className="container-modal">
                <HeadeModal title="Agendar Serviço" handleClose={handleClose} />
                <form className="form-modal" onSubmit={handleSubmit} noValidate>
                    <div className="form-agendamento">
                        <div className='inputLabel'>
                            <label>Cliente:</label>
                            <SearchableDropdown
                                options={clientes}
                                required={true}
                                onSelectOption={handleClientesChange}
                                displayField={(option) => option.nomePessoa}
                                uniqueKey={(option) => option.idCliente}
                            />
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
        </div>

    )
}

export default ModalAdd;