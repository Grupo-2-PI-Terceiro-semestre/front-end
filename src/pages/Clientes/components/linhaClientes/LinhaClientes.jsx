import React, { useState } from "react";
import './LinhaClientes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
// import ModalExcluir from "../../../../components/modalExcluir/ModalExcluir";
import ModalEditarCliente from "../modalEditarCliente/ModalEditarCliente";
import Swal from 'sweetalert2';

function LinhaClientes({ nome, telefone, email }) {

    const [isModalOpenEditar, setIsModalOpen] = useState(false);
    const [isModalOpenExcluir, setIsModalOpenExcluir] = useState(false);

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
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O cliente não foi excluído",
                    icon: "error"
                });
            }
        });
    };

    // const closeModalExcluir = () => {
    //     setIsModalOpenExcluir(false);
    // };

    const openModalEditar = () => {
        setIsModalOpen(true);
    };

    const closeModalEditar = () => {
        setIsModalOpen(false);
    };

    // const openModalDesc = () => {
    //     setIsModalOpenDesc(true);
    // };

    // const closeModalDesc = () => {
    //     setIsModalOpenDesc(false);
    // };

    return (
        <>
            <div className="container-linha-cliente">
                <div className="tabela">

                    <div className="linha">

                        <label htmlFor="text">{nome}</label>
                        <label htmlFor="text">{telefone}</label>
                        <label htmlFor="text">{email}</label>
                        <label className="icons" htmlFor="text">

                            <FontAwesomeIcon onClick={openModalEditar} icon={faPenToSquare} className="icon-pen" />
                            <FontAwesomeIcon onClick={openModalExcluir} icon={faTrashCan} className="icon-trash" />
                            {/* <FontAwesomeIcon onClick={openModalDesc} icon={faClipboard} className="icon-clip" /> */}
                        </label>
                    </div>
                </div>

                {isModalOpenEditar && (
                    <ModalEditarCliente onClose={closeModalEditar} titulo="Editar Cliente" />
                )}

                {/* {isModalOpenExcluir && (
                    <ModalExcluir tipo="esse cliente" onClose={closeModalExcluir} />
                )} */}

                {/* {isModalOpenDesc && (
                    <ModalDesc onClose={closeModalDesc} />
                )} */}
            </div>

        </>
    )
}

export default LinhaClientes;