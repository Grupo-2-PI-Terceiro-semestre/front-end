import React, { useState } from 'react';
import axios from 'axios';
import './FormularioLocalizacao.css';
import '../formularioDadosPrincipais/FormularioPrincipal.css';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';


function FormularioLocalizacao() {
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
    const [complemento, setComplemento] = useState('');
    const [numero, setNumero] = useState('');
    const [loading, setLoading] = useState(false);


    const handleCepChange = async (e) => {
        if (e.target.value.length < 9) {
            setLogradouro('');
            setUf('');
            setCidade('');
            setComplemento('');
        }
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

        if (cepDigitado.length === 9) {
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

    const errorToast = (message) => {
        toast.error(message, {
            toastStyle: { backgroundColor: '#FF0000', color: '#fff' },
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div className='container-formulario-perfil'>
            <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} />
            <h2>Localização</h2>
            <form onSubmit={handleSubmit} className='app-container'>
                <div className="form-group">
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
                    <button type="submit">Salvar Alterações</button>
                </div>
            </form>

        </div>
    );
}

export default FormularioLocalizacao;
