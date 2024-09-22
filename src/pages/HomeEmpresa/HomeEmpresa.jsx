import React from "react";
import HeaderEmpresa from "../../components/headerEmpresa/HeaderEmpresa";
// import FirstSectionEmpresa from "../../components/firstSectionEmpresa/FirstSectionEmpresa";
import Carrossel from "../../components/carrossel/Carrossel";
import AboutUs from "../../components/aboutUs/AboutUs";
import './HomeEmpresa.css';

function HomeEmpresa() {
    return <>
    <div className="main-home">
        <HeaderEmpresa />
        {/* <FirstSectionEmpresa /> */}
        <Carrossel />
        <AboutUs />
    </div>
    </>
}

export default HomeEmpresa;