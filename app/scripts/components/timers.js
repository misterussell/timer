import React from 'react';
import { browserHistory, Link } from 'react-router';

import store from '../store';

export default React.createClass({
  // componentWillMount() {
  //   if (!store.user.defaultTimers) {
  //     browserHistory.push('selectTimer');
  //   }
  // },
  render() {
    return (
      <div>
        <Link to="selectTimer">Select a timer</Link>
        <Link to="createTimer">Create a timer</Link>
      </div>
    );
  }
});
