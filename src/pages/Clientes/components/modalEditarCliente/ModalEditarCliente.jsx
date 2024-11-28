import React, { useState, useEffect } from "react";
import HeadeModal from "../../../../components/header-modal/HeaderModal";
import './ModalEditarCliente.css';
import { successToast, errorToast } from '../../../../utils/Toats';
import { AtualizarCliente } from "../../services/clienteServices";
import Button from "../../../../components/button/Button";

function ModalEditarCliente({ onClose, titulo, idCliente, nome, telefone, email }) {

    const [isVisible, setIsVisible] = useState(false);
    // const [isVisibleAddCliente, setIsVisibleAdd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nomeSelecionado, setNomeSelecionado] = useState(nome || '');
    const [nomeOriginal, setNomeOriginal] = useState(nome || '');

    const [telefoneSelecionado, setTelefoneSelecionado] = useState(telefone || '');
    const [emailSelecionado, setEmailSelecionado] = useState(email || '');

    useEffect(() => {
        setIsVisible(true);
        // setIsVisibleAdd(true);

        setNomeOriginal(nome);
        console.log(nomeOriginal + ' nome original ' + idCliente + ' id');
    }, []);

    const handleNomeChange = (event) => {
        setNomeSelecionado(event.target.value);
    };

    const handleTelefoneChange = (event) => {
        setTelefoneSelecionado(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmailSelecionado(event.target.value);
    };

    // const [formData, setFormData] = useState({
    //     nomeCliente: '',
    //     telefoneCliente: '',
    //     emailCliente: '',
    //     tiposDeUsuario: 'ADMIN'
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleColorChange = (e) => {
    //     setFormData({ ...formData, corReferencia: e.target.value });
    // };

    const handleSubmit = () => {

        event.preventDefault(); 

        const eventoAtualizado = {
            idPessoa: idCliente,
            nomePessoa: nomeSelecionado,
            numeroTelefone: telefoneSelecionado,
            emailPessoa: emailSelecionado,
        };

        atualizarCliente(eventoAtualizado);

    };

    const atualizarCliente = async (eventoAtualizado) => {
        try {
            setLoading(true);
            await AtualizarCliente("clientes/atualizar", eventoAtualizado);
            successToast('Cliente atualizado com sucesso!');
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar o cliente:', error);
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
                    <form className="form-modal-editar-cliente" onSubmit={handleSubmit}>
                        <div className="form-group-editar">
                            <div className='inputLabel-editar'>
                                <label>Nome:</label>
                                <input
                                    className="input"
                                    type="text"
                                    // name="nomeCliente"
                                    // placeholder={nome}
                                    value={nomeSelecionado}
                                    onChange={handleNomeChange}
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
                                    // name="telefoneCliente"
                                    // placeholder={telefone}
                                    value={telefoneSelecionado}
                                    onChange={handleTelefoneChange}
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
                                    // name="emailCliente"
                                    // placeholder={email}
                                    value={emailSelecionado}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* <button className="botaoCadastrar" onClick={handleSubmit}>Editar</button> */}

                        <div className="botao-add-serv">
                            <Button
                                size="100%"
                                fontSize="15px"
                                fontWeight="bold"
                                content={loading ? 'Editando...' : 'Editar'}
                                backgroundColor="#388E3C"
                                type="submit"
                                disabled={loading}
                            />
                        </div>
                    </form >
                </div>
            </div>
        </div>

    )
}

export default ModalEditarCliente;