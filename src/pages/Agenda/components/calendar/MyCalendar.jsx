import React, { useState } from "react";
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
import { events as initialEvents, resources } from './events';
import IconDemo from '../agenda/Agenda';

moment.locale("pt-br");
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const MyDragAndDropCalendar = () => {

  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
