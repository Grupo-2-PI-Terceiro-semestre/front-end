import React, { useState, useEffect } from "react";
import './ModalAddCliente.css';
import Swal from 'sweetalert2';
import HeadeModal from "../../../../components/header-modal/HeaderModal";
import { createCliente, findClientes } from "../../services/clienteServices";
import Cookies from 'js-cookie';

function ModalAddCliente({ onCloseCliente, titulo, refreshDate }) {
    const [formData, setFormData] = useState({
        nomePessoa: '',
        numeroTelefone: '',
        emailPessoa: '',
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

    const criarCliente = async (cliente) => {
        setLoading(true);
        try {
            await createCliente(cliente);
            console.log("Cliente criado com sucesso:", cliente);
            buscarListaClientes(user.idEmpresa, paginaAtual, 8);
            setLoading(false);
            setTimeout(() => onCloseCliente(), 3000);
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        // const paginacao = { pagina: pagina - 1, tamanho };
        idEmpresa = user.idEmpresa;
        console.log(idEmpresa + ' id empresa');

        event.preventDefault(); // Evita o refresh da página
        console.log("Dados do Cliente:", formData); // Exibe os valores no console
        criarCliente(formData); // Envia os dados ao servidor

        Swal.fire({
            title: "Confirmar cadastro?",
            text: "Deseja realmente cadastrar este cliente?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, cadastrar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Cadastrado!", "O cliente foi cadastrado.", "success");
            } else {
                Swal.fire("Cancelado", "O cliente não foi cadastrado.", "error");
            }
        });

        
    };

    const buscarListaClientes = async (idEmpresa, pagina, tamanho) => {
        try {
            setLoading(true);
            const paginacao = { pagina: pagina - 1, tamanho };
            const response = await findClientes(idEmpresa, paginacao);

            setClientes(response.data.itens);
            console.log(JSON.stringify(response) + ' response');
            console.log('set clientes ' + setClientes);

            var totalItens = Number(response.data.totalItens);
            var totalPagsCalc = Math.ceil(totalItens / tamanho);

            setTotalPags(totalPagsCalc);
            console.log(totalPagsCalc + ' pags');
            console.log(paginaAtual + ' pag atual');

        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
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
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="nomePessoa"
                                placeholder="Nome do Cliente"
                                value={formData.nomePessoa}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Telefone:</label>
                            <input
                                type="text"
                                name="numeroTelefone"
                                placeholder="(XX) XXXXX-XXXX"
                                value={formData.numeroTelefone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>E-mail:</label>
                            <input
                                type="email"
                                name="emailPessoa"
                                placeholder="Digite o email"
                                value={formData.emailPessoa}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="botaoCadastrar">
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalAddCliente;