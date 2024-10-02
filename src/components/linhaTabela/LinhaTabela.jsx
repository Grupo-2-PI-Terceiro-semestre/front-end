import React from "react";
import './LinhaTabela.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function LinhaTabela({nome, valor, tempoExecucao }) {
    return (
        <>
        <div className="container-linha-tabela">
            <div className="tabela">

                <div className="linha">
                    <label htmlFor="text">{nome}</label>
                    <label htmlFor="text">{valor}</label>
                    <label htmlFor="text">{tempoExecucao}</label>
                    <label className="icons" htmlFor="text">
                        <FontAwesomeIcon icon={faPenToSquare} className="icon-pen" />
                        <FontAwesomeIcon icon={faTrashCan} className="icon-trash" />
                    </label>
                </div>
            </div>
        </div>

        </>
    )
}

export default LinhaTabela;