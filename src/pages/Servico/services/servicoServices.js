import { getData, putData, deleteData, postData } from '../../../router/router'

export const findServicos = async (idEmpresa, paginacao) => {
    try {
        const response = await postData(`servicos/empresa/paginado/${idEmpresa}`, paginacao)
        return response;
    }
    catch (e) {
        console.error("Erro ao consultar os servicos" + e)
        throw e
    }
}

export const createServico = async (servico, idEmpresa) => {
    try {
        console.log("entrei no create servico" + servico);
        const response = await postData(`servicos/${idEmpresa}`, servico);
        return response;
    } catch (e) {
        console.log("Erro ao criar o servico")
        throw e
    }
}

export const AtualizarServico = async (endpoint, eventoAtualizado) => {

    try {
        const response = await putData(endpoint, eventoAtualizado)
        return response;
    } catch (e) {
        console.log("Erro ao atualizar o cliente");
        throw e
    }
}

export const atualizarStatus = async (idServico) => {
    try {
        const response = await putData(`servicos/status/${idServico}`, idServico)
        return response;
    } catch (e) {
        console.log("Serviço: Erro ao Deletar o colaborador")
        throw e
    }
}