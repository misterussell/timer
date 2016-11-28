import React from 'react';
import { browserHistory } from 'react-router';

import SelectButton from './buttons/selectButton';

import store from '../store';

export default React.createClass({
  render() {
    return (
      <li>
        <h2>{this.props.timer.name}</h2>
        <h3>{this.props.timer.timerValue}</h3>
        {<SelectButton callback={ this.handleClick } text={'Select'}/>}
      </li>
    );
  },
  handleClick() {
    //when selecting the timer from the list, this callBack should create a timer to be viewed in the browser with the predefined values
    browserHistory.push(`/timers/${this.props.timer.objectId}`);
  }
});
