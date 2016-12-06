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
        <Link className="timer-group" to="timerGroup/productivity_timers">
          <h3 className="title">Productivity Timers</h3>
          <h4 className="description">Timers centered around productivity in the work enviornment</h4>
        </Link>
        <Link className="timer-group" to="timerGroup/mindfulness_timers">
          <h3 className="title">Mindfulness Timers</h3>
          <h4 className="description">Timers centered around mindfulness</h4>
        </Link>
      </div>
    );
  }
});
