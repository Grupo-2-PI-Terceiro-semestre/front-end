import React, { useEffect, useState } from "react";
import "./TabelaDashboard.css";
import {findListaAgendamentos} from "../../services/dashboardServices";

function TabelaDashboard({ headers, idEmpresa }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        buscarListaAgendameno();
    }, []);

    const buscarListaAgendameno = async () => {
        try {
            const response = await findListaAgendamentos(idEmpresa);
            setData(response);
        } catch (error) {
            console.error("Erro ao buscar os dados", error);
        }
    }

    return (
        <div className="tabela-dashboard-container">
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
        </div>
    );
}

export default TabelaDashboard;