import React, { useState } from 'react';
import axios from 'axios';
import './CardLocation.css';

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
        <form onSubmit={handleSubmit} className='formStyle'>
            <div style={fieldContainerStyle}>
                <label>CEP</label>
                <input
                    type="text"
                    value={cep}
                    onChange={handleCepChange}
                    placeholder="Digite o CEP"
                    style={inputStyle}
                />
            </div>

            <div style={twoFieldsContainerStyle}>
                <div style={halfFieldStyle}>
                    <label>Logradouro</label>
                    <input type="text" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} style={inputStyle} />
                </div>
                <div style={halfFieldStyle}>
                    <label>Número</label>
                    <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} style={inputStyle} />
                </div>
            </div>

            <div style={twoFieldsContainerStyle}>
                <div style={halfFieldStyle}>
                    <label>UF</label>
                    <input type="text" value={uf} onChange={(e) => setUf(e.target.value)} style={inputStyle} />
                </div>
                <div style={halfFieldStyle}>
                    <label>Cidade</label>
                    <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} style={inputStyle} />
                </div>
            </div>

            <div style={fieldContainerStyle}>
                <label>Complemento</label>
                <input type="text" value={complemento} onChange={(e) => setComplemento(e.target.value)} style={inputStyle} />
            </div>

            <button type="submit" style={buttonStyle}>Salvar Alterações</button>
        </form>
    );
}



export default CardLocation;
