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

export const CancelarAgendamento = async (idAgendamento, status) => {
    try {
        const response = await putData(`agendamentos/${idAgendamento}?status=${status}`)
        return response;
    } catch (error) {
        console.log("Serviço: Erro ao Deletar o Agendamento")
        throw e
    }
}

export const createAgendamento = async (agendamento) => {
    try {
        const response = await postData(`agendamentos`, agendamento)
        return response;
    } catch (error) {
        console.log("Erro ao criar o agendamento")
        throw e
    }
}