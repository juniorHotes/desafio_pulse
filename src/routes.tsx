import React, { ReactElement } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';

function Routes(): ReactElement {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}/>
      <Route path="/register" component={RegisterUser}/>
      <Route path="/login" component={Login}/>
    </BrowserRouter>
  );
}

export default Routes;