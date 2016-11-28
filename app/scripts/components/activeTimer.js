import React from 'react';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      timer: store.timers.get(this.props.params.id).toJSON()
    };
  },
  componentDidMount() {
  },
  render() {
    return (
      <div className="active-timer">
          Timer Data will show up here
      </div>
    );
  }
});
