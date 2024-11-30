import React, { useState, useEffect } from "react";
import './ModalEditar.css';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import HeadeModal from "../../../../components/header-modal/HeaderModal";
import Select from 'react-select';
import { AtualizarServico } from "../../services/servicoServices";
import { successToast, errorToast } from '../../../../utils/Toats';

function ModalEditar({ onClose, titulo, idServico, nome, valor, tempo, cor, descricaoServico }) {

    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    // const { idServico } = useParams();
    const [nomeSelecionado, setNomeServico] = useState(nome || '');
    const [valorSelecionado, setValorSelecionado] = useState(valor || '');
    const [tempoSelecionado, setTempoSelecionado] = useState(tempo || '');
    const [corReferenciaSelecionada, setCorSelecionada] = useState(cor || '');
    const [descricaoSelecionada, setDescricaoSelecionada] = useState(descricaoServico || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        console.log(idServico + ' id serviço')
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

    const handleNomeChange = (event) => {
        setNomeServico(event.target.value);
    };

    const handleValorChange = (event) => {
        setValorSelecionado(event.target.value);
    };

    const handleTempoChange = (event) => {
        setTempoSelecionado(event.target.value);
    };

    const handleCorChange = (event) => {
        setCorSelecionada(event.target.value);
    };

    const handleDescricaoChange = (event) => {
        setDescricaoSelecionada(event.target.value);
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        const eventoAtualizado = {
            idServico: idServico,
            nomeServico: nomeSelecionado,
            valorServico: valorSelecionado,
            duracao: tempoSelecionado,
            descricao: descricaoSelecionada,
            corReferenciaHex: corReferenciaSelecionada
        };

        atualizarServico(eventoAtualizado);

    };

    const atualizarServico = async (eventoAtualizado) => {
        try {
            setLoading(true);
            await AtualizarServico("servicos/atualizar", eventoAtualizado);
            successToast('Serviço atualizado com sucesso!');
            onClose();

            setTimeout(() => {
                window.location.reload(); // Recarrega a página
            }, 300);
        } catch (error) {
            console.error('Erro ao atualizar o serviço:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className={`modal-overlay-editar ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="modal-header-editar">
                <div className="container-modal-editar">
                    <HeadeModal title={titulo} handleClose={onClose} />
                    <form className="form-modal-editar" onSubmit={handleSubmit}>
                        <div className="form-group-editar">
                            <div className='inputLabel-editar'>
                                <label>Nome:</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="nomeServico"
                                    value={nomeSelecionado}
                                    onChange={handleNomeChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group-editar">
                            <div className='inputLabel-editar'>
                                <label>Valor:</label>
                                <input
                                    className="input"
                                    type="number"
                                    name="valorServico"
                                    value={valorSelecionado}
                                    onChange={handleValorChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group-editar">
                            <div className='inputLabel-editar'>
                                <label>Tempo de Execução:</label>

                                <Select
                                    options={timeOptions}
                                    value={tempoSelecionado}
                                    onChange={handleTempoChange}
                                    isSearchable={false}
                                    className="time-picker-dropdown"
                                    styles={customStyles}
                                />
                            </div>
                        </div>

                        <div className="form-group-editar">
                            <div className='inputLabel-editar'>
                                <label>Cor de Referência:</label>
                                <div className="color-picker-container">
                                    <input
                                        className="color-picker-input"
                                        type="color"
                                        value={corReferenciaSelecionada}
                                        onChange={handleCorChange}
                                    />
                                    <span className="color-name">
                                        {cor}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group-text">
                            <div className='inputLabel'>
                                <label>Descrição:</label>
                                <textarea
                                    name="descricao"
                                    value={descricaoSelecionada}
                                    onChange={handleDescricaoChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* <button className="botaoCadastrar" onClick={handleSubmit}>Editar</button> */}

                        <div className="botao-add-serv">
                            <button type="submit" className="botaoCadastrar" disabled={loading}>
                                {loading ? 'Editando...' : 'Editar'}
                            </button>
                        </div>
                    </form >
                </div>
            </div>
        </div>

    )
}

export default ModalEditar;