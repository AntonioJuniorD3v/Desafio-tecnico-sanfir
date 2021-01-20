import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import Dashboard from '../Dashboard';
import Clients from '../Clients';

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/dashboard' />
      </Route>
      <Route path='/dashboard' exact>
        <Dashboard />
      </Route>
      <Route path='/clients' exact>
        <Clients />
      </Route>
    </Switch>
  );
}
