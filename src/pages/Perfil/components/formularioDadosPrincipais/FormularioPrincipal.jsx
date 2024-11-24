import React, { useState, useEffect } from "react";
import './FormularioPrincipal.css';
import InputMask from 'react-input-mask';
import Cookies from 'js-cookie';
import { atualizarDadosDePerfil } from '../../services/perfilServices';
import CircularProgress from '@mui/material/CircularProgress';
import { successToast, errorToast, infoToast } from '../../../../utils/Toats'
import { findByCategorias } from '../../../../services/homeClienteServices'
import SearchableDropdown from '../../../Agenda/components/autocomplete/SearchableDropdown';

const FormularioPrincipal = ({ setRefreshKey }) => {
  const [user, setUser] = useState(null);

  const [name, setName] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);

  const [nomeOriginal, setNomeOriginal] = useState('');
  const [telefoneOriginal, setTelefoneOriginal] = useState('');
  const [cpfOriginal, setCpfOriginal] = useState('');
  const [nomeEmpresaOriginal, setNomeEmpresaOriginal] = useState('');
  const [cnpjOriginal, setCnpjOriginal] = useState('');
  const [categoria, setCategoria] = useState([]);
  const [categoriaFront, setCategoriaFront] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');


  useEffect(() => {
    buscarCategorias();
    const empresaData = Cookies.get('empresa');
    const userData = Cookies.get('user');

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setName(parsedUser.nome || '');
      setCpf(parsedUser.cpf || '');

      setNomeOriginal(parsedUser.nome);
      setCpfOriginal(parsedUser.cpf);
    }
    if (empresaData) {
      const parseEmpresa = (JSON.parse(empresaData));
      setTelefone(parseEmpresa?.telefone || '');
      setNomeEmpresa(parseEmpresa?.nomeEmpresa || '');
      setCnpj(parseEmpresa?.cnpj || '');
      setCategoriaFront(parseEmpresa?.nomeCategoria || '');

      setTelefoneOriginal(parseEmpresa?.telefone)
      setNomeEmpresaOriginal(parseEmpresa?.nomeEmpresa)
      setCnpjOriginal(parseEmpresa?.cnpj)
      setCategoriaFront(parseEmpresa?.nomeCategoria)
    }
  }, []);

  const buscarCategorias = async () => {
    try {
      const response = await findByCategorias();
      setCategoria(response);
    } catch (error) {
      console.error("Erro de autenticação", error);
      throw error;
    }
  }

  const handleCategoriaChange = (categoria) => {
    setCategoriaSelecionada(categoria.idCategoria);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(Cookies.get('user'));

    if (
      name !== nomeOriginal ||
      nomeEmpresa !== nomeEmpresaOriginal ||
      cpf !== cpfOriginal ||
      cnpj !== cnpjOriginal ||
      telefone !== telefoneOriginal

    ) {
      const usuario = {
        idPessoa: user.id,
        nome: name,
        cpf: cpf,
      };

      const empresa = {
        idEmpresa: user.idEmpresa,
        nomeEmpresa: nomeEmpresa,
        cnpj: cnpj,
        telefone: telefone,
        idCategoria: categoriaSelecionada
      };

      const data = {
        usuario,
        empresa,
      };
      cadastrar(data, user.idEmpresa)
    } else {

      infoToast('Nenhum dado foi alterado');
      return;

    }
  };

  const cadastrar = async (data) => {
    setLoading(true);
    try {
      const response = await atualizarDadosDePerfil(data);
      Cookies.set('empresa', JSON.stringify(response.empresa), { expires: 7 });
      Cookies.set('user', JSON.stringify(response.usuario), { expires: 7 });

      const empresaData = Cookies.get('empresa');
      const userData = Cookies.get('user');

      const parseEmpresa = (JSON.parse(empresaData));

      const parsedUser = JSON.parse(userData);
      setNomeOriginal(parsedUser.nome);
      setCpfOriginal(parsedUser.cpf);

      setTelefoneOriginal(parseEmpresa?.telefone)
      setNomeEmpresaOriginal(parseEmpresa?.nomeEmpresa)
      setCnpjOriginal(parseEmpresa?.cnpj)
      setCategoriaFront(parseEmpresa?.nomeCategoria)

      setRefreshKey((prev) => prev + 1);
      successToast('Dados atualizados com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar os dados da empresa', error);
      errorToast('Erro ao atualizar os dados da empresa');
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className='container-formulario-perfil'>
      <h2>Dados Principais</h2>
      <form onSubmit={onSubmit} className="app-container">
        <div className="form-group">
          <label>Nome do Responsável *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
          {loading && (
            <div className="loading-icon">
              <CircularProgress size={35} />
            </div>
          )}
        </div>

        <div className='input-mesma-linha-phone'>
          <div className="form-group">
            <label>Telefone *</label>
            <InputMask
              required
              value={telefone}
              type="tel"
              onChange={(e) => setTelefone(e.target.value)}
              mask="(99) 9999-99999"
              placeholder="Seu telefone"
            />
          </div>

          <div className="form-group personalize-cpf">
            <label>CPF *</label>
            <InputMask
              type="text"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              mask="999.999.999-99"
              placeholder="Seu CPF"
            />
          </div>
        </div>

        <div className='input-mesma-linha-phone'>

          <div className="form-group">
            <label>Nome do Estabelecimento *</label>
            <input
              type="text"
              required
              value={nomeEmpresa}
              onChange={(e) => setNomeEmpresa(e.target.value)}
              placeholder="Nome do Estabelecimento"
            />
          </div>

          <div className="form-group">
            <label>Categoria *</label>
            <SearchableDropdown
              options={categoria}
              required={true}
              value={categoriaFront} // Valor inicial
              placeholder="Selecione uma categoria"
              onSelectOption={handleCategoriaChange}
              displayField={(option) => option.nomeCategoria}
              uniqueKey={(option) => option.idCategoria}
              width="105%"
            />
          </div>
        </div>

        <div className="form-group">
          <label>CNPJ *</label>
          <InputMask
            type="text"
            required
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            mask="99.999.999/9999-99"
            placeholder="Seu CNPJ"
          />
        </div>
        <div className="button-form">
          <button style={{
            backgroundColor: loading ? '#6c7d8c' : '#2196F3'
          }} disabled={loading} type="submit">Salvar Alterações</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioPrincipal;
