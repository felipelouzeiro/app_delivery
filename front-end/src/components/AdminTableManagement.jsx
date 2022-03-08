import React, { useEffect, useState } from 'react';

function AdminTableManagement() {
  const [disable, setDisable] = useState(true);
  const [role, setRole] = useState('seller');


  return (
    <form action="">
      <input
        data-testid="admin_manage__input-name"
        type="text"
        name="name"
        id="name"
        placeholder="Nome e Sobrenome"
        onChange={ console.log() }
      />
      <input
        data-testid="admin_manage__input-email"
        type="email"
        name="email"
        id="email"
        placeholder="seu-email@site.com.br"
        onChange={ console.log() }
      />
      <input
        data-testid="admin_manage__input-password"
        type="password"
        name="password"
        id="password"
        placeholder="*********"
        onChange={ console.log() }
      />
      <select
        name="role"
        id="role"
        onChange={ console.log() }
      >
        <option value="seller">Vendedor</option>
        <option value="customer">Cliente</option>
      </select>
      <button
        data-testid="admin_manage__button-register"
        type="button"
        onClick={ console.log() }
      >
        Cadastrar
      </button>
    </form>
  );
}

export default AdminTableManagement;
