import { getData } from '../router/router';

export const findByEmpresa = async (idEmpresa) => {
    try {
        const response = await getData(`empresas/${idEmpresa}`, {}, {});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar a empresa", error);
        throw error;
    }
};


export const uploadImage = async (idEmpresa) => {
    try {
        const response = await getData(`empresas/${idEmpresa}`, {}, {});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar a empresa", error);
        throw error;
    }
};