import { getData, putData, deleteData, postData } from '../../../router/router'

export const findClientes = async (idEmpresa, paginacao) => {
    try {
        const response = await postData(`clientes/empresa/paginado/${idEmpresa}`, paginacao)
        return response;
    }
    catch (e) {
        console.error("Erro ao consultar os clientes" + e)
        throw e
    }
}

export const createCliente = async (cliente, idEmpresa) => {
    try {
        const response = await postData(`clientes/empresa/${idEmpresa}`, cliente);
        return response;
    } catch (e) {
        console.log("Erro ao criar o cliente")
        throw e
    }
}

export const AtualizarCliente = async (endpoint, eventoAtualizado) => {

    try {
        const response = await putData(endpoint, eventoAtualizado)
        return response;
    } catch (e) {
        console.log("Erro ao atualizar o cliente");
        throw e
    }
}

export const atualizarStatus = async (idCliente) => {
    try {
        const response = await putData(`clientes/${idCliente}`, idCliente)
        return response;
    } catch (e) {
        console.log("Serviço: Erro ao Deletar o cliente")
        throw e
    }
}

// export const deletarCliente = async (idCliente) => {

//     try {
//         const response = await deleteData(`clientes/deletar/${idCliente}`, idCliente);
//         return response;
//     } catch (e) {
//         console.log("Erro ao deletar o cliente");
//         throw e;
//     }
// }