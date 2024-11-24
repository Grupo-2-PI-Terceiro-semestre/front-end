import React, { useState } from "react";
import './HeaderCliente.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalAddCliente from "../modalAddCliente/ModalAddCliente";

function HeaderCliente({ texto }) {

    const [isModalOpenCliente, setIsModalOpenCliente] = useState(false);

    const openModalAddCliente = () => {
        setIsModalOpenCliente(true);
    };

    const closeModalAddCliente = () => {
        setIsModalOpenCliente(false);
    };

    return (
        <div className="main-header-interna">
            <div className="container-header-interna">
                <div className="botao">
                    <button onClick={openModalAddCliente}>
                        <FontAwesomeIcon icon={faPlus} /> {texto}
                    </button>
                </div>


                {isModalOpenCliente && (
                    <ModalAddCliente
                        titulo="Cadastrar Cliente"
                        onCloseCliente={() => setIsModalOpenCliente(false)}
                    />
                )}
            </div>


        </div>
    );
}

export default HeaderCliente;
