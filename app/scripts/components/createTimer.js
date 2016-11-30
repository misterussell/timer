import React from 'react';

import NumberInput from './numberInput';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      title: null,
      note: null,
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
        <input type="submit" id="submit" value="Submit" />
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
    e.preventDefault();
    let title = this.refs.title.value;
    this.setState({
      title,
      note: this.refs.note.value
    });
    return store.timer.createTimer(this.state);
  }
});
