import React, { useEffect, useState, useRef } from 'react';
import './FormularioFuncionamento.css'; // Certifique-se de criar este arquivo para estilos
import { getData, postData } from '../../../../router/router';
import Cookies from 'js-cookie';

const FormularioFuncionamento = () => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const userData = JSON.parse(Cookies.get('user'));

  const buscarImagens = async () => {
    try {
      const response = await getData(`empresas/imagens/${userData.idEmpresa}`);
      setImages(response.data); // Supondo que response.data contenha a lista de URLs das imagens
    } catch (error) {
      console.error("Erro ao buscar as imagens", error);
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
        const response = await postData(`empresas/imagens/${userData.idEmpresa}`, formData);
        setImages([...images, response.data]); // Adiciona a nova imagem à lista de imagens
      } catch (error) {
        console.error("Erro ao fazer upload da imagem", error);
      }
    }
  };

  useEffect(() => {
    buscarImagens();
  }, []);

  return (
    <div className='container-formulario-galeria'>
      <h1>Galeria</h1>
      <div className='container-galeria'>
        {images.map((imagem, index) => (
          <div key={index} className="gallery-item">
            <img src={imagem.urlImagem} alt={`Gallery item`} />
          </div>
        ))}
      </div>
      <button className='button-upload' onClick={handleButtonClick}>
        Adicionar imagem
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FormularioFuncionamento;