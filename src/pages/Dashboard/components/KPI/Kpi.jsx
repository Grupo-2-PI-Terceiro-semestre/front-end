import React, { useEffect, useState, useCallback } from "react";
import { findDashboardData } from "../../services/dashboardServices";
import "./Kpi.css";

function Kpi(props) {
    const { description, icon, iconColor, endPoint, mes, idEmpresa, formatarValor, mensagemMes } = props;

    const [dados, setDados] = useState({ valor: 0, percent: 0 });

    
    const buscarDados = useCallback(async () => {
        try {
            const response = await findDashboardData(idEmpresa, mes, endPoint);

            switch (endPoint) {
                case "agendamentos/empresa":
                    setDados({ valor: response.totalReceita, percent: response.comparativoReceita });
                    break;
                case "agendamentos/servicos":
                    setDados({ valor: response.totalServicos, percent: response.comparativoServicos });
                    break;
                case "agendamentos/ticket":
                    setDados({ valor: response.ticketMedio, percent: 0 });
                    break;
                case "agendamentos/aReceber":
                    setDados({ valor: response, percent: 0 });
                    break;
                case "agendamentos/novosClientes":
                    
                    setDados({ valor: response.totalClientes, percent: response.comparativoClientes });
                    console.log(response.totalClientes + " " + response.comparativoClientes);
                    break;
                default:
                    console.warn(`Endpoint ${endPoint} não reconhecido.`);
            }
        } catch (error) {
            console.error("Erro ao buscar os dados", error);
        }
    }, [idEmpresa, mes, endPoint]);

    useEffect(() => {
        buscarDados();
    }, [buscarDados]);

    const formatarValorFunc = (valor) => {
        if (isNaN(valor)) {
            return "Valor inválido";
        }
        if (formatarValor) {
            return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
        }
        return valor;
    };

    const ajustarCasasDecimais = (valor) => {
        if (isNaN(valor)) {
            return "Valor inválido";
        }
        return valor.toFixed(2);
    }

    const ajustarCor = (valor) => {
        if (valor > 0) {
            
            return "#3CD856";
        } else if (valor < 0) {
            return "#FF0000";
        }
    }

    const mensagemComparativoMes = (valor) => {
        if (valor > 0) {
            return `+${ajustarCasasDecimais(valor)}% mês anterior`;
        } else if (valor < 0) {
            return `+${ajustarCasasDecimais(valor)}% mês anterior`;
        }
    }
    return (
        <div className="conteiner_kpi">
            <div className="icon_dashboard" style={{ color: iconColor }}>
                {icon}
            </div>
            <div className="content_kpi">
                <div className="valor">
                    {formatarValorFunc(dados.valor)}
                </div>
                <div className="description">
                    {description}
                </div>
                {mensagemMes && (
                    <div className="percent" style={{ color: ajustarCor(dados.percent) }}>
                         {mensagemComparativoMes(dados.percent)}
                </div>
                )}
            </div>
        </div>
    );
}

export default Kpi;