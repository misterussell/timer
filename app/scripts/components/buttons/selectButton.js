import React from 'react';

export default React.createClass({
  render() {
    return (
      <button className="select" onClick={ this.handleClick }>
        {this.props.text}
      </button>
    );
  },
  handleClick(e) {
    e.preventDefault();
    this.props.callback();
  }
});
