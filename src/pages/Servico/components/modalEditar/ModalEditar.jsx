import React, { useState, useEffect } from "react";
import './ModalEditar.css';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function ModalEditar({ onClose, titulo }) {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const [formData, setFormData] = useState({
        nomeServico: '',
        valorServico: '',
        tempoExecucao: '',
        corReferencia: '#000000',
        descricao: '',
        categoria: '',
        tiposDeUsuario: 'ADMIN'
    });

    const navigate = useNavigate();
    const { idServico } = useParams();
    const [nomeServico, setNomeServico] = useState("");
    const [valorServico, setValorServico] = useState("");
    const [tempoExecucao, setTempoExecucao] = useState("");
    const [corReferencia, setCorReferencia] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");

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
                categoria: '',
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
                    <h4 className="titulo-modal-editar">{titulo} <button className="botaoFechar" onClick={onClose}>X</button></h4>

                    <form className="form-modal-editar" onSubmit={handleSubmit}>
                        <div className="form-group-editar">
                            <div className='inputLabel-editar'>
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

                        <div className="form-group-editar">
                            <div className='inputLabel-editar'>
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

                        <div className="form-group-editar">
                            <div className='inputLabel-editar'>
                                <label>Tempo de Execução:</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="tempoExecucao"
                                    placeholder="Tempo de Execução"
                                    defaultValue={formData.tempoExecucao}
                                    onChange={handleChange}
                                    required
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
                                        name="corReferencia"
                                        value={formData.corReferencia}
                                        onChange={handleColorChange}
                                    />
                                    <span className="color-name">
                                        {formData.corReferencia}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group-editar">
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
                        </div >

                        <div className="form-group-text">
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

                        <button className="botaoCadastrar" onClick={handleSubmit}>Editar</button>
                    </form >
                </div>
            </div>
        </div>

    )
}

export default ModalEditar;