import { deleteData, getData, postImage } from '../router/router';

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

export const uploadImagemGaleria = async (idEmpresa, image) => {
    try {
      const response = await postImage(`empresas/imagem/uploadImagem/${idEmpresa}`, image, {}, {});
      return response.data; // Retorna o objeto completo do backend
    } catch (error) {
      console.error("Erro ao fazer upload da imagem", error);
      throw error;
    }
  };

export const deleteImage = async (idImagem) => {
    try {
        const response = await deleteData(`empresas/imagem/${idImagem}`, {}, {});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar a empresa", error);
        throw error;
    }
}