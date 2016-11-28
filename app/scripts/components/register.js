import React from 'react';

import store from '../store';

export default React.createClass({
  render() {
    return (
      <form className="login-signup" onSubmit={this.handleSubmit}>
        <input type="text" ref="firstName" className="new-form-input" id="first-name" placeholder="First Name" />
        <input type="text" ref="lastName" className="new-form-input" id="last-name" placeholder="Last Name" />
        <input type="email" ref="email" className="new-form-input" id="email" placeholder="Email" />
        <input type="password" ref="pw" className="new-form-input" id="pw" placeholder="Password" />
        <input type="password" ref="confirmPw" className="new-form-input" id="confirm-pw" placeholder="Confirm Password" />
        <input type="submit" id="submit" value="Submit" />
      </form>
    );
  },
  handleSubmit(e) {
    e.preventDefault();
    let firstName = this.refs.firstName.value;
    let lastName = this.refs.lastName.value;
    let email = this.refs.email.value;
    let password = this.refs.pw.value;
    let confirmPW = this.refs.confirmPw.value;
    store.user.register(firstName, lastName, email, password, confirmPW);
  }
});
