import React, { useState } from "react";
import './LinhaTabelaServico.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faClipboard } from '@fortawesome/free-regular-svg-icons';
import ModalExcluir from "../../../../components/modalExcluir/ModalExcluir";
import ModalEditar from "../modalEditar/ModalEditar";
import ModalDesc from "../../../../components/modalDesc/ModalDesc";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function LinhaTabelaServico({ nome, valor, tempoExecucao, corReferencia, descricaoServico }) {
    const [isModalOpenEditar, setIsModalOpen] = useState(false);
    const [isModalOpenExcluir, setIsModalOpenExcluir] = useState(false);
    const [isModalOpenDesc, setIsModalOpenDesc] = useState(false);
    const [modalDescData, setModalDescData] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [detalhes, setDetalhes] = useState([]);

    const openModalExcluir = () => setIsModalOpenExcluir(true);
    const closeModalExcluir = () => setIsModalOpenExcluir(false);
    const openModalEditar = () => setIsModalOpen(true);
    const closeModalEditar = () => setIsModalOpen(false);

    const openModalDesc = () => {
        setModalDescData(descricaoServico); // Define a descrição do serviço
        setIsModalOpenDesc(true); // Abre o modal
    }; const closeModalDesc = () => setIsModalOpenDesc(false);

    const renderTooltip = (message) => (
        <Tooltip>{message}</Tooltip>
    );

    return (
        <>
            <div className="container-linha-tabela">
                <div className="tabela">
                    <div className="linha">
                        <div className="cor" style={{ backgroundColor: corReferencia }}></div>
                        <label htmlFor="text">{nome}</label>
                        <label htmlFor="text">{valor}</label>
                        <label htmlFor="text">{tempoExecucao}</label>

                        <label className="icons">
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

                            <OverlayTrigger
                                placement="top"
                                overlay={renderTooltip("Detalhes")}
                            >
                                <FontAwesomeIcon
                                    onClick={openModalDesc}
                                    icon={faClipboard}
                                    className="icon-clip"
                                />
                            </OverlayTrigger>
                        </label>
                    </div>
                </div>

                {isModalOpenEditar && (
                    <ModalEditar
                        onClose={closeModalEditar}
                        titulo="Editar Serviço"
                        // nome, valor, tempoExecucao, corReferencia, descricaoServico
                        nome={nome}
                        valor={valor}
                        tempo={tempoExecucao}
                        cor={corReferencia}
                        descricaoServico={descricaoServico}
                    />
                )}

                {isModalOpenExcluir && (
                    <ModalExcluir tipo="esse serviço" onClose={closeModalExcluir} />
                )}

                {isModalOpenDesc && (
                    <ModalDesc
                        onClose={closeModalDesc}
                        descricao={descricaoServico}
                    />
                )}

            </div>
        </>
    );
}

export default LinhaTabelaServico;
