import React from 'react';

export default function Form() {
  return (
    <form>
      <label htmlFor="login">
        Login
        <input id="login" data-testid="common_login__input-email" type="text" />
      </label>
      <label htmlFor="password">
        Senha
        <input data-testid="common_login__input-password" id="password" type="password" />
      </label>
      <button data-testid="common_login__button-login" type="submit">LOGIN</button>
      <button
        data-testid="common_login__button-register"
        type="button"
      >
        Ainda não tenho conta
      </button>
    </form>
  );
}
