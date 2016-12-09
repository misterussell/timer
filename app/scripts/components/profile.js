import React from 'react';

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
          mostUsed: store.timerStats.mostUsed()
        }
      });
    });
  },
  componentWillUnmount() {
    store.timerStats.off();
  },
  render() {
    let avgComplete = null, avgPaused = null, numComplete = 0, numPaused = 0, mostUsed = null;
    if (this.state.stats.completed) {
      numComplete = this.state.stats.completed.numOfTimers;
      avgComplete = (
        <aside className="time">
          <section className="time-value hours">{ this.state.stats.completed.average.hours } h</section>
          <section className="time-value minutes">{ this.state.stats.completed.average.minutes } m</section>
          <section className="time-value seconds">{ this.state.stats.completed.average.seconds } s</section>
          <section className="stat-total">You have completed { numComplete } timers.</section>
        </aside>
      );
    }
    if (this.state.stats.paused) {
      numPaused = this.state.stats.paused.numOfTimers;
      avgPaused = (
        <aside className="time">
          <section className="time-value hours">{ this.state.stats.paused.average.hours } h</section>
          <section className="time-value minutes">{ this.state.stats.paused.average.minutes } m</section>
          <section className="time-value seconds">{ this.state.stats.paused.average.seconds } s</section>
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
      </ul>
    );
  },
  handleClick(e) {
    e.preventDefault();
    store.timerStats.freqOrigin();
  }
});
