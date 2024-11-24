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