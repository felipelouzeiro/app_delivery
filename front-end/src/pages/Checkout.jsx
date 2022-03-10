import React from 'react';
import CheckoutAddress from '../components/CheckoutAddress';
import CheckoutTable from '../components/CheckoutTable';
import { CustomerNavbar } from '../components/CustomerNavbar';

function Checkout() {
  return (
    <>
      <CustomerNavbar />
      <div className="checkout-page">
        <h2>Finalizar Pedido</h2>
        <CheckoutTable />
        <h2>Detalhes e Endereço para Entrega</h2>
        <CheckoutAddress />
      </div>
    </>
  );
}

export default Checkout;
