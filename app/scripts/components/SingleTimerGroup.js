import React from 'react';
import { browserHistory } from 'react-router';

import ActiveTimer from './activeTimer';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      timers: []
    };
  },
  componentWillMount () {
    if (store.timers.toJSON().length < 1) {
      browserHistory.push('/timerGroups');
    }
  },
  componentDidMount() {
    let group = store.timers.toJSON().filter((group) => {
      if (this.props.params.group.includes(group.templateName)) {
        return true;
      }
    });
    //utilizing group[0] due to the nature of the map over the different timer groups
    this.setState({ timers: group[0].timers });
  },
  render() {
    let timers = <div>test</div>;
    // console.log(this.state.timers);
    timers = this.state.timers.map((timer, i) => {
      return <ActiveTimer key={ i } timer={ timer } groupTemplate={ true } />;
    });
    return (
      <div className="multi-timer">
        { timers }
      </div>
    );
  }
});
