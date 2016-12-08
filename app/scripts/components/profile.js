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
          <section className="time-value hours">{ this.state.stats.completed.average.hours } hours</section>
          <section className="time-value minutes">{ this.state.stats.completed.average.minutes } minutes</section>
          <section className="time-value seconds">{ this.state.stats.completed.average.seconds } seconds</section>
        </aside>
      );
    }
    if (this.state.stats.paused) {
      numPaused = this.state.stats.paused.numOfTimers;
      avgPaused = (
        <aside className="time">
          <section className="time-value hours">{ this.state.stats.paused.average.hours } hours</section>
          <section className="time-value minutes">{ this.state.stats.paused.average.minutes } minutes</section>
          <section className="time-value seconds">{ this.state.stats.paused.average.seconds } seconds</section>
        </aside>
      );
    }
    if (this.state.stats.mostUsed) {
      mostUsed = (
        <aside>
          <section>Title: { this.state.stats.mostUsed.name }</section>
          <section>{ this.state.stats.mostUsed.note }</section>
          <section>Time: { this.state.stats.mostUsed.time} minutes</section>
          <section>Started { this.state.stats.mostUsed.start} times.</section>
          <section>Paused { this.state.stats.mostUsed.paused} times.</section>
          <section>Completed { this.state.stats.mostUsed.complete} times.</section>
        </aside>
      );
    }
    return (
      <ul>
        <li>
          <h2>Average Time of Completed Timers</h2>
          <h3>{ avgComplete }</h3>
          <h4>You have completed { numComplete } timers.</h4>
        </li>
        <li>
          <h2>Average Time of Paused Timers</h2>
          <h3>{ avgPaused }</h3>
          <h4>You have paused { numPaused } timers.</h4>
        </li>
        <li>
          <h2>Most Used Timer</h2>
          <h3>{ mostUsed }</h3>
        </li>
        <button onClick={ this.handleClick }>test</button>
      </ul>
    );
  },
  handleClick(e) {
    e.preventDefault();
  }
});
