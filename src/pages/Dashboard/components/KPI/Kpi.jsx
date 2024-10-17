import React from "react";
import "./Kpi.css";

function Kpi(props) {
    const { valor, description, icon, percent, iconColor } = props;

    return (
        <div className="conteiner_kpi">
            <div className="icon_dashboard" style={{ color: iconColor }}>
                {icon}
            </div>
            <div className="content_kpi">
                <div className="valor">
                    {valor}
                </div>
                <div className="description">
                    {description}
                </div>
                <div className="percent">
                    {percent}
                </div>
            </div>
        </div>
    );
}

export default Kpi;