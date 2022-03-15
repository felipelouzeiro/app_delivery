import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../../pages/Login';
import App from '../../App'

describe('Testing Login Page', () => {
  const prefix = "common_login__"
  const renderLoginPage = () => renderWithRouter(<Login />)
  const renderApp = () => renderWithRouter(<App />)
  const CUSTOMER_LOGIN = 'zebirita@email.com'
  const CUSTOMER_PASSWORD = '$#zebirita#$'
  
  it('contain heading h1 with text "José Delivery"', () => {
    renderLoginPage();
    const h1Heading = screen.getByRole('heading',
      { name: /José Delivery/i, level: 1 });

    expect(h1Heading).toBeInTheDocument();
  });

  it('contain Login and Password labels', () => {
    renderLoginPage();
    const loginLabel = screen.getByLabelText(/Login/i)
    const passwordLabel = screen.getByLabelText(/Senha/i)

    expect(loginLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  it('contain Login and Password inputs', () => {
    renderLoginPage();
    const loginInput = screen.getByTestId(`${prefix}input-email`)
    const passwordInput = screen.getByTestId(`${prefix}input-password`)

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('contain Login Button', () => {
    renderLoginPage();
    const loginButton = screen.getByTestId(`${prefix}button-login`)

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  it('contain Register Button', () => {
    renderLoginPage();
    const registerButton = screen.getByTestId(`${prefix}button-register`)

    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeEnabled();
  });

  it('when click on Register Button, redirect to /register', () => {
    const { history } = renderApp();
    const registerButton = screen.getByTestId(`${prefix}button-register`)

    userEvent.click(registerButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/register');
  });

  it('when login button be able after user types login and password ', async () => {
    renderLoginPage();
    const loginInput = screen.getByTestId(`${prefix}input-email`)
    const passwordInput = screen.getByTestId(`${prefix}input-password`)
    const loginButton = screen.getByTestId(`${prefix}button-login`)
    
    userEvent.type(loginInput, CUSTOMER_LOGIN);
    userEvent.type(passwordInput, CUSTOMER_PASSWORD);

    await waitFor(() => { 
      expect(loginButton).toBeEnabled();
    })
  });    
});