import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';

function App() {
  return (
    <Switch>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
}

export default App;
