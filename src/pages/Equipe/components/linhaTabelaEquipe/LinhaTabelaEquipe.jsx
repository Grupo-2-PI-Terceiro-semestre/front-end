import React, { useState } from "react";
import './LinhaTabelaEquipe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function LinhaTabelaEquipe({ nome, telefone, funcao, visivel }) {
    const [isModalOpenEditar, setIsModalOpen] = useState(false);
    const [isModalOpenExcluir, setIsModalOpenExcluir] = useState(false);
    const [isModalOpenDesc, setIsModalOpenDesc] = useState(false);

    const openModalEditar = () => setIsModalOpen(true);
    const closeModalEditar = () => setIsModalOpen(false);

    const openModalExcluir = () => setIsModalOpenExcluir(true);
    const closeModalExcluir = () => setIsModalOpenExcluir(false);

    const openModalDesc = () => setIsModalOpenDesc(true);
    const closeModalDesc = () => setIsModalOpenDesc(false);

    const renderTooltip = (message) => <Tooltip>{message}</Tooltip>;

    return (
        <>
            <div className="container-linha-tabela">
                <div className="tabela">
                    <div className="linha">
                        <label htmlFor="text">{nome}</label>
                        <label htmlFor="text">{telefone}</label>
                        <label htmlFor="text">{funcao}</label>
                        <label htmlFor="text">{visivel}</label>
                        <label className="icons" htmlFor="text">
                            <OverlayTrigger
                                placement="top"
                                overlay={renderTooltip("Editar")}
                            >
                                <FontAwesomeIcon
                                    onClick={openModalEditar}
                                    icon={faPenToSquare}
                                    className="icon-pen"
                                />
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="top"
                                overlay={renderTooltip("Excluir")}
                            >
                                <FontAwesomeIcon
                                    onClick={openModalExcluir}
                                    icon={faTrashCan}
                                    className="icon-trash"
                                />
                            </OverlayTrigger>
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
    );
}

export default LinhaTabelaEquipe;
