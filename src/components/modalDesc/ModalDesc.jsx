import React from "react";
import './ModalDesc.css';

function ModalDesc({onClose, descricao}) {
    return(

        <div className="main-desc">
            <div className="container-desc">
                <div className="borda">
                    <h1 className="titulo">Descrição <button className="botaoDesc" onClick={onClose}>X</button></h1>

                    <label htmlFor="text">{descricao}</label>
                </div>


            </div>

        </div>

    )
}

export default ModalDesc;