import React, { useState, useEffect } from "react";
import './ModalAddCliente.css';
import HeadeModal from '../header-modal/HeaderModal';

function ModalAddCliente({ onCloseCliente, titulo }) {

    // const initialFormData = campos.reduce((acc, campo) => {
    //     acc[campo.name] = campo.defaultValue || '';  // Inicializa os campos com valores padrão ou string vazia
    //     return acc;
    // }, {});

    // const [formData, setFormData] = useState(initialFormData);

    const [formData, setFormData] = useState({
        nomeCliente: '',
        telefoneCliente: '',
        emailCliente: '',
        tiposDeUsuario: 'ADMIN'
    });

    const [isVisibleAddCliente, setIsVisibleAdd] = useState(false);

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
                nomeCliente: '',
                telefoneCliente: '',
                emailCliente: '',
            });
        } catch (error) {
            setErrorMessage('Erro ao cadastrar o cliente.');
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
        setTimeout(onCloseCliente, 300); // Fecha o modal após a animação
    };

    return (

        <div className={`modal-overlay ${isVisibleAddCliente ? 'visible' : 'hidden'}`}>
            <div className="modal-header">
                <div className="container-modal">
                    <HeadeModal title={titulo} handleClose={onCloseCliente} />
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
                                <label>Telefone:</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="tempoExecucao"
                                    placeholder="(XX) XXXXX-XXXX"
                                    defaultValue={formData.tempoExecucao}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className='inputLabel'>
                                <label>E-mail:</label>
                                <input
                                    className="input"
                                    type="email"
                                    name="emailPessoa"
                                    placeholder="Digite seu email"
                                    value={formData.emailPessoa}
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

export default ModalAddCliente;