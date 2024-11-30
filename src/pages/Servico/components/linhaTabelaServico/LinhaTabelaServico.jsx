import React, { useState } from "react";
import './LinhaTabelaServico.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faClipboard } from '@fortawesome/free-regular-svg-icons';
// import ModalExcluir from "../../../../components/modalExcluir/ModalExcluir";
import ModalEditar from "../modalEditar/ModalEditar";
import ModalDesc from "../../../../components/modalDesc/ModalDesc";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Swal from 'sweetalert2';
import { atualizarStatus } from "../../services/servicoServices";

function LinhaTabelaServico({ idServico, nome, valor, tempoExecucao, corReferencia, descricaoServico }) {
    const [isModalOpenEditar, setIsModalOpen] = useState(false);
    const [isModalOpenExcluir, setIsModalOpenExcluir] = useState(false);
    const [isModalOpenDesc, setIsModalOpenDesc] = useState(false);
    const [modalDescData, setModalDescData] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [detalhes, setDetalhes] = useState([]);
    const [loading, setLoading] = useState(false);

    // const openModalExcluir = () => setIsModalOpenExcluir(true);
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

    const updateStatus = async (idServico) => {
        try {
            let resutado = true;

                const result = await Swal.fire({
                    title: "Atenção!",
                    text: "Você tem certeza que deseja excluir esse serviço?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sim",
                });
                resutado = result.isConfirmed;

            if (resutado) {

                setLoading(true);
                try {
                    await atualizarStatus(idServico);

                    setTimeout(() => {
                        window.location.reload(); // Recarrega a página
                    }, 300);

                } catch (error) {
                    await Swal.fire({
                        title: "Erro!",
                        text: "Erro ao cancelar o serviço!",
                        icon: "error",
                    });
                    console.error("Erro ao cancelar serviço:", error);
                }
            }
        } catch (error) {
            throw new Error("Erro ao deletar o serviço");
        }
    };

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
                                    onClick={() => updateStatus(idServico)}
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
                        idServico={idServico}
                        nome={nome}
                        valor={valor}
                        tempo={tempoExecucao}
                        cor={corReferencia}
                        descricaoServico={descricaoServico}
                    />
                )}

                {/* {isModalOpenExcluir && (
                    <ModalExcluir tipo="esse serviço" onClose={closeModalExcluir} />
                )} */}

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
