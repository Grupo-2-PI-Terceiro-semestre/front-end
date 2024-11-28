import React, { useEffect, useState } from "react";
import './TelaClientes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import LinhaClientes from "../linhaClientes/LinhaClientes";
import Pagination from "@mui/material/Pagination";
import Stack from '@mui/material/Stack';
import { findClientes } from "../../services/clienteServices";
import Cookies from 'js-cookie';
import CircularSize from '../../../../components/circulo-load/CircularSize';

function TelaClientes({ placeholder, titulo1, titulo2, titulo3, titulo4
}) {

    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalPags, setTotalPags] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleKeyUp = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        findByServicoOuEmpresa(value);
    };

    useEffect(() => {
        if (user && user.idEmpresa) {
            buscarListaClientes(user.idEmpresa, paginaAtual, 8);
        }
    }, [paginaAtual]);
    

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

    const handlePageChange = (event, page) => {
        console.log(`Mudando para a página: ${page}`);
        setPaginaAtual(page);
        buscarListaClientes(user.idEmpresa, page, 8);  
    };

    return (
        <div className="main-tela-clientes">
            <div className="container-tela-clientes">

                <div className="search-box">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                    <input
                        type="text"
                        placeholder={placeholder}
                        onKeyUp={handleKeyUp}
                    />
                </div>

                <div className="tabelaCompleta">
                    <div className="tituloTabela">
                        <label htmlFor="text">{titulo1}</label>
                        <label htmlFor="text">{titulo2}</label>
                        <label htmlFor="text">{titulo3}</label>
                        <label htmlFor="text">{titulo4}</label>
                    </div>

                    <div className="conjuntoLinhas">
                        {Array.isArray(clientes) && clientes.length > 0 ? (
                            clientes.map((cliente) => (
                                <LinhaClientes
                                    idCliente={cliente.idCliente}
                                    nome={cliente.nomePessoa}
                                    telefone={cliente.telefone}
                                    email={cliente.email}
                                />
                            ))
                        ) : (
                            <p className="erroCliente">Nenhum cliente encontrado.</p>
                        )}
                    </div>


                    {loading ? (
                        <CircularSize width="100%" height="100%" />
                    ) : null}

                    <div className="paginacao">
                        <Stack spacing={2}>
                            <Pagination
                                count={totalPags}
                                page={paginaAtual}
                                onChange={handlePageChange}
                                size="large"
                            />
                        </Stack>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TelaClientes;