import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import ForgotPassword from './components/forgotPassword';
import CreateTimer from './components/createTimer';
import SelectTimer from './components/selectTimer';
import Timers from './components/timers';
import ActiveTimer from './components/activeTimer';
import TimerGroups from './components/timerGroups';

const router = (
  <Router history={ browserHistory } >
    <Route path='/' component={ Home } >
      <Route path='/login' component={ Login } />
      <Route path='/register' component={ Register } />
      <Route path='/forgotPassword' component={ ForgotPassword } />
      <Route path='/createTimer' component={ CreateTimer } />
      <Route path='/selectTimer' component={ SelectTimer } />
      <Route path='/timers' component={ Timers } />
      <Route path='/timers/:id' component={ ActiveTimer } />
      <Route path='/timerGroups' component={ TimerGroups } />
    </Route>
  </Router>
);

export default router;
