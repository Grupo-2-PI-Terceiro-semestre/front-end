import React, { useState } from "react";
import './LinhaClientes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalEditarCliente from "../modalEditarCliente/ModalEditarCliente";
import Swal from 'sweetalert2';
// import { deletarCliente } from "../../services/clienteServices";
import { atualizarStatus } from "../../services/clienteServices";

function LinhaClientes({ idCliente, nome, telefone, email }) {
    const [isModalOpenEditar, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateStatus = async (idCliente) => {
        try {
            let resutado = true;

                const result = await Swal.fire({
                    title: "Atenção!",
                    text: "Você tem certeza que deseja excluir esse cliente?",
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
                    await atualizarStatus(idCliente);

                    setTimeout(() => {
                        window.location.reload(); // Recarrega a página
                    }, 300);

                } catch (error) {
                    await Swal.fire({
                        title: "Erro!",
                        text: "Erro ao cancelar o cliente!",
                        icon: "error",
                    });
                    console.error("Erro ao cancelar cliente:", error);
                }
            }
        } catch (error) {
            throw new Error("Erro ao deletar o cliente");
        }
    };

    const openModalEditar = () => setIsModalOpen(true);
    const closeModalEditar = () => setIsModalOpen(false);

    const renderTooltip = (message) => <Tooltip>{message}</Tooltip>;

    return (
        <>
            <div className="container-linha-cliente">
                <div className="tabela">
                    <div className="linha">
                        <label htmlFor="text">{nome}</label>
                        <label htmlFor="text">{telefone}</label>
                        <label htmlFor="text">{email}</label>
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
                                    onClick={() => updateStatus(idCliente)}
                                    icon={faTrashCan}
                                    className="icon-trash"
                                />
                            </OverlayTrigger>
                        </label>
                    </div>
                </div>

                {isModalOpenEditar && (
                    <ModalEditarCliente onClose={closeModalEditar} 
                    titulo="Editar Cliente" 
                    idCliente={idCliente} 
                    nome={nome} 
                    telefone={telefone} 
                    email={email}/>
                )}
            </div>
        </>
    );
}

export default LinhaClientes;
