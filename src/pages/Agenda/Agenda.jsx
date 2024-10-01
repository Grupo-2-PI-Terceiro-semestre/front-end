import MyCalendar from './components/calendar/MyCalendar';
import MenuPerfil from '../../components/menu/Menu';
import './Agenda.css';

const Agenda = () => {
  return (
    <div className="main-servico">
      <div className="container-servico">
        <div className="menu-lateral">
          <MenuPerfil />
        </div>
        <div className="principal">
          <MyCalendar />
        </div>
      </div>
    </div>
  );
};

export default Agenda;

