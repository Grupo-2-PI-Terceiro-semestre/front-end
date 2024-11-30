import { getData, putData, deleteData, postData } from '../../../router/router'

export const findUsuarios = async (idEmpresa, paginacao) => {
    try {
        const response = await postData(`usuarios/empresa/paginado/${idEmpresa}`, paginacao)
        return response;
    }
    catch (e) {
        console.error("Erro ao consultar os usuários" + e)
        throw e
    }
}

export const createColaborador = async (colaborador, idEmpresa) => {
    try {
        console.log("entrei no create colaborador" + JSON.stringify(colaborador));
        const response = await postData(`usuarios/empresa/colaborador/${idEmpresa}`, colaborador);
        return response;
    } catch (e) {
        console.log("Erro ao criar o colaborador")
        throw e
    }
}

export const findFuncoes = async () => {
    try {
        const response = await getData(`funcoes`)
        return response;
    }
    catch (e) {
        console.error("Erro ao consultar as funções" + e)
        throw e
    }
}

export const AtualizarUsuario = async (endpoint, eventoAtualizado) => {

    try {
        const response = await putData(endpoint, eventoAtualizado)
        return response;
    } catch (e) {
        console.log("Erro ao autalizar o usuário")
        throw e
    }
}

export const atualizarStatus = async (idPessoa) => {
    try {
        const response = await putData(`usuarios/status/${idPessoa}`, idPessoa)
        return response;
    } catch (e) {
        console.log("Serviço: Erro ao Deletar o colaborador")
        throw e
    }
}