import React from "react";
import './Agendamento.css';
import HeaderAgendamento from "./components/headerAgendamento/HeaderAgendamento";
import ServiceList from "./components/serviceList/ServiceList";
import Banner from "./components/banner/Banner";
import Map from "./components/map/Map";

function Agendamento() {
  return <>
    <div className="main-agendamento">
      <HeaderAgendamento />
      <div className="sessao">
        <div className="banner-map">
          <Banner />
          <Map />
        </div>
        <ServiceList />
      </div>
    </div>


  </>
}

export default Agendamento;