import React from 'react';

import ActiveTimer from './activeTimer';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      timers: []
    };
  },
  componentWillMount () {

  },
  componentDidMount() {
    let group = store.timers.toJSON().filter((group) => {
      if (this.props.params.group.includes(group.templateName)) {
        return true;
      }
    });
    this.setState({ timers: group[0].timers });
  },
  render() {
    let timers = <div>test</div>;
    console.log(this.state.timers);
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
