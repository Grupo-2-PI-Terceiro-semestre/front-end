import { getData, putData, deleteData, postData } from '../../../router/router'

export const findColaborador = async (idEmpresa, dataAgendamento) => {
    try {
        const response = await getData(`usuarios/empresa/${idEmpresa}`, {}, { dataAgendamento })
        return response;
    }
    catch (e) {
        console.error("Erro ao consultar os colaboradores" + e)
        throw e
    }
}

export const findAgendamentos = async (idAgenda, dataAgendamento) => {
    try {
        const response = await getData(`agendamentos`, {}, { idAgenda, dataAgendamento })
        return response;
    }
    catch (e) {
        console.error("Erro ao consultar os agendamentos" + e)
        throw e
    }
}

export const findServicos = async (idEmpresa) => {
    try {
        const response = await getData(`servicos/empresa/${idEmpresa}`)
        return response;
    }
    catch (e) {
        console.error("Erro ao consultar os serviços" + e)
        throw e
    }
}


export const findClientes = async (idEmpresa) => {
    try {
        const response = await getData(`clientes/empresa/${idEmpresa}`)
        return response;
    }
    catch (e) {
        console.error("Erro ao consultar os clientes" + e)
        throw e
    }
}

export const AtualizarEvento = async (eventoAtualizado) => {
    
    try {
        const response = await putData(`agendamentos`, eventoAtualizado)
        return response;
    } catch (error) {
        console.log("Erro ao autalizar o agendamento")
        throw e
    }
}