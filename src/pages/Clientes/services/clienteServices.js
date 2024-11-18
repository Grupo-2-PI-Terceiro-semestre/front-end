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