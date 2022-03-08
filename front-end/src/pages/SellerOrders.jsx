import React, { useEffect, useState } from 'react';
// import socket from '../utils/socketClient';
import { getAllOrders } from '../api';
import NavBar from '../components/CustomerNavbar';
import CardSellerSales from '../components/CardSellerSales';

export default function MyRequests() {
  const [sellerSales, setSellerSales] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then(({ sales }) => setSellerSales(sales));
  }, []);

  return (
    <div>
      <NavBar />
      {sellerSales.length && (
        sellerSales.map((order) => (
          <CardSellerSales
            key={ order.id }
            orders={ order }
          />
        ))
      )}
    </div>
  );
}
