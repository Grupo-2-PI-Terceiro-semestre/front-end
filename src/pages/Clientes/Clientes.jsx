import React from "react";
import './Clientes.css';
import ModalAdd from "../../components/modalAdd/ModalAdd";
import Menu from "../../components/menu/Menu";
import IconBreadcrumbs from "../../components/breadcrumb/Breadcrumb";
import TelaServicos from "../../components/telaServicos/TelaServicos";
import HeaderInterna from "../../components/headerInterna/HeaderInterna";

function Clientes() {

    const camposCadastroServico = [
        { label: 'Nome do Serviço', name: 'nomeServico', type: 'text', placeholder: 'Nome do Serviço', required: true },
        { label: 'Valor do Serviço', name: 'valorServico', type: 'number', placeholder: 'Valor do Serviço', required: true },
        { label: 'Tempo de Execução', name: 'tempoExecucao', type: 'text', placeholder: 'Tempo de Execução', required: true },
        { label: 'Cor de Referência', name: 'corReferencia', type: 'color', required: true },
        { label: 'Categoria', name: 'categoria', type: 'text', placeholder: 'Categoria', required: true },
        { label: 'Descrição', name: 'descricao', type: 'textarea', placeholder: 'Descrição do Serviço', required: true },
    ];

    const camposCadastroProduto = [
        { label: 'Nome do Produto', name: 'nomeProduto', type: 'text', placeholder: 'Nome do Produto', required: true },
        { label: 'Preço', name: 'preco', type: 'number', placeholder: 'Preço', required: true },
        { label: 'Categoria', name: 'categoria', type: 'text', placeholder: 'Categoria do Produto', required: true },
        { label: 'Descrição', name: 'descricao', type: 'textarea', placeholder: 'Descrição do Produto', required: true },
    ];

    return (
        <div className="main-clientes">
            <div className="container-clientes">

                <Menu />

                {/* <ModalAdd
                    titulo="Cadastrar Serviço"
                    onClose={() => setIsModalOpen(false)}
                    campos={camposCadastroServico}
                    tituloBotao="Cadastrar"
                />             */}

                <div className="principal">
                    <IconBreadcrumbs
                        paths={[
                            { label: 'Serviço', href: '/servico' }
                        ]}
                    />

                    <div className="titulo">
                        <h3>Clientes</h3>
                        <HeaderInterna texto="Novo Cliente" />
                    </div>                
                    
                    <TelaServicos titulo="Serviços" placeholder="Pesquisar serviço" titulo1="NOME" titulo2="VALOR" titulo3="TEMPO" titulo4="CATEGORIA" titulo5="AÇÕES" />

                </div>

            </div>
        </div>
    )
}

export default Clientes;