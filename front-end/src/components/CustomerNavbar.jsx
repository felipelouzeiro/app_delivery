import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import '../styles/navbar.css';

export function CustomerNavbar() {
  const [userData, setUserData] = useState({});
  const history = useHistory();

  const logOut = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  }, []);

  const navbarCustomerSeller = () => (
    <div>
      { userData.role === 'customer' && (
        <>
          <div className="customer-navbar-product-link">
            <Link to="/customer/products">

              <p
                data-testid="customer_products__element-navbar-link-products"
              >
                Produtos
              </p>
            </Link>
          </div>
          <div className="customer-navbar-product-link">
            <Link to="/customer/orders">
              <p
                data-testid="customer_products__element-navbar-link-orders"
              >
                Meus Pedidos
              </p>
            </Link>
          </div>
        </>
      ) }
      { userData.role === 'seller' && (
        <div className="customer-navbar-product-link">
          <Link to="/seller/orders">
            <p
              data-testid="customer_products__element-navbar-link-orders"
            >
              Pedidos
            </p>
          </Link>
        </div>
      ) }
      { userData.role === 'administrator' && (
        <div className="customer-navbar-product-link">
          <Link to="/admin/manage">
            <p
              data-testid="customer_products__element-navbar-link-products"
            >
              Gerenciar Usuários
            </p>
          </Link>
        </div>
      )}
    </div>);

  return (
    <nav className="customer-navbar-container">
      { navbarCustomerSeller()}
      <div className="customer-navbar-right-container">
        <div className="customer-name-container">
          <p
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { userData.name }
          </p>
        </div>
        <button
          className="customer-exit-button"
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ logOut }
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
