import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/home';
import Login from './components/login';
import Register from './components/register';

const router = (
  <Router history={ browserHistory } >
    <Route path='/' component={ Home } >
      <Route path='/login' component={ Login } />
      <Route path='/register' component={ Register } />
    </Route>
  </Router>

);

export default router;
