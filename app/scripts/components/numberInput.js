import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      key: ''
    };
  },
  render() {
    return (
      <input type="text"
        ref="hours"
        className="hours time-value"
        placeholder="00"
        maxLength="2"
        value={ this.props.value }
        onChange={ this.handleChange }
        onKeyPress={ this.checkChar }
      />
    );
  },
  handleChange(e) {
    if (this.props.value.length !== 2) {
      return this.props.callBack(this.props.measure, e.target.value);
    }
  },
  checkChar(e) {
    let regex = /[0-9]/;
    if (!regex.test(e.key)) {
      e.returnValue = false;
      if (e.preventDefault) e.preventDefault();
    }
  }
});
