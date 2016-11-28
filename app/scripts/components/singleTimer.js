import React from 'react';

import SelectButton from './buttons/selectButton';

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
    //when selecting the timer from the list, this callBack should create a timer to be viewed in the browser
    console.log('call back registered for singleTimer');
  }
});
