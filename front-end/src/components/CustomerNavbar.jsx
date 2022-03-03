import React from 'react';

export function CustomerNavbar() {
  return (
    <div className="customer-navbar-container">
      <div className="requests-container">
        <p
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </p>
        <p
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </p>
      </div>
      <div className="customer-name-container">
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          Nome do Usuário
        </p>
      </div>
      <div className="customer-exit-container">
        <p
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </p>
      </div>
    </div>
  );
}

export default CustomerNavbar;
