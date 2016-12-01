import React from 'react';

// route timerGroups
export default React.createClass({
  render() {
    return (
      <ul className="timer-group-templates">
        <li className="timer-group productive">Mindful Timers</li>
        <li className="timer-group mindful">Productivity Timers</li>
        <li className="timer-group mobility">Mobility Timers</li>
      </ul>
    );
  }
});
