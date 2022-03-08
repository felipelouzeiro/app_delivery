import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

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
    <div className="customer-navbar-container">
      { userData.role === 'customer' && (
        <>
          <Link to="/customer/products">
            <p
              data-testid="customer_products__element-navbar-link-products"
            >
              Produtos
            </p>
          </Link>
          <Link to="/customer/orders">
            <p
              data-testid="customer_products__element-navbar-link-orders"
            >
              Meus Pedidos
            </p>
          </Link>
        </>
      ) }
      { userData.role === 'seller' && (
        <Link to="/seller/orders">
          <p
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos
          </p>
        </Link>
      ) }
    </div>);

  return (
    <nav>
      { navbarCustomerSeller()}
      { userData.role === 'administrator' && (
        <Link to="/admin/manage">
          <p
            data-testid="customer_products__element-navbar-link-products"
          >
            Gerenciar Usuários
          </p>
        </Link>
      )}
      <div className="customer-navbar-container">
        <div className="customer-name-container">
          <p
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { userData.name }
          </p>
        </div>
        <div className="customer-exit-container">
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ logOut }
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
