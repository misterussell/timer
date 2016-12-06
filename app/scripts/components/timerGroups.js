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
    store.timers.fetch({
      url: `https://api.backendless.com/v1/data/Timers?where=` + escape(`ownerId='${store.user.get('ownerId')}' AND type='mobility'`),
      // url: `https://api.backendless.com/v1/data/Timers?where=` + escape(`type='mobility'`),
      remove: false,
    });
    store.timers.on('update change', () => {
      this.setState({timers: store.timers.toJSON()});
    });
    console.log(store.timers);
  },
  componentWillUnmount() {
    store.timers.off();
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
