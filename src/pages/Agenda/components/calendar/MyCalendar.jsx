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
import { findColaborador, findAgendamentos } from '../../services/calendarServices'
import Cookies from 'js-cookie';


moment.locale("pt-br");
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const MyDragAndDropCalendar = () => {

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [colaboradorInfo, setColaboradorInfo] = useState(null);
  const [resources, setResources] = useState([]);

  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

  useEffect(() => {
    buscarColaboradores();
  }, []);

  const buscarColaboradores = async () => {
    try {
      // Buscar informações dos colaboradores pela empresa do usuário
      const response = await findColaborador(user.idEmpresa);

      const formattedResources = response.data.map(colaborador => ({
        id: colaborador.idAgenda,
        title: colaborador.nomeFuncionario,
      }));
      setColaboradorInfo(response);
      setResources(formattedResources);
      const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
      const agendamentosPromises = response.data.map(async (colaborador) => {
        if (colaborador.idAgenda) {
          const agendamentos = await buscarEventos(today, colaborador.idAgenda);
          return agendamentos;
        }
      });

      const allAgendamentos = await Promise.all(agendamentosPromises);
      const formattedEvents = allAgendamentos
        .flat()
        .filter(evento => evento !== undefined)

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Erro ao buscar colaboradores ou agendamentos:', error);
    }
  };

  const eventPropGetter = (event) => {
  // Aqui você pode acessar o evento e suas propriedades
  const borderColor = event.corReferenciaHex || '#00929B'; // Define a cor da borda ou um padrão

  return {
    style: {
      borderLeft: `solid 8px ${borderColor}`, // Definir a borda dinamicamente
    },
  };
};

  const buscarEventos = async (dataAgendamento, idAgenda) => {

    if (!idAgenda) {
      debugger
      console.error('idAgenda está indefinido');
      return;
    }

    try {
      const response = await findAgendamentos(idAgenda, dataAgendamento);
      const eventsFeature = response.data.map(evento => ({
        id: evento.idAgendamento,
        title: evento.servico.nomeServico,
        start: new Date(evento.horaAgendamento), 
        end: new Date(new Date(evento.horaAgendamento).getTime() + evento.servico.duracao),
        resourceId: idAgenda,
        corReferenciaHex: evento.servico.corReferenciaHex,
      }));
    
      return eventsFeature;
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      return [];
    }
  }

  const handleDateChange = (day) => {
    setSelectedDate(day);
  };

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

  const handleEventClick = (event) => {
    alert(`Você clicou no evento: ${event.title}`);
  };

  const formatCurrentDate = () => {
    return moment().format('DD / MM / YYYY').replace('MM', (m) => {
      return moment().locale('pt-br').monthsShort()[moment().month(m).month()];
    });
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
        <div className="buscaAgenda">
          <IconDemo content={formatDateToBRWithMonthName(selectedDate)} onDateChange={handleDateChange} />
        </div>
        <Button
          size="auto"
          content="Adicionar Agendamento"
          height="2rem"
          fontSize="14px"
          widthImage="1.5rem"
          heightImage="1.5rem"
          image={plusIcon}
        />
      </div>
    );
  };

  return (
    <div className="container">
      <div className="calendar-container">
        <div className="custom-toolbar">
          <span
            onClick={() => handleDateChange(new Date(new Date().setDate(new Date().getDate() - 1)))}
            className={isSelected(new Date(new Date().setDate(new Date().getDate() - 1))) ? "custom-span selected" : "custom-span"}
          >
            Ontem
          </span>

          <span
            onClick={() => handleDateChange(new Date())}
            className={isSelected(new Date()) ? "custom-span selected" : "custom-span"}
          >
            Hoje
          </span>

          <span
            onClick={() => handleDateChange(new Date(new Date().setDate(new Date().getDate() + 1)))}
            className={isSelected(new Date(new Date().setDate(new Date().getDate() + 1))) ? "custom-span selected" : "custom-span"}
          >
            Amanhã
          </span>
        </div>
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
    </div>
  );
};

export default MyDragAndDropCalendar;
