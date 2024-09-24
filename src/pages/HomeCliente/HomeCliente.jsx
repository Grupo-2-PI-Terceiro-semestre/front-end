import React from "react";
import  './HomeCliente.css';
import HeaderEmpresa from "../../components/headerEmpresa/HeaderEmpresa";
import BannerCliente from "../../components/BannerCliente/BannerCliente";   
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import IntroTexto from "../../components/IntroTexto/IntroTexto";
import Carousel from "../../components/Carousel/Carousel";
import Localizacao from "../../components/Localizacao/Localizacao";
import Celular from "../../components/Celular/Celular";



function HomeCliente() {    
    return <>
        <div className="main-home">
        <HeaderEmpresa/>
        <BannerCliente/> 
        <CategoryBar/>
        <IntroTexto/>
        <Carousel/>
        <Localizacao/>
        <Celular/>
        
        </div>
    </>
}

export default HomeCliente;