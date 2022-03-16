import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Register from '../../pages/Register';

describe('Testing Register Page', () => {
  const prefix = "common_register__"
  const renderRegisterPage = () => renderWithRouter(<Register />)
  const NEW_CUSTOMER_NAME = 'Test Test Test'
  const NEW_CUSTOMER_EMAIL = 'test@test.com'
  const NEW_CUSTOMER_PASSWORD = 'test123'
  
  it('contain heading h1 with text "Cadastro"', () => {
    renderRegisterPage();
    const h1Heading = screen.getByRole('heading',
      { name: /Cadastro/i, level: 1 });

    expect(h1Heading).toBeInTheDocument();
  });

  it('contain name, email and password labels', () => {
    renderRegisterPage();
    const nameLabel = screen.getByLabelText(/Nome/i)
    const emailLabel = screen.getByLabelText(/Email/i)
    const passwordLabel = screen.getByLabelText(/Senha/i)

    expect(nameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  it('contain name, email and password inputs', () => {
    renderRegisterPage();
    const nameInput = screen.getByTestId(`${prefix}input-name`)
    const emailInput = screen.getByTestId(`${prefix}input-email`)
    const passwordInput = screen.getByTestId(`${prefix}input-password`)

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('contain Register Button', () => {
    renderRegisterPage();
    const registerButton = screen.getByTestId(`${prefix}button-register`)

    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeDisabled();
  });

  it('when resgister button be able after user types name, email and password ', async () => {
    renderRegisterPage();
    const nameInput = screen.getByTestId(`${prefix}input-name`)
    const emailInput = screen.getByTestId(`${prefix}input-email`)
    const passwordInput = screen.getByTestId(`${prefix}input-password`)
    const registerButton = screen.getByTestId(`${prefix}button-register`)

    userEvent.type(nameInput, NEW_CUSTOMER_NAME);
    userEvent.type(emailInput, NEW_CUSTOMER_EMAIL);
    userEvent.type(passwordInput, NEW_CUSTOMER_PASSWORD);

    await waitFor(() => { 
      expect(registerButton).toBeEnabled();
    })
  });    
});