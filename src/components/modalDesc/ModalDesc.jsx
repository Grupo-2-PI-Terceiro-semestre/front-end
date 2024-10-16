import React from "react";
import './ModalDesc.css';

function ModalDesc({onClose}) {
    return(

        <div className="main-desc">
            <div className="container-desc">
                <div className="borda">
                    <h1 className="titulo">Descrição <button className="botaoDesc" onClick={onClose}>X</button></h1>

                    <label htmlFor="text">Corte de cabelo para homens cis hétero top, logo, Elizeu Duarte Filho</label>
                </div>


            </div>

        </div>

    )
}

export default ModalDesc;