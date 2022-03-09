import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from '../components/Form';
import beerGif from '../images/beer.gif';

import '../styles/login.css';

export default function Login() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      {user && user.role === 'customer' && <Redirect to="/customer/products" />}
      {user && user.role === 'seller' && <Redirect to="/seller/orders" />}
      {user && user.role === 'administrator' && <Redirect to="/admin/manage" />}
      <main className="login-container">
        <img src={ beerGif } alt="beer gif" width="100px" />
        <h1>José Delivery</h1>
        <Form />
      </main>
    </>
  );
}
