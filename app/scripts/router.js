import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import ForgotPassword from './components/forgotPassword';
import CreateTimer from './components/createTimer';
import SelectTimer from './components/selectTimer';
import Timers from './components/timers';
import ActiveTimer from './components/activeTimer';
import TimerGroups from './components/timerGroups';
import SingleTimerGroup from './components/singleTimerGroup';
import GetLocations from './components/getLocations';
import Profile from './components/profile';
import Dashboard from './components/dashboard';
import About from './components/about';
import FailedRoute from './components/failedRoute';

import store from './store';

const router = (
  <Router history={ browserHistory } >
    <Route path='/' component={ Home } >
    <IndexRoute component={ About } />
      <Route path='/login' component={ Login } />
      <Route path='/register' component={ Register } />
      <Route path='/forgotPassword' component={ ForgotPassword } />
      <Route path='/createTimer' component={ CreateTimer } />
      <Route path='/selectTimer' component={ SelectTimer } user={ false } />
      <Route path='/timers' component={ Timers } />
      <Route path='/myTimers' component={ SelectTimer } user={ true } />
      <Route path='/timers/:id' component={ ActiveTimer } />
      <Route path='/timerGroups' component={ TimerGroups } />
      <Route path='/timerGroup/:group' component={ SingleTimerGroup } user={ false } />
      <Route path='/plan_a_trip' component={ GetLocations } />
      <Route path='/profile' component={ Profile } />
      <Route path='/dashboard' component={ Dashboard } />
    </Route>
    <Route path="*" component={ FailedRoute } />
  </Router>
);

export default router;
