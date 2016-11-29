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
      seconds: 0,
    };
  },
  componentDidMount() {
    let count = ((this.state.timer.timerValue * 60) * 1000);
    this.calcRemainder(count);
  },
  componentWillUnmount() {
    if (this.state.interval !== null) {
      clearInterval(this.state.interval);
    }
  },
  render() {
    return (
      <div className="active-timer">
          <h1 className="timer-name"> { this.state.timer.name } </h1>
          <h2 className="hours"> { ('0' + this.state.hours).slice(-2) } </h2>
          <h2 className="minutes"> { ('0' + this.state.minutes).slice(-2) } </h2>
          <h2 className="seconds"> { ('0' + this.state.seconds).slice(-2) } </h2>
          {
            <TimerButtons
            startCallback={ this.startTimer }
            pauseCallback={ this.pauseTimer } />
          }
      </div>
    );
  },
  updateTimer() {
    let updateCount = this.state.count - 1000;
    return this.calcRemainder(updateCount);
  },
  startTimer() {
    if (!this.state.interval) {
      this.setState({interval: setInterval(this.updateTimer, 1000)});
    }
  },
  pauseTimer() {
    clearInterval(this.state.interval);
    this.setState({interval: null});
  },
  calcRemainder(count) {
    // this function will calculate the remaining time for the current count value
    let seconds = Math.floor((this.state.count / 1000) % 60);
    let minutes = Math.floor(((this.state.count/1000)/60) % 60);
    let hours = Math.floor( this.state.count/(1000*60*60*24));
    return this.setState(
      { count,
        seconds,
        minutes,
        hours
      });
  }
});
