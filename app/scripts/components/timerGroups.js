import React from 'react';
import { Link } from 'react-router';

import store from '../store';

// route timerGroups
export default React.createClass({
  getInitialState() {
    return {
      timers: {}
    };
  },
  componentWillMount() {
    store.timers.fetch({url: `http://api.backendless.com/v1/data/multiTimerTemplates?loadRelations=timers`});
    store.timers.on('update change', () => {
      this.setState({timers: store.timers.toJSON()});
    });
    console.log(store.timers);
  },
  render() {
    return (
      <div className="timer-group-links">
        <Link to="timerGroup/productivity_timers">Productivity Timers</Link>
        <Link to="timerGroup/mindfulness_timers">Mindfulness Timers</Link>
        <Link to="timerGroup/mobility_timers">Mobility Timers</Link>
      </div>
    );
  }
});
