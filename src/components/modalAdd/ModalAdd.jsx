import React, { useState, useEffect  } from "react";
import './ModalAdd.css';

function ModalAdd({ onClose, titulo }) {

    // const initialFormData = campos.reduce((acc, campo) => {
    //     acc[campo.name] = campo.defaultValue || '';  // Inicializa os campos com valores padrão ou string vazia
    //     return acc;
    // }, {});

    // const [formData, setFormData] = useState(initialFormData);
    
    const [formData, setFormData] = useState({
        nomeServico: '',
        valorServico: '',
        tempoExecucao: '',
        corReferencia: '#000000',
        descricao: '',
        categoria: '',
        tiposDeUsuario: 'ADMIN'
    });

    const [isVisibleAdd, setIsVisibleAdd] = useState(false);

    useEffect(() => {
        setIsVisibleAdd(true);
    }, []);

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
            await cadastroService(formData);
            alert('Cadastro realizado com sucesso!');
            setFormData({
                nomeServico: '',
                valorServico: '',
                representante: "true",
                tempoExecucao: '',
                corReferencia: '#000000',
                categoria: '',
            });
        } catch (error) {
            setErrorMessage('Erro ao cadastrar o serviço.');
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await cadastroService(formData);  // Função de cadastro que você já tem
    //         alert('Cadastro realizado com sucesso!');
    //         setFormData(initialFormData);  // Reseta o formulário
    //     } catch (error) {
    //         alert('Erro ao cadastrar o serviço.');
    //     }
    // };

    const handleClose = () => {
        setIsVisibleAdd(false); // Inicia a animação de saída
        setTimeout(onClose, 300); // Fecha o modal após a animação
    };

    return (
        
        <div className={`modal-overlay ${isVisibleAdd ? 'visible' : 'hidden'}`}>
            <div className="modal-header">
                <div className="container-modal">
                    <h4 className="titulo-modal">{titulo} <button className="botaoFechar" onClick={onClose}>X</button></h4>

                    <form className="form-modal" onSubmit={handleSubmit}>
                        <div className="form-group">
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

                        <div className="form-group">
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

                        <div className="form-group">
                            <div className='inputLabel'>
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

                        <div className="form-group-cor">
                            <div className='inputLabel-cor'>
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

                        <div className="form-group">
                            <div className='inputLabel'>
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

                        <button className="botaoCadastrar" onClick={handleSubmit}>Cadastrar</button>
                    </form >
                </div>
            </div>
        </div>

    )
}

export default ModalAdd;