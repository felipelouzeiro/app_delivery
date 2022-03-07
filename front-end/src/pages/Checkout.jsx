import React from 'react';
import CheckoutAddress from '../components/CheckoutAddress';
import CheckoutTable from '../components/CheckoutTable';
import { CustomerNavbar } from '../components/CustomerNavbar';

function Checkout() {
  return (
    <div className="product-page">
      <CustomerNavbar />
      <h2>Finalizar Pedido</h2>
      <CheckoutTable />
      <h2>Detalhes e endereço para entrega</h2>
      <CheckoutAddress />
    </div>
  );
}

export default Checkout;
