import React, { useEffect, useState } from "react";
import "./Chart.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { findChartClientData } from "../../services/dashboardServices";

const Chart = ({ title, type, endPoint, idEmpresa, heightChart, widthChart, colorChart, lineColor }) => {
    const [seriesData, setSeriesData] = useState([]);
    const [xAxisData, setXAxisData] = useState([]);

    const buscarDados = async () => {
        try {
            const response = await findChartClientData(idEmpresa, endPoint);
            setSeriesData(response.seriesData);
            setXAxisData(response.xAxisData);
        } catch (error) {
            console.error("Erro ao buscar os dados do gráfico", error);
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
                enabled: false
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
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default Chart;