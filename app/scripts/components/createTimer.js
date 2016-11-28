import React from 'react';

import store from '../store';

export default React.createClass({
  render() {
    return (
      <form className="create-timer" onSubmit={ this.handleSubmit } >
        <input type="text" ref="time" name="time" />
        <input type="text" ref="note" name="note" />
      </form>
    );
  },
  handleSubmit(e) {
    e.preventDefault();
    let val = this.refs.time.value;
    let note = this.refs.note.value;
    return store.timer.createTimer(val, note);
  }
});
