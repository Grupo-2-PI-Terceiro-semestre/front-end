import React, { useState, useEffect } from "react";
import HeadeModal from "../header-modal/HeaderModal";
// import './ModalEditarCliente.css';
import './ModalEditarCliente.css';
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

function ModalEditarCliente({ onClose, titulo }) {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

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
            // await api.put(`/${idCard}`, {
            await cadastroService(formData);
            alert('Cadastro realizado com sucesso!');
            setFormData({
                nomeCliente: '',
                telefoneCliente: '',
                emailCliente: '',
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
                                    placeholder="Nome do Serviço"
                                    value={formData.nomeServico}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group-editar">
                            <div className='inputLabel-editar'>
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

                        <div className="form-group-editar">
                            <div className='inputLabel-editar'>
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

                        <button className="botaoCadastrar" onClick={handleSubmit}>Editar</button>
                    </form >
                </div>
            </div>
        </div>

    )
}

export default ModalEditarCliente;