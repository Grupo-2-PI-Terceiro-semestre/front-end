import React, { useState } from "react";
import './HeaderInterna.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalAddEquipe from "../modalAddEquipe/ModalAddEquipe";

function HeaderInterna({ texto }) {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModalAdd = () => {
        setIsModalOpen(true);
    };

    const closeModalAdd = () => {
        setIsModalOpen(false);
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

                    <ModalAddEquipe
                        titulo="Cadastrar Colaborador"
                        onClose={() => setIsModalOpen(false)}
                    />
                )}

            </div>


        </div>
    );
}

export default HeaderInterna;
