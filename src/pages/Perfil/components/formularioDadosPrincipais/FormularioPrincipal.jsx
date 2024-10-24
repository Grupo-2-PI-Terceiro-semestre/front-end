import { useForm } from 'react-hook-form';
import './FormularioPrincipal.css';
import InputMask from 'react-input-mask';

const FormularioPrincipal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {

  };

  return (
    <div className='container-formulario-perfil'>
      <h2>Dados Principais</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="app-container">
        <div className="form-group">
          <label>Nome do Responsável *</label>
          <input
            type="text"
            required={true}
            placeholder={
              errors?.name?.type === 'required'
                ? 'Nome do responsável obrigatório'
                : 'Seu nome'
            }
            {...register('name', { required: true })}
          />
        </div>
        <div className='input-mesma-linha-phone'>
          <div className="form-group">
            <label>Telefone *</label>
            <InputMask
              required={true}
              type="tel"
              placeholder={
                errors?.telefone?.type === 'required'
                  ? 'Telefone obrigatório'
                  : 'Seu telefone'
              }
              mask="(99) 9999-99999"
              {...register('telefone', {
                required: true
              })}
            />
          </div>

          <div className="form-group personalize-cpf">
            <label>CPF *</label>
            <InputMask
              type="text"
              required={true}
              placeholder={
                errors?.cpf?.type === 'required'
                  ? 'CPF obrigatório'
                  : errors?.cpf?.type === 'minLength' || errors?.cpf?.type === 'maxLength'
                    ? 'CPF deve ter 11 dígitos'
                    : errors?.cpf?.type === 'pattern'
                      ? 'Apenas números'
                      : 'Seu CPF'
              }
              mask="999.999.999-99"
              {...register('cpf', {
                required: true,
                minLength: 11,
                maxLength: 14,
                pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Nome do Estabelecimento *</label>
          <input
            type="email"
            required={true}
            placeholder={
              errors?.email?.type === 'required'
                ? 'Nome do estabelecimento obrigatório'
                : 'Nome do Estabelecimento'
            }
            {...register('email', { required: true })}
          />
        </div>


        <div className="form-group">
          <label>CNPJ *</label>
          <InputMask
            type="text"
            required={true}
            placeholder={
              errors?.cnpj?.type === 'required'
                ? 'CNPJ obrigatório'
                : errors?.cnpj?.type === 'minLength' || errors?.cnpj?.type === 'maxLength'
                  ? 'CNPJ deve ter 14 dígitos'
                  : errors?.cnpj?.type === 'pattern'
                    ? 'Apenas números'
                    : 'Seu CNPJ'
            }
            mask="99.999.999/9999-99"
            {...register('cnpj', {
              required: true,
              minLength: 18,
              maxLength: 18,
              pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
            })}
          />
        </div>
        <div className="button-form">
          <button type="submit">Salvar Alterações</button>
        </div>
      </form>

    </div>

  );
};

export default FormularioPrincipal;
