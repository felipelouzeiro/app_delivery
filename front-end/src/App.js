import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Product from './pages/products';

function App() {
  return (
    <Switch>
      <Route exact path="/customer/products" component={ Product } />
    </Switch>
  );
}

export default App;
