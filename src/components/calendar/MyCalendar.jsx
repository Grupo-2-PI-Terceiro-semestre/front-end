import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { events, resources } from '../../events';
import CustomEvent from './CustomEvent'; // Ajuste o caminho conforme necessário

const localizer = momentLocalizer(moment);

const MyCalendar = () => (
  <div style={{ height: '100vh' }}>
    <Calendar
      localizer={localizer}
      events={events}
      resources={resources}
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="title"
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      defaultView="day"  // Define a visualização padrão
      views={['day', 'week', 'month']}  // Adiciona as visualizações de dia, semana e mês
      components={{
        event: CustomEvent,  // Define o componente CustomEvent para renderizar os eventos
      }}
    />
  </div>
);

export default MyCalendar;
