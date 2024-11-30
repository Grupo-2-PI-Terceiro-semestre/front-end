import React, { useState, useEffect } from "react";
import './ModalAddCliente.css';
import HeadeModal from "../../../../components/header-modal/HeaderModal";
import { createCliente, findClientes } from "../../services/clienteServices";
import Cookies from 'js-cookie';
import { successToast, errorToast } from '../../../../utils/Toats';
import CircularProgress from '@mui/material/CircularProgress';

function ModalAddCliente({ onCloseCliente, titulo, refreshDate }) {

    const [formData, setFormData] = useState({
        nomePessoa: '',
        numeroTelefone: '',
        emailPessoa: '',
        statusAtividade: 'ATIVO',
        tiposDeUsuario: 'ADMIN'
    });

    const [isVisibleAddCliente, setIsVisibleAdd] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const [clientes, setClientes] = useState([]);
    const [totalPags, setTotalPags] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);

    useEffect(() => {
        setIsVisibleAdd(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const criarCliente = async (cliente, idEmpresa) => {
        setLoading(true);
        try {
            await createCliente(cliente, idEmpresa);
            successToast('Cliente criado com sucesso!');

            console.log("Cliente criado com sucesso:", cliente);

            buscarListaClientes(user.idEmpresa, paginaAtual, 8);

            setTimeout(() => onCloseCliente(), 3000);

            setTimeout(() => {
                window.location.reload(); // Recarrega a página
            }, 300);
        } catch (error) {
            errorToast('Cliente não criado');

        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const idEmpresa = user.idEmpresa;

        criarCliente(formData, idEmpresa);

    };


    const buscarListaClientes = async (idEmpresa, pagina, tamanho) => {
        try {
            setLoading(true);
            const paginacao = { pagina: pagina - 1, tamanho };
            const response = await findClientes(idEmpresa, paginacao);

            setClientes(response.data.itens);

            var totalItens = Number(response.data.totalItens);
            var totalPagsCalc = Math.ceil(totalItens / tamanho);

            setTotalPags(totalPagsCalc);

        } catch (error) {
            errorToast('Cliente não encontrado');
            setClientes([]);
            setTotalPags(0);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setIsVisibleAdd(false);
        setTimeout(onCloseCliente, 300);
    };

    return (
        <div className={`modal-overlay ${isVisibleAddCliente ? 'visible' : 'hidden'}`}>
            <div className="modal-header">
                <div className="container-modal">
                    <HeadeModal title={titulo} handleClose={onCloseCliente} />
                    <form className="form-modal" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className='inputLabel'>
                                <label>Nome:</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="nomePessoa"
                                    placeholder="Nome do Cliente"
                                    value={formData.nomePessoa}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className='inputLabel'>
                                <label>Telefone:</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="numeroTelefone"
                                    placeholder="(XX) XXXXX-XXXX"
                                    value={formData.numeroTelefone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className='inputLabel'>
                                <label>E-mail:</label>
                                <input
                                    className="input"
                                    type="email"
                                    name="emailPessoa"
                                    placeholder="Digite o email"
                                    value={formData.emailPessoa}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="botao-add-serv">
                            <button type="submit" className="botaoCadastrar" disabled={loading}>
                                {loading ? 'Cadastrando...' : 'Cadastrar'}
                            </button>
                        </div>

                        {/* {loading && (
                            <div className="loading-icon">
                                <CircularProgress size={35} />
                            </div>
                        )} */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalAddCliente;