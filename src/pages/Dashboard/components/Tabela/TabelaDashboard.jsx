import React from "react";
import "./TabelaDashboard.css";

function TabelaDashboard({ headers, data }) {
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
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaDashboard;