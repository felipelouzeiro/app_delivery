import React, { useCallback, useState } from 'react';
import getAllOrders from '../api';
import cardMyRequests from '../components/CardMyRequests';

export default function MyRequests () {
  const { setOrdersCustomer, ordersCustomer } = useState();

  const getRequests = useCallback(async () => {
    
  })
}
