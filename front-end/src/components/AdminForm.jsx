import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { createUser } from '../api';
import { addUser } from '../redux/slices/userSlice';

function AdminForm() {
  const [buttonOn, setButtonOn] = useState(true);
  const [errorDisabled, setErrorDisabled] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('seller');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const MIN_NAME = 12;
  const MIN_PASSWORD = 6;

  const schemaCreateUser = yup.object({
    name: yup.string().min(MIN_NAME).required(),
    email: yup.string().email().required(),
    password: yup.string().min(MIN_PASSWORD).required(),
    role: yup.string().required(),
  });

  useEffect(() => {
    schemaCreateUser.isValid({ name, email, password, role })
      .then((valid) => {
        if (valid) setButtonOn(false);
        else setButtonOn(true);
      });
  }, [email, name, password, role, schemaCreateUser]);

  const renderError = () => (
    <p data-testid="admin_manage__element-invalid-register">
      Login e/ou senha inválidos
    </p>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name, email, password, role };
    const response = await createUser(body);
    if (!response) setErrorDisabled(true);
    dispatch(addUser(body));
  };

  return (
    <form onSubmit={ handleSubmit }>
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
        type="submit"
        disabled={ buttonOn }
      >
        Cadastrar
      </button>
      {errorDisabled && renderError()}
    </form>
  );
}

export default AdminForm;
