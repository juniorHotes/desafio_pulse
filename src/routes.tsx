import React, { ReactElement } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import EditUser from './pages/EditUser';

function Routes(): ReactElement {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}/>
      <Route path="/register" component={RegisterUser}/>
      <Route path="/login" component={Login}/>
      <Route path="/edit/user/:id" component={EditUser}/>
    </BrowserRouter>
  );
}

export default Routes;