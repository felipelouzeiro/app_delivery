import React, { useEffect, useState } from 'react';
// import socket from '../utils/socketClient';
import { getAllOrders } from '../api';
import NavBar from '../components/CustomerNavbar';
import OrdersCards from '../components/OrdersCards';

import '../styles/ordersCard.css';

export default function MyRequests() {
  const [sellerSales, setSellerSales] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then(({ sales }) => setSellerSales(sales));
  }, []);

  return (
    <main>
      <NavBar />
      <section className="order-cards-container">
        {sellerSales.length && (
          sellerSales.map((order) => (
            <OrdersCards
              key={ order.id }
              orders={ order }
            />
          ))
        )}
      </section>
    </main>
  );
}
