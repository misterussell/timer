import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="timer-buttons">
        <button className="start" onClick={ this.handleStart }>
          <i className="fa fa-play" aria-hidden="true"></i>
        </button>
        <button className="pause" onClick={ this.handlePause }>
          <i className="fa fa-pause" aria-hidden="true"></i>
        </button>
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
