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
        <Link to="selectTimer">Select a premade timer</Link>
        <Link to="createTimer">Create a timer</Link>
        <Link to="timerGroups">Select a set of premade timers</Link>
      </div>
    );
  }
});
