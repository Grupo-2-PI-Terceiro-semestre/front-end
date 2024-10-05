import MyCalendar from './components/calendar/MyCalendar';
import Menu from '../../components/menu/Menu';
import IconBreadcrumbs from '../../components/breadcrumb/Breadcrumb';
import './Agenda.css';

const Agenda = () => {
  const activeMenuItem = 'Agenda'; // Define qual item está ativo no menu

  return (
    <div className="main-servico">
      <div className="container-servico">
        <div className="menu-lateral">
          <Menu activeMenuItem={activeMenuItem} />
        </div>
        <div className="principal">
          <IconBreadcrumbs
            paths={[
              { label: 'Agenda', href: '/agenda' }
            ]}
          />
          <MyCalendar />
        </div>
      </div>
    </div>
  );
};

export default Agenda;

