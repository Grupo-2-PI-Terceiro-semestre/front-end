import React, { useState } from 'react';
import axios from 'axios';
import '../formularioDadosPrincipais/FormularioPrincipal.css';

function CardLocation() {
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
    const [complemento, setComplemento] = useState('');
    const [numero, setNumero] = useState('');

    const handleCepChange = async (e) => {
        const cepDigitado = e.target.value;
        setCep(cepDigitado);

        if (cepDigitado.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cepDigitado}/json/`);
                const data = response.data;

                if (!data.erro) {
                    setLogradouro(data.logradouro);
                    setUf(data.uf);
                    setCidade(data.localidade);
                    setComplemento(data.complemento);
                } else {
                    alert('CEP inválido');
                }
            } catch (error) {
                alert('Erro ao buscar CEP');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            cep,
            logradouro,
            numero,
            uf,
            cidade,
            complemento,
        });
    };

    return (
        <form onSubmit={handleSubmit} className='app-container'>
            <div className='form-group'>
                <label>CEP</label>
                <input
                    type="text"
                    value={cep}
                    onChange={handleCepChange}
                    placeholder="Digite o CEP"
                    className='form-group'
                />
            </div>

            <div>
                <div className='form-group'>
                    <label>Logradouro</label>
                    <input type="text"
                        value={logradouro}
                        onChange={(e) => setLogradouro(e.target.value)}
                        placeholder='Digite seu Logradouro' />
                </div>
                <div className='form-group'>
                    <label>Número</label>
                    <input type="text"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        placeholder='Digite seu número' />
                </div>
            </div>

            <div >
                <div className='form-group'>
                    <label>UF</label>
                    <input type="text"
                        value={uf}
                        onChange={(e) => setUf(e.target.value)}
                        placeholder='Digite sua UF' />
                </div>
                <div className='form-group'>
                    <label>Cidade</label>
                    <input type="text"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        placeholder='Digite sua Cidade' />
                </div>
            </div>

            <div className='form-group'>
                <label>Complemento</label>
                <input type="text"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    placeholder='digite um complemento' />
            </div>

            <div className='form-group'>
                <button type="submit">Salvar Alterações</button>
            </div>
        </form>
    );
}



export default CardLocation;
