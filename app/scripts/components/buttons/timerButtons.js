import React from 'react';

export default React.createClass({
  render() {
    let deleteButton = null;
    if (this.props.owner === window.localStorage['ownerId']) {
      deleteButton = (
        <button className="delete action-button"
          onClick={ this.handleDelete }>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      );
    }
    return (
      <div className="timer-buttons">
        <button
          className="start action-button"
          onClick={ this.handleStart }>
          <i className="fa fa-play" aria-hidden="true"></i>
        </button>
        <button
          className="pause action-button"
          onClick={ this.handlePause }>
          <i className="fa fa-pause" aria-hidden="true"></i>
        </button>
        <button
          className="reset action-button"
          onClick={ this.handleReset }>
          <i className="fa fa-refresh" aria-hidden="true"></i>
        </button>
        { deleteButton }
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
  },
  handleDelete(e) {
    e.preventDefault();
    this.props.deleteCallback();
  },
  handleReset(e) {
    e.preventDefault();
    this.props.resetCallback();
  }
});
