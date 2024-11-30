import React, { useEffect, useState } from "react";
import "./Chart.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { findChartClientData, findChartServiceData, findChartReceitaServiceData } from "../../services/dashboardServices";

const Chart = ({ title, type, endPoint, idEmpresa, heightChart, widthChart, colorChart, lineColor, carregando }) => {
    const [seriesData, setSeriesData] = useState([]);
    const [xAxisData, setXAxisData] = useState([]);

    const buscarDados = async () => {
        try {
            carregando(true);
            let response;
            switch (endPoint) {
                case "receitaPorMes":
                    response = await findChartClientData(idEmpresa, endPoint);
                    break;
                case "servicoDiaSemana":
                    response = await findChartServiceData(idEmpresa, endPoint);
                    break;
                case "receitaPorServico":
                    response = await findChartReceitaServiceData(idEmpresa, endPoint);
                    break;

                default:
                    console.warn(`Endpoint ${endPoint} não reconhecido.`);
                    return;
            }
            setSeriesData(response.seriesData);
            setXAxisData(response.xAxisData);
            carregando(false);
        } catch (error) {
            console.error("Erro ao buscar os dados do gráfico", error);
            carregando(false);
        }
    };

    useEffect(() => {
        buscarDados();
    }, [endPoint]);

    const options = {
        chart: {
            type: type,
            backgroundColor: 'transparent',
            height: heightChart,
            width: widthChart,
        },
        title: {
            text: title,
        },
        series: [{
            data: seriesData,
            color: colorChart,
            marker: {
                enabled: true,
                radius: seriesData.length === 1 ? 10 : 4,
            }
        }],
        xAxis: {
            categories: xAxisData,
            labels: {
                style: {
                    color: 'white'
                }
            },
            lineColor: lineColor,
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                style: {
                    color: 'white'
                }
            },
            gridLineWidth: 0,
            lineColor: lineColor,
        },
        legend: {
            enabled: false
        }
    };

    return (
        <div className="chart_container">
            {seriesData.length === 0 ? (
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
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            )}
        </div>
    );
};

export default Chart;