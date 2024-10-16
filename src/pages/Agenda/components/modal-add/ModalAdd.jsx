import React, { useState, useEffect, useRef } from "react";
import './ModalAdd.css';
import { findServicos, findClientes } from '../../services/agendaServices';
import SearchableDropdown from '../autocomplete/SearchableDropdown';
import DateTimePickerOpenTo from '../input-horas/DateTimePickerOpenTo';
import Button from '../../../../components/button/Button';
import HeadeModal from "../../../../components/header-modal/HeaderModal";
import dayjs from 'dayjs';




function ModalAdd({ onClose, idEmpresa, funcionarios, dateDefault }) {

    const [servicos, setServicos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState('');
    const [clienteSelecionado, setClienteSelecionado] = useState('');
    const [profissionalSelecionado, setProfissionalSelecionado] = useState('');
    const [dataHoraAgendamento, setDataHoraAgendamento] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const dropdownRef = useRef(null);



    useEffect(() => {
        buscarServicos(idEmpresa);
        buscarClientes(idEmpresa)
        setIsVisible(true);
        setDataHoraAgendamento(dateDefault);
    }, [idEmpresa]);

    const handleServicoChange = (servico) => {
        setServicoSelecionado(servico.nomeServico);
    };

    const handleFuncionarioChange = (funcionario) => {
        setProfissionalSelecionado(funcionario.title);
    };

    const handleClientesChange = (cliente) => {
        setClienteSelecionado(cliente.nomePessoa);
    };

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

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 400);
    };

    const isDisabled = () => {
        if (
            servicoSelecionado === '' ||
            clienteSelecionado === '' ||
            profissionalSelecionado === '' ||
            !dataHoraAgendamento
        ) {
            return true;
        }

        const agora = dayjs(); // Data e hora atual
        const agendamento = dayjs(dataHoraAgendamento); // Data e hora selecionada

        if (agendamento.isBefore(agora)) {
            return true;
        }

        return false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(servicoSelecionado + clienteSelecionado + profissionalSelecionado + dataHoraAgendamento);
        try {
        } catch (error) {
            setErrorMessage('Erro ao cadastrar o serviço.');
        }
    };

    return (
        <div className={`modal-agendamento ${isVisible ? 'modal-aberto' : 'modal-fechado'}`}>
            <div className="container-modal">
                <HeadeModal title="Agendar Serviço" handleClose={handleClose} />
                <form className="form-modal" onSubmit={handleSubmit}>
                    <div className="form-agendamento">
                        <div className='inputLabel'>
                            <label>Cliente:</label>
                            <div ref={dropdownRef}>
                                <SearchableDropdown
                                    options={clientes} // Lista de serviços
                                    onSelectOption={handleClientesChange}
                                    displayField={(option) => option.nomePessoa}
                                    uniqueKey={(option) => option.idCliente}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-agendamento">
                        <div className='inputLabel'>
                            <label>Serviço:</label>
                            <div ref={dropdownRef}>
                                <SearchableDropdown
                                    options={servicos}
                                    placeholder={"Selecione um serviço"}
                                    onSelectOption={handleServicoChange}
                                    displayField={(option) => option.nomeServico}
                                    uniqueKey={(option) => option.idServico}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-agendamento">
                        <div className='inputLabel'>
                            <label>Profissional:</label>
                            <div ref={dropdownRef}>
                                <SearchableDropdown
                                    options={funcionarios}
                                    placeholder={"Selecione um profissional"}
                                    onSelectOption={handleFuncionarioChange}
                                    displayField={(option) => option.title}
                                    uniqueKey={(option) => option.id}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-agendamento">
                        <div className='inputLabel'>
                            <label htmlFor="categoria">Data e Hora do Agendamento:</label>
                            <DateTimePickerOpenTo
                                valordefault={new Date()}
                                onChange={(newValue) => setDataHoraAgendamento(newValue)} // Atualiza o estado no componente pai
                            />
                        </div>
                    </div >
                    <div className="button-agendar">
                        <Button
                            type="submit"
                            content="Agendar"
                            backgroundColor='#2196f3'
                            disabled={isDisabled()}
                            fontSize='15px'
                            onClick={handleSubmit}
                            size='47%'
                        />
                    </div>
                </form >
            </div>
        </div>

    )
}

export default ModalAdd;