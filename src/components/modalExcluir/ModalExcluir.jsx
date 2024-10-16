import React from "react";
import './ModalExcluir.css';

function ModalExcluir({ onClose, tipo }) {
    return (
        <div className="modal-tela">
            <div className="container-modal">
                <div className="modal-inside">
                    <div className="simbolos">
                        <div className="imagem">
                            <img src="../../assets/simboloAtencao.png" alt="" />
                        </div>
                        <button className="botaoFechar" onClick={onClose}>X</button>
                    </div>
                    <div className="textos">
                        <label className="titulo-atencao" htmlFor="text"><b>Atenção!</b></label>
                    <label htmlFor="text">Tem certeza que deseja excluir {tipo}?</label>
                    </div>

                    <div className="botoes">
                        <button className="cancelar" onClick={onClose}>Cancelar</button>
                        <button className="excluir" >Excluir</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalExcluir;