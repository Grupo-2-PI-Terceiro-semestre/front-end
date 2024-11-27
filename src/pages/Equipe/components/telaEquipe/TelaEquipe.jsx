import React, { useEffect, useState } from "react";
import './TelaEquipe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import LinhaTabelaEquipe from "../linhaTabelaEquipe/LinhaTabelaEquipe";
import Pagination from "@mui/material/Pagination";
import Stack from '@mui/material/Stack';
import Cookies from 'js-cookie';
import CircularSize from '../../../../components/circulo-load/CircularSize';
import { findUsuarios } from "../../services/equipeServices";

function TelaEquipe({ placeholder, titulo1, titulo2, titulo3, titulo4, titulo5
}) {

    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const [usuario, setUsuarios] = useState([]);
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
            buscarListaUsuarios(user.idEmpresa, paginaAtual, 8);
        }
    }, [paginaAtual]);

    const buscarListaUsuarios = async (idEmpresa, pagina, tamanho) => {
        debugger
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

    const handlePageChange = (event, page) => {
        console.log(`Mudando para a página: ${page}`);
        setPaginaAtual(page);
        buscarListaUsuarios(user.idEmpresa, page, 8);
    };

    return (
        <div className="main-tela-equipe">
            <div className="container-tela-equipe">

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
                        <label htmlFor="text">{titulo5}</label>
                    </div>

                    <div className="conjuntoLinhas">
                        {Array.isArray(usuario) && usuario.length > 0 ? (
                            usuario.map((usuario) => (
                                // console.log(usuario.idPessoa)
                                <LinhaTabelaEquipe
                                    idPessoa={usuario.idPessoa}
                                    nome={usuario.nomePessoa != null ? usuario.nomePessoa : 'Sem nome'}
                                    telefone={usuario.numeroTelefone != null ? usuario.numeroTelefone : 'Sem telefone'}
                                    email={usuario.emailPessoa != null ? usuario.emailPessoa : 'Sem e-mail'}
                                    funcao={usuario.funcao.nomeFuncao != null ? usuario.funcao.nomeFuncao : 'Sem função'}
                                    // idPessoa={usuario.idPessoa}
                                />
                            ))
                        ) : (
                            <p className="erroCliente">Nenhum cliente encontrado.</p>
                        )}
                        
                    </div>
                </div>

                {loading ? (
                    <CircularSize width="100%" height="100%" />
                ) : null}

                <div className="paginacao-equipe">
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
    )
}

export default TelaEquipe;