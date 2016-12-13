import React from 'react';
import TGroup from 'react-addons-css-transition-group';

export default React.createClass({
  getInitialState() {
    return {
      show: true
    }
  },
  render() {
    let child = <h1></h1>;
    if (this.state.show) {
      child = <h1 key="child">This will be hidden</h1>;
    }
    return (
      <div className='parent'>
        <h2 onClick={ this.toggle }>try to have something leave</h2>
          <TGroup
            transitionName="test"
            transitionEnterTimeout={2000}
            transitionLeaveTimeout={2000}>
              { child }
          </ TGroup>
      </div>
    );
  },
  toggle() {
    if (this.state.show) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  }
});
