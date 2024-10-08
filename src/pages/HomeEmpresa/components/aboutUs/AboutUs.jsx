import React from 'react';
import './AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartLine, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

function AboutUs() {
    return (
        <div id='sobre' className="main-about-us" >

            <div className="container-about-us">
                <div className="texto-principal">
                    <label htmlFor="text">Com o <b>Order Hub</b>, você facilita o agendamento de serviços, organiza suas contas e mantém tudo sob controle de forma simples e prática. Menos complicação, mais tempo para os seus clientes.</label>
                </div>

                <div className="exemplos">
                    <div className="ex1">
                        <FontAwesomeIcon icon={faUsers} beat className="icon-user" />
                        <h4 className="titulo1">700 Mil</h4>
                        <label htmlFor="text">Agendamentos por dia</label>
                    </div>

                    <div className="ex2">
                        <FontAwesomeIcon icon={faChartLine} beat className="icon-chart" />
                        <h4 className="titulo2">Foco no Crescimento</h4>
                        <label htmlFor="text">Ferramentas e insights para expandir seu negócio.</label>
                    </div>

                    <div className="ex3">
                        <FontAwesomeIcon icon={faClockRotateLeft} beat className="icon-clock" />
                        <h4 className="titulo3">Rapidez e Eficiência</h4>
                        <label htmlFor="text">Mais tempo para o que realmente importa.</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
