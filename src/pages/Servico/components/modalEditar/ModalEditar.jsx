import React, { useState, useEffect } from "react";
import './ModalEditar.css';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import HeadeModal from "../../../../components/header-modal/HeaderModal";
import Select from 'react-select'; 

function ModalEditar({ onClose, titulo, nome, valor, tempo, cor, descricaoServico }) {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
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

    const [formData, setFormData] = useState({
        nomeServico: '',
        valorServico: '',
        tempoExecucao: '',
        corReferencia: '#000000',
        descricao: '',
        // categoria: '',
        tiposDeUsuario: 'ADMIN'
    });

    const navigate = useNavigate();
    const { idServico } = useParams();
    const [nomeServico, setNomeServico] = useState("");
    const [valorServico, setValorServico] = useState("");
    const [tempoExecucao, setTempoExecucao] = useState("");
    const [corReferencia, setCorReferencia] = useState("");
    const [descricao, setDescricao] = useState("");
    // const [categoria, setCategoria] = useState("");

    // useEffect(() => {
    //     api.get(`/${idServico}`).then((response) => {
    //         const { data } = response;
    //         const { nomeServico, tempoExecucao, valorServico, corReferencia, descricao, categoria } = data;
    //         setNomeServico(nomeServico);
    //         setTempoExecucao(tempoExecucao);
    //         setValorServico(valorServico);
    //         setCorReferencia(corReferencia);
    //         setDescricao(descricao);
    //         setCategoria(categoria);
    //     })
    //         .catch((error) => {
    //             console.log("Erro ao buscar os detalhes do serviço:", error);
    //         })
    // }, [idServico]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleColorChange = (e) => {
        setFormData({ ...formData, corReferencia: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await api.put(`/${idCard}`, {
            await cadastroService(formData);
            alert('Cadastro realizado com sucesso!');
            setFormData({
                nomeServico: '',
                valorServico: '',
                tempoExecucao: '',
                corReferencia: '#000000',
                descricao: '',
                // categoria: '',
                representante: "true",
            });
        } catch (error) {
            setErrorMessage('Erro ao cadastrar o serviço.');
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
                                    placeholder={nome}
                                    value={nome}
                                    onChange={handleChange}
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
                                    placeholder={valor}
                                    value={valor}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group-editar">
                            <div className='inputLabel-editar'>
                                <label>Tempo de Execução:</label>
                                {/* <input
                                    className="input"
                                    type="text"
                                    name="tempoExecucao"
                                    placeholder={tempo}
                                    defaultValue={tempo}
                                    onChange={handleChange}
                                    required
                                /> */}

                                <Select
                                    options={timeOptions}
                                    onChange={handleChange}
                                    placeholder={tempo}
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
                                        name={cor}
                                        value={cor}
                                        onChange={handleColorChange}
                                    />
                                    <span className="color-name">
                                        {cor}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* <div className="form-group-editar">
                            <div className='inputLabel-editar'>
                                <label htmlFor="categoria">Categoria:</label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    defaultValue={formData.categoria}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione a Categoria</option>
                                    <option value="categoria1">Categoria 1</option>
                                    <option value="categoria2">Categoria 2</option>
                                    <option value="categoria3">Categoria 3</option>
                                </select>
                            </div>
                        </div > */}

                        <div className="form-group-text">
                            <div className='inputLabel'>
                                <label>Descrição:</label>
                                <textarea
                                    name="descricao"
                                    placeholder={descricaoServico}
                                    defaultValue={descricaoServico}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <button className="botaoCadastrar" onClick={handleSubmit}>Editar</button>
                    </form >
                </div>
            </div>
        </div>

    )
}

export default ModalEditar;