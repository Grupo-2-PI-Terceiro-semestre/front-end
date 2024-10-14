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
    
      const [feriados, setFeriados] = useState(false);
    
      const handleChange = (dia, tipo, valor) => {
        setHorarios({
          ...horarios,
          [dia]: { ...horarios[dia], [tipo]: valor },
        });
      };
    
      const handleSubmit = () => {
        console.log('Horários:', horarios);
        console.log('Feriados:', feriados);
      };
    
      return (
        <div className="app-container">
          <h2>Horários</h2>
          {Object.keys(horarios).map((dia) => (
            <div key={dia} className="horario">
              <span>{dia.charAt(0).toUpperCase() + dia.slice(1)}:</span>
              <input
                type="time"
                value={horarios[dia].de}
                onChange={(e) => handleChange(dia, 'de', e.target.value)}
                className="time-input"
              />
              <span>Até</span>
              <input
                type="time"
                value={horarios[dia].ate}
                onChange={(e) => handleChange(dia, 'ate', e.target.value)}
                className="time-input"
              />
            </div>
          ))}
          <div className="feriados">
            <label>
              <input
                type="checkbox"
                checked={feriados}
                onChange={() => setFeriados(!feriados)}
              />
              Feriados
            </label>
          </div>
          <button onClick={handleSubmit}>Salvar Alterações</button>
        </div>
      );
    };

export default FormularioFuncionamento;
