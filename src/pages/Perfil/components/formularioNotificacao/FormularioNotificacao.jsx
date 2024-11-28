import React, { useState, useEffect } from 'react';
import { atualizarNotificacoes, buscarNotificacoes } from '../../services/perfilServices';
import '../formularioDadosPrincipais/FormularioPrincipal.css';
import './FormularioNotificacao.css';
import Cookies from 'js-cookie';
import { infoToast, successToast, errorToast } from '../../../../utils/Toats'
import CircularProgress from '@mui/material/CircularProgress';

const FormularioNotificacao = () => {
  const [formData, setFormData] = useState({
    idNotificacao: '',
    mensagemCancelamento: '',
    mensagemAgendamento: '',
  });

  const [dataOrigin, setDataOrigin] = useState({
    idNotificacao: '',
    mensagemCancelamento: '',
    mensagemAgendamento: '',
  });

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    setUser(userData);
    const notificacao = Cookies.get('notificacao') ? JSON.parse(Cookies.get('notificacao')) : null;
    if (!notificacao) {
      findNotify(userData.idEmpresa);
    } else {
      setFormData({
        idNotificacao: notificacao.idNotificacao,
        mensagemCancelamento: notificacao.mensagemCancelamento,
        mensagemAgendamento: notificacao.mensagemAgendamento,
      });
      setDataOrigin({
        idNotificacao: notificacao.idNotificacao,
        mensagemCancelamento: notificacao.mensagemCancelamento,
        mensagemAgendamento: notificacao.mensagemAgendamento,
      })
    }
  }, []);

  const findNotify = async (idEmpresa) => {
    try {
      setLoading(true);
      const notificacoes = await buscarNotificacoes(idEmpresa);
      setFormData({
        idNotificacao: notificacoes.idNotificacao || '',
        mensagemCancelamento: notificacoes.mensagemCancelamento || '',
        mensagemAgendamento: notificacoes.mensagemAgendamento || '',
      });
      setDataOrigin({
        idNotificacao: notificacoes.idNotificacao || '',
        mensagemCancelamento: notificacoes.mensagemCancelamento || '',
        mensagemAgendamento: notificacoes.mensagemAgendamento || '',
      })
      Cookies.set('notificacao', JSON.stringify(notificacoes), { expires: 7 });
    } catch (error) {
      console.error('Erro ao buscar as notificações', error);
      errorToast('Erro ao buscar as notificações, tente novamente mais tarde');
    } finally {
      setLoading(false);
      setButtonDisable(false);
      setColor('#2196F3');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    if (areObjectsEqual(formData, dataOrigin)) {
      infoToast('Nenhum dado foi alterado');
      return;
    }
    try {
      setLoading(true);
      const notificacoes = await atualizarNotificacoes(user.idEmpresa, formData);
      setFormData({
        idNotificacao: notificacoes.idNotificacao || '',
        mensagemCancelamento: notificacoes.mensagemCancelamento || '',
        mensagemAgendamento: notificacoes.mensagemAgendamento || '',
      });
      setDataOrigin({
        idNotificacao: notificacoes.idNotificacao || '',
        mensagemCancelamento: notificacoes.mensagemCancelamento || '',
        mensagemAgendamento: notificacoes.mensagemAgendamento || '',
      })
      Cookies.set('notificacao', JSON.stringify(notificacoes), { expires: 7 });
      successToast('Menagens de notificação salvas com sucesso');
    } catch (error) {
      errorToast('Erro ao salvar as mensagens de notificação, tente novamente mais tarde');
    } finally {
      setLoading(false);
      setButtonDisable(false);
      setColor('#2196F3');
    }
  };


  const areObjectsEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  return (
    <div className="container-formulario-perfil">

      <h2>Notificações</h2>
      <form onSubmit={handleSubmit} className="app-container-notifica">
        {loading && (
          <div className="loading-icon">
            <CircularProgress size={50} />
          </div>
        )}
        <div className="form-group">
          <label>Mensagem de Agendamento *</label>
          <textarea
            name="mensagemAgendamento"
            value={formData.mensagemAgendamento}
            onChange={handleInputChange}
            required={true}
            placeholder="Digite a mensagem de agendamento"
          />
          {errors.mensagemAgendamento && (
            <span className="error-message">{errors.mensagemAgendamento}</span>
          )}
        </div>
        <div className="form-group">
          <label>Mensagem de Cancelamento *</label>
          <textarea
            name="mensagemCancelamento"
            value={formData.mensagemCancelamento}
            onChange={handleInputChange}
            required={true}
            placeholder="Digite a mensagem de cancelamento"
          />
          {errors.mensagemCancelamento && (
            <span className="error-message">{errors.mensagemCancelamento}</span>
          )}
        </div>
        <div className="button-form">
          <button style={{
            backgroundColor: loading ? '#6c7d8c' : '#2196F3'
          }} disabled={loading} type="submit">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioNotificacao;
