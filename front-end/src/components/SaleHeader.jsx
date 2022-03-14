import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../api';
import formDate from '../utils/dateFormat';
import socket from '../utils/socketClient';
import changeBackground from '../utils/changeBackground';

function SaleHeader({ order }) {
  const { status, id, sellerId, saleDate } = order[0];
  const [currentStatus, setCurrentStatus] = useState(status);
  const [sellerName, setSellerName] = useState('');
  const [preparingCheck, setPreparingCheck] = useState(true);
  const [dispatchCheck, setDispatchCheck] = useState(true);
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
    switch (currentStatus) {
    case 'Pendente':
      setPreparingCheck(false);
      break;
    case 'Preparando':
      setPreparingCheck(true);
      setDispatchCheck(false);
      break;
    case 'Em Trânsito':
      setDispatchCheck(true);
      setDeliveryCheck(false);
      break;
    default:
      setDeliveryCheck(true);
    }
  }, [currentStatus]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  }, []);

  useEffect(() => {
    socket.on('refreshStatus', ({ saleId, status: newStatus }) => {
      if (saleId === id) setCurrentStatus(newStatus);
    });
  }, [id]);

  const updateOrder = (newStatus) => {
    socket.emit('updateStatus', {
      saleId: id,
      status: newStatus,
    });
  };

  const orderdate = formDate(saleDate);
  const dataTestidCustomerBase = 'customer_order_details__element-order-details-label';
  const dataTestidSellerBase = 'seller_order_details__element-order-details-label';

  return (
    <div className="details-heading">
      {userData.role === 'customer' && (
        <>
          <h3 data-testid={ `${dataTestidCustomerBase}-order-id` }>
            {`Pedido: 000${id}`}
          </h3>
          <p data-testid={ `${dataTestidCustomerBase}-seller-name` }>
            {`P.Vendedora: ${sellerName}`}
          </p>
          <h3 data-testid={ `${dataTestidCustomerBase}-order-date` }>
            {orderdate}
          </h3>
          <p
            className="details-table-status"
            style={ { backgroundColor: `${changeBackground(currentStatus)}` } }
            data-testid={ `${dataTestidCustomerBase}-delivery-status` }
          >
            {currentStatus}
          </p>
          <button
            className="button-status table-mark-as-delivered"
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled={ deliveryCheck }
            onClick={ () => updateOrder('Entregue') }
          >
            Marcar como entregue
          </button>
        </>
      )}
      {userData.role === 'seller' && (
        <>
          <p data-testid={ `${dataTestidSellerBase}-order-id` }>
            {`Pedido: 000${id}`}
          </p>
          <h3 data-testid={ `${dataTestidSellerBase}-order-date` }>
            {orderdate}
          </h3>
          <p
            className="details-table-status"
            style={ { backgroundColor: `${changeBackground(currentStatus)}` } }
            data-testid={ `${dataTestidSellerBase}-delivery-status` }
          >
            {currentStatus}
          </p>
          <button
            className="button-status table-mark-as-preparing"
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            disabled={ preparingCheck }
            onClick={ () => updateOrder('Preparando') }
          >
            Preparar pedido
          </button>
          <button
            className="button-status table-mark-as-checkout"
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ dispatchCheck }
            onClick={ () => updateOrder('Em Trânsito') }
          >
            Saiu para entrega
          </button>
        </>
      )}
    </div>
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
