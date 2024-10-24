import React from "react";
import './TelaEquipe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import LinhaTabelaEquipe from "../linhaTabelaEquipe/LinhaTabelaEquipe";
// import HeaderInterna from "../../../../components/headerInterna/HeaderInterna";

function TelaEquipe({ placeholder, titulo1, titulo2, titulo3, titulo4, titulo5
 }) {
    const handleKeyUp = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        findByServicoOuEmpresa(value);
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
                        <LinhaTabelaEquipe nome="Adriana" telefone="(96) 2324-1084" funcao="Manicure" visivel="00:45" />
                        <LinhaTabelaEquipe nome="Bruno" telefone="(96) 2324-1084" funcao="Barbeiro" visivel="00:45" />
                        <LinhaTabelaEquipe nome="Fernanda" telefone="(96) 2324-1084" funcao="Cabelereira" visivel="00:45" />
                        <LinhaTabelaEquipe nome="Pedro" telefone="(96) 2324-1084" funcao="Barbeiro" visivel="00:45" />
                        <LinhaTabelaEquipe nome="Felipe" telefone="(96) 2324-1084" funcao="Barbeiro" visivel="00:45" />
                        <LinhaTabelaEquipe nome="Maria" telefone="(96) 2324-1084" funcao="Designer de sobrancelha" visivel="00:45" />
                        <LinhaTabelaEquipe nome="Viviane" telefone="(96) 2324-1084" funcao="Cabelereira" visivel="00:45" />
                        <LinhaTabelaEquipe nome="Carlos" telefone="(96) 2324-1084" funcao="Barbeiro" visivel="00:45" />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default TelaEquipe;