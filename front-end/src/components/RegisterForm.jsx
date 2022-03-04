import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../api';
import { registerSchema } from '../utils/schemas';

export default function RegisterForm() {
  const [formDisable, setFormDisable] = useState(true);
  const [errorDisabled, setErrorDisabled] = useState(false);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const history = useHistory();

  useEffect(() => {
    registerSchema.isValid({ name, email, password })
      .then((valid) => {
        if (valid) setFormDisable(false);
        else setFormDisable(true);
      });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register({ name, email, password });
    if (!response) setErrorDisabled(true);
    else {
      const { data } = response;
      localStorage.setItem('user', JSON.stringify(data));
      history.push('/customer/products');
    }
  };

  return (
    <section>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="nome">
          Nome
          <input
            onChange={ ({ target }) => setName(target.value) }
            value={ name }
            placeholder="Seu nome"
            id="nome"
            type="text"
            data-testid="common_register__input-name"
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            onChange={ ({ target }) => setEmail(target.value) }
            value={ email }
            placeholder="seu-email@site.com.br"
            id="email"
            type="text"
            data-testid="common_register__input-email"
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            onChange={ ({ target }) => setPassword(target.value) }
            value={ password }
            placeholder="**********"
            id="password"
            type="password"
            data-testid="common_register__input-password"
          />
        </label>

        <button
          data-testid="common_register__button-register"
          type="submit"
          disabled={ formDisable }
        >
          CADASTRAR
        </button>
      </form>
      {
        errorDisabled && (
          <p data-testid="common_register__element-invalid_register">
            Email já registrado!
          </p>
        )
      }
    </section>
  );
}
