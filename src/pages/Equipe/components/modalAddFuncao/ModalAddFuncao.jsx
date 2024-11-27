import React, {useState, useEffect} from "react";
import './ModalAddFuncao.css';
import HeaderModal from "../../../../components/header-modal/HeaderModal";
import Button from "../../../../components/button/Button";
import plusIcon from "../../../../assets/plus.png";

function ModalAddFuncao({onClose}) {

    const [formData, setFormData] = useState({
        nomeFuncao: '',
        tiposDeUsuario: 'ADMIN'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
            text: "Uma nova função será criado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, cadastrar!",
            cancelButtonText: "Não, cancelar!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Cadastrado!",
                    text: "A função foi cadastrada.",
                    icon: "success"
                });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "A função não foi cadastrada",
                    icon: "error"
                });
            }
        });
    };

    return (
        <div className="main-modal-funcao" onClick={onClose}>
            <div className="container-modal-funcao" onClick={(e) => e.stopPropagation()}>
                <div className="detalhe-modal">
                    <div className="container-modal-agend">
                        <HeaderModal title="Adicionar Função" handleClose={onClose} />

                        <div className='inputModalAdd'>
                            <form className="form-modal-agend" onSubmit={handleSubmit}>
                                <div className="form-group-agenda">
                                    <div className='inputLabelModal'>
                                        <label>Nome:</label>
                                        <input
                                            className="input"
                                            type="text"
                                            name="nomeCliente"
                                            placeholder="Nome da Função"
                                            value={formData.nomeCliente}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* <div className="form-group-agenda">
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
                                </div> */}

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

export default ModalAddFuncao;