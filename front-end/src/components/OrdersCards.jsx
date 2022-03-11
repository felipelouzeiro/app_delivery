import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import socket from '../utils/socketClient';
import changeBackground from '../utils/changeBackground';

function CardMyRequests({ orders }) {
  const history = useHistory();

  const { role } = JSON.parse(localStorage.getItem('user'));

  const { id, saleDate, status, totalPrice, deliveryAddress, deliveryNumber } = orders;

  const [currentStatus, setCurrentStatus] = useState(status);

  const newDate = new Date(saleDate);
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear();
  const dateFormat = `${day}/${month}/${year}`;

  const ADRESS_SELLER = 'seller_orders__element-card-address-';

  useEffect(() => {
    socket.on('refreshStatus', ({ saleId, status: newStatus }) => {
      if (saleId === id) setCurrentStatus(newStatus);
    });
  }, [id]);

  const renderAdress = () => (
    <p className="order-address" data-testid={ `${ADRESS_SELLER}${id}` }>
      {`${deliveryAddress}, ${deliveryNumber}`}
    </p>
  );

  const goToDetails = (idSale) => {
    history.push(`/customer/orders/${idSale}`);
  };

  return (
    <button
      className="card-container"
      type="button"
      onClick={ () => { goToDetails(id); } }
    >

      <section className="order-container">
        <div>
          <p>Pedido</p>
          <p
            data-testid={
              `customer_orders__element-order-id-${id}`
            }
          >
            {`000${id}`}
          </p>
        </div>

        <div
          className="status-container"
          style={ { backgroundColor: `${changeBackground(currentStatus)}` } }
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          <p>{currentStatus}</p>
        </div>

        <div className="price-date-container">
          <p
            data-testid={ `customer_orders__element-order-date-${id}` }
          >
            {dateFormat}
          </p>
          <p
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            {`R$: ${totalPrice.replace('.', ',')}`}
          </p>
        </div>
      </section>

      {role === 'seller' && renderAdress()}
    </button>
  );
}

CardMyRequests.propTypes = {
  orders: PropTypes.shape({
    id: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
  }).isRequired,
};

export default CardMyRequests;
