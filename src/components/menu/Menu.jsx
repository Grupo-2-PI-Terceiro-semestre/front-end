import React, { useEffect, useState, useRef } from 'react';
import { FaCalendarAlt, FaUser, FaChartBar, FaUsers, FaBriefcase, FaSignOutAlt, FaServicestack } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { findByEmpresa, uploadImage, buscarNotificacao } from '../../services/empresaServices';
import Cookies from 'js-cookie';
import './Menu.css';
import Tooltip from '@mui/material/Tooltip';
import { infoToast } from '../../utils/Toats'
import CircularProgress from '@mui/material/CircularProgress';
import { errorToast, successToast } from '../../utils/Toats'
import NotificationBell from './NotificationBell';
import { disconnectWebSocket } from '../../router/router';



const Menu = ({ activeMenuItem, refreshKey }) => {
  const [user, setUser] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [idEmpresa, setIdEmpresa] = useState(null);


  useEffect(() => {
    const userData = Cookies.get('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setIdEmpresa(parsedUser.idEmpresa);
      setUser(parsedUser);

      const empresaData = Cookies.get('empresa');
      if (empresaData) {
        setEmpresa(JSON.parse(empresaData));
      } else {
        buscarEmpresa(parsedUser.idEmpresa);
        buscarNotificacao(parsedUser.idEmpresa);
      }
    }
  }, [refreshKey]);

  const buscarEmpresa = async (idEmpresa) => {
    if (!idEmpresa) {
      return;
    }
    try {
      const response = await findByEmpresa(idEmpresa);
      Cookies.set('empresa', JSON.stringify(response), { expires: 7 });
      setEmpresa(response);
    } catch (error) {
      console.error("Erro ao buscar empresa", error);
    }
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
    handleUploadImage(event.target.files[0]);
  };

  const logout = () => {
    infoToast('Você será redirecionado para a página de login.');
    timeoutRef.current = setTimeout(() => {
      Object.keys(Cookies.get()).forEach((cookieName) => {
        Cookies.remove(cookieName);
      });
      localStorage.clear();
      disconnectWebSocket(idEmpresa);
    }, 2500);
    navigate('/login');
  };

  const handleUploadImage = async (selectedFile) => {
    if (!selectedFile) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await uploadImage(user.idEmpresa, formData);
      setEmpresa(prevState => ({ ...prevState, urlLogo: response }));
      Cookies.set('empresa', JSON.stringify({ ...empresa, urlLogo: response }), { expires: 7 });

      successToast('Imagem atualizada com sucesso');
    } catch (error) {
      console.error("Erro ao fazer o upload da imagem", error);
      errorToast('Erro ao fazer o upload da imagem');
    }
  };

  const handleItemClick = (item, path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <NotificationBell idEmpresa={idEmpresa} />
      <div className="profile">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="imageUpload"
          onClick={(event) => { event.stopPropagation(); }}
        />

        <Tooltip title='Fazer Upload'>
          <img
            src={empresa && empresa.urlLogo ? empresa.urlLogo : 'https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Image-Upload-Icon-Graphics-10388650-1.jpg'}
            alt="Imagem de Perfil"
            className="profile-image"
            onClick={() => document.getElementById('imageUpload').click()}
          />
          <CircularProgress size={100} className={loading ? 'loading-icon' : 'loading-icon-hidden'} />
        </Tooltip>

        <span className="profile-name">{empresa ? empresa.nomeEmpresa : 'Nome da Empresa'}</span>
      </div>

      <ul>
        <li className={activeMenuItem === 'Agenda' ? 'active' : ''} onClick={() => handleItemClick('Agenda', '/agenda')}>
          <FaCalendarAlt />
          <span>Agenda</span>
        </li>
        <li className={activeMenuItem === 'Perfil' ? 'active' : ''} onClick={() => handleItemClick('Perfil', '/perfil')}>
          <FaUser />
          <span>Perfil</span>
        </li>
        <li className={activeMenuItem === 'Dashboard' ? 'active' : ''} onClick={() => handleItemClick('Dashboard', '/dashboard')}>
          <FaChartBar />
          <span>Dashboard</span>
        </li>
        <li className={activeMenuItem === 'Equipe' ? 'active' : ''} onClick={() => handleItemClick('Equipe', '/equipe')}>
          <FaUsers />
          <span>Equipe</span>
        </li>
        <li className={activeMenuItem === 'Clientes' ? 'active' : ''} onClick={() => handleItemClick('Clientes', '/clientes')}>
          <FaBriefcase />
          <span>Clientes</span>
        </li>
        <li className={activeMenuItem === 'Serviços' ? 'active' : ''} onClick={() => handleItemClick('Serviços', '/servico')}>
          <FaServicestack />
          <span>Serviços</span>
        </li>
      </ul>
      <div onClick={logout} className="logout">
        <FaSignOutAlt />
        <span>Sair</span>
      </div>
    </div>
  );
};
export default Menu;
