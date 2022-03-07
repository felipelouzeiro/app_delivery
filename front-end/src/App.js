import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Product from './pages/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import OrdersDetails from './pages/OrdersDetails';

function App() {
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route exact path="/customer/products" component={ Product } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders/:id" component={ OrdersDetails } />
    </Switch>
  );
}

export default App;
