import React, { useState } from "react";
import './LinhaTabelaEquipe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

function LinhaTabelaEquipe({ nome, telefone, funcao, visivel }) {

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
                        {/* <div className="cor">
                            
                        </div> */}
                        <label htmlFor="text">{nome}</label>
                        <label htmlFor="text">{telefone}</label>
                        <label htmlFor="text">{funcao}</label>
                        <label htmlFor="text">{visivel}</label>
                        <label className="icons" htmlFor="text">

                            <FontAwesomeIcon onClick={openModalEditar} icon={faPenToSquare} className="icon-pen" />
                            <FontAwesomeIcon onClick={openModalExcluir} icon={faTrashCan} className="icon-trash" />
                        </label>
                    </div>
                </div>

                {isModalOpenEditar && (
                    <ModalEditar onClose={closeModalEditar} titulo="Editar Colaborador" />
                )}

                {isModalOpenExcluir && (
                    <ModalExcluir tipo="esse colaborador" onClose={closeModalExcluir} />
                )}

                {isModalOpenDesc && (
                    <ModalDesc onClose={closeModalDesc} />
                )}
            </div>

        </>
    )
}

export default LinhaTabelaEquipe;