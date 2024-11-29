import React, { useEffect, useState, useRef } from 'react';
import './FormularioFuncionamento.css';
import { deleteData, getData, postData } from '../../../../router/router';
import { uploadImagemGaleria } from '../../../../services/empresaServices';
import Cookies from 'js-cookie';
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2'


const FormularioFuncionamento = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Para armazenar a imagem selecionada
  const fileInputRef = useRef(null);

  const userData = JSON.parse(Cookies.get('user'));

  useEffect(() => {
    buscarImagens();
  }, []);

  const buscarImagens = async () => {
    try {
      const response = await getData(`empresas/imagens/${userData.idEmpresa}`);
      setImages(response.data);
    } catch (error) {
      console.error('Erro ao buscar as imagens', error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('file', files[0]);
      try {
        const response = await uploadImagemGaleria(userData.idEmpresa, formData);
        setImages(prevImages => [...prevImages, response]); // Adiciona o objeto da imagem ao estado
      } catch (error) {
        console.error('Erro ao fazer upload da imagem', error);
      }
    }
  };

  const openImage = (image) => {
    setSelectedImage(image); // Define a imagem no estado
  };

  const closeModal = () => {
    setSelectedImage(null); // Reseta o estado ao fechar o modal
  };

  const deleteImage = async (idImagem) => {
    try {
      await deleteData(`empresas/imagem/${idImagem}`, {}, {}, {});
      setImages(images.filter((image) => image.idImagem !== idImagem));
      closeModal();
    } catch (error) {
      console.error('Erro ao deletar a imagem', error);
    }
  };

  return (
    <div className="container-formulario-galeria">
      <h1>Galeria</h1>
      <div className="container-galeria">
        {images.map((imagem, index) => (
          <div key={index} className="gallery-item" onClick={() => openImage(imagem)}>
            <img src={imagem.urlImagem} alt={`Gallery item`} />
          </div>
        ))}
      </div>
      <button className="button-upload" onClick={handleButtonClick}>
        Adicionar imagem
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
      {selectedImage && (
        <div className="modal-galeria" onClick={closeModal}>
          <button
            className="delete-button-above-modal"
            onClick={(e) => {
              e.stopPropagation();
              Swal.fire({
                icon: 'warning',
                title: 'Tem certeza que deseja excluir essa imagem?',
                showCancelButton: true,
                confirmButtonText: 'Excluir',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#FF0000',
                cancelButtonColor: '#007bff',
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteImage(selectedImage.idImagem);
                }
              });
            }}
          >
            <FaTrash className="delete-icon" />
            Excluir
          </button>
          <div className="modal-content-galeria" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.urlImagem} alt="Imagem ampliada" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioFuncionamento;