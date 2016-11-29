import React from 'react';

import store from '../store';

export default React.createClass({
  render() {
    return (
      <form className="login-register" onSubmit={ this.handleSubmit }>
        <input type="email" name="email" ref="email" placeholder="Your Email"/>
        <input type="submit" name="submit" value="Submit" />
      </form>
    );
  },
  handleSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value;
    store.user.newPassword(email);
  }
});
