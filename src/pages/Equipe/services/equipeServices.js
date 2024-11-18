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