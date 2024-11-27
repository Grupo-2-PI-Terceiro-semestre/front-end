import React from "react";
import "./Dashboard.css";
import Menu from "../../components/menu/Menu";
import Chart from "./components/chart/Chart";
import CardDashboard from "./components/cardDashboard/CardDashboard";
import Kpi from "./components/KPI/Kpi";
import TabelaDashboard from "./components/Tabela/TabelaDashboard";
import Cookies from 'js-cookie';

function Dashboard() {
    const activeMenuItem = "Dashboard";


    const mesAtual = new Date().getMonth() + 1;
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

    const kpis = [
        {
            endPoint: 'agendamentos/empresa',
            idEmpresa: user.idEmpresa,
            mes: mesAtual.toString(),
            description: "Receita Total",
            icon: <span className="material-symbols-outlined">monitoring</span>,
            iconColor: "#FEB95A",
            formatarValor: true,
            mensagemMes: true,
        },
        {
            endPoint: "agendamentos/servicos",
            idEmpresa: user.idEmpresa,
            mes: mesAtual.toString(),
            description: "Total de Serviços",
            icon: <span className="material-symbols-outlined">select_check_box</span>,
            iconColor: "#A9DFD8",
            mensagemMes: true,
        },
        {
            endPoint: "agendamentos/novosClientes",
            idEmpresa: user.idEmpresa,
            description: "Novos clientes",
            icon: <span className="material-symbols-outlined">account_circle</span>,
            iconColor: "#20AEF3",
            mensagemMes: true,
        },
        {
            endPoint: "agendamentos/ticket",
            idEmpresa: user.idEmpresa,
            description: "Ticket Médio",
            icon: <span className="material-symbols-outlined">payments</span>,
            iconColor: "#3CD856",
            formatarValor: true,
        },
        {
            endPoint: "agendamentos/aReceber",
            idEmpresa: user.idEmpresa,
            description: "Receita a Receber",
            icon: <span class="material-symbols-outlined">schedule</span>,
            iconColor: "#F5D007",
            formatarValor: true,
        },
    ];

    return (
        <div className="main-dashboard">
            <Menu activeMenuItem={activeMenuItem} />
            <div className="conteudo-dashboard">
                <div className="superior">
                    <div class="quadradoKPI">
                        {kpis.map((kpi, index) => (
                            <Kpi key={index} {...kpi} />
                        ))}
                    </div>

                 {/*    <div className="espaço-botao">
                        <Button
                            type="submit"
                            content="Fltrar"
                            backgroundColor='#2196f3'
                            fontSize='15px'
                            size='30%'
                            image={filterIcon}
                        />
                    </div> */}
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
                            lineColor={'white'} />
                    </CardDashboard>
                    <CardDashboard title="Receita por Funcionário" height="250px" width="410px">
                        <TabelaDashboard headers={['Atendente', 'Receita']} idEmpresa={user.idEmpresa} endPoint="receitaPorFuncionario" />
                    </CardDashboard>
                </div>
                <div className="inferior">
                    <CardDashboard title="Próximos Atendimentos" height="270px" width="620px">
                        <TabelaDashboard headers={['Cliente', 'Servico', 'Dia', 'Hora', 'Atendente']} idEmpresa={user.idEmpresa} endPoint="agendamentos" />
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
                        />
                    </CardDashboard>

                </div>
            </div>
        </div >
    );
}

export default Dashboard;