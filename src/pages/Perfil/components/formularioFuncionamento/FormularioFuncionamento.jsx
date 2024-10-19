import React, { useState } from 'react';
import './FormularioFuncionamento.css'; // Certifique-se de criar este arquivo para estilos

const FormularioFuncionamento = () => {
  const [horarios, setHorarios] = useState({
    seg: { de: '', ate: '' },
    ter: { de: '', ate: '' },
    qua: { de: '', ate: '' },
    qui: { de: '', ate: '' },
    sex: { de: '', ate: '' },
    sab: { de: '', ate: '' },
    dom: { de: '', ate: '' },
  });

  const handleChange = (dia, tipo, valor) => {
    setHorarios({
      ...horarios,
      [dia]: { ...horarios[dia], [tipo]: valor },
    });
  };

  const onSubmit = () => {
    console.log('Horários:', horarios);
  };

  return (
    <div className='container-formulario-perfil'>
       <form onSubmit={onSubmit(onSubmit)} className="app-container">
        <h2>Horários</h2>
        <div className='container-horarios'>
          {Object.keys(horarios).map((dia) => (
            <div key={dia} className="horario">
              <div className='title-horario'>
                <span>{dia.charAt(0).toUpperCase() + dia.slice(1)}:</span>
              </div>
              <input
                type="time"
                required={true}
                value={horarios[dia].de}
                onChange={(e) => handleChange(dia, 'de', e.target.value)}
                className="time-input"
              />
              <div className='title-horario'>
                <span>Até</span>
              </div>
              <input
                type="time"
                required={true}
                value={horarios[dia].ate}
                onChange={(e) => handleChange(dia, 'ate', e.target.value)}
                className="time-input"
              />
            </div>
          ))}
        </div>
        <div className="button-form">
          <button type="submit">Salvar Alterações</button>
        </div>
      </form>

    </div>

  );
};

export default FormularioFuncionamento;
