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
import IconDemo from '../../../../components/agenda/Agenda';
import { findColaborador, AtualizarEvento, atualizarStatus } from '../../services/agendaServices'
import Cookies from 'js-cookie';
import CircularIntegration from '../../../../components/botao-download/CircularIntegration';
import CircularSize from '../../../../components/circulo-load/CircularSize';
import DetalheAgendamento from '../detalhe-agendamento/DetalheAgendamento';
import ModalAddAgend from '../modal-add/ModalAddAgend';
import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2'
import { converterGMTParaBrasilia, formatDateToBRWithMonthName, formaterDate } from '../../../../utils/FormatDate';
import ButtonRollback from "../button-rollback/ButtonRollback"
import { Pilha } from "../../../../utils/Pilha";
import { infoToast } from "../../../../utils/Toats";
import { useNavigate } from 'react-router-dom';

moment.locale("pt-br");
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const MyDragAndDropCalendar = () => {

  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectDateFormatted, setSelectDateFormatted] = useState(new Date());
  const [colaboradorInfo, setColaboradorInfo] = useState(null);
  const [detalhes, setDetalhes] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDetalhes, setSelectedDetalhes] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);


  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const pilhaSessao = localStorage.getItem('pilha') ? JSON.parse(localStorage.getItem('pilha')) : null;
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    buscarColaboradores(dateOficial());
  }, []);

  useEffect(() => {

    const eventSource = new EventSource(`${API_URL}agendamentos/sse`);
    eventSource.addEventListener('refrash', (event) => {
      if (event.data) {
        refrashSse(dateOficial())
      }
    })

    eventSource.onerror = (error) => {
      console.error("Erro na conexão SSE:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);


  const buscarColaboradores = async (day) => {
    if (user.idEmpresa != null) {

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
            title: `${evento.servico.nomeServico}`,
            start: new Date(evento.horaAgendamento),
            end: new Date(new Date(evento.horaAgendamento).getTime() + evento.servico.duracao),
            nomeFuncionario: colaborador.nomeFuncionario,
            nomeCliente: evento.cliente.nomePessoa,
            funcionario: colaborador,
            cliente: evento.cliente,
            telefoneCliente: evento.cliente.telefone,
            descricaoServico: evento.servico.descricao,
            resourceId: colaborador.idFuncionario,
            corReferenciaHex: evento.servico.corReferenciaHex,
            precisaConfirmar: evento.statusAgendamento == 'PENDENTE',
            realizado: evento.statusAgendamento == 'REALIZADO',
            status: filterStatus(evento.statusAgendamento)
          }))
        );
        setEvents(eventsFeature);
      } catch (error) {
        console.error('Erro ao buscar colaboradores ou agendamentos:', error);
      } finally {
        setLoading(false);
      }
    } else {
      const result = await Swal.fire({
        title: "Bem Vindo!",
        text: "Esse é o seu primeiro acesso, por favor, finalize seu perfil para visualizar sua agenda.",
        icon: "info",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
        allowOutsideClick: false,
      });

      const resultado = result.isConfirmed;
      if (resultado) {
        navigate('/perfil');
      }
    }
  };

  const dateOficial = () => {
    const today = new Date();
    const localDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const formattedDate = localDate.toISOString().split('T')[0];
    return formattedDate;
  }

  const handleCloseModalDetalhes = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };


  const eventPropGetter = (event) => {
    const borderColor = event.corReferenciaHex || "#00929B";
    const backgroundColor = event.precisaConfirmar ? "#424242d5" : "#424242";
    return {
      style: {
        borderLeft: `solid 8px ${borderColor}`,
        backgroundColor: backgroundColor,
      }
    };
  };


  const CustomEvent = ({ event }) => {
    const backgroundImage = event.realizado
      ? 'url("https://cdn-icons-png.flaticon.com/512/5610/5610944.png")'
      : event.precisaConfirmar
        ? 'url("https://icones.pro/wp-content/uploads/2021/05/symbole-d-avertissement-jaune.png")'
        : '';
    return (
      <div className="custom-event" style={{ position: "relative" }}>
        {backgroundImage && (
          <div
            style={{
              position: "absolute",
              top: "-15px",
              right: "-2px",
              width: "15px",
              height: "15px",
              backgroundImage: backgroundImage,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
        )}
        <div className="rbc-event-content">
          {event.title}
          <br />
          <br />
          Status: {event.status}
        </div>
      </div>
    );
  };

  const filterStatus = (status) => {
    if (status == 'PENDENTE') {
      return "Pendente";
    } else if (status == 'AGENDADO') {
      return "Confirmado";
    } else if (status == 'REALIZADO') {
      return "Finalizado";
    }
  }

  const handleDateChange = (day) => {
    buscarColaboradores(formaterDate(day));
    setSelectedDate(day);
    setSelectDateFormatted(formatDateToBRWithMonthName(day));
  };

  const refrashSse = async (day) => {
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
        funcionario: colaborador,
        cliente: evento.cliente,
        telefoneCliente: evento.cliente.telefone,
        descricaoServico: evento.servico.descricao,
        resourceId: colaborador.idFuncionario,
        corReferenciaHex: evento.servico.corReferenciaHex,
        precisaConfirmar: evento.statusAgendamento == 'PENDENTE',
        realizado: evento.statusAgendamento == 'REALIZADO',
        status: filterStatus(evento.statusAgendamento)
      }))
    );
    setEvents(eventsFeature);
    infoToast('Houve Uma Atualição na Agenda');
  }

  const isSelected = (day) => {
    return selectedDate.toDateString() === new Date(day).toDateString();
  };

  const moveEvent = async ({ event, start, end, resourceId }) => {
    const updatedEvent = { ...event, start, end, resourceId };
    const request = {
      idAgendamento: updatedEvent.id,
      horaAgendamento: converterGMTParaBrasilia(updatedEvent.start),
      idAgenda: updatedEvent.resourceId,
    };

    const result = await Swal.fire({
      title: "Atenção!",
      text: "Você tem certeza que deseja atualizar esse agendamento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
    });

    if (result.isConfirmed) {
      if (pilhaSessao == null) {
        let pilha = new Pilha();
        const objAcao = {
          idAgendamento: updatedEvent.id,
          horaAgendamento: converterGMTParaBrasilia(event.start),
          idAgenda: event.resourceId
        }
        pilha.push(objAcao);
        localStorage.setItem('pilha', JSON.stringify(pilha));
      } else {
        let pilha = new Pilha();
        pilha.pilha = pilhaSessao.pilha;
        pilha.topo = pilhaSessao.topo;
        const objAcao = {
          idAgendamento: updatedEvent.id,
          horaAgendamento: converterGMTParaBrasilia(event.start),
          idAgenda: event.resourceId
        }
        pilha.push(objAcao);
        localStorage.setItem('pilha', JSON.stringify(pilha));
      }

      setLoading(true);
      try {

        await atualizarEvento(request);

        const nextEvents = events.map(existingEvent =>
          existingEvent.id === event.id ? updatedEvent : existingEvent
        );
        setEvents(nextEvents);
      } catch (error) {
        Swal.fire({
          title: "Erro!",
          text: "Erro ao atualizar o agendamento!",
          icon: "error"
        });
        console.error("Erro ao atualizar evento:", error);
      } finally {
        setLoading(false);
      }
    }

  };

  const atualizarEvento = async (novoEvento) => {
    try {
      const response = await AtualizarEvento("agendamentos/parcial", novoEvento);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao atualizar o agendamento");
    }
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
    setOpenModal(true);
  };

  const handleAddClick = () => {
    setOpenModalAdd(true);
  };


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
          <IconDemo content={formatDateToBRWithMonthName(selectedDate)} onDateChange={handleDateChange} isFixed={false} />
        </div>
        <div className="buttonDay">
          <span
            onClick={() => {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              handleDateChange(yesterday);
              setSelectedDate(yesterday);
            }}
            className={isSelected(new Date(new Date().setDate(new Date().getDate() - 1))) ? "custom-span selected" : "custom-span"}
          >
            Ontem
          </span>

          <span
            onClick={() => {
              const today = new Date();
              handleDateChange(today);
              setSelectedDate(today);
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
              setSelectedDate(tomorrow);
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
            fontSize="14px"
            widthImage="1.5rem"
            heightImage="1.5rem"
            onClick={handleAddClick}
            image={plusIcon}
          />
          <CircularIntegration
            endpoint='usuarios/agendamentos/exportar/'
            path={user.idEmpresa}
            param={formaterDate(selectedDate)} />
          <ButtonRollback
            data={converterGMTParaBrasilia(selectedDate)}
            refreshDate={handleDateChange}
          />
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
            onSelectEvent={handleEventClick}
            step={30}
            timeslots={2}
            min={new Date(0, 0, 0, 6, 0, 0)}
            max={new Date(0, 0, 0, 23, 0, 0)}
            components={{
              toolbar: CustomToolbar,
              event: CustomEvent,
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
      <Modal open={openModal} onClose={handleCloseModalDetalhes}>
        <div className="modal-content">
          {selectedEvent && (
            <DetalheAgendamento
              event={selectedEvent}
              detalhes={detalhes}
              idEmpresa={user.idEmpresa}
              funcionarios={resources}
              refreshDate={handleDateChange}
              onClose={handleCloseModalDetalhes}
              paraConfirmar={selectedEvent.precisaConfirmar}
              realizado={selectedEvent.realizado}
            />
          )}
        </div>
      </Modal>
      {/* Modal de Adicionar Agendamento */}
      <Modal open={openModalAdd} onClose={handleCloseModalAdd}>
        <div className="modal-content">
          <ModalAddAgend
            onClose={handleCloseModalAdd}
            idEmpresa={user.idEmpresa}
            funcionarios={resources}
            dateDefault={converterGMTParaBrasilia(selectedDate)}
            refreshDate={handleDateChange} // Certifique-se de passar corretamente
          />
        </div>
      </Modal>
    </div>
  );
};

export default MyDragAndDropCalendar;
