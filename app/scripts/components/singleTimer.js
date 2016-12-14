import React from 'react';
import { browserHistory } from 'react-router';

import SelectButton from './buttons/selectButton';

import store from '../store';

export default React.createClass({
  render() {
    let note = null;
    let timerValue = `${ Math.floor(this.props.timer.timerValue)} minutes`;

    if (this.props.timer.origin && this.props.timer.destination) {
      note = `${this.props.timer.origin} to ${this.props.timer.destination}`;
    }

    if (this.props.timer.note !== '') {
      note = this.props.timer.note;
    }

    if (Number(this.props.timer.timerValue) < 1) {
      timerValue = `${this.props.timer.timerValue * 60} seconds`;
    }

    return (
      <li className="timer-template">
        <h2 className="timer-name">{ this.props.timer.name }</h2>
        <h3 className="timer-value">{ timerValue } </h3>
        <h4 className="timer-note">
          { note }
        </h4>
        {<SelectButton callback={ this.handleClick } text={'Select'}/>}
      </li>
    );
  },
  handleClick() {
    //when selecting the timer from the list, this callBack should create a timer to be viewed in the browser with the predefined values
    browserHistory.push(`/timers/${this.props.timer.objectId}`);
  }
});
