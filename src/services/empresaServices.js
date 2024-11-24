import { getData, postImage } from '../router/router';

export const findByEmpresa = async (idEmpresa) => {
    try {
        const response = await getData(`empresas/${idEmpresa}`, {}, {});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar a empresa", error);
        throw error;
    }
};


export const uploadImage = async (idEmpresa, image) => {
    try {
        const response = await postImage(`empresas/imagem/upload/${idEmpresa}`, image, {}, {});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar a empresa", error);
        throw error;
    }
};