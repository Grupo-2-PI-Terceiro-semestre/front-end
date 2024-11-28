import React, { useState } from "react";
import './LinhaClientes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalEditarCliente from "../modalEditarCliente/ModalEditarCliente";
import Swal from 'sweetalert2';

function LinhaClientes({ idCliente, nome, telefone, email }) {
    const [isModalOpenEditar, setIsModalOpen] = useState(false);

    const openModalExcluir = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Tem certeza?",
            text: "Não será possível reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Não, cancelar!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Excluído!",
                    text: "O cliente foi excluído.",
                    icon: "success"
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O cliente não foi excluído",
                    icon: "error"
                });
            }
        });
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
                                    onClick={openModalExcluir}
                                    icon={faTrashCan}
                                    className="icon-trash"
                                />
                            </OverlayTrigger>
                        </label>
                    </div>
                </div>

                {isModalOpenEditar && (
                    <ModalEditarCliente onClose={closeModalEditar} titulo="Editar Cliente" idCliente={idCliente} nome={nome} telefone={telefone} email={email}/>
                )}
            </div>
        </>
    );
}

export default LinhaClientes;
