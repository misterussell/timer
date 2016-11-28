import React from 'react';

import SingleTimer from './singleTimer';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      timers: store.timers.toJSON()
    };
  },
  componentDidMount() {
    store.timers.fetch();
    store.timers.on('update change', () => {
      this.setState({timers: store.timers.toJSON()});
    });
  },
  render() {
    let timers = this.state.timers.map((timer, i) => {
      return <SingleTimer key={ i } timer={ timer }/>;
    });
    return (
      <ul className="template-timers">
        {timers}
      </ul>
    );
  }
});
