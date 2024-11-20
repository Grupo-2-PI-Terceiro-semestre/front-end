import React from "react";
import "./Dashboard.css";
import Menu from "../../components/menu/Menu";
import Chart from "./components/chart/Chart";
import CardDashboard from "./components/cardDashboard/CardDashboard";
import Kpi from "./components/KPI/Kpi";
import TabelaDashboard from "./components/Tabela/TabelaDashboard";
import Button from "../../components/button/Button";
import filterIcon from "../../assets/filter.png"
import Cookies from 'js-cookie';

function Dashboard() {
    const activeMenuItem = "Dashboard";

    const data = ['Teste']


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

            description: "Novos clientes",
            icon: <span className="material-symbols-outlined">account_circle</span>,
            iconColor: "#20AEF3",
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
            endPoint: "agendamentos/receita",
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

                    <div className="espaço-botao">
                        <Button
                            type="submit"
                            content="Fltrar"
                            backgroundColor='#2196f3'
                            fontSize='15px'
                            size='30%'
                            image={filterIcon}
                        />
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
                        <TabelaDashboard headers={['Atendente','Receita','Comissão']} data={data}/>
                    </CardDashboard>
                </div>
                <div className="inferior">
                <CardDashboard title="Próximos Atendimentos" height="270px" width="620px">
                        <TabelaDashboard headers={['Cliente', 'Servico', 'Dia', 'Hora', 'Atendente']} data={data} endpoint={[`/${user.idEmpresa}`]} idEmpresa={[user.idEmpresa]} />
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