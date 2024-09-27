import React from "react";
import './Previa.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import {faChartColumn} from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

function Previa () {
    return(
        <div className="main-previa">
            <div className="container-previa">
                <div className="imagem">
                    <img src="../../assets/telaNote.png" alt="" />
                </div>

                <div className="paragrafo">
                    <div className="textos">
                        <h2>Explore o <b>OrderHub</b></h2>
                        <label htmlFor="texto">Conheça as funcionalidades que ajudarão a gerenciar seu estabelecimento com mais eficiência e facilidade. Veja como tudo funciona e o que você terá à disposição</label>
                    </div>

                    <div className="icones">
                        <div className="icone1">
                            <FontAwesomeIcon icon={faCalendarDays} className="icon-calendar" /> <b><label htmlFor="text">Recursos básicos</label></b>
                        </div>

                        <div className="icone2">
                            <FontAwesomeIcon icon={faCircleCheck} className="icon-check" /> <b><label htmlFor="text">Checkout completo</label></b>
                        </div>

                        <div className="icone3">
                            <FontAwesomeIcon icon={faChartColumn} className="icon-chart-column" /> <b><label htmlFor="text">Estatísticas & Relatórios</label></b>
                        </div>

                        <div className="icone4">
                        <FontAwesomeIcon icon={faUsers} className="icon-user" /> <b><label htmlFor="text">Gestão da Equipe e dos turnos</label></b>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Previa;