import React, { useState } from "react";
import './HeaderInterna.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalAdd from "../modalAdd/ModalAdd";

function HeaderInterna({ texto }) {

    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

    const openModalAdd = () => {
        setIsModalOpen(true); // Abrir o modal
    };

    const closeModalAdd = () => {
        setIsModalOpen(false); // Fechar o modal
    };

    return (
        <div className="main-header-interna">
            <div className="container-header-interna">
                <div className="botao">
                    <button onClick={openModalAdd}>
                        <FontAwesomeIcon icon={faPlus} /> {texto}
                    </button>
                </div>

                {isModalOpen && (
                    <ModalAdd onClose={closeModalAdd} titulo="Adicionar Novo Serviço" />
                )}
            </div>


        </div>
    );
}

export default HeaderInterna;
