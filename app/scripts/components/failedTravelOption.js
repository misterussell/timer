import React from 'react';

export default React.createClass({
  render() {
    return (
      <div>
      <h2>this.props.timer.name</h2>
      Oh no! It looks like { this.props.timer.name } is going to take { this.props.timer.timerValue } minutes, and you only have { this.props.timeConstraint }. Perphas you should considering another method of transport so that you you are not { this.props.timer.timerValue - this.props.timeConstraint } minutes late.
      </div>
    );
  }
});
