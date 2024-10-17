import { useForm } from 'react-hook-form';
import './FormularioPrincipal.css';
// npm add react-hook-form

const FormularioPrincipal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="app-container">
      <div className="form-group">
        <label>Nome do Responsável</label>
        <input
          className={errors?.name && 'input-error'}
          type="text"
          placeholder="Seu nome"
          {...register('name', { required: true })}
        />
        {errors?.name?.type === 'required' && (
          <p className="error-message">Nome do responsável obrigatório</p>
        )}
      </div>

      <div className="form-group">
        <label>Nome do Estabelecimento</label>
        <input
          className={errors?.email && 'input-error'}
          type="email"
          placeholder="Nome do Estabelecimento"
          {...register('email', { required: true })}
        />
        {errors?.email?.type === 'required' && (
          <p className="error-message">Nome do estabelecimento obrigatório</p>
        )}
      </div>

      <div className="form-group">
        <label>Telefone</label>
        <input
          className={errors?.phone && 'input-error'}
          type="tel"
          placeholder="Seu telefone"
          {...register('phone', { required: true })}
        />
        {errors?.phone?.type === 'required' && (
          <p className="error-message">Telefone obrigatório</p>
        )}
      </div>

      <div className="form-group">
        <label>CPF</label>
        <input
          className={errors?.cpf && 'input-error'}
          type="text"
          placeholder="Seu CPF"
          {...register('cpf', {
            required: true,
            minLength: 11,
            maxLength: 11,
            pattern: /^[0-9]+$/
          })}
        />
        {errors?.cpf?.type === 'minLength' && (
          <p className="error-message">CPF deve ter 11 dígitos</p>
        )}
        {errors?.cpf?.type === 'maxLength' && (
          <p className="error-message">CPF deve ter 11 dígitos</p>
        )}
        {errors?.cpf?.type === 'pattern' && (
          <p className="error-message">CPF deve conter apenas números</p>
        )}
        {errors?.cpf?.type === 'required' && (
          <p className="error-message">CPF obrigatório</p>
        )}
      </div>

      <div className="form-group">
        <label>CNPJ</label>
        <input
          className={errors?.cnpj && 'input-error'}
          type="text"
          placeholder="Seu CNPJ"
          {...register('cnpj', {
            required: true,
            minLength: 14,
            maxLength: 14,
            pattern: /^[0-9]+$/
          })}
        />
        {errors?.cnpj?.type === 'minLength' && (
          <p className="error-message">CNPJ deve ter 14 dígitos</p>
        )}
        {errors?.cnpj?.type === 'maxLength' && (
          <p className="error-message">CNPJ deve ter 14 dígitos</p>
        )}
        {errors?.cnpj?.type === 'pattern' && (
          <p className="error-message">CNPJ deve conter apenas números</p>
        )}
        {errors?.cnpj?.type === 'required' && (
          <p className="error-message">CNPJ obrigatório</p>
        )}
      </div>

      <div className="form-group">
        <button className='button-perfil' type="submit">Salvar Alterações</button>
      </div>
    </form>
  );
};

export default FormularioPrincipal;
