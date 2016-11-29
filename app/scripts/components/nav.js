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
          <Link to="/">Home</Link>
          <Link to="/timers">Timers</Link>
          <Link onClick={ this.handleLogout }>Log Out</Link>
        </div>
      );
    } else {
      links = (
        <div className="authorized-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      );
    }

    return (
      <nav className="home-nav">
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
