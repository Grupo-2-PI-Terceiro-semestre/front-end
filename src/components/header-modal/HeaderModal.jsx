import React from "react";
import './HeaderModal.css';


export default function HeadeModal({title, handleClose}) {
    return (
        <h4 className="header-modal">{title}<span className="botaoFechar" onClick={handleClose}>X</span></h4>
    );
}