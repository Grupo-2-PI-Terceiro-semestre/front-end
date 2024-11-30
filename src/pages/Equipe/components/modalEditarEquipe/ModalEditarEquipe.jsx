import React, { useEffect, useState } from "react";
import './ModalEditarEquipe.css';
import HeadeModal from "../../../../components/header-modal/HeaderModal";
import SearchableDropdown from '../autocomplete/SearchableDropdown';
import { findFuncoes, AtualizarUsuario } from "../../services/equipeServices";
import { successToast, errorToast } from '../../../../utils/Toats';

function ModalEditarEquipe({ titulo, onClose, idPessoa, nome, telefone, email, funcao }) {

    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nomeSelecionado, setNomeSelecionado] = useState(nome || '');
    const [telefoneSelecionado, setTelefoneSelecionado] = useState(telefone || '');
    const [emailSelecionado, setEmailSelecionado] = useState(email || '');
    const [funcaoSelecionada, setFuncaoSelecionada] = useState(funcao || null);
    const [funcoes, setFuncoes] = useState([]);

    useEffect(() => {
        setIsVisible(true);
        buscarFuncoes();
    }, []);

    const buscarFuncoes = async () => {
        try {
            const response = await findFuncoes();
            setFuncoes(response.data);
        } catch (error) {
            console.error('Erro ao buscar funções:', error);
        }
    };

    const handleNomeChange = (event) => setNomeSelecionado(event.target.value);
    const handleTelefoneChange = (event) => setTelefoneSelecionado(event.target.value);
    const handleEmailChange = (event) => setEmailSelecionado(event.target.value);

    const handleFuncoesChange = (funcao) => {
        console.log('Função selecionada:', funcao); // Log para depuração.
        setFuncaoSelecionada(funcao); // Atualiza o estado com a função selecionada.
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();

        if (!funcaoSelecionada || !funcaoSelecionada.idFuncao) {
            errorToast('Por favor, selecione uma função válida.');
            return;
        }

        const eventoAtualizado = {
            idPessoa,
            nomePessoa: nomeSelecionado,
            numeroTelefone: telefoneSelecionado,
            emailPessoa: emailSelecionado,
            idFuncao: funcaoSelecionada.idFuncao, // Agora garantimos que idFuncao existe.
        };

        console.log('Evento atualizado:', eventoAtualizado);

        atualizarEvento(eventoAtualizado);
    };

    const atualizarEvento = async (eventoAtualizado) => {
        try {
            setLoading(true);
            await AtualizarUsuario("usuarios", eventoAtualizado);
            successToast('Usuário atualizado com sucesso!');
            onClose();
            setTimeout(() => {
                window.location.reload(); // Recarrega a página
            }, 300);
        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
            errorToast('Erro ao atualizar o usuário.');
        } finally {
            setLoading(false);

        }
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className={`modal-overlay-equipe ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="modal-header">
                <div className="container-modal">
                    <HeadeModal title={titulo} handleClose={onClose} />
                    <form className="form-modal-serv" onSubmit={handleEditSubmit}>
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
                            <button type="submit" className="botaoCadastrar" disabled={loading}>
                                {loading ? 'Editando...' : 'Editar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarEquipe;