import React from 'react';

import TimerButtons from './buttons/timerButtons';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      timer: {},
      count: null,
      interval: null,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  componentWillMount() {
    let timer, count;
    if (store.timers.toJSON().length < 1) {
      //condition check to verify if data loaded
      this.loadData();
    } else if (this.props.groupTemplate) {
      //condition check to verify if part of group of timers
      timer = this.props.timer;
      count = ((timer.timerValue * 60) * 1000);
      this.setState({ timer });
      this.calcRemainder(count);
    } else {
      //condition check to load if visited by :id link
      timer = store.timers.get(this.props.params.id).toJSON();
      count = ((timer.timerValue * 60) * 1000);
      this.setState({ timer});
      this.calcRemainder(count);
    }
  },
  componentDidMount() {
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
          <h3 className="note"> { this.state.timer.note } </h3>
          {
            <TimerButtons
            startCallback={ this.startTimer }
            pauseCallback={ this.pauseTimer } />
          }
      </div>
    );
  },
  updateTimer() {
    if (this.state.count) {
      return this.calcRemainder(this.updateCount());
    } else {
      this.pauseTimer();
      return store.timer.completeTimer();
    }
  },
  startTimer() {
    if (!this.state.interval) {
      this.setState({ interval: setInterval(this.updateTimer, 1000) });
    }
  },
  pauseTimer() {
    clearInterval(this.state.interval);
    this.setState({ interval: null });
  },
  updateCount() {
    return this.state.count - 1000;
  },
  calcRemainder(count) {
    // this function will calculate the remaining time for the current count value
    let measure = store.timer.computeMeasure(count);
    let hours = measure.hours;
    let minutes = measure.minutes;
    let seconds = measure.seconds;
    return this.setState({count, hours, minutes, seconds});
  },
  loadData() {
    let timer;
    store.timers.loadTimers().then((response) => {
      console.log('got it!', response);
      timer = store.timers.get(this.props.params.id).toJSON();
      // count is a millisecond value for added continuity with the std value of setInterval
      let count = ((timer.timerValue * 60) * 1000);
      this.setState({
        timer,
        count
      });
      this.calcRemainder(count);
    }).catch(() => { console.log('Not retrieved.') });
  }
});
