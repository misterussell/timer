import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="timer-buttons">
        <button className="start" onClick={ this.handleStart }>Start</button>
        <button className="pause" onClick={ this.handlePause }>Pause</button>
      </div>
    );
  },
  handleStart(e) {
    e.preventDefault();
    this.props.startCallback();
  },
  handlePause(e) {
    e.preventDefault();
    this.props.pauseCallback();
  }
});
