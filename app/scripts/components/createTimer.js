import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';

//route: /createTimer
export default React.createClass({
  render() {
    return (
      <form className="create-timer" onSubmit={ this.handleSubmit } >
        <div className="input-wrapper">
          <label className="hide" htmlFor="title">Timer Name</label>
          <input
            type="text"
            id="title"
            ref="title"
            className="timer-title"
            placeholder="Timer Name" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="hours">Hours</label>
          <input
            type="text"
            id="hours"
            ref="hours"
            placeholder="00"
            className="hours timevalue" />
        </div>
        <div className="input-wrapper">
        <label htmlFor="minutes">Minutes</label>
          <input
            type="text"
            id="minutes"
            ref="minutes"
            placeholder="00"
            className="minutes timevalue" />
          </div>
        <div className="input-wrapper">
        <label htmlFor="seconds">Seconds</label>
          <input
            type="text"
            ref="seconds"
            id="seconds"
            ref="seconds"
            placeholder="00"
            className="seconds timevalue" />
        </div>
        <label htmlFor="note">Timer Note:</label>
        <div className="input-wrapper">
          <input type="text"
            id="note"
            ref="note"
            className="note"
            placeholder="What's this timer for?" />
        </div>
        <input type="button" id="save" value="Save & Start Timer" onClick={ this.handleSave }/>
      </form>
    );
  },
  handleSave(e) {
    e.preventDefault();

    let timerData = {
      hours: this.refs.hours.value,
      minutes: this.refs.minutes.value,
      seconds: this.refs.seconds.value
    };

    return store.timers.saveTimer(
      timerData,
      this.refs.title.value,
      this.refs.note.value
    ).then((link) => {
      browserHistory.push(link);
    }).catch((response) => {
      console.log(response,'Testing needed');
    });
  }
});
