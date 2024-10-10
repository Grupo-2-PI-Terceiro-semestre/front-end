import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyCalendar.css";
import Button from "../../../../components/button/Button";
import plusIcon from "../../../../assets/plus.png";
import IconDemo from '../agenda/Agenda';
import { findColaborador, findAgendamentos } from '../../services/agendaServices'
import Cookies from 'js-cookie';
import CircularIntegration from '../../../../components/botao-download/CircularIntegration';
import CircularSize from '../../../../components/circulo-load/CircularSize';
import DetalheAgendamento from '../detalhe-agendamento/DetalheAgendamento';
import Modal from '@mui/material/Modal'; // Importação do Modal


moment.locale("pt-br");
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const MyDragAndDropCalendar = () => {

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [colaboradorInfo, setColaboradorInfo] = useState(null);
  const [detalhes , setDetalhes] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDetalhes, setSelectedDetalhes] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

  useEffect(() => {
    const today = new Date();
    const localDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const formattedDate = localDate.toISOString().split('T')[0];
    buscarColaboradores(formattedDate);
  }, []);

  const buscarColaboradores = async (day) => {
    setLoading(true);
    try {
      const response = await findColaborador(user.idEmpresa, day);

      const formattedResources = response.data.map(colaborador => ({
        id: colaborador.idAgenda,
        title: colaborador.nomeFuncionario,
      }));

      setColaboradorInfo(response);
      setResources(formattedResources);

      const colaboradores = response.data;
      const eventsFeature = colaboradores.flatMap(colaborador =>
        colaborador.agendamentoDTOS.map(evento => ({
          id: evento.idAgendamento,
          title: evento.servico.nomeServico,
          start: new Date(evento.horaAgendamento),
          end: new Date(new Date(evento.horaAgendamento).getTime() + evento.servico.duracao),
          nomeFuncionario: colaborador.nomeFuncionario,
          nomeCliente: evento.cliente.nomePessoa,
          telefoneCliente: evento.cliente.telefone,
          descricaoServico: evento.servico.descricao,
          resourceId: colaborador.idFuncionario,
          corReferenciaHex: evento.servico.corReferenciaHex,
        }))
      );

      const detalhes = colaboradores.flatMap(colaborador =>
        colaborador.agendamentoDTOS.map(detalhes => ({
          id: detalhes.idAgendamento,
          nomeCliente: detalhes.cliente.nomePessoa,
          telefoneCliente: detalhes.cliente.telefone,
          descricaoServico: detalhes.servico.descricao
        })));

        console.log('Detalhes:', detalhes);

      setDetalhes(detalhes);
      setEvents(eventsFeature);
    } catch (error) {
      console.error('Erro ao buscar colaboradores ou agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };


  const eventPropGetter = (event) => {
    const borderColor = event.corReferenciaHex || '#00929B';

    return {
      style: {
        borderLeft: `solid 8px ${borderColor}`,
      },
    };
  };

  const handleDateChange = (day) => {
    buscarColaboradores(formaterDate(day));
    setSelectedDate(day);
  };

  const formaterDate = (date) => {
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return localDate.toISOString().split('T')[0];
  }

  const isSelected = (day) => {
    return selectedDate.toDateString() === new Date(day).toDateString();
  };

  const moveEvent = ({ event, start, end, resourceId }) => {
    const updatedEvent = { ...event, start, end, resourceId };
    const nextEvents = events.map((existingEvent) =>
      existingEvent.id === event.id ? updatedEvent : existingEvent
    );
    setEvents(nextEvents);
  };

  const resizeEvent = (resizeType, { event, start, end }) => {
    const nextEvents = events.map(existingEvent => {
      if (existingEvent.id === event.id) {
        return { ...existingEvent, start, end };
      }
      return existingEvent;
    });
    setEvents(nextEvents);
  };

  const handleEventClick = (event, detalhe) => {
    setSelectedEvent(event);
    setSelectedDetalhes(detalhe);
    setOpenModal(true); // Abre o modal
  };

  function formatDateToBRWithMonthName(dateString) {
    const date = new Date(dateString); // Converte a string de data para um objeto Date

    const day = String(date.getDate()).padStart(2, '0'); // Pega o dia e adiciona zero à esquerda se necessário
    const monthNames = ['Jan', 'Fev',
      'Mar', 'Abr',
      'Mai', 'Jun',
      'Jul', 'Ago',
      'Set', 'Out',
      'Nov', 'Dez'
    ]; // Array com os nomes dos meses
    const month = monthNames[date.getMonth()]; // Pega o nome do mês
    const year = date.getFullYear(); // Pega o ano
    return `${day} - ${month} - ${year}`; // Retorna no formato "dd de mês de yyyy"
  }

  const CustomToolbar = () => {
    return (
      <div className="toolbar-container">


      </div>
    );
  };

  return (

    <div className="calendar-container">
      <div className="custom-toolbar">
        <div className="buscaAgenda">
          <IconDemo content={formatDateToBRWithMonthName(selectedDate)} onDateChange={handleDateChange} />
        </div>
        <div className="buttonDay">
          <span
            onClick={() => {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1); // Subtrai um dia
              handleDateChange(yesterday);
            }}
            className={isSelected(new Date(new Date().setDate(new Date().getDate() - 1))) ? "custom-span selected" : "custom-span"}
          >
            Ontem
          </span>

          <span
            onClick={() => {
              const today = new Date();
              handleDateChange(today);
            }}
            className={isSelected(new Date()) ? "custom-span selected" : "custom-span"}
          >
            Hoje
          </span>

          <span
            onClick={() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              handleDateChange(tomorrow);
            }}
            className={isSelected(new Date(new Date().setDate(new Date().getDate() + 1))) ? "custom-span selected" : "custom-span"}
          >
            Amanhã
          </span>
        </div>

        <div className="botao">
          <Button
            size="auto"
            content="Adicionar Agendamento"
            height="2rem"
            fontSize="14px"
            widthImage="1.5rem"
            heightImage="1.5rem"
            image={plusIcon}
          />
          <CircularIntegration
            endpoint='usuarios/agendamentos/exportar/'
            path={user.idEmpresa}
            param={formaterDate(selectedDate)} />
        </div>
      </div>
      <div className="agenda-principal">
        <DndProvider backend={HTML5Backend}>
          <DragAndDropCalendar
            selectable
            localizer={localizer}
            events={events}
            resources={resources}
            resourceIdAccessor="id"
            resourceTitleAccessor="title"
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventPropGetter}
            defaultView="day"
            date={selectedDate}
            onEventDrop={moveEvent}
            resizable
            onEventResize={resizeEvent}
            onSelectEvent={handleEventClick} // Adicione aqui
            step={30}
            timeslots={2}
            min={new Date(0, 0, 0, 6, 0, 0)}
            max={new Date(0, 0, 0, 23, 0, 0)}
            components={{
              toolbar: CustomToolbar,
            }}
            formats={{
              dayFormat: 'DD',
              dayHeaderFormat: 'dddd, D de MMMM',
              agendaDateFormat: 'DD/MM/YYYY',
              agendaTimeFormat: 'HH:mm',
              timeGutterFormat: 'HH:mm',
              eventTimeRangeFormat: ({ start, end }) => `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
              eventTimeFormat: 'HH:mm',
            }}
          />
        </DndProvider>
      </div>

      {loading ? (
        <CircularSize width="100%" height="100%" />
      ) : null}
      {/* Modal de Detalhamento */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="modal-content">
          {selectedEvent && (
            <DetalheAgendamento
              event={selectedEvent}
              detalhes={detalhes}
              idEmpresa={user.idEmpresa}
              funcionarios = {resources} // Passa os detalhes do evento selecionado
              onClose={handleCloseModal} // Função para fechar o modal
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MyDragAndDropCalendar;
