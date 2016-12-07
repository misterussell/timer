import React from 'react';

import store from '../store';

export default React.createClass({
  render() {
    return <div onClick={ this.handleClick }>Profile Data will render here</div>;
  },
  handleClick(e) {
    e.preventDefault();
    // store.timerStats.loadUserStats();
  }
});
