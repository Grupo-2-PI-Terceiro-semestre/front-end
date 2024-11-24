import React, { useState } from "react";
import './HeaderServico.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import ModalAddServico from "../../pages/Servicos/components/modalAddServico/ModalAddServico";
import ModalAddServico from "../modalAddServico/ModalAddServico";

function HeaderServico({ texto }) {

    const [isModalOpenServico, setIsModalOpenServico] = useState(false);

    const openModalAddServico = () => {
        setIsModalOpenServico(true);
    };

    const closeModalAddServico = () => {
        setIsModalOpenServico(false);
    };

    return (
        <div className="main-header-interna">
            <div className="container-header-interna">
                <div className="botao">
                    <button onClick={openModalAddServico}>
                        <FontAwesomeIcon icon={faPlus} /> {texto}
                    </button>
                </div>


                {isModalOpenServico && (
                    <ModalAddServico
                        titulo="Cadastrar Serviço"
                        onCloseServico={() => setIsModalOpenServico(false)}
                    />
                )}
            </div>


        </div>
    );
}

export default HeaderServico;
