import React from "react";
import "./Dashboard.css";
import Menu from "../../components/menu/Menu";
import Chart from "./components/chart/Chart";
import CardDashboard from "./components/cardDashboard/CardDashboard";
import Kpi from "./components/KPI/Kpi";
import TabelaDashboard from "./components/Tabela/TabelaDashboard";
import Cookies from 'js-cookie';
import CircularSize from "../../components/circulo-load/CircularSize";
import { useState } from "react";
import { IoStatsChart} from "react-icons/io5";
import { FaRegCheckSquare, FaTicketAlt, FaRegClock } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { icon } from "@fortawesome/fontawesome-svg-core";




function Dashboard() {
    const activeMenuItem = "Dashboard";


    const mesAtual = new Date().getMonth() + 1;
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

    const [loading, setLoading] = useState(false);
    const carregando = (value) => {
        setLoading(value);
    }

    const kpis = [
        {
            endPoint: 'agendamentos/empresa',
            idEmpresa: user.idEmpresa,
            mes: mesAtual.toString(),
            description: "Receita Total",
            icon: <IoStatsChart />,
            iconColor: "#FEB95A",
            formatarValor: true,
            mensagemMes: true,
            iconSize: '24px',
        },
        {
            endPoint: "agendamentos/servicos",
            idEmpresa: user.idEmpresa,
            mes: mesAtual.toString(),
            description: "Total de Serviços",
            icon: <FaRegCheckSquare />,
            iconColor: "#A9DFD8",
            mensagemMes: true,
            iconSize: '24px'
        },
        {
            endPoint: "agendamentos/novosClientes",
            idEmpresa: user.idEmpresa,
            description: "Novos clientes",
            icon: <FaRegCircleUser />,
            iconColor: "#20AEF3",
            mensagemMes: true,
            iconSize: '24px'
        },
        {
            endPoint: "agendamentos/ticket",
            idEmpresa: user.idEmpresa,
            description: "Ticket Médio",
            icon: <FaTicketAlt />,
            iconColor: "#3CD856",
            formatarValor: true,
            iconSize: '24px'
        },
        {
            endPoint: "agendamentos/aReceber",
            idEmpresa: user.idEmpresa,
            description: "Receita a Receber",
            icon: <FaRegClock />,
            iconColor: "#F5D007",
            formatarValor: true,
            iconSize: '24px'
        },
    ];

    return (
        <div className="main-dashboard">
            <Menu activeMenuItem={activeMenuItem} />
            <div className="conteudo-dashboard">
                <div className="superior">
                    <div class="quadradoKPI">
                        {kpis.map((kpi, index) => (
                            <Kpi carregando={carregando} key={index} {...kpi} />
                        ))}
                    </div>
                </div>
                <div className="meio">
                    <CardDashboard title="Total de Clientes por dia da semana" height="250px" width="410px" >
                        <Chart
                            title=""
                            type="column"
                            endPoint="servicoDiaSemana"
                            idEmpresa={user.idEmpresa}
                            heightChart={200}
                            colorChart={''}
                            lineColor={'white'}
                            carregando={carregando}
                        />

                    </CardDashboard>
                    <CardDashboard title="Total de Receita por Serviço" height="250px" width="410px">
                        <Chart
                            title=""
                            type="bar"
                            endPoint="receitaPorServico"
                            idEmpresa={user.idEmpresa}
                            heightChart={200}
                            colorChart={''}
                            lineColor={'white'}
                            carregando={carregando}
                        />
                    </CardDashboard>
                    <CardDashboard title="Receita por Funcionário" height="250px" width="410px">
                        <TabelaDashboard headers={['Atendente', 'Receita']} idEmpresa={user.idEmpresa} endPoint="receitaPorFuncionario" carregando={carregando} />
                    </CardDashboard>
                </div>
                <div className="inferior">
                    <CardDashboard title="Próximos Atendimentos" height="270px" width="620px">
                        <TabelaDashboard headers={['Cliente', 'Servico', 'Dia', 'Hora', 'Atendente']} idEmpresa={user.idEmpresa} endPoint="agendamentos" carregando={carregando} />
                    </CardDashboard>
                    <CardDashboard title="Receita por Mês" height="270px" width="620px">
                        <Chart
                            type="spline"
                            endPoint="receitaPorMes"
                            idEmpresa={user.idEmpresa}
                            heightChart={200}
                            widthChart={600}
                            colorChart={'#3CD856'}
                            lineColor={'white'}
                            carregando={carregando}
                        />
                    </CardDashboard>

                </div>
            </div>

            {loading && <CircularSize />}

        </div >
    );
}

export default Dashboard;