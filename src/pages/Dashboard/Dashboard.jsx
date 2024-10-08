import React from "react";
import "./Dashboard.css";
import Menu from "../../components/menu/Menu";
import Chart from "../../components/chart/chart";
import CardDashboard from "../../components/cardDashboard/CardDashboard";
import Kpi from "../../components/KPI/Kpi";



function Dashboard() {

    const activeMenuItem = "Dashboard";

    return (
        <div className="main-dashboard">
            <Menu activeMenuItem={activeMenuItem}/>
            <div className="conteudo-dashboard">
                <div className="superior">
                    <CardDashboard title="" height="130px" width="500px">
                        <Kpi
                            valor="R$ 1.000,00"
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
                            valor="R$ 1.000,00"
                            description="Receita Total"
                            icon={
                                <span className="material-symbols-outlined">
                                    select_check_box
                                </span>
                            }
                            iconColor="#A9DFD8"
                            percent="+8% Mês Anterior">
                        </Kpi>
                        <Kpi
                            valor="R$ 1.000,00"
                            description="Receita Total"
                            icon={
                                <span className="material-symbols-outlined">
                                    account_circle
                                </span>
                            }
                            iconColor="#20AEF3"
                            percent="+3% Mês anterior">
                        </Kpi>
                    </CardDashboard>
                </div>
                <div className="meio">
                    <CardDashboard title="Total de Clientes por dia da semana" height="280px" width="410px" >
                                <Chart title="" type="column" seriesData={[1, 2, 3, 4, 5, 6, 7]} xAxisData={['Dom', 'Seg', 'Ter', 'Qua', 'Qui',"Sex","Sab"]} lineColor={'white'} heightChart={200} />
                    </CardDashboard>
                    <CardDashboard title="Total de Receita por Serviço" height="280px" width="410px">
                    <Chart title="" type="bar" seriesData={[1, 2, 3, 4, 5, 6, 7]} xAxisData={['Corte','Sobrancelha','Barba','Tintura','Hidratação','Limpeza de Pele','Massagem Facial']} lineColor={'white'} heightChart={200} />
                    </CardDashboard>
                    <CardDashboard title="Top Performaces" height="280px" width="410px">
                    
                    </CardDashboard>
                </div>
                <div className="inferior">
                    <CardDashboard title="Próximos Atendimentos" height="280px" width="620px">
                        <p>Conteúdo do card</p>
                    </CardDashboard>
                    <CardDashboard title="Receita por Mês" height="280px" width="620px">
                    <Chart title="" type="spline" seriesData={[1, 2, 3, 4, 5, 6, 7,8,9,10,11,20]} xAxisData={['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']} lineColor={'white'} heightChart={200} colorChart={'#3CD856'} />
                    </CardDashboard>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;