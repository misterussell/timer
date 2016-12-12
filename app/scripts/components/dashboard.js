import React from 'react';

import UseChart from './useChart';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      stats: {}
    };
  },
  componentDidMount() {
    store.timerStats.loadUserStats();
    store.timerStats.on('update change', () => {
      this.setState({
        stats: {
          completed: store.timerStats.computeAvgs('complete', 'timeStat'),
          paused: store.timerStats.computeAvgs('paused', 'timeStat'),
          mostUsed: store.timerStats.mostUsed(),
          mostActive: store.timerStats.freqUse(),
          useByDate: store.timerStats.useByDate()
        }
      });
    });
  },
  componentWillUnmount() {
    store.timerStats.off();
  },
  render() {
    let avgComplete = null, numComplete = 0, verifyCompleted, avgPaused = null, numPaused = 0, verifyPaused, mostUsed = null, mostActive = null;
    if (this.state.stats.completed) {
      numComplete = this.state.stats.completed.numOfTimers;
      if (numComplete === 0) {
        verifyCompleted = <section className="time-value">Please complete some timers, so that we can get your average completed time.</section>;
      } else {
        verifyCompleted = (
          <div>
            <section className="time-value hours">{ this.state.stats.completed.average.hours } h</section>
            <section className="time-value minutes">{ this.state.stats.completed.average.minutes } m</section>
            <section className="time-value seconds">{ this.state.stats.completed.average.seconds } s</section>
          </div>
        );
      }
      avgComplete = (
        <aside className="time">
          { verifyCompleted }
          <section className="stat-total">You have completed { numComplete } timers.</section>
        </aside>
      );
    }
    if (this.state.stats.paused) {
      numPaused = this.state.stats.paused.numOfTimers;
      if (numPaused === 0) {
        verifyPaused = <section className="time-value">You have not yet paused any timers.</section>;
      } else {
        verifyPaused = (
          <div>
            <section className="time-value hours">{ this.state.stats.paused.average.hours } h</section>
            <section className="time-value minutes">{ this.state.stats.paused.average.minutes } m</section>
            <section className="time-value seconds">{ this.state.stats.paused.average.seconds } s</section>
          </div>
        );
      }
      avgPaused = (
        <aside className="time">
          { verifyPaused }
          <section className="stat-total">You have paused { numPaused } timers.</section>
        </aside>
      );
    }
    if (this.state.stats.mostUsed) {
      mostUsed = (
        <aside>
          <section>Title: { this.state.stats.mostUsed.name }</section>
          <section>Timer note: { this.state.stats.mostUsed.note }</section>
          <section>Time: { this.state.stats.mostUsed.time} minutes</section>
          <section>Started { this.state.stats.mostUsed.start} times.</section>
          <section>Paused { this.state.stats.mostUsed.paused} times.</section>
          <section>Completed { this.state.stats.mostUsed.complete} times.</section>
        </aside>
      );

    if (this.state.stats.mostActive ) {
      mostActive = (
        <aside>
          <section>You were most active { this.state.stats.mostActive.date}, with {this.state.stats.mostActive.actions } clicks.</section>
        </aside>
      );
    }
    }
    return (
      <ul className="stats">
        <li className="completed-timer-data">
          <h2>Average Time of Completed Timers</h2>
          <h3>{ avgComplete }</h3>
        </li>
        <li className="paused-timer-data">
          <h2>Average Time of Paused Timers</h2>
          <h3>{ avgPaused }</h3>
        </li>
        <li className="most-used-data">
          <h2>Most Used Timer</h2>
          <h3>{ mostUsed }</h3>
        </li>
        <li className="most-active-date">
          <h2>Most Active Date</h2>
          <h3>{ mostActive }</h3>
        </li>
        <li className='use-chart-li'>
          <h2>Timer Stats per Day</h2>
          <UseChart data={ this.state.stats.useByDate } />
        </li>
        <li><button onClick={ this.handleClick }>Testing settings</button></li>
      </ul>
    );
  },
  handleClick(e) {
    e.preventDefault();
    console.log(store.timerStats.useByType());
  }
});
