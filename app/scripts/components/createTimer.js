import React from 'react';
import { browserHistory } from 'react-router';

import NumberInput from './numberInput';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      hours: '',
      minutes: '',
      seconds: ''
    };
  },
  render() {
    return (
      <form className="create-timer" onSubmit={ this.handleSubmit } >
        <input type="text"
          ref="title"
          className="timer-title"
          placeholder="Timer Name" />
        <NumberInput
          className="hours timevalue"
          measure={ 'hours' }
          value={ this.state.hours }
          callBack={ this.handleTime } />
        <NumberInput
          className="hours timevalue"
          measure={ 'minutes' }
          value={ this.state.minutes }
          callBack={ this.handleTime } />
        <NumberInput
          className="hours timevalue"
          measure={ 'seconds' }
          value={ this.state.seconds }
          callBack={ this.handleTime } />
        <input type="text"
          ref="note"
          className="note"
          placeholder="What's this timer for?" />
        <input type="submit" id="submit" value="Start Timer" />
        <input type="button" id="save" value="Save & Start" onClick={ this.handleSave }/>
      </form>
    );
  },
  handleTime(measure, value) {
    var state={};
    state[measure] = value;
    this.setState(state);
    // dynamic timer generation below
    // if (this.state.seconds.length === 2) {
    //   this.setState({ minutes: value });
    // } else this.setState(state);
  },
  handleSubmit(e) {
    //handle submit differs from save in that it won't save the timer to the server
    //or if it does it will burn it so that it doesn't persist after the user logs out
    e.preventDefault();
    let tempTimer = store.timer.setupTimer(
      this.state,
      this.refs.title.value,
      this.refs.note.value);
    return store.timers.temporaryTimers.concat([tempTimer]);
  },
  handleSave(e) {
    //this method will create a persistent timer that can be loaded later
    e.preventDefault();
    return store.timer.saveTimer(
      this.state,
      this.refs.title.value,
      this.refs.note.value
    ).then((link) => {
      browserHistory.push(link);
    }).catch((response) => {
      console.log(response,'Testing needed');
    });
  }
});
