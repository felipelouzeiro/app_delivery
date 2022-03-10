import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { postLogin } from '../api';
import { loginSchema } from '../utils/schemas';

export default function Form() {
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [errorDisabled, setErrorDisabled] = useState(false);

  const history = useHistory();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const loginRole = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    if (data.role === 'customer') history.push('/customer/products');
    else if (data.role === 'seller') history.push('/seller/orders');
    else history.push('/admin/manage');
  };

  useEffect(() => {
    loginSchema.isValid({ login, password })
      .then((valid) => {
        if (valid) setLoginDisabled(false);
        else setLoginDisabled(true);
      });
  }, [login, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postLogin(login, password);
    if (!response) setErrorDisabled(true);
    else {
      const { data } = response;
      loginRole(data);
    }
  };

  const renderError = () => (
    <p data-testid="common_login__element-invalid-email">
      Login e/ou senha inválidos
    </p>
  );

  return (
    <form className="form-container" onSubmit={ handleSubmit }>
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
      <div className="form-button-group">
        <button
          disabled={ loginDisabled }
          data-testid="common_login__button-login"
          type="submit"
          className="form-button-login"
        >
          LOGIN
        </button>
        <Link to="/register">
          <button
            data-testid="common_login__button-register"
            type="button"
            className="form-button-register"
          >
            Ainda não tenho conta
          </button>
        </Link>
      </div>
      {errorDisabled && renderError()}
    </form>
  );
}
