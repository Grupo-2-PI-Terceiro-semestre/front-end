import React from "react";
import './TelaServicos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import LinhaTabela from "../linhaTabela/LinhaTabela";

function TelaServicos({ titulo, placeholder, titulo1, titulo2, titulo3, titulo4
 }) {
    const handleKeyUp = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        findByServicoOuEmpresa(value); // Chama a função com o valor atual
      };

    return (
        <div className="main-tela-servicos">
            <div className="container-tela-servicos">
                <div className="titulo">
                    <h3>{titulo}</h3>
                </div>

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
                        <LinhaTabela />
                        <LinhaTabela />
                        <LinhaTabela />
                        <LinhaTabela />
                        <LinhaTabela />
                        <LinhaTabela />
                        <LinhaTabela />
                        <LinhaTabela />
                        <LinhaTabela />
                        <LinhaTabela />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default TelaServicos;