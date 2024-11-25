import React, { useState, useEffect } from "react";
import './ModalAddEquipe.css';
import HeadeModal from "../../../../components/header-modal/HeaderModal";
import Cookies from 'js-cookie';
import { successToast, errorToast } from '../../../../utils/Toats';
import { createColaborador, findFuncoes } from "../../services/equipeServices";
import SearchableDropdown from '../autocomplete/SearchableDropdown';
// import Tooltip from '@mui/material/Tooltip';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import ModalAddFuncao from "../modalAddFuncao/ModalAddFuncao";

function ModalAddEquipe({ onClose, titulo }) {
    const [isVisibleAdd, setIsVisibleAdd] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const [clientes, setClientes] = useState([]);
    const [totalPags, setTotalPags] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [funcoes, setFuncoes] = useState([]);
    const [isModalOpenAddFuncao, setIsModalOpen] = useState(false);
    const [funcaoSelecionado, setFuncaoSelecionada] = useState('');

    const [nomeSelecionado, setNomeSelecionado] = useState('');


    const [formData, setFormData] = useState({
        nomePessoa: '',
        numeroTelefone: '',
        nomeFuncao: '',
        tiposDeUsuario: 'ADMIN'
    });

    useEffect(() => {
        setIsVisibleAdd(true);
        buscarFuncoes();
    }, []);

    const handleClose = () => {
        setIsVisibleAdd(false); // Inicia a animação de saída
        setTimeout(onClose, 300); // Fecha o modal após a animação
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const criarColaborador = async (colaborador, idEmpresa) => {
        setLoading(true);
        try {
            await createColaborador(colaborador, idEmpresa);
            successToast('Colaborador criado com sucesso!');

            console.log("Colaborador criado com sucesso:", colaborador);

            buscarListaUsuarios(user.idEmpresa, paginaAtual, 8);

            setTimeout(() => onCloseEquipe(), 3000);
        } catch (error) {
            errorToast('Colaborador não criado');

        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {

        const colaboradorData = {
            // idCliente: clienteSelecionado,
            // idServico: servicoSelecionado,
            // idAgenda: profissionalSelecionado,
            // dataAgendamento: converterGMTParaBrasilia(dataHoraAgendamento),
            // statusAgendamento: 'PENDENTE'

            nomePessoa: nomePessoa
        }

        console.log(colaboradorData + ' colaborador data');

        event.preventDefault();

        const idEmpresa = user.idEmpresa;

        criarColaborador(formData, idEmpresa);

    };

    const buscarFuncoes = async () => {
        try {
            const response = await findFuncoes();
            localStorage.setItem('funcoes', JSON.stringify(response.data));
            setFuncoes(response.data);

            console.log(funcoes + ' funções');
        } catch (error) {

        }
    }

    const buscarListaUsuarios = async (idEmpresa, pagina, tamanho) => {
        try {
            setLoading(true);
            const paginacao = { pagina: pagina - 1, tamanho };
            const response = await findUsuarios(idEmpresa, paginacao);

            setUsuarios(response.data.itens);
            console.log(JSON.stringify(response) + ' response');
            console.log('set usuarios ' + setUsuarios);

            var totalItens = Number(response.data.totalItens);
            var totalPagsCalc = Math.ceil(totalItens / tamanho);

            setTotalPags(totalPagsCalc);
            console.log(totalPagsCalc + ' pags');
            console.log(paginaAtual + ' pag atual');

        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            setServicos([]);
            setTotalPags(0);
        } finally {
            setLoading(false);
        }
    };

    // const handleNomeChange (nomePessoa) => {
    //     setNomeSelecionado(funcao.nomePessoa);
    // }

    const handleFuncoesChange = (funcao) => {
        setFuncaoSelecionada(funcao.idFuncao);
        nomeFuncao = funcao.nomeFuncao;
        console.log(nomeFuncao + ' nome da função no handle change');
    };

    const openModalAddFuncao = () => {
        setIsModalOpen(true);
    };

    const closeModalAddFuncao = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`modal-overlay ${isVisibleAdd ? 'visible' : 'hidden'}`}>
            <div className="modal-header">
                <div className="container-modal">
                    <HeadeModal title={titulo} handleClose={onClose} />
                    <form className="form-modal-serv" onSubmit={handleSubmit}>
                        <div className="form-grupo-serv">
                            <div className='inputLabel'>
                                <label>Nome:</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="nomePessoa"
                                    placeholder="Nome do Colaborador"
                                    value={nomePessoa}
                                    onChange={handleNomeChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grupo-serv">
                            <div className='inputLabel'>
                                <label>Telefone:</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="numeroTelefone"
                                    placeholder="(XX)XXXXX-XXXX"
                                    value={formData.numeroTelefone}
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                        </div>

                        <div className="form-grupo-serv">
                            <div className='inputLabel'>
                                <label>Função</label>
                                <SearchableDropdown className="input-cliente"
                                    name="nomeFuncao"
                                    options={funcoes}
                                    required={true}
                                    value={formData.nomeFuncao}
                                    onSelectOption={handleFuncoesChange}
                                    displayField={(option) => option.nomeFuncao}
                                    uniqueKey={(option) => option.idFuncao}
                                />
                            </div>

                            {/* <Tooltip title="Adicionar Cliente" arrow>
                                <FontAwesomeIcon icon={faPlus} onClick={openModalAddFuncao} className="icon-plus" />
                            </Tooltip> */}

                        </div>

                        {/* <div className='inputLabel'>
                            <label>Cliente: </label>
                            <div className="cliente-plus">
                                <div className="input-cliente-plus">
                                    <SearchableDropdown className="input-cliente"
                                        options={clientes}
                                        required={true}
                                        value={''}
                                        onSelectOption={handleClientesChange}
                                        displayField={(option) => option.nomePessoa}
                                        uniqueKey={(option) => option.idCliente}
                                    />
                                </div>


                            </div>
                        </div> */}


                        <div className="botao-add-serv">
                            <button type="submit" className="botaoCadastrar">
                                Cadastrar
                            </button>
                        </div>
                    </form >
                </div>
            </div>

            {/* {isModalOpenAddFuncao && (
                <ModalAddFuncao onClose={closeModalAddFuncao} />
            )} */}
        </div>
    )
}

export default ModalAddEquipe;