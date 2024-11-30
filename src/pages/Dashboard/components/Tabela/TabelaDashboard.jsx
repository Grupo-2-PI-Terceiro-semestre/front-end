import React, { useEffect, useState } from "react";
import "./TabelaDashboard.css";
import { findListaAgendamentos, findListaReceitaPorFuncionario } from "../../services/dashboardServices";

function TabelaDashboard({ headers, idEmpresa, endPoint, carregando }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        buscarDados();
    }, [endPoint]);

    const buscarDados = async () => {
        try {
            carregando(true);
            let response;
            switch (endPoint) {
                case "agendamentos":
                    response = await findListaAgendamentos(idEmpresa);
                    break;
                case "receitaPorFuncionario":
                    response = await findListaReceitaPorFuncionario(idEmpresa);
                    break;
                default:
                    console.warn(`Endpoint ${endPoint} não reconhecido.`);
                    return;
            }
            setData(response);
            carregando(false);
        } catch (error) {
            console.error("Erro ao buscar os dados", error);
            carregando(false);
        }
    };

    return (
        <div className="tabela-dashboard-container">
            {data.length === 0 ? (
                <div className="no-data-container">
                <p className="no-data-message">
                    Parece que é a sua primeira vez acessando a dashboard. <br />
                    Para começar, cadastre um novo agendamento.
                </p>
                <button
                    className="go-to-schedule-button"
                    onClick={() => window.location.href = '/agenda'} // Altere a rota conforme sua estrutura
                >
                    Ir para Agenda
                </button>
            </div>
            ) : (
                <table className="tabela-dashboard">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="linha-tabela">
                                {headers.map((header, cellIndex) => (
                                    <td key={cellIndex}>{row[header]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TabelaDashboard;