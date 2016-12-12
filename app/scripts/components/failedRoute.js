import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return (
      <main className="404">
        <h1 className="404-title">Page Not Found</h1>
        <section className="404-message">
          <h2>Oops! It looks like you tried to visit a page that does not exist.</h2>
          <h3>Need to get somewhere? Create a mobility timer <Link to="plan_a_trip">here</Link>.</h3>
          <h3>Or checkout some premade timers <Link to="timerGroups">here</Link>.</h3>
        </section>
      </main>
    );
  }
});
