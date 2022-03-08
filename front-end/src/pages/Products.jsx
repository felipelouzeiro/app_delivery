import React from 'react';
import { Redirect } from 'react-router-dom';
import { ListProducts } from '../components/ListProducts';
import { CustomerNavbar } from '../components/CustomerNavbar';

function Product() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      {!user && <Redirect to="/login" />}
      {user && (
        <div className="product-page">
          <CustomerNavbar />
          <ListProducts />
        </div>
      )}
    </>
  );
}

export default Product;
