import { getData } from '../../../router/router'

export const buscarDadosDePerfil = async (idEmpresa) => {
    try {
        const response = await getData(`empresas/perfil/${idEmpresa}`, {}, {});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar a empresa", error);
        throw error;
    }
}