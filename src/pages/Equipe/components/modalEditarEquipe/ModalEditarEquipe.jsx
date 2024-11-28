import React, { useEffect, useState } from "react";
import './ModalEditarEquipe.css';
import HeadeModal from "../../../../components/header-modal/HeaderModal";
import SearchableDropdown from '../autocomplete/SearchableDropdown';
import { findFuncoes, AtualizarUsuario } from "../../services/equipeServices";
import Button from "../../../../components/button/Button";
import { successToast, errorToast } from '../../../../utils/Toats';

function ModalEditarEquipe({ titulo, onClose, idPessoa, nome, telefone, email, funcao }) {

    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nomeSelecionado, setNomeSelecionado] = useState(nome || '');
    const [nomeOriginal, setNomeOriginal] = useState(nome || '');

    const [telefoneSelecionado, setTelefoneSelecionado] = useState(telefone || '');
    const [emailSelecionado, setEmailSelecionado] = useState(email || '');
    const [funcaoSelecionada, setFuncaoSelecionada] = useState(funcao || '');

    const [funcoes, setFuncoes] = useState([]);

    useEffect(() => {
        setIsVisible(true);
        buscarFuncoes();

        setNomeOriginal(nome);
        console.log(nomeOriginal + ' nome original');
    }, []);

    const buscarFuncoes = async () => {
        try {
            const response = await findFuncoes();
            setFuncoes(response.data);
        } catch (error) {
            console.error('Erro ao buscar funções:', error);
        }
    };

    const handleNomeChange = (event) => {
        setNomeSelecionado(event.target.value);
    };

    const handleTelefoneChange = (event) => {
        setTelefoneSelecionado(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmailSelecionado(event.target.value);
    };

    const handleFuncoesChange = (funcao) => {
        setFuncaoSelecionada(funcao);
    };

    const handleEditSubmit = () => {
        const eventoAtualizado = {
            idPessoa: idPessoa,
            nomePessoa: nomeSelecionado,
            numeroTelefone: telefoneSelecionado,
            emailPessoa: emailSelecionado,
            idFuncao: funcaoSelecionada.idFuncao,
        };

        atualizarEvento(eventoAtualizado);
    };

    const atualizarEvento = async (eventoAtualizado) => {
        try {
            setLoading(true);
            await AtualizarUsuario("usuarios", eventoAtualizado);
            successToast('Usuário atualizado com sucesso!');
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setIsVisible(false); // Inicia a animação de saída
        setTimeout(onClose, 300); // Fecha o modal após a animação
    };

    return (
        <div className={`modal-overlay-equipe ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="modal-header">
                <div className="container-modal">
                    <HeadeModal title={titulo} handleClose={onClose} />
                    <form className="form-modal-serv">
                        <div className="form-grupo-serv">
                            <div className='inputLabel'>
                                <label>Nome:</label>
                                <input
                                    className="input"
                                    type="text"
                                    value={nomeSelecionado}
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
                                    value={telefoneSelecionado}
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
                                    value={emailSelecionado}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grupo-serv">
                            <div className='inputLabel'>
                                <label>Função</label>
                                <SearchableDropdown
                                    className="input-cliente"
                                    name="nomeFuncao"
                                    options={funcoes}
                                    value={funcaoSelecionada}
                                    onSelectOption={handleFuncoesChange}
                                    displayField={(option) => option.nomeFuncao}
                                    uniqueKey={(option) => option.idFuncao}
                                    placeholder="Selecione uma função"
                                />
                            </div>
                        </div>

                        <div className="botao-add-serv">
                            <Button
                                size="100%"
                                fontSize="15px"
                                fontWeight="bold"
                                content={loading ? 'Editando...' : 'Editar'}
                                backgroundColor="#388E3C"
                                onClick={handleEditSubmit}
                                disabled={loading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarEquipe;