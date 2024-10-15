import React, { useState } from "react";
import './LinhaClientes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
// import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import ModalExcluir from "../modalExcluir/ModalExcluir";
// import ModalEditar from "../modalEditar/ModalEditar";
import ModalEditarCliente from "../modalEditarCliente/ModalEditarCliente";
// import ModalDesc from "../modalDesc/ModalDesc";

function LinhaClientes({ nome, telefone, email }) {

    const [isModalOpenEditar, setIsModalOpen] = useState(false);
    const [isModalOpenExcluir, setIsModalOpenExcluir] = useState(false);

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

                {isModalOpenExcluir && (
                    <ModalExcluir tipo="esse cliente" onClose={closeModalExcluir} />
                )}

                {/* {isModalOpenDesc && (
                    <ModalDesc onClose={closeModalDesc} />
                )} */}
            </div>

        </>
    )
}

export default LinhaClientes;