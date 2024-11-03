import React, {useEffect, useState} from "react";
import './TelaClientes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import LinhaClientes from "../linhaClientes/LinhaClientes";
// import HeaderInterna from "../headerInterna/HeaderInterna";
import {findClientes} from "../../services/clienteServices";
import Cookies from 'js-cookie';

function TelaClientes({ placeholder, titulo1, titulo2, titulo3, titulo4
 }) {

    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

    const handleKeyUp = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        findByServicoOuEmpresa(value);
      };

      useEffect(() => {
        buscarListaClientes(user.idEmpresa);
      }, []);

      const buscarListaClientes = async (idEmpresa) => {
        const paginacao = {
            pagina:null,
            tamanho:null
        }
        const response = await findClientes(idEmpresa, paginacao);
        console.log(response + ' response');
      } 

    return (
        <div className="main-tela-clientes">
            <div className="container-tela-clientes">
                {/* <div className="titulo">
                    <h3>{titulo}</h3>
                    <HeaderInterna texto="Novo Serviço"  />
                </div> */}

                <div className="search-box">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                    <input
                        type="text"
                        placeholder={placeholder}
                        onKeyUp={handleKeyUp}
                    />
                </div>

                <div className="tabelaCompleta">
                    <div className="tituloTabela">
                        <label htmlFor="text">{titulo1}</label>
                        <label htmlFor="text">{titulo2}</label>
                        <label htmlFor="text">{titulo3}</label>
                        <label htmlFor="text">{titulo4}</label>
                    </div>

                    <div className="conjuntoLinhas">
                        <LinhaClientes nome="Maria da Silva" telefone="(11)95521-5833" email="exemplo.text@gmail.com" />
                        <LinhaClientes nome="Maria da Silva" telefone="(11)95521-5833" email="exemplo.text@gmail.com" />
                        <LinhaClientes nome="Maria da Silva" telefone="(11)95521-5833" email="exemplo.text@gmail.com" />
                        <LinhaClientes nome="Maria da Silva" telefone="(11)95521-5833" email="exemplo.text@gmail.com" />
                        <LinhaClientes nome="Maria da Silva" telefone="(11)95521-5833" email="exemplo.text@gmail.com" />
                        <LinhaClientes nome="Maria da Silva" telefone="(11)95521-5833" email="exemplo.text@gmail.com" />
                        <LinhaClientes nome="Maria da Silva" telefone="(11)95521-5833" email="exemplo.text@gmail.com" />
                        <LinhaClientes nome="Maria da Silva" telefone="(11)95521-5833" email="exemplo.text@gmail.com" />
                        <LinhaClientes nome="Maria da Silva" telefone="(11)95521-5833" email="exemplo.text@gmail.com" />
                        <LinhaClientes nome="Maria da Silva" telefone="(11)95521-5833" email="exemplo.text@gmail.com" />
                        <LinhaClientes nome="Maria da Silva" telefone="(11)95521-5833" email="exemplo.text@gmail.com" />
                        <LinhaClientes nome="Maria da Silva" telefone="(11)95521-5833" email="exemplo.text@gmail.com" />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default TelaClientes;