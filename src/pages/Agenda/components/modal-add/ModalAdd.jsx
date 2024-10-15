import React, { useState } from "react";
import './ModalAdd.css';

function ModalAdd({ onClose }) {

    const [formData, setFormData] = useState({
        nomeServico: '',
        valorServico: '',
        tempoExecucao: '',
        categoria: '',
        tiposDeUsuario: 'ADMIN'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                categoria: '',
            });
        } catch (error) {
            setErrorMessage('Erro ao cadastrar o serviço.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-header">
                <div className="container-modal">
                    <h4 className="titulo-modal">Adicionar Novo Serviço <button className="botaoFechar" onClick={onClose}>X</button></h4>

                    <form className="form-modal" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className='inputLabel'>
                                <label>Nome:</label>
                                <input
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
                                    type="text"
                                    name="tempoExecucao"
                                    placeholder="Tempo de Execução"
                                    defaultValue={formData.tempoExecucao}
                                    onChange={handleChange}
                                    required
                                />
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

                        <button className="botaoCadastrar" onClick={handleSubmit}>Cadastrar</button>
                    </form >
                </div>
            </div>
        </div>

    )
}

export default ModalAdd;