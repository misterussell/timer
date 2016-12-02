import React from 'react';

// route timerGroups
export default React.createClass({
  render() {
    return (
      <ul className="timer-group-templates">
        <li className="timer-group productivity">Mindful Timers</li>
        <li className="timer-group mindfulness">Productivity Timers</li>
        <li className="timer-group mobility">Mobility Timers</li>
      </ul>
    );
  }
});
