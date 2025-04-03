import React, { useEffect, useState } from "react";
import "./TabelaDashboard.css";
import { findListaAgendamentos, findListaReceitaPorFuncionario } from "../../services/dashboardServices";

function TabelaDashboard({ headers, idEmpresa, endPoint, carregando }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        buscarDados();
    }, [endPoint]);

    const buscarDados = async () => {
        if (!idEmpresa) {
            return;
        }
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

    const getNoDataMessage = () => {
        switch (endPoint) {
            case "agendamentos":
                return "Seus próximos agendamentos do dia aparecerão aqui.";
            case "receitaPorFuncionario":
                return "A receita por funcionário aparecerá aqui.";
            default:
                return "Nenhuma informação disponível.";
        }
    };

    const formatarData = (data) => {
        const [ano, mes, dia] = data.split('-');
        return `${dia}-${mes}-${ano}`;
    };

    return (
        <div className="tabela-dashboard-container">
            {data.length === 0 ? (
                <div className="no-data-container">
                    <p className="no-data-message">
                        {getNoDataMessage()}
                    </p>
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