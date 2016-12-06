import React from 'react';
import { Link } from 'react-router';

import store from '../store';

// route: /timers
export default React.createClass({
  // componentWillMount() {
  //   if (!store.user.defaultTimers) {
  //     browserHistory.push('selectTimer');
  //   }
  // },
  render() {
    return (
      <div>
        <Link className="timer-link" to="selectTimer">Select a premade timer</Link>
        <Link className="timer-link" to="createTimer">Create a timer</Link>
        <Link className="timer=link" to="plan_a_trip">Create a mobility timer</Link>
        <Link className="timer-link" to="myTimers">View My Timers</Link>
        <Link className="timer-link" to="timerGroups">Select a set of premade timers</Link>
      </div>
    );
  }
});
