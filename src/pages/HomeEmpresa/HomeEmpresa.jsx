import React from "react";
import HeaderEmpresa from "../../components/headerEmpresa/HeaderEmpresa";
// import FirstSectionEmpresa from "../../components/firstSectionEmpresa/FirstSectionEmpresa";
import Carrossel from "../../components/carrossel/Carrossel";
import AboutUs from "../../components/aboutUs/AboutUs";
import './HomeEmpresa.css';
import Previa from "../../components/previa/previa";
import Visibilidade from "../../components/visibilidade/Visibilidade";

function HomeEmpresa() {
    return <>
    <div className="main-home">
        <HeaderEmpresa />
        {/* <FirstSectionEmpresa /> */}
        <Carrossel />
        <AboutUs />
        <Previa />
        <Visibilidade />
    </div>
    </>
}

export default HomeEmpresa;