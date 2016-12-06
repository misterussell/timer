import React from 'react';

import SingleTimer from './singleTimer';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      timers: []
    };
  },
  componentWillMount() {

  },
  componentDidMount() {
    let timers;
    if (this.props.route.user) {
      // it may be better to have this not load async, but assume that all data has been saved to the server
      store.timers.fetch({url: `https://api.backendless.com/v1/data/Timers?where=` + escape(`ownerId='${store.user.get('ownerId')}'`)});
    } else {
      store.timers.fetch({url: `https://api.backendless.com/v1/data/Timers?where=default=true`});
    }
    store.timers.on('update change', () => {
      this.setState({timers: store.timers.toJSON()});
    });
  },
  componentWillUnmount() {
    store.timers.off();
  },
  render() {
    let timers = this.state.timers.map((timer, i) => {
      return <SingleTimer key={ i } timer={ timer }/>;
    });
    return (
      <ul className="template-timers">
        <h1 className="timer-titles">Select a timer!</h1>
        { timers }
      </ul>
    );
  }
});
