import React from "react";
import './Clientes.css';
import Menu from "../../components/menu/Menu";
import TelaClientes from "./components/telaClientes/TelaClientes";
import HeaderCliente from "../../components/headerCliente/HeaderCliente";

function Clientes() {

    const camposCadastroCliente = [
        { label: 'Nome do Serviço', name: 'nomeServico', type: 'text', placeholder: 'Nome do Serviço', required: true },
        { label: 'Valor do Serviço', name: 'valorServico', type: 'number', placeholder: 'Valor do Serviço', required: true },
        { label: 'Tempo de Execução', name: 'tempoExecucao', type: 'text', placeholder: 'Tempo de Execução', required: true },
        { label: 'Cor de Referência', name: 'corReferencia', type: 'color', required: true },
        { label: 'Categoria', name: 'categoria', type: 'text', placeholder: 'Categoria', required: true },
        { label: 'Descrição', name: 'descricao', type: 'textarea', placeholder: 'Descrição do Serviço', required: true },
    ];

    return (
        <div className="main-clientes">
            <div className="container-clientes">

                <Menu />

                <div className="principal">

                    <div className="tituloCliente">
                        <div className="container-titulo-cliente">
                            <h3>Clientes</h3>
                            <HeaderCliente texto="Novo Cliente" />
                        </div>
                    </div>

                    <TelaClientes titulo="Clientes" placeholder="Pesquisar cliente" titulo1="NOME" titulo2="TELEFONE" titulo3="EMAIL" titulo4="AÇÕES" />

                </div>

            </div>
        </div>
    )
}

export default Clientes;