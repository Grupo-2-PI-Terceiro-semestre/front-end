import React, { useState, useEffect } from "react";
import './ModalAddServico.css';
import Cookies from 'js-cookie';
import Select from 'react-select'; 
import HeadeModal from "../../../../components/header-modal/HeaderModal";
import { createServico, findServicos } from "../../services/servicoServices";
import { errorToast } from "../../../../utils/Toats";

function ModalAddServico({ onCloseServico, titulo }) {
    const [formData, setFormData] = useState({
        nomeServico: '',
        valorServico: '',
        duracao: '', 
        corReferenciaHex: '#000000',
        descricao: '',
        statusAtividade: 'ATIVO',
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
            backgroundColor: '#f4f4f4', 
            borderColor: '#ccc', 
            boxShadow: 'none', 
            '&:hover': {
                borderColor: '#888',
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#414141', 
            zIndex: 999, 
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? '#777676' 
                : state.isFocused
                    ? '#777676'
                    : '#414141', 
            color: state.isSelected ? '#414141' : '#ffff', 
        }),
    };

    useEffect(() => {
        setIsVisibleAdd(true);
    }, []);

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

    const timeOptions = generateTimeOptions(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTimeChange = (selectedOption) => {
        const tempoComSegundos = `${selectedOption.value}:00`; 
        setFormData({ ...formData, duracao: tempoComSegundos });
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

            setTimeout(() => onCloseServico(), 3000);
        } catch (error) {
            errorToast('Serviço não criado');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const idEmpresa = user.idEmpresa;

        console.log("Dados enviados:", formData);

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
            setTimeout(() => {
                window.location.reload(); // Recarrega a página
            }, 300);
        }
    };

    const handleClose = () => {
        setIsVisibleAdd(false); 
        setTimeout(onCloseServico, 300); 
    };

    return (
        <div className={`modal-overlay ${isVisibleAdd ? 'visible' : 'hidden'}`}>
            <div className="modal-header">
                <div className="container-modal">
                    <HeadeModal title={titulo} handleClose={onCloseServico} />
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
                                    options={timeOptions}
                                    onChange={handleTimeChange} 
                                    placeholder="Selecione a duração"
                                    isSearchable={false} 
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
                                        value={formData.corReferenciaHex}
                                        onChange={handleColorChange}
                                    />
                                    <span className="color-name">
                                        {formData.corReferenciaHex}
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

export default ModalAddServico;