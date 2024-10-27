import React, { useState, useEffect } from "react";
import './ModalAddCliente.css';
import Swal from 'sweetalert2';
import HeadeModal from "../../../../components/header-modal/HeaderModal";

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
            text: "Um novo cliente será criado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, cadastrar!",
            cancelButtonText: "Não, cancelar!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Cadastrado!",
                    text: "O cliente foi cadastrado.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O cliente não foi cadastrado",
                    icon: "error"
                });
            }
        });
    };

    const handleClose = () => {
        setIsVisibleAdd(false);
        setTimeout(onCloseCliente, 300);
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
                                    name="nomeCliente"
                                    placeholder="Nome do Cliente"
                                    value={formData.nomeCliente}
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
                                    name="telefoneCliente"
                                    placeholder="(XX) XXXXX-XXXX"
                                    defaultValue={formData.telefoneCliente}
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
                                    name="emailCliente"
                                    placeholder="Digite o email"
                                    value={formData.emailCliente}
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