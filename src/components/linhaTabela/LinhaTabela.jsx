import React, { useState } from "react";
import './LinhaTabela.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import ModalExcluir from "../modalExcluir/ModalExcluir";
import ModalEditar from "../modalEditar/ModalEditar";
import ModalDesc from "../modalDesc/ModalDesc";

function LinhaTabela({ nome, valor, tempoExecucao, categoria }) {

    const [isModalOpenEditar, setIsModalOpen] = useState(false);
    const [isModalOpenExcluir, setIsModalOpenExcluir] = useState(false);
    const [isModalOpenDesc, setIsModalOpenDesc] = useState(false);

    const openModalExcluir = () => {
        setIsModalOpenExcluir(true);
    };

    const closeModalExcluir = () => {
        setIsModalOpenExcluir(false);
    };

    const openModalEditar = () => {
        setIsModalOpen(true);
    };

    const closeModalEditar = () => {
        setIsModalOpen(false);
    };

    const openModalDesc = () => {
        setIsModalOpenDesc(true);
    };

    const closeModalDesc = () => {
        setIsModalOpenDesc(false);
    };

    return (
        <>
            <div className="container-linha-tabela">
                <div className="tabela">

                    <div className="linha">
                        <div className="cor">
                            
                        </div>
                        <label htmlFor="text">{nome}</label>
                        <label htmlFor="text">{valor}</label>
                        <label htmlFor="text">{tempoExecucao}</label>
                        <label htmlFor="text">{categoria}</label>
                        <label className="icons" htmlFor="text">

                            <FontAwesomeIcon onClick={openModalEditar} icon={faPenToSquare} className="icon-pen" />
                            <FontAwesomeIcon onClick={openModalExcluir} icon={faTrashCan} className="icon-trash" />
                            <FontAwesomeIcon onClick={openModalDesc} icon={faClipboard} className="icon-clip" />
                        </label>
                    </div>
                </div>

                {isModalOpenEditar && (
                    <ModalEditar onClose={closeModalEditar} titulo="Editar Serviço" />
                )}

                {isModalOpenExcluir && (
                    <ModalExcluir tipo="esse serviço" onClose={closeModalExcluir} />
                )}

                {isModalOpenDesc && (
                    <ModalDesc onClose={closeModalDesc} />
                )}
            </div>

        </>
    )
}

export default LinhaTabela;