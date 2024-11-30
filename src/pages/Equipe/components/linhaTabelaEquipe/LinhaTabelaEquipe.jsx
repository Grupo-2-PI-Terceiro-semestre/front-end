import React, { useState } from "react";
import './LinhaTabelaEquipe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalEditarEquipe from "../modalEditarEquipe/ModalEditarEquipe";
import Swal from 'sweetalert2';
import { atualizarStatus } from "../../services/equipeServices";

function LinhaTabelaEquipe({idPessoa, nome, telefone, email, funcao, idFuncao }) {

    const [isModalOpenEditar, setIsModalOpen] = useState(false);
    const [isModalOpenExcluir, setIsModalOpenExcluir] = useState(false);
    const [isModalOpenDesc, setIsModalOpenDesc] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModalEditar = () => setIsModalOpen(true);
    const closeModalEditar = () => setIsModalOpen(false);

    // const openModalExcluir = () => setIsModalOpenExcluir(true);
    const closeModalExcluir = () => setIsModalOpenExcluir(false);

    const openModalDesc = () => setIsModalOpenDesc(true);
    const closeModalDesc = () => setIsModalOpenDesc(false);

    const renderTooltip = (message) => <Tooltip>{message}</Tooltip>;

    const updateStatus = async (idPessoa) => {
        try {
            let resutado = true;

                const result = await Swal.fire({
                    title: "Atenção!",
                    text: "Você tem certeza que deseja excluir esse colaborador?",
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
                    await atualizarStatus(idPessoa);
                    setTimeout(() => {
                        window.location.reload(); // Recarrega a página
                    }, 300);

                } catch (error) {
                    await Swal.fire({
                        title: "Erro!",
                        text: "Erro ao cancelar o colaborador!",
                        icon: "error",
                    });
                    console.error("Erro ao cancelar colaborador:", error);
                }
            }
        } catch (error) {
            throw new Error("Erro ao deletar o colaborador");
        } 
    };

    return (
        <>
            <div className="container-linha-tabela">
                <div className="tabela">
                    <div className="linha">
                        {/* <label htmlFor="text">{idFuncao}</label> */}
                        <label htmlFor="text">{nome}</label>
                        <label htmlFor="text">{telefone}</label>
                        <label htmlFor="text">{email}</label>
                        <label htmlFor="text">{funcao}</label>
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
                                    onClick={() => updateStatus(idPessoa)}
                                    icon={faTrashCan}
                                    className="icon-trash"
                                />
                            </OverlayTrigger>
                        </label>
                    </div>
                </div>

                {isModalOpenEditar && (
                    <ModalEditarEquipe onClose={closeModalEditar} titulo="Editar Colaborador" 
                    idPessoa={idPessoa} 
                    nome={nome} 
                    telefone={telefone} 
                    email={email} 
                    funcao={funcao} 
                    idFuncao={idFuncao}/>
                )}

                {/* {isModalOpenExcluir && (
                    <ModalExcluir tipo="esse colaborador" onClose={closeModalExcluir} />
                )} */}

                {isModalOpenDesc && (
                    <ModalDesc onClose={closeModalDesc} />
                )}
            </div>
        </>
    );
}

export default LinhaTabelaEquipe;
