import React from 'react';
import Form from '../components/Form';
import beerGif from '../images/beer.gif';

export default function Login() {
  return (
    <main>
      <img src={ beerGif } alt="beer gif" width="100px" />
      <h1>José Delivery</h1>
      <Form />
    </main>
  );
}
