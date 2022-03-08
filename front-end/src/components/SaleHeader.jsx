import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../api';
import formDate from '../utils/dateFormat';

function SaleHeader({ order }) {
  console.log('🚀 ~ file: SaleHeader.jsx ~ line 7 ~ SaleHeader ~ order', order);
  const { status, id, sellerId, saleDate } = order[0];
  const [sellerName, setSellerName] = useState('');
  const [deliveryCheck, setDeliveryCheck] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUsers()
      .then(({ data: users }) => {
        const sellerData = users.filter((user) => user.id === sellerId)[0];
        setSellerName(sellerData.name);
      });
  }, [sellerId]);

  useEffect(() => {
    if (status === 'Em Trânsito') setDeliveryCheck(false);
  }, [status]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  }, []);

  const orderdate = formDate(saleDate);
  const dataTestidCustomerBase = 'customer_order_details__element-order-details-label';
  const dataTestidSellerBase = 'seller_order_details__element-order-details-label';

  const useHeader = () => (
    <div className="details-heading">
      {userData.role === 'customer' && (
        <>
          <p data-testid={ `${dataTestidCustomerBase}-order-id` }>
            {id}
          </p>
          <p data-testid={ `${dataTestidCustomerBase}-seller-name` }>
            {sellerName}
          </p>
          <p data-testid={ `${dataTestidCustomerBase}-order-date` }>
            {orderdate}
          </p>
          <p data-testid={ `${dataTestidCustomerBase}-delivery-status` }>
            {status}
          </p>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled={ deliveryCheck }
          >
            Marcar como entregue
          </button>
        </>
      )}
      {userData.role === 'seller' && (
        <>
          <p data-testid={ `${dataTestidSellerBase}-order-id` }>
            {id}
          </p>
          <p data-testid={ `${dataTestidSellerBase}-order-date` }>
            {orderdate}
          </p>
          <p data-testid={ `${dataTestidSellerBase}-delivery-status` }>
            {status}
          </p>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            // disabled={  }
          >
            Preparar pedido
          </button>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            // disabled={  }
          >
            Saiu para entrega
          </button>
        </>
      )}
    </div>
  );
  // FALTA LÓGICA DOS BOTÕES
  return (
    useHeader()
    // <div className="details-heading">
    //   <p data-testid={ `${dataTestidCustomerBase}-order-id` }>
    //     {id}
    //   </p>
    //   <p data-testid={ `${dataTestidCustomerBase}-seller-name` }>
    //     {sellerName}
    //   </p>
    //   <p data-testid={ `${dataTestidCustomerBase}-order-date` }>
    //     {orderdate}
    //   </p>
    //   <p data-testid={ `${dataTestidCustomerBase}-delivery-status` }>
    //     {status}
    //   </p>
    //   <button
    //     type="button"
    //     data-testid="customer_order_details__button-delivery-check"
    //     disabled={ deliveryCheck }
    //   >
    //     Marcar como entregue
    //   </button>
    // </div>
  );
}

SaleHeader.propTypes = {
  order: PropTypes.arrayOf(PropTypes.shape({
    sellerId: PropTypes.number,
    id: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  })).isRequired,
};
export default SaleHeader;
