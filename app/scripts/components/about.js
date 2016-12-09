import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return (
      <aside className="about-page">
        <h1 className="title">On Time</h1>
        <img src="../../assets/images/zmzhcvivgbg-ales-krivec.jpg"
          alt="alarm picture"
          className="about-pic"/>
        <h2>About the App</h2>
        <p className="about-text">
          On Time is an application that aims to help you maximize your <span className="highlight">productivity</span>, daily <span className="highlight">mindfulness</span> practice, and <span className="highlight">awareness of mobility constraints</span>. Keeping up with time in a more granular way, with pre-made and customizable timer creation, you can self-check the work that you are doing and hit the goals you need to. If you don't, you'll at least have a better idea of the time you need next time.
        </p>
        <p>So go ahead and <Link className="quick-link" to="plan_a_trip">plan a trip</Link>, or <Link className="quick-link" to="timerGroups">select from our premade timers</Link> to get started.</p>
      </aside>
    );
  }
});
