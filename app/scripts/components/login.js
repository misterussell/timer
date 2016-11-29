import React from 'react';
import { Link } from 'react-router';

import store from '../store';

export default React.createClass({
  render() {
    return (
      <form className="login-register" onSubmit={this.handleSubmit}>
        <input type="email" ref="email" className="new-form-input" id="email" placeholder="Email" defaultValue="test2@test.com"/>
        <input type="password" ref="pw" className="new-form-input" id="pw" placeholder="Password" defaultValue="12345"/>
        <input type="submit" id="submit" name="submit" value="Submit" />
        <Link to="forgotPassword">Forgot Password? Click here</Link>
      </form>
    );
  },
  handleSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.pw.value;
    store.user.login(email, password);
  }
});
