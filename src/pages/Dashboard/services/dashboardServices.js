    import { getData } from '../../../router/router'

    export const findDashboardData = async (idEmpresa, mes, endPoint) => {
        try {
            const response = await getData(`${endPoint}/${idEmpresa}`, {}, { mes });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar o dashboard", error);
            throw error;
        }
    }

    export const findListaAgendamentos = async (idEmpresa) => {
        try {
            const response = await getData(`agendamentos/${idEmpresa}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar o dashboard", error);
            throw error;
        }
    }


    export const findListaReceitaPorFuncionario = async (idEmpresa) => {
        try {
            const response = await getData(`agendamentos/receitaPorFuncionario/${idEmpresa}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar a lista de funcionarios e receita", error);
            throw error;
    }
}


export const findChartClientData = async (idEmpresa, endPoint) => {
    try {
        const response = await getData(`agendamentos/${endPoint}/${idEmpresa}`, {}, {});
        const data = response.data;
        const seriesData = data.map(item => item.receita);
        const xAxisData = data.map(item => item.ano_mes);

        return { seriesData, xAxisData };
    } catch (error) {
        console.error("Erro ao buscar o dashboard", error);
        throw error;
    }
};

