import React from "react";
import "./CardDashboard.css";
import Chart from "../chart/chart";

function CardDashboard(props) {
  const { title, children, height, width } = props;

  return (
    <div className="conteiner" style={{ height: height, width: width }}>
      <div className="titulo">
        <h1>{title}</h1>
      </div>
      <div className="conteudo">
        {children}
      </div>
    </div>
  );
}

export default CardDashboard;