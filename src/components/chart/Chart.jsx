import React from "react";
import "./Chart.css";
import Highcharts, { color, Legend } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const Chart = ({ title, type, seriesData, xAxisData, heightChart, widthChart,colorChart, lineColor }) => {
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