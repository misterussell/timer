import React from 'react';

import TimerButtons from './buttons/timerButtons';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      timer: store.timers.get(this.props.params.id).toJSON(),
      count: null,
      interval: null,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },
  componentDidMount() {
    let count = (this.state.timer.timerValue * 60);
    this.calcRemainder(count);
  },
  render() {
    return (
      <div className="active-timer">
          <h2 className="hours"> { this.state.hours } </h2>
          <h2 className="minutes"> { this.state.minutes } </h2>
          <h2 className="seconds"> {this.state.seconds } </h2>
          {
            <TimerButtons
            startCallback={ this.startTimer }
            pauseCallback={ this.pauseTimer } />
          }
      </div>
    );
  },
  updateTimer() {
    let updateCount = this.state.count - 1;
    return this.calcRemainder(updateCount);
  },
  startTimer() {
    this.setState({interval: setInterval(this.updateTimer, 1000)});
  },
  pauseTimer() {
    clearInterval(this.state.interval);
  },
  calcRemainder(count) {
    // this function will calculate the remaining time for the current count value
    //
    return this.setState(
      { count,
        hours,
        minutes,
        seconds
      });
  }
});
