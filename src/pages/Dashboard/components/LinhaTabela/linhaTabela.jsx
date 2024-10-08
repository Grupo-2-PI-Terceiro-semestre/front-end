import React from "react";
import "./LinhaTabela.css";


function LinhaTabela(props) {
    const { data} = props;

    return (
        <tr className="linha-tabela">
            {data.map((item, index) => (
                <td key={index}>{item}</td>
            ))}
        </tr>
    );
}

export default LinhaTabela;