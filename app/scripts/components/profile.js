import React from 'react';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      stats: []
    };
  },
  componentDidMount() {
    store.timerStats.loadUserStats();
    store.timerStats.on('update change', () => {
      this.setState({ stats: store.timerStats });
    });
  },
  componentWillUnmount() {
    store.timerStats.off();
  },
  render() {
    return <div onClick={ this.handleClick }>Profile Data will render here</div>;
  },
  handleClick(e) {
    e.preventDefault();
    console.log(store.timerStats.computeAvgs('complete'));
    console.log(store.timerStats.computeAvgs('paused'));

  }
});
