import React, { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import getAllOrders from '../api';
import NavBar from '../components/CustomerNavbar';
import CardMyRequests from '../components/CardMyRequests';

export default function MyRequests () {
  const [ ordersCustomer, setOrdersCustomer ] = useState();

  const socket = io('http://localhost:3001');

  const getRequests = useCallback(async () => {
    const allOrders = await getAllOrders();
    await setOrdersCustomer(allOrders);
  })

  useEffect(() => getRequests(), [getRequests, setOrdersCustomer]);

  socket.on('', async () => getRequests());

  socket.on('', async () => getRequests());

  return (
    <div>
      <NavBar />
      <div>
        {ordersCustomer.map((order) => (
          <CardMyRequests
            key={ order.id }
            orders={ order }
          />
        ))}
      </div>
    </div>
  )
}
