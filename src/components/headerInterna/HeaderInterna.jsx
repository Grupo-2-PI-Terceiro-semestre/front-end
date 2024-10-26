import React, { useState } from "react";
import './HeaderInterna.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalAdd from "../modalAdd/ModalAdd";
import ModalAddCliente from "../../pages/Clientes/components/modalAddCliente/ModalAddCliente";

function HeaderInterna({ texto }) {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModalAdd = () => {
        setIsModalOpen(true);
    };

    const closeModalAdd = () => {
        setIsModalOpen(false);
    };

    // const camposCadastroServico = [
    //     { label: 'Nome do Serviço', name: 'nomeServico', type: 'text', placeholder: 'Nome do Serviço', required: true },
    //     { label: 'Valor do Serviço', name: 'valorServico', type: 'number', placeholder: 'Valor do Serviço', required: true },
    //     { label: 'Tempo de Execução', name: 'tempoExecucao', type: 'text', placeholder: 'Tempo de Execução', required: true },
    //     { label: 'Cor de Referência', name: 'corReferencia', type: 'color', required: true },
    //     { label: 'Categoria', name: 'categoria', type: 'text', placeholder: 'Categoria', required: true },
    //     { label: 'Descrição', name: 'descricao', type: 'textarea', placeholder: 'Descrição do Serviço', required: true },
    // ];

    // const camposCadastroProduto = [
    //     { label: 'Nome do Produto', name: 'nomeProduto', type: 'text', placeholder: 'Nome do Produto', required: true },
    //     { label: 'Preço', name: 'preco', type: 'number', placeholder: 'Preço', required: true },
    //     { label: 'Categoria', name: 'categoria', type: 'text', placeholder: 'Categoria do Produto', required: true },
    //     { label: 'Descrição', name: 'descricao', type: 'textarea', placeholder: 'Descrição do Produto', required: true },
    // ];

    return (
        <div className="main-header-interna">
            <div className="container-header-interna">
                <div className="botao">
                    <button onClick={openModalAdd}>
                        <FontAwesomeIcon icon={faPlus} /> {texto}
                    </button>
                </div>

                {isModalOpen && (
                    // <ModalAdd onClose={closeModalAdd} titulo="Adicionar Novo Serviço" />

                    <ModalAdd
                        titulo="Cadastrar Serviço"
                        onClose={() => setIsModalOpen(false)}
                    // campos={camposCadastroServico}
                    // tituloBotao="Cadastrar"
                    />
                )}

            </div>


        </div>
    );
}

export default HeaderInterna;
