import React, { useState, useEffect } from "react";
import './ModalAdd.css';
import HeadeModal from '../header-modal/HeaderModal';
import { createServico, findServicos } from "../../pages/Servico/services/servicoServices";
import Cookies from 'js-cookie';
import { errorToast } from "../../utils/Toats";
import Select from 'react-select'; // Importa o react-select

function ModalAdd({ onClose, titulo }) {
    const [formData, setFormData] = useState({
        nomeServico: '',
        valorServico: '',
        tempoExecucao: '', // Horário inicial agora vazio
        corReferenciaHexHex: '#000000',
        descricao: '',
        tiposDeUsuario: 'ADMIN'
    });

    const [isVisibleAdd, setIsVisibleAdd] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const [servicos, setServicos] = useState([]);
    const [totalPags, setTotalPags] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#f4f4f4', // Cor de fundo do controle principal
            borderColor: '#ccc', // Cor da borda
            boxShadow: 'none', // Remove a sombra
            '&:hover': {
                borderColor: '#888', // Cor da borda ao passar o mouse
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#414141', // Cor de fundo do menu dropdown
            zIndex: 999, // Garante que o dropdown fique sobreposto
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? '#777676' // Cor do item selecionado
                : state.isFocused
                    ? '#777676' // Cor do item ao passar o mouse
                    : '#414141', // Cor padrão
            color: state.isSelected ? '#414141' : '#ffff', // Cor do texto
        }),
    };

    useEffect(() => {
        setIsVisibleAdd(true);
    }, []);

    // Gerar opções para o Select
    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                options.push({ value: time, label: time });
            }
        }
        return options;
    };

    const timeOptions = generateTimeOptions(); // Cria as opções no formato HH:mm

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTimeChange = (selectedOption) => {
        const tempoComSegundos = `${selectedOption.value}:00`; // Adiciona ":00" ao tempo
        setFormData({ ...formData, tempoExecucao: tempoComSegundos }); // Atualiza o estado com o valor no formato HH:mm:ss
    };


    const handleColorChange = (e) => {
        setFormData({ ...formData, corReferenciaHex: e.target.value });
    };

    const criarServico = async (servico, idEmpresa) => {
        setLoading(true);
        try {
            await createServico(servico, idEmpresa);

            console.log("Serviço criado com sucesso:", servico);

            buscarListaServicos(user.idEmpresa, paginaAtual, 8);

            setTimeout(() => onClose(), 3000);
        } catch (error) {
            errorToast('Serviço não criado');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const idEmpresa = user.idEmpresa;

        criarServico(formData, idEmpresa);
    };

    const buscarListaServicos = async (idEmpresa, pagina, tamanho) => {
        try {
            setLoading(true);
            const paginacao = { pagina: pagina - 1, tamanho };
            const response = await findServicos(idEmpresa, paginacao);

            setServicos(response.data.itens);

            var totalItens = Number(response.data.totalItens);
            var totalPagsCalc = Math.ceil(totalItens / tamanho);

            setTotalPags(totalPagsCalc);
        } catch (error) {
            errorToast('Serviço não encontrado');
            setServicos([]);
            setTotalPags(0);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setIsVisibleAdd(false); // Inicia a animação de saída
        setTimeout(onClose, 300); // Fecha o modal após a animação
    };

    return (
        <div className={`modal-overlay ${isVisibleAdd ? 'visible' : 'hidden'}`}>
            <div className="modal-header">
                <div className="container-modal">
                    <HeadeModal title={titulo} handleClose={onClose} />
                    <form className="form-modal-serv" onSubmit={handleSubmit}>
                        <div className="form-grupo-serv">
                            <div className='inputLabel'>
                                <label>Nome:</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="nomeServico"
                                    placeholder="Nome do Serviço"
                                    value={formData.nomeServico}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grupo-serv">
                            <div className='inputLabel'>
                                <label>Valor:</label>
                                <input
                                    className="input"
                                    type="number"
                                    name="valorServico"
                                    placeholder="Valor do Serviço"
                                    value={formData.valorServico}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grupo-serv">
                            <div className='inputLabel'>
                                <label>Tempo de Execução:</label>
                                <Select
                                    options={timeOptions} // Opções de horários
                                    onChange={handleTimeChange} // Atualiza o estado com segundos
                                    placeholder="Selecione a duração"
                                    isSearchable={false} // Sem barra de pesquisa
                                    className="time-picker-dropdown"
                                    styles={customStyles}
                                />

                            </div>
                        </div>

                        <div className="form-grupo-serv-cor">
                            <div className='inputLabel-cor'>
                                <label>Cor de Referência:</label>
                                <div className="color-picker-container">
                                    <input
                                        className="color-picker-input"
                                        type="color"
                                        name="corReferenciaHex"
                                        value={formData.corReferenciaHexHex}
                                        onChange={handleColorChange}
                                    />
                                    <span className="color-name">
                                        {formData.corReferenciaHexHex}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form-grupo-serv-text">
                            <div className='inputLabel'>
                                <label>Descrição:</label>
                                <textarea
                                    name="descricao"
                                    placeholder="Descrição"
                                    defaultValue={formData.descricao}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="botao-add-serv">
                            <button type="submit" className="botaoCadastrar">
                                Cadastrar
                            </button>
                        </div>
                    </form >
                </div>
            </div>
        </div>
    );
}

export default ModalAdd;