import React from 'react';
import { browserHistory } from 'react-router';

import NumberInput from './numberInput';

import store from '../store';

//route: /createTimer
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
  handleSave(e) {
    e.preventDefault();
    return store.timers.saveTimer(
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
