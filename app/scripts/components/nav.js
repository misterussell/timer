import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    let links;
    if (this.props.auth) {
      links = (
        <div className="authorized-links">
          <Link to="/">Home</Link>
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
    console.log('Log Out will occur here');
  }
});
