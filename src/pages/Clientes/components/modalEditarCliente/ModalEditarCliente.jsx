import React, { useState, useEffect } from "react";
// import './ModalEditarCliente.css';
import './ModalEditarCliente.css';
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

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

    const handleSubmit = () => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Tem certeza?",
            text: "O cliente será editado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, editar!",
            cancelButtonText: "Não, cancelar!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Editado!",
                    text: "O cliente foi editado.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O cliente não foi editado",
                    icon: "error"
                });
            }
        });


        // e.preventDefault();
        // try {
        //     // await api.put(`/${idCard}`, {
        //     await cadastroService(formData);
        //     alert('Cadastro realizado com sucesso!');
        //     setFormData({
        //         nomeCliente: '',
        //         telefoneCliente: '',
        //         emailCliente: '',
        //         representante: "true",
        //     });
        // } catch (error) {
        //     setErrorMessage('Erro ao cadastrar o serviço.');
        // }
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
                                    name="nomeCliente"
                                    placeholder="Nome do Cliente"
                                    value={formData.nomeCliente}
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
                                    name="telefoneCliente"
                                    placeholder="(XX) XXXXX-XXXX"
                                    defaultValue={formData.telefoneCliente}
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
                                    name="emailCliente"
                                    placeholder="Digite o email"
                                    value={formData.emailCliente}
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