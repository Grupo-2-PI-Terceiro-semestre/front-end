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

export const createCliente = async (cliente) => {
    try {
        console.log("entrei no create cliente" + cliente);
        const response = await postData(`clientes`, cliente);
        return response;
    } catch (e) {
        console.log("Erro ao criar o cliente")
        throw e
    }
}