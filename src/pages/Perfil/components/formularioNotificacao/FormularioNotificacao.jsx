import { useForm } from 'react-hook-form';
import '../formularioDadosPrincipais/FormularioPrincipal.css';
import './FormularioNotificacao.css';

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
    <div className='container-formulario-perfil'>
      <h2>Notificações</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="app-container-notifica">
        <div className="form-group">
          <label>Mensagem de Agendamento *</label>
          <textarea
            required={true}
            placeholder={
              errors?.agendamento?.type === 'required'
                ? 'Mensagem de agendamento é obrigatória'
                : 'Digite a mensagem de agendamento'
            }
            {...register('agendamento', { required: true })}
          />
        </div>
        <div className="form-group">
          <label>Mensagem de Cancelamento *</label>
          <textarea
            required={true}
            placeholder={
              errors?.cancelamento?.type === 'required'
                ? 'Mensagem de cancelamento é obrigatória'
                : 'Digite a mensagem de cancelamento'
            }
            {...register('cancelamento', { required: true })}
          />
        </div>
        <div className="button-form">
          <button type="submit">Salvar Alterações</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioNotificacao;
