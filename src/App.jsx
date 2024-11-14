import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const projectName = 'Order Hub';
const version = __APP_VERSION__;

let color = 'black';

const AppVersion = () => {
  const location = useLocation();

  if (location.pathname !== '/login' && location.pathname !== '/cadastro') {
    color = 'white';
  }

  return (
    <div
      className="position-fixed top-0 start-0 p-0.5 name-version"
      style={{ zIndex: 1050, color: color }}
    >
      <p>
        {projectName}®️ - {version}
      </p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div>
        <AppVersion />
        <AppRoutes />
        <ToastContainer /> {/* Adicione o ToastContainer aqui */}
      </div>
    </Router>
  );
}

export default App;
