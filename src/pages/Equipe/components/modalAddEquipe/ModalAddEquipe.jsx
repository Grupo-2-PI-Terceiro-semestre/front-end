import React, { useState, useEffect } from "react";
import './ModalAddEquipe.css';
import HeadeModal from "../../../../components/header-modal/HeaderModal";
import Cookies from 'js-cookie';
import { successToast, errorToast } from '../../../../utils/Toats';
import { createColaborador, findFuncoes } from "../../services/equipeServices";
import SearchableDropdown from '../autocomplete/SearchableDropdown';

function ModalAddEquipe({ onClose, titulo }) {
    const [loading, setLoading] = useState(false);
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

    const [isVisibleAdd, setIsVisibleAdd] = useState(false);

    const [nomePessoaDigitado, setNomePessoaDigitado] = useState('');
    const [numeroTelefoneDigitado, setNumeroTelefoneDigitado] = useState('');
    const [emailDigitado, setEmailDigitado] = useState('');
    const [funcaoSelecionada, setFuncaoSelecionada] = useState(null);
    const [funcoes, setFuncoes] = useState([]);

    useEffect(() => {
        setIsVisibleAdd(true);
        buscarFuncoes();
    }, []);

    const handleClose = () => {
        setTimeout(onClose, 300); 
    };

    const handleNomeChange = (event) => {
        setNomePessoaDigitado(event.target.value);
    };

    const handleTelefoneChange = (event) => {
        setNumeroTelefoneDigitado(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmailDigitado(event.target.value);
    };

    const handleFuncoesChange = (funcao) => {
        setFuncaoSelecionada(funcao);
    };

    const buscarFuncoes = async () => {
        try {
            const response = await findFuncoes();
            localStorage.setItem('funcoes', JSON.stringify(response.data));
            setFuncoes(response.data);

            console.log(funcoes + ' funções');
        } catch (error) {

        }
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!nomePessoaDigitado || !numeroTelefoneDigitado || !emailDigitado || !funcaoSelecionada) {
            errorToast('Por favor, preencha todos os campos.');
            return;
        }

        const colaboradorData = {
            nomePessoa: nomePessoaDigitado,
            numeroTelefone: numeroTelefoneDigitado,
            emailPessoa: emailDigitado,
            idFuncao: funcaoSelecionada.idFuncao,
            statusAtividade: 'ATIVO'
        };

        try {
            setLoading(true);
            const idEmpresa = user?.idEmpresa;
            await createColaborador(colaboradorData, idEmpresa);
            successToast('Colaborador criado com sucesso!');
            onClose();

            setTimeout(() => {
                window.location.reload();
            }, 300);
        } catch (error) {
            errorToast('Erro ao criar colaborador.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`modal-overlay ${isVisibleAdd ? 'visible' : 'hidden'}`}>
            <div className="modal-header">
                <div className="container-modal">
                    <HeadeModal title={titulo} handleClose={onClose} />
                    <form className="form-modal-serv" onSubmit={handleSubmit}>  
                        <div className="form-grupo-serv">
                            <div className='inputLabel'>
                                <label>Nome:</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="nomePessoa"
                                    placeholder="Nome do Colaborador"
                                    value={nomePessoaDigitado}
                                    onChange={handleNomeChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grupo-serv">
                            <div className='inputLabel'>
                                <label>Telefone:</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="numeroTelefone"
                                    placeholder="(XX)XXXXX-XXXX"
                                    value={numeroTelefoneDigitado}
                                    onChange={handleTelefoneChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grupo-serv">
                            <div className='inputLabel'>
                                <label>E-mail:</label>
                                <input
                                    className="input"
                                    type="email"
                                    name="emailPessoa"
                                    placeholder="Digite o email"
                                    value={emailDigitado}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grupo-serv">
                            <div className='inputLabel'>
                                <label>Função:</label>
                                <SearchableDropdown className="input-cliente"
                                    name="nomeFuncao"
                                    options={funcoes}
                                    required={true}
                                    value={funcaoSelecionada?.nomeFuncao || ''}
                                    onSelectOption={handleFuncoesChange}
                                    displayField={(option) => option.nomeFuncao}
                                    uniqueKey={(option) => option.idFuncao}
                                />

                                {/* <SearchableDropdown 
                                    className="input-cliente"
                                    name="nomeFuncao"
                                    options={funcoes}
                                    required={true}
                                    value={nomeFuncao}
                                    onSelectOption={handleFuncoesChange}
                                    displayField={(option) => option.nomeFuncao}
                                    uniqueKey={(option) => option.idFuncao}
                                /> */}
                            </div>
                        </div>

                        <div className="botao-add-serv">
                            <button type="submit" className="botaoCadastrar" disabled={loading}>
                                {loading ? 'Cadastrando...' : 'Cadastrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalAddEquipe;