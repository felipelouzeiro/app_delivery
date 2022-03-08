import React, { useState, useEffect } from 'react';
import { register } from '../api/index';

function AdminForm() {
  const [buttonOn, setButtonOn] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('seller');
  const [password, setPassword] = useState('');

  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const MIN_NAME = 12;
  const MIN_PASSWORD = 6;

  useEffect(() => {
    const isValidEmail = regex.test(email);
    const isValidName = name.length >= MIN_NAME;
    const isValidPassword = password.length >= MIN_PASSWORD;
    if (isValidEmail && isValidName && isValidPassword) {
      return setButtonOn(false);
    }
  });

  const registerUser = async () => {
    const body = { name, email, password, role };
    register(body);
  };

  return (
    <form action="">
      <input
        data-testid="admin_manage__input-name"
        type="text"
        name="name"
        id="name"
        placeholder="Nome e Sobrenome"
        onChange={ ({ target }) => setName(target.value) }
      />
      <input
        data-testid="admin_manage__input-email"
        type="email"
        name="email"
        id="email"
        placeholder="seu-email@site.com.br"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        data-testid="admin_manage__input-password"
        type="password"
        name="password"
        id="password"
        placeholder="*********"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <select
        name="role"
        id="role"
        onChange={ ({ target }) => setRole(target.value) }
      >
        <option value="seller">Vendedor</option>
        <option value="customer">Cliente</option>
      </select>
      <button
        data-testid="admin_manage__button-register"
        type="button"
        disabled={ buttonOn }
        onClick={ () => registerUser() }
      >
        Cadastrar
      </button>
    </form>
  );
}

export default AdminForm();
