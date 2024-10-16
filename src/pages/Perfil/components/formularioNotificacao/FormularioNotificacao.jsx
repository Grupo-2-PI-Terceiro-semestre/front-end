import { useForm } from 'react-hook-form';
import '../formularioDadosPrincipais/FormularioPrincipal.css';

// npm add react-hook-form

const FormularioNotificacao = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}style={{height: '50vh'}} className="app-container">
      <div className="form-group">
        <label>Mensagem de Agendamento</label>
        <input
          className={errors?.agendamento && 'input-error'}
          type="text"
          placeholder="Digite a mensagem de agendamento"
          {...register('agendamento', { required: true })}
        />
        {errors?.agendamento?.type === 'required' && (
          <p className="error-message">Mensagem de agendamento é obrigatória</p>
        )}
      </div>

      <div className="form-group">
        <label>Mensagem de Cancelamento</label>
        <input
          className={errors?.cancelamento && 'input-error'}
          type="text"
          placeholder="Digite a mensagem de cancelamento"
          {...register('cancelamento', { required: true })}
        />
        {errors?.cancelamento?.type === 'required' && (
          <p className="error-message">Mensagem de cancelamento é obrigatória</p>
        )}
      </div>

      <div className="form-group">
        <button type="submit">Salvar Alterações</button>
      </div>
    </form>
  );
};

export default FormularioNotificacao;
