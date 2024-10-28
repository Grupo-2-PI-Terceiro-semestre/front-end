import React from "react";
import "./Dashboard.css";
import Menu from "../../components/menu/Menu";
import Chart from "./components/chart/Chart";
import CardDashboard from "./components/cardDashboard/CardDashboard";
import Kpi from "./components/KPI/Kpi";
import TabelaDashboard from "./components/Tabela/TabelaDashboard";

function Dashboard() {
    const activeMenuItem = "Dashboard";

    // Cabeçalhos da tabela
    const headers = ["Funcionário", "Receita", "Comissão"];
    const headers2 = ["Cliente", "Serviço", "Data", "Horário", "Atendente"];

    // Dados da tabela
    const data = [
        ["João", "R$1.500,00", "R$ 500,00"],
        ["Maria", "R$1.500,00", "R$ 700,00"],
        ["Pedro", "R$1.500,00", "R$ 450,00"],
        ["Pedro", "R$1.500,00", "R$ 450,00"],
        ["Pedro", "R$1.500,00", "R$ 450,00"],
    ];

    const data2 = [
        ["João", "Corte", "10/10/2021", "10:00", "Maria"],
        ["João", "Corte", "10/10/2021", "10:00", "Maria"],
        ["João", "Corte", "10/10/2021", "10:00", "Maria"],
        ["João", "Corte", "10/10/2021", "10:00", "Maria"],
    ];

    return (
        <div className="main-dashboard">
            <Menu activeMenuItem={activeMenuItem} />
            <div className="conteudo-dashboard">
                <div className="superior">
                    <div class="quadradoKPI">
                        <Kpi
                            endPoint='agendamentos/empresa'
                            idEmpresa="1"
                            mes="10"
                            description="Receita Total"
                            icon={
                                <span className="material-symbols-outlined">
                                    monitoring
                                </span>
                            }
                            iconColor="#FEB95A"
                            percent="+10% Mês anterior">
                        </Kpi>
                        <Kpi
                            valor="500"
                            description="Total de Serviços"
                            icon={
                                <span className="material-symbols-outlined">
                                    select_check_box
                                </span>
                            }
                            iconColor="#A9DFD8"
                            percent="+8% Mês Anterior">
                        </Kpi>
                        <Kpi
                            valor="10"
                            description="Novos clientes"
                            icon={
                                <span className="material-symbols-outlined">
                                    account_circle
                                </span>
                            }
                            iconColor="#20AEF3"
                            percent="+3% Mês anterior">
                        </Kpi>
                        <Kpi
                            valor="10"
                            description="Ticket Médio"
                            icon={
                                <span class="material-symbols-outlined">
                                    payments
                                </span>
                            }
                            iconColor="#3CD856"
                            percent="+3% Mês anterior">
                        </Kpi>
                        </div>
                </div>
                <div className="meio">
                    <CardDashboard title="Total de Clientes por dia da semana" height="250px" width="410px" >
                        <Chart title="" type="column" seriesData={[1, 2, 3, 4, 5, 6, 7]} xAxisData={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', "Sex", "Sab"]} lineColor={'white'} heightChart={200} />
                    </CardDashboard>
                    <CardDashboard title="Total de Receita por Serviço" height="250px" width="410px">
                        <Chart title="" type="bar" seriesData={[1, 2, 3, 4, 5, 6, 7]} xAxisData={['Corte', 'Sobrancelha', 'Barba', 'Tintura', 'Hidratação', 'Limpeza de Pele', 'Massagem Facial']} lineColor={'white'} heightChart={200} />
                    </CardDashboard>
                    <CardDashboard title="Top Performances" height="250px" width="410px">
                        <TabelaDashboard headers={headers} data={data} />
                    </CardDashboard>
                </div>
                <div className="inferior">
                    <CardDashboard title="Próximos Atendimentos" height="270px" width="620px">
                        <TabelaDashboard headers={headers2} data={data2} />
                    </CardDashboard>
                    <CardDashboard title="Receita por Mês" height="270px" width="620px">
                        <Chart title="" type="spline" seriesData={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 20]} xAxisData={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']} lineColor={'white'} heightChart={200} colorChart={'#3CD856'} />
                    </CardDashboard>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;