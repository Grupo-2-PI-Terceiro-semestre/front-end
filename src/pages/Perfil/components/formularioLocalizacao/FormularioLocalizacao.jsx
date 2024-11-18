import React, { useState, useEffect } from 'react';
import { buscarEndereco, atualizarEndereco } from '../../services/perfilServices';
import Cookies from 'js-cookie';
import './FormularioLocalizacao.css';
import '../formularioDadosPrincipais/FormularioPrincipal.css';
import CircularProgress from '@mui/material/CircularProgress';
import { successToast, errorToast, infoToast } from '../../../../utils/Toats';
import axios from 'axios';

function FormularioLocalizacao() {

    const [cepOriginal, setCepOriginal] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
    const [complemento, setComplemento] = useState('');
    const [numero, setNumero] = useState('');
    const [loading, setLoading] = useState(false);
    const [endereco, setEndereco] = useState(null);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const user = JSON.parse(Cookies.get('user'));
        setUser(user);
        const enderecoCookie = Cookies.get('endereco');
        if (enderecoCookie) {
            setEndereco(JSON.parse(enderecoCookie));
            const enderecoData = JSON.parse(enderecoCookie);
            setCepOriginal(enderecoData.cep);
            setCep(enderecoData.cep);
            setNumero(enderecoData.numero);
            setLogradouro(enderecoData.logradouro);
            setUf(enderecoData.uf);
            setCidade(enderecoData.cidade);
            setComplemento(enderecoData.complemento);
        } else {
            console.log()
            findEndereco(user.idEmpresa);
        }
    }, []);

    const findEndereco = async (idEmpresa) => {
        setLoading(true);
        try {
            const response = await buscarEndereco(idEmpresa);
            setEndereco(response);

            Cookies.set('endereco', JSON.stringify(response), { expires: 7 });

            setCep(response.cep);
            setNumero(response.numero);
            setLogradouro(response.logradouro);
            setUf(response.uf);
            setCidade(response.cidade);
            setComplemento(response.complemento);
        } catch (error) {
            errorToast('Erro ao carregar endereço');
        } finally {
            setLoading(false);
        }
    };


    const handleCepChange = async (e) => {

        if (e.target.value.length >= 1) {
            setLoading(true);
        } else {
            setLoading(false);
        }
        let cepDigitado = e.target.value.replace(/\D/g, '');
        if (cepDigitado.length > 5) {
            cepDigitado = cepDigitado.replace(/^(\d{5})(\d)/, '$1-$2');
        }
        setCep(cepDigitado);

        if (cepDigitado.length == 9) {

            const cepSemMascara = cepDigitado.replace('-', '');
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cepSemMascara}/json/`);
                const data = response.data;

                if (!data.erro) {
                    setLogradouro(data.logradouro);
                    setUf(data.uf);
                    setCidade(data.localidade);
                    setComplemento(data.complemento);
                    setLoading(false);
                } else {
                    errorToast('CEP Inválido');
                    setLoading(false);
                }
            } catch (error) {
                errorToast('Erro ao buscar CEP, tente novamente mais tarde');
                setLoading(false);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cepOriginal != cep) {
            const data = {
                idEndereco: endereco.idEndereco,
                cep,
                logradouro,
                numero,
                uf,
                cidade,
                complemento
            };
            debugger
            cadastrar(data, user.idEmpresa);
        } else {
            infoToast('Nenhum dado foi alterado');
            return
        }
    };

    const cadastrar = async (data, idEmpresa) => {
        try {
            setLoading(true);
            const response = await atualizarEndereco(data, idEmpresa);

            setCepOriginal(response.cep);
            setCep(response.cep);
            setNumero(response.numero);
            setLogradouro(response.logradouro);
            setUf(response.uf);
            setCidade(response.cidade);
            setComplemento(response.complemento);
            Cookies.set('endereco', JSON.stringify(response), { expires: 7 });

            successToast('Endereço atualizado com sucesso');
        } catch (error) {
            errorToast('Erro ao atualizar endereço');
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className='container-formulario-perfil'>
            <h2>Localização</h2>
            <form onSubmit={handleSubmit} className='app-container'>
                <div className="form-group cep-localizacao">
                    <label>CEP *</label>
                    <div className="input-container">
                        <input
                            type="text"
                            value={cep}
                            required={true}
                            placeholder="Digite o CEP"
                            onChange={handleCepChange}
                            maxLength="9"
                        />
                        {loading && (
                            <div className="loading-icon">
                                <CircularProgress size={35} />
                            </div>
                        )}
                    </div>
                </div>
                <div className='input-mesma-linha'>
                    <div className='form-group'>
                        <label>Logradouro</label>
                        <input
                            type="text"
                            value={logradouro}
                            onChange={(e) => setLogradouro(e.target.value)}
                            disabled={true}
                        />
                    </div>
                    <div className='form-group personalize'>
                        <label>Número *</label>
                        <input
                            type="text"
                            placeholder='N°'
                            value={numero}
                            required={true}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                    </div>
                </div>

                <div className='input-mesma-linha'>
                    <div className='form-group'>
                        <label>Cidade</label>
                        <input
                            type="text"
                            disabled={true}
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                        />
                    </div>
                    <div className='form-group personalize'>
                        <label>UF</label>
                        <input
                            type="text"
                            disabled={true}
                            value={uf}
                            onChange={(e) => setUf(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <label>Complemento</label>
                    <input
                        type="text"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                        placeholder='Insira o complemento'
                    />
                </div>

                <div className='button-form'>
                    <button style={{
                        backgroundColor: loading ? '#6c7d8c' : '#2196F3'
                    }} disabled={loading} type="submit">
                        Salvar Alterações
                    </button>
                </div>
            </form>

        </div>
    );
}

export default FormularioLocalizacao;
