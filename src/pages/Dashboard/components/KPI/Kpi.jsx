import React, { useEffect, useState } from "react";
import { findDashboardData } from "../../services/dashboardServices";
import "./Kpi.css";

function Kpi(props) {
    const { description, icon, iconColor, endPoint, mes, idEmpresa } = props;

    useEffect(() => {
        buscarReceitaMensal(endPoint, mes, idEmpresa);
    }, []);

    const [totalReceita, setTotalReceita] = useState(0);
    const [comparativoReceita, setComparativoReceita] = useState(0);

    const buscarReceitaMensal = async (endPoint, mes, idEmpresa) => {
        findDashboardData(idEmpresa, mes, endPoint)
            .then((response) => {
                setTotalReceita(response.totalReceita);
                setComparativoReceita(response.comparativoReceita);
            })
            .catch((error) => {
                console.error("Erro ao buscar a receita mensal", error);
            });
    };

    return (
        <div className="conteiner_kpi">
            <div className="icon_dashboard" style={{ color: iconColor }}>
                {icon}
            </div>
            <div className="content_kpi">
                <div className="valor">
                    {totalReceita}
                </div>
                <div className="description">
                    {description}
                </div>
                <div className="percent">
                    {comparativoReceita}
                </div>
            </div>
        </div>
    );
}

export default Kpi;