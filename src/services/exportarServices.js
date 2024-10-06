import { getData} from '../router/router'


export const findCSV = async(endpoint, {path}, {dataAgendamento}) => {
    try {
        const response = await getData(`${endpoint}${path}`, {}, { dataAgendamento })
        return response;
    }
    catch (e) {
        console.error("Erro ao consultar os colaboradores" + e)
        throw e
    }
}