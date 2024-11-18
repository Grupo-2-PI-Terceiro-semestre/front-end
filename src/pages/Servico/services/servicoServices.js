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