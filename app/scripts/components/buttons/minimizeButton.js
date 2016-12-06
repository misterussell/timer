import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="minimize" onClick={ this.handleClick }>
        <i className="fa fa-minus-square-o" aria-hidden="true"></i>
      </div>
    );
  },
  handleClick(e) {
    e.preventDefault();
    this.props.callback();
  }
});
