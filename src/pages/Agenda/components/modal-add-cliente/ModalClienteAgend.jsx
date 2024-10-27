import React, { useState, useEffect, useRef } from "react";
import './ModalClienteAgend.css';
import Button from "../../../../components/button/Button";
import plusIcon from "../../../../assets/plus.png";
import HeaderModal from "../../../../components/header-modal/HeaderModal";
import Swal from 'sweetalert2';

function ModalClienteAgend({ onClose }) {
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

    return (
        <div className="modal-background" onClick={onClose}>
            <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
                <div className="detalhe-modal">
                    <div className="container-modal-agend">
                        <HeaderModal title="Adicionar Cliente" handleClose={onClose} />

                        <div className='inputModalAdd'>
                            <form className="form-modal-agend" onSubmit={handleSubmit}>
                                <div className="form-group-agenda">
                                    <div className='inputLabelModal'>
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

                                <div className="form-group-agenda">
                                    <div className='inputLabelModal'>
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

                                <div className="form-group-agenda">
                                    <div className='inputLabelModal'>
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

                                {/* <button className="botaoCadastrar" onClick={handleSubmit}>Cadastrar</button> */}
                                <div className="botao">
                                    <Button
                                        size="auto"
                                        content="Cadastrar"
                                        height="2rem"
                                        fontSize="14px"
                                        widthImage="1.5rem"
                                        heightImage="1.5rem"
                                        onClick={handleSubmit}
                                        image={plusIcon}
                                    />
                                </div>
                            </form >
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ModalClienteAgend;