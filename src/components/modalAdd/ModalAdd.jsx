import React, { useState, useEffect  } from "react";
import './ModalAdd.css';

function ModalAdd({ onClose, titulo, campos, tituloBotao }) {

    const initialFormData = campos.reduce((acc, campo) => {
        acc[campo.name] = campo.defaultValue || '';  // Inicializa os campos com valores padrão ou string vazia
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormData);
    
    // const [formData, setFormData] = useState({
    //     nomeServico: '',
    //     valorServico: '',
    //     tempoExecucao: '',
    //     corReferencia: '#000000',
    //     descricao: '',
    //     categoria: '',
    //     tiposDeUsuario: 'ADMIN'
    // });

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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await cadastroService(formData);
    //         alert('Cadastro realizado com sucesso!');
    //         setFormData({
    //             nomeServico: '',
    //             valorServico: '',
    //             representante: "true",
    //             tempoExecucao: '',
    //             corReferencia: '#000000',
    //             categoria: '',
    //         });
    //     } catch (error) {
    //         setErrorMessage('Erro ao cadastrar o serviço.');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await cadastroService(formData);  // Função de cadastro que você já tem
            alert('Cadastro realizado com sucesso!');
            setFormData(initialFormData);  // Reseta o formulário
        } catch (error) {
            alert('Erro ao cadastrar o serviço.');
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
                <h4 className="titulo-modal">{titulo} 
                    <button className="botaoFechar" onClick={onClose}>X</button>
                </h4>

                <form className="form-modal" onSubmit={handleSubmit}>
                    {campos.map((campo, index) => (
                        <div className="form-group" key={index}>
                            <div className='inputLabel'>
                                <label>{campo.label}:</label>
                                {campo.type === 'textarea' ? (
                                    <textarea
                                        className="form-group-text"
                                        name={campo.name}
                                        placeholder={campo.placeholder}
                                        value={formData[campo.name]}
                                        onChange={handleChange}
                                        required={campo.required}
                                    />
                                ) : campo.type === 'color' ? (
                                    <div className="color-picker-container">
                                        <input
                                            className="color-picker-input"
                                            type="color"
                                            name={campo.name}
                                            value={formData[campo.name]}
                                            onChange={handleChange}
                                        />
                                        <span className="color-name">
                                            {formData[campo.name]}
                                        </span>
                                    </div>
                                ) : (
                                    <input
                                        className="input"
                                        type={campo.type}
                                        name={campo.name}
                                        placeholder={campo.placeholder}
                                        value={formData[campo.name]}
                                        onChange={handleChange}
                                        required={campo.required}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                    <button className="botaoCadastrar" type="submit">{tituloBotao}</button>
                </form>
            </div>
        </div>
    </div>

    )
}

export default ModalAdd;