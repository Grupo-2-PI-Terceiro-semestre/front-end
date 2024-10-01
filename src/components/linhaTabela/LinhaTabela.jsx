import React from "react";
import './LinhaTabela.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function LinhaTabela() {
    return (
        <>
        <div className="container-linha-tabela">
            <div className="tabela">

                <div className="linha">
                    <label htmlFor="text">Corte Masculino</label>
                    <label htmlFor="text">R$45,00</label>
                    <label htmlFor="text">00:45</label>
                    <label className="icons" htmlFor="text">
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <FontAwesomeIcon icon={faTrashCan} />
                    </label>
                </div>
            </div>
        </div>

        </>
    )
}

export default LinhaTabela;