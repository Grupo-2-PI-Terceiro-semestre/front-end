import MyCalendar from './components/calendar/MyCalendar';
import Menu from '../../components/menu/Menu';
import './Agenda.css';

const Agenda = () => {
  const activeMenuItem = 'Agenda'; // Define qual item está ativo no menu

  return (
    <div className="main-agenda">
      <div className="container-agenda">
        <div className="menu-lateral">
          <Menu activeMenuItem={activeMenuItem} />
        </div>
        <div className="principal-agenda">
          <MyCalendar />
        </div>
      </div>
    </div>
  );
};

export default Agenda;

