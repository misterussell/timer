import React from 'react';
import { browserHistory } from 'react-router';

import TimerButtons from './buttons/timerButtons';
import MinimizeButton from './buttons/minimizeButton';

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
      mobilityCheck: false,
      minimize: false
    };
  },
  componentWillMount() {
    let timer, count;
    if (store.timers.toJSON().length < 1) {
      //condition check to verify if data loaded
      this.loadData();
    } else if (this.props.groupTemplate || this.props.mobilityTemplate) {
      //condition check to verify if part of group of timers, if is sent in with time constraint if will calculate when you need to leave
      timer = this.props.timer;
      if (this.props.mobilityTemplate && (this.props.timeConstraint !== 0)) {
        //calculates a timer that has the value of when the User needs to leave
        count = (((this.props.timeConstraint - timer.timerValue) * 60) * 1000);
      } else {
        count = ((timer.timerValue * 60) * 1000);
      }
      this.setState({ timer });
      this.calcRemainder(count);
    } else {
      //condition check to load if visited by :id link
      timer = store.timers.get(this.props.params.id).toJSON();
      count = ((timer.timerValue * 60) * 1000);
      this.setState({ timer });
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
    let mobilityCalculator = null, minimizeButton = null, timer = null;

    if ((this.state.timer.type === 'mobility') && (this.state.mobilityCheck === false)) {
      mobilityCalculator = (
        <form className="mobility-calculator" onSubmit={ this.handleSubmit }>
          <input type="text" ref="hours" />
          <input type="text" ref="minutes" />
          <input type="submit" value="When do you need to be there?" />
        </form>
      );
    }

    if (this.props.groupTemplate) {
      minimizeButton = <MinimizeButton callback={ this.toggle } />;
    }

    if (!this.state.minimize) {
      timer = (
        <div className="active-timer">
        <h1 className="timer-name"> { this.state.timer.name } </h1>
        <h2 className="hours"> { ('0' + this.state.hours).slice(-2) } </h2>
        <h2 className="minutes"> { ('0' + this.state.minutes).slice(-2) } </h2>
        <h2 className="seconds"> { ('0' + this.state.seconds).slice(-2) } </h2>
        <h3 className="note"> { this.state.timer.note } </h3>
        <h3 className="origin"> { this.state.timer.origin } </h3>
        <h3 className="desination"> { this.state.timer.destination } </h3>
        {
          <TimerButtons
          startCallback={ this.startTimer }
          pauseCallback={ this.pauseTimer }
          deleteCallback={ this.deleteTimer }
          owner={ this.state.timer.ownerId } />
        }
      </div>
      );
    }

    return (
      <div className="active-timer-container">
        { minimizeButton }
        { mobilityCalculator }
        { timer }
      </div>
    );
  },
  updateTimer() {
    if (this.state.count) {
      return this.calcRemainder(this.updateCount());
    } else {
      this.pauseTimer();
      return store.timer.completeTimer(this.state.timer.notificationSound);
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
  },
  handleSubmit(e) {
    e.preventDefault();
    let hours = this.refs.hours.value;
    let minutes = this.refs.minutes.value;
    let timeConstraint = (hours * 60) + minutes;
    console.log(timeConstraint);
    let count = (((timeConstraint - this.state.timer.timerValue) * 60) * 1000);
    this.setState({
      mobilityCheck: true
     });
    this.calcRemainder(count);
  },
  toggle() {
    if (this.state.minimize) {
      this.setState({ minimize: false });
    } else {
      this.setState({ minimize: true });
    }
  },
  deleteTimer() {
    store.timer.deleteTimer(this.state.timer.objectId)
    .then(() => {
      browserHistory.push('createTimer');
    })
    .catch(() => {
      alert('item not deleted');
    });
  }
});
