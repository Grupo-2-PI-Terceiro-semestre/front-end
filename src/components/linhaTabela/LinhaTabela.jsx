import React, { useState } from "react";
import './LinhaTabela.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import ModalExcluir from "../modalExcluir/ModalExcluir";
import ModalEditar from "../modalAdd/ModalAdd";

function LinhaTabela({ nome, valor, tempoExecucao }) {

    const [isModalOpenEditar, setIsModalOpen] = useState(false); // Estado para controlar o modal
    const [isModalOpenExcluir, setIsModalOpenExcluir] = useState(false); // Estado para controlar o modal

    const openModalExcluir = () => {
        setIsModalOpenExcluir(true); // Abrir o modal
    };

    const closeModalExcluir = () => {
        setIsModalOpenExcluir(false); // Fechar o modal
    };

    const openModalEditar = () => {
        setIsModalOpen(true); // Abrir o modal
    };

    const closeModalEditar = () => {
        setIsModalOpen(false); // Fechar o modal
    };

    return (
        <>
            <div className="container-linha-tabela">
                <div className="tabela">

                    <div className="linha">
                        <label htmlFor="text">{nome}</label>
                        <label htmlFor="text">{valor}</label>
                        <label htmlFor="text">{tempoExecucao}</label>
                        <label className="icons" htmlFor="text">
                            <FontAwesomeIcon onClick={openModalEditar} icon={faPenToSquare} className="icon-pen" />
                            <FontAwesomeIcon onClick={openModalExcluir} icon={faTrashCan} className="icon-trash" />
                        </label>
                    </div>
                </div>
        
                {isModalOpenExcluir && (
                    <ModalExcluir onClose={closeModalExcluir} />
                )}

                {isModalOpenEditar && (
                    <ModalEditar onClose={closeModalEditar} />
                )}
            </div>

        </>
    )
}

export default LinhaTabela;