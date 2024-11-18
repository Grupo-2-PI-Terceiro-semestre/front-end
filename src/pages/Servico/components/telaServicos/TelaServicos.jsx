import React, { useEffect, useState } from "react";
import './TelaServicos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import LinhaTabela from "../linhaTabelaServico/LinhaTabelaServico";
import LinhaTabelaServico from "../linhaTabelaServico/LinhaTabelaServico";
import Pagination from "@mui/material/Pagination";
import Stack from '@mui/material/Stack';
import Cookies from 'js-cookie';
import CircularSize from '../../../../components/circulo-load/CircularSize';
import { findServicos } from "../../services/servicoServices";

function TelaServicos({ placeholder, titulo1, titulo2, titulo3, titulo4
}) {

    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const [servicos, setServicos] = useState([]);
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
            buscarListaServicos(user.idEmpresa, paginaAtual, 8);
        }
    }, [paginaAtual]);


    const buscarListaServicos = async (idEmpresa, pagina, tamanho) => {
        try {
            setLoading(true);
            const paginacao = { pagina: pagina - 1, tamanho };
            const response = await findServicos(idEmpresa, paginacao);

            setServicos(response.data.itens);
            console.log(JSON.stringify(response) + ' response');
            console.log('set servicos ' + setServicos);

            var totalItens = Number(response.data.totalItens);
            var totalPagsCalc = Math.ceil(totalItens / tamanho);

            setTotalPags(totalPagsCalc);
            console.log(totalPagsCalc + ' pags');
            console.log(paginaAtual + ' pag atual');

        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
            setServicos([]);
            setTotalPags(0);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event, page) => {
        console.log(`Mudando para a página: ${page}`);
        setPaginaAtual(page);
        buscarListaServicos(user.idEmpresa, page, 8);
    };

    return (
        <div className="main-tela-servicos">
            <div className="container-tela-servicos">

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
                        {Array.isArray(servicos) && servicos.length > 0 ? (
                            servicos.map((servico) => (
                                <LinhaTabelaServico
                                    key={servico.idServico}
                                    nome={servico.nomeServico}
                                    valor={servico.valorServico}
                                    descricaoServico={servico.descricao}
                                    corReferencia={servico.corReferenciaHex}
                                    tempoExecucao={servico.duracao}
                                />
                            ))
                        ) : (
                            <p className="erroCliente">Nenhum serviço encontrado.</p>
                        )}
                    </div>
                </div>

                {loading ? (
                    <CircularSize width="100%" height="100%" />
                ) : null}

                <div className="paginacao-servico">
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

export default TelaServicos;