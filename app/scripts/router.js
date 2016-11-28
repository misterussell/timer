import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import CreateTimer from './components/createTimer';
import SelectTimer from './components/selectTimer';
import Timer from './components/timers';

const router = (
  <Router history={ browserHistory } >
    <Route path='/' component={ Home } >
      <Route path='login' component={ Login } />
      <Route path='register' component={ Register } />
      <Route path='createTimer' component={ CreateTimer } />
      <Route path='selectTimer' component={ SelectTimer } />
      <Route path='timers' component={ Timers } />
    </Route>
  </Router>

);

export default router;
