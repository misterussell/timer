import React from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

import store from '../store';
export default React.createClass({
  render() {
    let links;
    if (this.props.auth) {
      links = (
        <div className="authorized-links">
          <Link to="/">
            <i className="fa fa-home" aria-hidden="true"></i>
          </Link>
          <Link to="/timers">
            <i className="fa fa-clock-o" aria-hidden="true"></i>
          </Link>
          <Link onClick={ this.handleLogout }>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </Link>
        </div>
      );
    } else {
      links = (
        <div className="authorized-links width-control">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      );
    }

    return (
      <nav className="home-nav">
        <img src="../../assets/images/logo.svg" className="logo" />
        {links}
      </nav>
    );
  },
  handleLogout(e) {
    e.preventDefault();
    store.user.logout();
  },
  menu(e) {
    e.preventDefault();
    console.log('menu will display on click')
  }
});
