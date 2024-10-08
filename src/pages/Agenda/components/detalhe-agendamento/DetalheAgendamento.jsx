import React, { useState } from 'react';

const DetalheAgendamento = () => {
  // Estados para os dados do agendamento
  const [profissional, setProfissional] = useState('Pedro');
  const [horario, setHorario] = useState('07:00 às 08:00');
  const [cliente, setCliente] = useState('Felipe');
  const [contato, setContato] = useState('(11) 992732-1200');
  const [descricaoServico, setDescricaoServico] = useState(
  );

  // Função para lidar com o envio do formulário
  const onSubmit = (e) => {
    e.preventDefault();
    // Ação de edição ou submissão pode ser realizada aqui
    console.log('Agendamento editado');
  };

  // Função para cancelar o agendamento
  const onCancel = () => {
    // Ação de cancelamento pode ser realizada aqui
    console.log('Agendamento cancelado');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalhes Do Agendamento</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Profissional</label>
            <input
              type="text"
              value={profissional}
              onChange={(e) => setProfissional(e.target.value)}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Horário</label>
            <input
              type="text"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Cliente</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Contato</label>
            <input
              type="text"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Descrição do Serviço</label>
            <textarea
              value={descricaoServico}
              onChange={(e) => setDescricaoServico(e.target.value)}
              disabled
            />
          </div>
          <div className="buttons">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancelar Agendamento
            </button>
            <button type="submit" className="edit-button">
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetalheAgendamento;
