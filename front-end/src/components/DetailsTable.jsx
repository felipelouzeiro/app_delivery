import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllOrders, getOrderWithProducts } from '../api';
import productFormater from '../utils/productFormater';
import SaleHeader from './SaleHeader';

import '../styles/checkout.css';

function DetailsTable() {
  const [chosenProduct, setChosenProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [userOrder, setUserOrder] = useState([]);
  const [userData, setUserData] = useState({});

  const totalPriceEachProduct = (quantity, price) => {
    const unitPrice = (quantity * price).toFixed(2).replace('.', ',');
    return unitPrice;
  };

  const { id } = useParams();

  useEffect(() => {
    getOrderWithProducts(id)
      .then(({ sale: { products } }) => {
        const formatedProducts = products.map((product) => productFormater(product));
        setChosenProduct(formatedProducts);
      });
  }, [id]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  }, []);

  useEffect(() => {
    getAllOrders()
      .then(({ sales }) => setUserOrder(sales.filter((sale) => sale.id === Number(id))));
  }, [id]);

  useEffect(() => {
    let sum = 0;
    chosenProduct.forEach((prod) => {
      sum += prod.price * prod.quantity;
    });
    return setTotal(sum);
  }, [chosenProduct]);

  return (
    <div className="details-table">
      <h3>Detalhes do pedido</h3>
      {
        userOrder.length && <SaleHeader order={ userOrder } />
      }
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {userData.role && chosenProduct.length && chosenProduct.map((prod, index) => (
            <tr key={ prod.id }>
              <td
                className="table-product-id"
                data-testid={
                  `seller_order_details__element-order-details-label-order-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                className="table-product-name"
                data-testid={
                  `${userData.role}_checkout__element-order-table-name-${index}`
                }
              >
                {prod.name}
              </td>
              <td
                className="table-product-quantity"
                data-testid={
                  `${userData.role}_checkout__element-order-table-quantity-${index}`
                }
              >
                {prod.quantity}
              </td>
              <td
                className="table-product-price"
                data-testid={
                  `${userData.role}_checkout__element-order-table-unit-price-${index}`
                }
              >
                { `R$ ${prod.price.replace('.', ',')}` }
              </td>
              <td
                className="table-product-subtotal"
                data-testid={
                  `${userData.role}_checkout__element-order-table-sub-total-${index}`
                }
              >
                { `R$ ${totalPriceEachProduct(prod.quantity, prod.price)}` }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {userData.role && (
        <div className="checkout-table-total-price">
          Total: R$
          <span
            data-testid={ `${userData.role}_order_details__element-order-total-price` }
          >
            {total.toFixed(2).replace('.', ',')}
          </span>
        </div>
      )}
    </div>
  );
}

export default DetailsTable;
