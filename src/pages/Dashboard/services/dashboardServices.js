import { getData } from '../../../router/router'

export const findDashboardData = async (idEmpresa, mes, endPoint) => {
    try {
        const response = await getData(`${endPoint}/${idEmpresa}`, {}, { mes });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o dashboard", error);
        throw error;
    }
}