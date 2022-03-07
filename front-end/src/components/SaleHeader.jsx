import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../api';
import formDate from '../utils/dateFormat';

function SaleHeader({ order: { status, id, sellerId, saleDate } }) {
  const [sellerName, setSellerName] = useState('');

  useEffect(() => {
    const sellerData = getUsers()
      .then(({ data: users }) => users.filter((user) => user.id === sellerId));
    setSellerName(sellerData.name);
  }, [sellerId]);

  const orderdate = formDate(saleDate);
  const dataTestidBase = 'customer_order_details__element-order-details-label';

  return (
    <thead>
      <tr>
        <th data-test={ `${dataTestidBase}-order-id` }>
          {id}

        </th>
        <th
          data-testid={ `${dataTestidBase}-seller-name` }
        >
          {sellerName}

        </th>
        <th data-testid={ `${dataTestidBase}-order-date` }>
          {orderdate}

        </th>
        <th data-testid={ `${dataTestidBase}-delivery-status` }>
          {status}

        </th>
        <th>Marcar como entregue</th>
      </tr>
    </thead>
  );
}

SaleHeader.propTypes = {
  order: PropTypes.shape({
    sellerId: PropTypes.number,
    id: PropTypes.number,
    saleDate: PropTypes.instanceOf(Date),
    status: PropTypes.string,
  }).isRequired,
};
export default SaleHeader;
