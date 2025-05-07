import React, { useEffect, useRef, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { connectWebSocket, disconnectWebSocket } from '../../router/router';
import './Menu.css';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento


const NotificationBell = ({ onClick, idEmpresa }) => {
  const [notifications, setNotifications] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [stompClient, setStompClient] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // Carrega do localStorage ao montar
  useEffect(() => {
    const cached = localStorage.getItem('notificacoes');
    if (cached) {
      setNotifications(JSON.parse(cached));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    let subscription = null;

    const handleIncomingMessage = (msg) => {
      if (isMounted) {
        console.log('Nova notificação:', msg);
        setNotifications(prev => {
          const updated = [...prev, msg];
          localStorage.setItem('notificacoes', JSON.stringify(updated)); // salva no cache
          return updated;
        });
      }
    };

    const setupWebSocket = async () => {
      try {
        const client = await connectWebSocket(handleIncomingMessage, idEmpresa);
        if (isMounted) {
          setConnectionStatus('connected');
          setStompClient(client);
        }
        subscription = client.subscription;
      } catch (error) {
        if (isMounted) {
          setConnectionStatus('error');
          setTimeout(() => setupWebSocket(), 5000);
        }
      }
    };

    setupWebSocket();

    return () => {
      isMounted = false;
      if (subscription) subscription.unsubscribe();
      disconnectWebSocket(idEmpresa);
    };
  }, [idEmpresa]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (notifications.length > 0) {
      setIsOpen(!isOpen);
      if (onClick) onClick();
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.clear();
    setIsOpen(false);
  };


  const handleNotificationClick = (notification) => {
    const regex = /(\d{2})\/(\d{2})\/(\d{4})/;
    const match = notification.message?.match(regex);

    let dataAgendamentoISO = null;

    if (match) {
      const [_, day, month, year] = match;
      dataAgendamentoISO = `${year}-${month}-${day}`;
    }

    localStorage.setItem(
      'ultimaNotificacaoClicada',
      JSON.stringify({ dataAgendamento: dataAgendamentoISO })
    );

    if (location.pathname === '/agenda') {
      window.location.reload();
    } else {
      navigate('/agenda');
    }
  };


  return (
    <div className="notification-wrapper" ref={wrapperRef}>

      <div className="notification-bell" onClick={toggleDropdown}>
        <FaBell
          size={20}
          title={notifications.length <= 0 ? 'Nenhuma notificação' : 'Ver notificações'}
        />

        {notifications.length > 0 && (
          <span className="badge">{notifications.length}</span>
        )}

        {connectionStatus === 'error' && (
          <span className="connection-error" title="Erro na conexão">!</span>
        )}
      </div>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <span>Notificações</span>
            <button onClick={clearNotifications}>Limpar</button>
          </div>
          <ul className="notification-list">
            {[...notifications].reverse().map((n, index) => (
              <div
                className="notification"
                key={index}
                dangerouslySetInnerHTML={{ __html: n.message || JSON.stringify(n) }}
                onClick={() => handleNotificationClick(n)}
                style={{ cursor: 'pointer' }}
              ></div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
