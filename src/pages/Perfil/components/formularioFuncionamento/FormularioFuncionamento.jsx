import React, { useEffect, useState, useRef } from 'react';
import './FormularioFuncionamento.css';
import { getData, postData } from '../../../../router/router';
import { uploadImagemGaleria } from '../../../../services/empresaServices';
import Cookies from 'js-cookie';

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
        console.log(response);
        setImages(prevImages => [...prevImages, response]);
      } catch (error) {
        console.error('Erro ao fazer upload da imagem', error);
      }
    }
  };

  const openImage = (imageUrl) => {
    setSelectedImage(imageUrl); // Define a imagem no estado
  };

  const closeModal = () => {
    setSelectedImage(null); // Reseta o estado ao fechar o modal
  };

  return (
    <div className="container-formulario-galeria">
      <h1>Galeria</h1>
      <div className="container-galeria">
        {images.map((imagem, index) => (
          <div key={index} className="gallery-item" onClick={() => openImage(imagem?.urlImagem || imagem)}>
            <img src={imagem?.urlImagem || imagem} alt={`Gallery item`} />
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
          <div className="modal-content-galeria">
            <img src={selectedImage} alt="Imagem ampliada" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioFuncionamento;
