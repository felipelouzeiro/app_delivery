import React from 'react';
import { ListProducts } from '../components/ListProducts';
import { CustomerNavbar } from '../components/CustomerNavbar';

function Product() {
  return (
    <div className="product-page">
      <CustomerNavbar />
      <ListProducts />
    </div>
  );
}

export default Product;
