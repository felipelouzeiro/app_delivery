import React from 'react';
import FormRegister from '../components/RegisterForm';

import '../styles/register.css';

export default function Register() {
  return (
    <main className="register-container">
      <h1>Cadastro</h1>
      <FormRegister />
    </main>
  );
}
