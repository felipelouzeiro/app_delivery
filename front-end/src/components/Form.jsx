import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

export default function Form() {
  const [loginDisabled, setLoginDisabled] = useState(true);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const MIN_PASSWORD = 6;

  const schema = yup.object({
    login: yup.string().email().required(),
    password: yup.string().min(MIN_PASSWORD).required(),
  });

  useEffect(() => {
    schema.isValid({ login, password })
      .then((valid) => {
        if (valid) setLoginDisabled(false);
        else setLoginDisabled(true);
      });
  }, [login, password, schema]);

  return (
    <form>
      <label htmlFor="login">
        Login
        <input
          value={ login }
          onChange={ (e) => setLogin(e.target.value) }
          id="login"
          data-testid="common_login__input-email"
          type="text"
          placeholder="email@trybeer.com.br"
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          id="password"
          data-testid="common_login__input-password"
          type="password"
          placeholder="*********"
        />
      </label>
      <button
        disabled={ loginDisabled }
        data-testid="common_login__button-login"
        type="submit"
      >
        LOGIN
      </button>
      <button
        data-testid="common_login__button-register"
        type="button"
      >
        Ainda não tenho conta
      </button>
    </form>
  );
}
