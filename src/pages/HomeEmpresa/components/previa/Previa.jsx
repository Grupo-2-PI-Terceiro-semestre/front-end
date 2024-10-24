import React, { useState } from "react";
import './Previa.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faHandshake, faChartColumn, faUsers } from '@fortawesome/free-solid-svg-icons';
import telaNote from '../../../../assets/telaNoteEscura.png';  
import gerClientes from '../../../../assets/telaClientes.png';
import estatisticas from '../../../../assets/dash.png';
import equipe from '../../../../assets/func.png';


function Previa() {
    const [imagemAtual, setImagemAtual] = useState(telaNote);

    const [iconeSelecionado, setIconeSelecionado] = useState('icone1');  // Estado inicial com o ícone 1 selecionado

    // Função que muda a imagem e o ícone selecionado
    const handleIconClick = (novaImagem, icone) => {
        setImagemAtual(novaImagem);   // Muda a imagem
        setIconeSelecionado(icone);   // Atualiza qual ícone está selecionado
    };

    return (
        <div id="preview" className="main-previa">
            <div className="container-previa">
                <div className="imagem">
                    {/* A imagem muda conforme o estado */}
                    <img src={imagemAtual} alt="Previa funcionalidade" />
                </div>

                <div className="paragrafo">
                    <div className="textos">
                        <h2>Explore o <b>OrderHub</b></h2>
                        <label htmlFor="texto">Conheça as funcionalidades que ajudarão a gerenciar seu estabelecimento com mais eficiência e facilidade. Veja como tudo funciona e o que você terá à disposição</label>
                    </div>

                    <div className="icones">
                        {/* Ícone 1: Recursos básicos */}
                        <div 
                            className={`icone1 ${iconeSelecionado === 'icone1' ? 'ativo' : ''}`}
                            onClick={() => handleIconClick(telaNote, 'icone1')}
                        >
                            <FontAwesomeIcon icon={faCalendarDays} className="icon-calendar" />
                            <b><label htmlFor="text">Recursos básicos</label></b>
                        </div>

                        {/* Ícone 2: Gerenciamento de Clientes */}
                        <div
                            className={`icone2 ${iconeSelecionado === 'icone2' ? 'ativo' : ''}`}
                            onClick={() => handleIconClick(gerClientes, 'icone2')}
                        >
                            <FontAwesomeIcon icon={faHandshake} className="icon-hands" />
                            <b><label htmlFor="text">Gerenciamento de Clientes</label></b>
                        </div>

                        {/* Ícone 3: Estatísticas & Relatórios */}
                        <div
                            className={`icone3 ${iconeSelecionado === 'icone3' ? 'ativo' : ''}`}
                            onClick={() => handleIconClick(estatisticas, 'icone3')}
                        >
                            <FontAwesomeIcon icon={faChartColumn} className="icon-chart-column" />
                            <b><label htmlFor="text">Estatísticas & Relatórios</label></b>
                        </div>

                        {/* Ícone 4: Gestão da Equipe */}
                        <div
                            className={`icone4 ${iconeSelecionado === 'icone4' ? 'ativo' : ''}`}
                            onClick={() => handleIconClick(equipe, 'icone4')}
                        >
                            <FontAwesomeIcon icon={faUsers} className="icon-user" />
                            <b><label htmlFor="text">Gestão da Equipe</label></b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Previa;